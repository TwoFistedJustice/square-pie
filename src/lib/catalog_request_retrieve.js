const Catalog_Request = require("./catalog_request");

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
    const methods = () => {
      const properties = {
        self: this,
        object_ids: function (id) {
          this.self.object_ids = id;
          return this;
        },
      };
      return properties;
    };
    return methods();
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
