import { fetch } from 'wix-fetch';
import { getSecret } from 'wix-secrets-backend'
const { v4: uuidv4 } = require('uuid');
const validator = require('validator');

const config = {
  squareVersion: '2021-06-16',
  sandboxSecretName: 'square_sandbox',
  productionSecretName: 'square_token',
  contentType: 'application/json',
  Accept: 'application/json'
};

var shortCustomer = {
  given_name: "Amelia",
  email_address: "aMe.lia698214271522544412252474@gmail.com"
}

var spiritualCustomer = {
    "given_name": "Freddie",
    "family_name": "Krueger",
    "email_address": "freddie@iscream.org",
    "address": {
      "address_line_1": "187 Elm Street",
      "address_line_2": "Suite 86",
      "locality": "Springwood",
      "administrative_district_level_1": "OH",
      "postal_code": "43086",
      "country": "US"
    },
    "phone_number": "1-937-555-1054",
    "reference_id": "10-Claws",
    "note": "goooo toooo sleeeeeeep",
    "preferences": {
      "email_unsubscribed": false
    },
}

// TOP LEVEL CLASSES

// instantiate the class with a boolean
// before calling class.makeRequest(secret) you have to get the secret from wix
// by calling getSecret(class.secretName)
class SquareRequest {
  constructor(isProduction) {
    this.isProduction = isProduction;
    this._body = {}
  }
  
  // COMPUTED PROPERTIES
  get secretName() {
    return (this.isProduction === true) ? `${config.productionSecretName}` : `${config.sandboxSecretName}`;
  }
  
  get body() {
    console.log('body getter')
    return this._body;
  }
  
  get baseUrl() {
    return (this.isProduction === true) ? `https://connect.squareup.com/v2/${this.apiName}` : `https://connect.squareupsandbox.com/v2/${this.apiName}`;
  }
  
  get url() {
    return `${this.baseUrl}${this.endpoint}`;
  }
  
  set body(val){
    this._body = val;
  }
  
  // METHODS
  
  headers(secret) {
    return {
      'Square-Version': `${config.squareVersion}`,
      'Content-Type': `${config.contentType}`,
      'Accept': `${config.Accept}`,
      'Authorization': `Bearer ${secret}`
    };
  }
  
  // you have to get the secret before calling this method
  makeRequest(secret) {
    
    let request = async (url, options) => {
      const httpResponse = await fetch(url, options);
      if (!httpResponse.ok) {
        let message = `\ngenerated url: ${this.url}\nmethod: ${options.method}\n${httpResponse.status}: ${httpResponse.statusText}`
        throw new Error(message);
      }
      let response = await httpResponse.json();
      
      return response;
    }
    
    return request(this.url, this.options(secret));
  }
  
  normalizeEmail (email){
    let normalizeOptions = {
      yahoo_remove_subaddress: false
    };
    if(!validator.isEmail(email)){
      throw new Error("Email is not valid. Please use a valid email address.")
    }
    return validator.normalizeEmail(email, normalizeOptions);
  }
  
} // END class

// LEVEL TWO CLASSES

class List extends SquareRequest {
  constructor(isProduction) {
    super(isProduction);
    this.endpoint = ''
  }
  options(secret) {
    return {
      method: 'get',
      headers: this.headers(secret),
      body: {}
    }
  }
} // END class

// to extend this
// override the options method in the subclass
// let options = super.options(secret)
// options.method = 'someHttpMethod'
// return options

//ToDO whenever something is updated or deleted, log it to a file
// ToDo first validate all incoming email addresses are valid
// then normalize them use Validator for both
// validate.normalizeEmail(email [, options])
// validate.isEmail(str [, options])
class RetrieveUpdateDelete extends SquareRequest {
  
  constructor(isProduction) {
    super(isProduction);
    
  }
  options(secret) {
    let options = {
      method: '',
      headers: this.headers(secret),
      body: {}
    };
    return options;
  }
} // END class







