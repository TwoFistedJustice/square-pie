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

var testCustomerSqID = "MME12TZF5MZ9SA8HGMJNF3M92M";

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
    console.log(this.url)
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

// CUSTOMER CUSTOMER CUSTOMER CUSTOMER CUSTOMER CUSTOMER  CUSTOMER
// CUSTOMER CUSTOMER CUSTOMER  CUSTOMER CUSTOMER CUSTOMER  CUSTOMER CUSTOMER CUSTOMER

class CustomerList extends SquareRequest {
  constructor(isProduction) {
    super(isProduction);
    this.apiName = 'customers'
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


class Retrieve extends SquareRequest {
  constructor(isProduction) {
    super(isProduction);
  }
  options(secret) {
    return {
      method: 'get',
      headers: this.headers(secret),
      body: body
    }
  }
} // END class

// the function that calls the async getter MUST be async
// that way they go into the same call stack
export async function blah() {
  var list = new CustomerList(false)
  let secret = await getSecret(list.secretName);
  console.log(secret);
  let customerList = await list.makeRequest(secret);
  
  console.log(customerList);
}