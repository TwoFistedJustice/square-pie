const Catalog_Request = require("./catalog_request");
const { nanoid } = require("nanoid/non-secure");

class Catalog_Upsert extends Catalog_Request {
  constructor() {
    super();
    this._method = "post";
    this._idempotency_key = nanoid();
    this._endpoint = "";
    this._delivery; // what comes back
    this._body;
    //todo refactor-part of the one or many refactor
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
    if (Object.prototype.hasOwnProperty.call(fardel, "objects")) {
      this.endpoint = this.configuration.batch.endpoint;
      this._body = {
        idempotency_key: this._idempotency_key,
        batches: [fardel],
      };
    } else {
      this.endpoint = this.configuration.one.endpoint;
      this._body = fardel;
    }
  }
  set endpoint(str) {
    this._endpoint = str;
  }

  // MAKER METHODS
  make() {
    return {
      self: this,
      body: function (fardel) {
        this.self.body = fardel;
        return this;
      },
    };
  }
}

module.exports = Catalog_Upsert;