// TODO
//getting: Cannot set property body of #<SquareRequest> which has only a getter


// creates a whole new document
// you tell it what to store
class Create extends SquareRequest {
  constructor(isProduction) {
    super(isProduction);
    this.endpoint = ''
    this.idempotency_key = uuidv4();
  }
  options(secret) {
    return {
      method: 'post',
      headers: this.headers(secret),
      body: JSON.stringify(this._body)
    }
  }
  
  get getIdempotency_key() {
    return this.idempotency_key;
  }
  
} // END class





// CUSTOMER CUSTOMER CUSTOMER CUSTOMER CUSTOMER CUSTOMER  CUSTOMER
// CUSTOMER CUSTOMER CUSTOMER  CUSTOMER CUSTOMER CUSTOMER  CUSTOMER CUSTOMER CUSTOMER

class CustomerList extends List {
  constructor(isProduction) {
    super(isProduction);
    this.apiName = 'customers';
  }
} // END class

class CustomerRetrieve extends RetrieveUpdateDelete {
  constructor(isProduction) {
    super(isProduction)
    this.apiName = 'customers';
  }
  options(secret) {
    let options = super.options(secret);
    options.method = 'get';
    return options;
  }
} // END class

class CustomerDelete extends RetrieveUpdateDelete {
  constructor(isProduction) {
    super(isProduction);
    this.apiName = 'customers';
  }
  options(secret) {
    let options = super.options(secret);
    options.method = 'delete';
    return options;
  }
  // METHODS
  set id(someId) {
    this.endpoint = `/${someId}`;
  }
} // END class



class CustomerCreate extends Create {
  constructor(isProduction) {
    super(isProduction);
    this.apiName = 'customers';
  }
  //METHODS
 set customer(customer) {
    customer.idempotency_key = this.idempotency_key;
    customer.email_address = super.normalizeEmail(customer.email_address);
    this.body = customer;
  }
} // END class

// create a customer class which includes email validation

// TESTING FUNCTIONS BELOW HERE


// returns the ID of the first customer in the customers list
// creates a customer if none exists
const fetchIndexZeroCustomerId = async function(){
  let testCustomerSqID;
  let sandbox = false;
  let secret = await getSecret(config.sandboxSecretName);
  let list = await testList();
  
  if (!list.customers) {
    let newCustomer = await testCreate();
    testCustomerSqID = newCustomer.customer.id;
  } else {
    testCustomerSqID = list.customers[0].id;
  }
  if(!testCustomerSqID){
    throw new Error('Something went wrong with setting the ID in testDelete();')
  }
  return list.customers[0].id;
}


// the function that calls the async getter MUST be async
// that way they go into the same call stack
export async function testList() {
  var list = new CustomerList(false)
  let secret = await getSecret(list.secretName);
  let customerList = await list.makeRequest(secret);
  return customerList;
}

export async function testRetrieve() {
  let testCustomerSqID = "CJ5Z66RDA4ZR3AQVCY1SRW4ZW8";
  let retrieve = new CustomerRetrieve(false);
  let secret = await getSecret(retrieve.secretName);
  retrieve.id = testCustomerSqID;
  let customer = await retrieve.makeRequest(secret);
  return customer.customer;
}

export async function testCreate() {
  let someGuy = new CustomerCreate(false);
  let secret = await getSecret(someGuy.secretName);
  someGuy.customer = shortCustomer;
  // someGuy.customer = spiritualCustomer;
  let response = await someGuy.makeRequest(secret);
  console.log('Customer created:');
  return response;
}

export async function testDelete() {
  let sandbox = false;
  let secret = await getSecret(config.sandboxSecretName);
  let deleteCustomer = new CustomerDelete(sandbox);
  deleteCustomer.id = await fetchIndexZeroCustomerId();
  let vaporized = await deleteCustomer.makeRequest(secret);
  return vaporized;
}