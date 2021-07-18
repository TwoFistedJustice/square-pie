import { fetch } from 'wix-fetch';
import {getSecret} from 'wix-secrets-backend'


const config = {
  squareVersion: '2021-05-13',
  sandboxSecretName: 'square_sandbox',
  productionSecretName: 'square_token',
  
};

var body = {}


// instantiate the class with a boolean
// before calling class.makeRequest(secret) you have to get the secret from wix
// by calling getSecret(class.secretName)
class SquareRequest {
  
  constructor (isProduction) {
    this.isProduction = isProduction
    this.apiName = 'customers'
    // this.body = {}
    // this.response = null
  }
  // COMPUTED PROPERTIES
  get secretName(){
    return (this.isProduction === true) ? `${config.productionSecretName}` : `${config.sandboxSecretName}`;
  }
  get url(){
    return (this.isProduction === true) ? `https://connect.squareup.com/v2/${this.apiName}` : `https://connect.squareupsandbox.com/v2/${this.apiName}`;
  }
  
  get body(){
    return {};
  }
  
  // METHODS
  // generate idempotency_key
  
  
  headers(secret){
    return {
      'Square-Version': `${config.squareVersion}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${secret}`
    };
  }
  
  
  // you have to get the secret before calling this method
  makeRequest(secret){
    let request = async (url, options) => {
      const httpResponse = await fetch(url, options);
      if(!httpResponse.ok){
        throw new Error('Customer not created.');
      }
      let response = await httpResponse.json();
      return response;
    }
    // I hope this comes back as a promise and not a code smell
    return request(this.url, this.options(secret));
  }
} // END class

export class CustomerList extends SquareRequest {
  constructor (isProduction) {
    super (isProduction);
  }
  options(secret) {
    return {
      method: 'get',
      headers: this.headers (secret),
      body: body
    }
  }
  
  
} // END class




// the function that calls the async getter MUST be async
// that way they go into the same call stack
export async function blah (){
  var list = new CustomerList(false)
  let secret = await getSecret(list.secretName);
  console.log(secret);
  let customerList = await list.makeRequest(secret);
  
  console.log(customerList);
}
