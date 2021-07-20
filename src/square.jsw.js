import { fetch } from 'wix-fetch';
import { getSecret } from 'wix-secrets-backend'
const { v4: uuidv4 } = require('uuid');

const config = {
  squareVersion: '2021-06-16',
  sandboxSecretName: 'square_sandbox',
  productionSecretName: 'square_token',
  contentType: 'application/json',
  Accept: 'application/json'
};

var body = {}

var bodyTestcase = {
  given_name: "Amelia",
  email_address: "amelia@example.com"
}

// TOP LEVEL CLASSES

// instantiate the class with a boolean
// before calling class.makeRequest(secret) you have to get the secret from wix
// by calling getSecret(class.secretName)
class SquareRequest {
  
  constructor(isProduction) {
    this.isProduction = isProduction;
  }
  
  // COMPUTED PROPERTIES
  get secretName() {
    return (this.isProduction === true) ? `${config.productionSecretName}` : `${config.sandboxSecretName}`;
  }
  
  get body() {
    return {};
  }
  
  get baseUrl() {
    return (this.isProduction === true) ? `https://connect.squareup.com/v2/${this.apiName}` : `https://connect.squareupsandbox.com/v2/${this.apiName}`;
  }
  
  get url() {
    return `${this.baseUrl}${this.endpoint}`;
  }
  
  set body(val){
    body = val;
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
    // I hope this comes back as a promise and not a code smell
    return request(this.url, this.options(secret));
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
      body: body
    }
  }
} // END class

// to extend this
// override the options method in the subclass
// let options = super.options(secret)
// options.method = 'someHttpMethod'
// return options
class RetrieveUpdateDelete extends SquareRequest {
  constructor(isProduction) {
    super(isProduction);
  }
  options(secret) {
    let options = {
      method: '',
      headers: this.headers(secret),
      body: body
    };
    return options;
  }
  // METHODS
  set id(someId) {
    this.endpoint = `/${someId}`;
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
    this.body = {}
  }
  options(secret) {
    console.log(this.idempotency_key);
    return {
      method: 'post',
      headers: this.headers(secret),
      body: this.body
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
}

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
}




class CustomerCreate extends Create {
  constructor(isProduction) {
    super(isProduction);
    this.apiName = 'customers';
  }
  
  
  //METHODS
  populate(customer) {
    console.log(this.getIdempotency_key);
    this.body = customer;
    body.idempotency_key = this.idempotency_key;
  }
  
}








// create a customer class which includes email validation

// the function that calls the async getter MUST be async
// that way they go into the same call stack
export async function testList() {
  var list = new CustomerList(false)
  let secret = await getSecret(list.secretName);
  console.log(secret);
  let customerList = await list.makeRequest(secret);
  
  console.log(customerList);
  return true;
}

export async function testRetrieve() {
  let testCustomerSqID = "CJ5Z66RDA4ZR3AQVCY1SRW4ZW8";
  let retrieve = new CustomerRetrieve(false);
  let secret = await getSecret(retrieve.secretName);
  retrieve.id = testCustomerSqID;
  let customer = await retrieve.makeRequest(secret);
  console.log(customer);
  return customer.customer;
}

export async function testCreate() {
  let someGuy = new CustomerCreate(false);
  let secret = await getSecret(someGuy.secretName);
  let coddlingWixCrapyCodeComplete = {
    given_name: "Phillipe",
    family_name: "Dacreep",
    company_name: "Auntie Susan's Mobile Ice Cream",
    nickname: "wanted in 5 systems",
    email_address: "lilpp@iscream.org",
    address: {
      address_line1: "15 Elm Street",
      address_line2: undefined,
      address_line3: undefined,
      administrative_district_level_1: "NY",
      administrative_district_level_2: undefined,
      administrative_district_level_3: undefined,
      country: "US",
      first_name: "Phil",
      last_name: "D",
      locality: "Amityville",
      oranization: "Auntie Sue's",
      postal_code: "00100",
      sublocality: undefined,
      sublocality_2: undefined,
      sublocality_3: undefined
    },
    phone_number: "212-ruh-roh!",
    reference_id: "some identifier",
    note: "walk a mile in his shoes, go to jail",
    birthday: "1998-09-21T00:00:00-00:00"
  };
  someGuy.populate = coddlingWixCrapyCodeComplete;
  
  let response = await someGuy.makeRequest(secret);
  console.log(response);
  return response;
}

// set this up to create a customer, log that customer, then delete it
export async function testDelete() {
  let testCustomerSqID = "";
  
  let vaporizeMe = new CustomerDelete(false);
  let secret = await getSecret(vaporizeMe.secretName);
  vaporizeMe.id = testCustomerSqID;
  let vaporized = await vaporizeMe.makeRequest(secret);
  console.log(vaporized);
  
}