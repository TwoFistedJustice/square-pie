const Catalog_Request = require("./catalog_request");
const { nanoid } = require("nanoid/non-secure");

class Catalog_Upsert extends Catalog_Request {
  _display_name = "Catalog_Upsert";
  _last_verified_square_api_version = "2021-07-21";
  constructor() {
    super();
    this._method = "post";
    // this._idempotency_key = nanoid();
    this._endpoint = "/batch-upsert";
    this._delivery; // what comes back
    this._body = {
      idempotency_key: nanoid(),
      // batches: [{
      //   objects: [],
      // }],
      batches: [],
    };
    //todo refactor-part of the one or many refactor
    // this.configuration = {
    //   batch: {
    //     endpoint: "/batch-upsert",
    //   },
    //   one: {
    //     endpoint: "/object",
    //   },
    // };
  }
  get display_name() {
    return this._display_name;
  }
  get square_version() {
    return `The last verified compatible Square API version is ${this._last_verified_square_api_version}`;
  }
  get endpoint() {
    return this._endpoint;
  }
  get body() {
    return this._body;
  }

  set body(fardel) {
    // this._body.batches[0].objects.push(fardel);
    this._body.batches.push(fardel);
  }

  // set body(fardel) {
  //   if (Object.prototype.hasOwnProperty.call(fardel, "objects")) {
  //     this._body = {
  //       idempotency_key: this._idempotency_key,
  //       batches: [fardel],
  //     };
  //   } else {
  //     this._body = fardel;
  //   }
  // }
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
