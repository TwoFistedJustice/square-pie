const config = require("./config");

//-----------------------------------------------
// TOP LEVEL CLASSES aka LEVEL ONE CLASSES
//-----------------------------------------------

// instantiate the class with a boolean
// before calling class.makeRequest(secret) you have to get the secret from wix
// by calling getSecret(class.secretName)

class SquareRequest {
  constructor(isProduction = true) {
    this.isProduction = isProduction;
    this._method = "";
    this._body;
    this._endpoint = "";
  }

  // GETTERS
  get method() {
    return this._method;
  }
  get body() {
    return this._body;
  }

  // SETTERS
  set body(val) {
    this._body = val;
  }
  set method(method) {
    this._method = method;
  }

  // COMPUTED PROPERTIES
  get secretName() {
    return this.isProduction === true
      ? `${config.productionSecretName}`
      : `${config.sandboxSecretName}`;
  }
  get baseUrl() {
    return this.isProduction === true
      ? `https://connect.squareup.com/v2/${this._apiName}`
      : `https://connect.squareupsandbox.com/v2/${this._apiName}`;
  }
  get url() {
    return `${this.baseUrl}${this._endpoint}`;
  }

  // METHODS

  headers(secret) {
    return {
      "Square-Version": `${config.squareVersion}`,
      "Content-Type": `${config.contentType}`,
      Accept: `${config.Accept}`,
      Authorization: `Bearer ${secret}`,
    };
  }
  // you have to get the secret before calling this method
  makeRequest(secret) {
    let request = async (url, options) => {
      const httpResponse = await fetch(url, options);
      if (!httpResponse.ok) {
        let message = `\ngenerated url: ${this.url}\nmethod: ${options.method}\n${httpResponse.status}: ${httpResponse.statusText}`;
        throw new Error(message);
      }
      let response = await httpResponse.json();
      return response;
    };
    return request(this.url, this.options(secret));
  }
  options(secret) {
    return {
      method: this._method,
      headers: this.headers(secret),
      body: JSON.stringify(this._body),
    };
  }
} // END class

module.exports = {
  SquareRequest,
};
