const Catalog_Request = require("./catalog_request");

// todo change out contents of delete aliases to just return delete()

// todo simplify makers

// I don't see a reason to write TWO ways of deleting just because Square did
// if their batch delete will accept an array with a single element then that's
// what I should adhere to. Especially because the return json comes back in
// exactly the same format

class Catalog_Delete extends Catalog_Request {
  constructor() {
    super();
    this._method = "post";
    this._endpoint = "/batch-delete";
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

  delete(id) {
    this.object_ids = id;
    return this;
  }
  effacer(id) {
    this.object_ids = id;
    return this;
  }
  nix(id) {
    this.object_ids = id;
    return this;
  }

  disintegrate(id) {
    this.object_ids = id;
    return this;
  }
}

module.exports = Catalog_Delete;
