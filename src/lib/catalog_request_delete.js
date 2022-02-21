const Catalog_Request = require("./catalog_request_abstract");
const { arrayify, shazam_is_array } = require("./utilities");
const man =
  "deletes one or more Catalog API objects. Add the id of the objects you want to delete using " +
  'make().object_ids("id") or you can also skip make() and jut call .delete("id"), .nix("id"), ou en francais' +
  '.effacer("id"). You can also add an array of ids to delete by calling make().concat_object_ids(["id", ...]). ' +
  "You can mix and match methods.\n" +
  "\nhttps://developer.squareup.com/reference/square/catalog-api/batch-delete-catalog-objects";

/**
 * {@link https://developer.squareup.com/reference/square/catalog-api/batch-delete-catalog-objects | Link To Square Docs}
 * @class Catalog_Delete
 * @classdesc
 * Deletes one or more Catalog API objects.</br> Add the id of the objects you want to delete using make().object_ids("id") or
 * you can also skip make() and jut call .delete("id"), .nix("id"), ou en francais .effacer("id"). You can also add an array
 * of ids to delete by calling make().concat_object_ids(["id", ...]). You can mix and match methods.
 * */

class Catalog_Delete extends Catalog_Request {
  _display_name = "Catalog_Delete";
  _last_verified_square_api_version = "2021-07-21";
  _help = this.display_name + ": " + man;
  constructor() {
    super();
    this._method = "POST";
    this._endpoint = "/batch-delete";
    this._body = {
      object_ids: [],
    };
  }
  // GETTERS
  get object_ids() {
    return this._body.object_ids;
  }
  // SETTERS
  set object_ids(id) {
    this._body.object_ids.push(id);
  }
  set object_array_concat(arr) {
    let caller = "object_array_concat";
    let name = this._display_name;
    arrayify(this._body, "object_ids");
    // check that arr is an array [NI - no limit specified] and that the existing array does not exceed allowable length
    if (shazam_is_array(arr, name, caller)) {
      let joined_array = this._body.object_ids.concat(arr);
      // If we ever find a limit, check it here. See Order_Search for example.
      this._body.object_ids = joined_array;
    }
  }
  //MAKE METHODS

  /**
   *  make() method of Catalog_Delete
   *
   * Sub-Method names are exactly the same as the property names listed
   * in the Square docs. There may be additional methods and/or shortened aliases of other methods.
   *
   * You should read the generated docs as:
   *     method_name(arg) {type} description of arg
   *
   * @typedef {function} Catalog_Delete.make
   * @method
   * @public
   * @memberOf Catalog_Delete
   * @property object_ids(id) {string} - object ids of documents you wish to delete. Must add at least one.
   * @property id(id) {string} -alias of `object_ids`
   * @property concat_object_ids(arr) {array} - adds contents of an array of ids to the object_ids array
   * @property concat(arr) {array} - alias of `concat_object_ids`
   * @example
   *  You must use parentheses with every call to make and with every sub-method. If you have to make a lot
   *  of calls from different lines, it will reduce your tying and improve readability to set make() to a
   *  variable.
   *
   *  let make = myVar.make();
   *   make.gizmo()
   *   make.gremlin()
   *    //is the same as
   *   myVar.make().gizmo().gremlin()
   * */

  make() {
    return {
      self: this,
      object_ids: function (id) {
        this.self.object_ids = id;
        return this;
      },
      id: function (id) {
        return this.object_ids(id);
      },
      concat_object_ids: function (arr) {
        this.self.object_array_concat = arr;
        return this;
      },
      concat: function (arr) {
        return this.concat_object_ids(arr);
      },
    };
  }

  /**
   * @typedef {function} Catalog_Delete.delete
   * @member Catalog_Delete
   * @public
   * @method
   * @param {string} id
   * @describe
   * Adds an id to be deleted.
   * @example
   * myVar.delete(id)
   * */

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
