const Catalog_Request = require("./catalog_request_abstract");
const man =
  "Can fetch one or more catalog objects by sending the desired objects Square document ID. Add them one at a time using make().object_ids() " +
  "or [not implemented]  make().id(). Or add an array of object ids using make()add_array(). You can mix and match any of these methods";

class Catalog_Retrieve extends Catalog_Request {
  _display_name = "Catalog_Retrieve";
  _last_verified_square_api_version = "2021-07-21";
  _help = this.display_name + ": " + man;
  // todo ability to add a whole array of ids in addition to one at a time using array.concat.
  //    add an "id" alias to make.object_ids
  //    update the man const - remove the un-implementation bracket
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
  get help() {
    return this._help;
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
