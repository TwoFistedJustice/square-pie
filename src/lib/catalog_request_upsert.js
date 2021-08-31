const Catalog_Request = require("./catalog_request");
const { v4: uuidv4 } = require("uuid");

// todo this is where the error is happening
// task: find a way to insert the wrapper into the appropriate property

class Catalog_Request_Upsert extends Catalog_Request {
  constructor() {
    super();
    this._method = "post";
    this._idempotency_key = uuidv4();
    this._endpoint = "";
    this._delivery; // what comes back
    this._body;
    this.configuration = {
      batch: {
        endpoint: "/batch-upsert",
      },
      one: {
        endpoint: "/object",
      },
    };
  }

  get endpoint() {
    return this._endpoint;
  }
  get body() {
    return this._body;
  }
  set body(fardel) {
    this._body = fardel;
  }
  set endpoint(str) {
    this._endpoint = str;
  }

  // todo tighten this up
  //  rename the method
  go(fardel) {
    if (Array.isArray(fardel)) {
      this.endpoint = this.configuration.batch.endpoint;
    } else {
      this.endpoint = this.configuration.one.endpoint;
    }
    this.body = fardel;
  }

  // METHODS

  /*
  var thing = create the catalog object(s)
  
  instantiate request class (thing)
  class.makerequest
  
  
  * */
}

module.exports = Catalog_Request_Upsert;
