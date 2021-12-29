const Catalog_Request = require("./catalog_request_abstract");
const man =
  "deletes one or more Catalog API objects. Add the id of the objects you want to delete using " +
  'make().object_ids("id") or you can also skip make() and jut call .delete("id"), .nix("id"), ou en francais' +
  '.effacer("id"). You can also [NI] add an array of ids to delete by calling make().add_array(["id", ...]). ' +
  "You can mix and match methods.\n" +
  "https://developer.squareup.com/reference/square/catalog-api/batch-delete-catalog-objects";

class Catalog_Delete extends Catalog_Request {
  _display_name = "Catalog_Delete";
  _last_verified_square_api_version = "2021-07-21";
  _help = this.display_name + ": " + man;
  constructor() {
    super();
    this._method = "post";
    this._endpoint = "/batch-delete";
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
      throw new TypeError("Object IDs must valid IDs. Received a " + typeof id);
    }
    this._body.object_ids.push(id);
  }

  //MAKER METHODS

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
    return this.delete(id);
  }
  nix(id) {
    return this.delete(id);
  }

  disintegrate(id) {
    return this.delete(id);
  }
}

module.exports = Catalog_Delete;
