const Catalog_Request = require("./catalog_request");

// todo remove oddball function dupes
// todo simplify makers

class Catalog_Retrieve extends Catalog_Request {
  constructor() {
    super();
    this._method = "post";
    this._endpoint = "/batch-retrieve";
    this._body = {
      object_ids: [],
    };
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
  make() {
    return {
      self: this,
      object_ids: function (id) {
        this.self.object_ids = id;
        return this;
      },
    };
  }
  fait() {
    return this.make();
  }
  beam(id) {
    this.object_ids = id;
    return this;
  }

  retrieve(id) {
    this.object_ids = id;
    return this;
  }

  extraire(id) {
    this.object_ids = id;
    return this;
  }
}

module.exports = Catalog_Retrieve;
