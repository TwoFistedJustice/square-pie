// Create fetch and functions for the square invoice.
// @ts-ignore
import { fetch } from 'wix-fetch';
// @ts-ignore
import { getSecret } from 'wix-secrets-backend';
// @ts-ignore
import wixData from 'wix-data';
import {
  squareVersion,
  sandboxSecretName,
  productionSecretName
} from 'backend/squareApi/config.js'
const isProduction = false;


var body = {
  given_name: "Amelia",
  email_address: "amelia@example.com"
}

var testCustomerSqID = "MME12TZF5MZ9SA8HGMJNF3M92M";




/*
varies between requests:
    method: get, post, put, delete
    endpoint: '' , search , {customer_id} ,
    
    List: GET, ''
    Retrieve: GET, {customer_id}
    
    Create: POST, ''
    Search: POST, '/search'
    
 */

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
    return (this.isProduction === true) ? `${productionSecretName}` : `${sandboxSecretName}`;
  }
  get url(){
    return (this.isProduction === true) ? `https://connect.squareup.com/v2/${this.apiName}` : `https://connect.squareupsandbox.com/v2/${this.apiName}`;
  }
  
  get body(){
    return {};
  }
  
  // METHODS
  // generate idempotency_key
  options(secret){
    return {
      method: 'get',
      headers: this.headers(secret),
      body: body
    };
  }
  
  headers(secret){
    return {
      'Square-Version': `${squareVersion}`,
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


var list = new SquareRequest(false)

// the function that calls the async getter MUST be async
// that way they go into the same call stack
export async function blah (){
  let secret = await getSecret(list.secretName);
  console.log(secret);
  let customerList = await list.makeRequest(secret);
  
  console.log(customerList);
}


