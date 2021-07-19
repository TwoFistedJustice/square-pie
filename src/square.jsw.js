import { fetch } from 'wix-fetch';
import { getSecret } from 'wix-secrets-backend'

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
    this.isProduction = isProduction
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
  
  // METHODS
  // generate idempotency_key
  
  
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
    console.log(`\ngenerated url: ${this.url}\n\n`)
    let request = async (url, options) => {
      const httpResponse = await fetch(url, options);
      if (!httpResponse.ok) {
        throw new Error('Request unsuccessful.');
      }
      let response = await httpResponse.json();
      return response;
    }
    // I hope this comes back as a promise and not a code smell
    return request(this.url, this.options(secret));
  }
} // END class


// LEVEL TWO CLASSES

class List extends SquareRequest{
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
  set id (someId){
    this.endpoint = `/${someId}`;
  }
} // END class


// creates a whole new document
// you tell it what to store
class Create extends SquareRequest{
  constructor(isProduction) {
    super(isProduction);
    this.endpoint = ''
    this.body = {}
  }
  options(secret) {
    return {
      method: 'post',
      headers: this.headers(secret),
      body: this.body
    }
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

class CustomerCreate extends Create {
  constructor (isProduction) {
    super (isProduction);
    this.apiName = 'customers';
    this.body = {
      idempotency_key: '',
      given_name: '',
      family_name: '',
      
      
    }
  }
}




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



export async function testRetrieve(){
  let testCustomerSqID = "CJ5Z66RDA4ZR3AQVCY1SRW4ZW8";
  let retrieve = new CustomerRetrieve(false);
  let secret = await getSecret(retrieve.secretName);
  console.log(secret);
  retrieve.id = testCustomerSqID;
  let customer = await retrieve.makeRequest(secret);
  console.log(customer);
  return customer.customer;
  
}



