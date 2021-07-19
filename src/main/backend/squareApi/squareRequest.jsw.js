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

function someFunction(){
  console.log('Import successful');
}


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



export {SquareRequest, someFunction}