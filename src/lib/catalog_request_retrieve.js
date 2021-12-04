const Catalog_Request = require("./catalog_request_abstract");

class Catalog_Retrieve extends Catalog_Request {
  _display_name = "Catalog_Retrieve";
  _last_verified_square_api_version = "2021-07-21";
  constructor() {
    super();
    this._method = "post";
    this._endpoint = "/batch-retrieve";
    this._body = {
      object_ids: [],
    };
  }
  get display_name() {
    return this._display_name;
  }
  get square_version() {
    return `The last verified compatible Square API version is ${this._last_verified_square_api_version}`;
  }
  get object_ids() {
    return this._body.object_ids;
  }
  get body() {
    return this._body;
  }

  set object_ids(id) {
    if (typeof id !== "string") {
      console.log(id);
      throw new TypeError("Object IDs must valid IDs. Received a " + typeof id);
    }
    this._body.object_ids.push(id);
  }

  //METHODS

  retrieve(id) {
    this.object_ids = id;
    return this;
  }

  get(id) {
    return this.retrieve(id);
  }

  make() {
    return {
      self: this,
      object_ids: function (id) {
        this.self.object_ids = id;
        return this;
      },
      retrieve: function (id) {
        return this.object_ids(id);
      },
    };
  }
}

module.exports = Catalog_Retrieve;
