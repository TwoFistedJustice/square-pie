const Catalog_Request = require("./catalog_request_abstract");
const { nanoid } = require("nanoid/non-secure");
const man =
  "Upserts one or more Catalog API Objects. Create the object using the appropriate Pie class then add that" +
  "class's fardel using make().add(fardel)\n" +
  "https://developer.squareup.com/reference/square/catalog-api/batch-upsert-catalog-objects";

class Catalog_Upsert extends Catalog_Request {
  _display_name = "Catalog_Upsert";
  _last_verified_square_api_version = "2021-12-15";
  _help = this.display_name + ": " + man;
  constructor() {
    super();
    this._method = "post";
    this._endpoint = "/batch-upsert";
    this._delivery; // what comes back
    this._body = {
      idempotency_key: nanoid(),
      batches: [
        {
          objects: [],
        },
      ],
    };
  }
  get display_name() {
    return this._display_name;
  }
  get square_version() {
    return `The last verified compatible Square API version is ${this._last_verified_square_api_version}`;
  }
  get help() {
    return this._help;
  }
  get endpoint() {
    return this._endpoint;
  }
  get body() {
    return this._body;
  }

  set body(fardel) {
    this.body.batches[0].objects.push(fardel);
  }

  set endpoint(str) {
    this._endpoint = str;
  }

  // METHODS
  /**
   * @param {object} Item Object
   * @return Adds Item Objects to the body to be sent to Square
   * */
  add(fardel) {
    this.body = fardel;
    return this;
  }

  // MAKER METHODS
  make() {
    return {
      self: this,
      body: function (fardel) {
        this.self.body = fardel;
        return this;
      },
      add: function (fardel) {
        this.body(fardel);
        return this;
      },
    };
  }
}

module.exports = Catalog_Upsert;
