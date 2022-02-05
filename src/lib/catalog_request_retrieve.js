const Catalog_Request = require("./catalog_request_abstract");
const { shazam_is_array } = require("./utilities");
const man =
  "Can fetch one or more catalog objects by sending the desired objects Square document ID. Add them one at a time or add an array of ids.\n" +
  "There are several aliases you can use, all do the same thing, but have different names:" +
  "myVar.get(id) or myVar.retrieve(id)\n" +
  "make().object_ids(id) or make().object(id)\n" +
  "add an array of object ids using make().concat_objects(array).\n" +
  "You can mix and match any of these methods\n" +
  "https://developer.squareup.com/reference/square/catalog-api/batch-retrieve-catalog-objects";

/** @class Catalog_Retrieve
 * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
 * {@link https://developer.squareup.com/reference/square/catalog-api/batch-retrieve-catalog-objects | Square Docs}
 * @example
 * */

class Catalog_Retrieve extends Catalog_Request {
  _display_name = "Catalog_Retrieve";
  _last_verified_square_api_version = "2021-07-21";
  _help = this.display_name + ": " + man;
  constructor() {
    super();
    this._method = "POST";
    this._endpoint = "/batch-retrieve";
    this._body = {
      object_ids: [],
    };
  }
  // GETTERS
  get object_ids() {
    return this._body.object_ids;
  }
  get body() {
    return this._body;
  }
  // SETTERS
  set object_ids(id) {
    this._body.object_ids.push(id);
  }

  set object_array_concat(arr) {
    let caller = "object_array_concat";
    let name = this._display_name;
    // check that arr is an array [NI - no limit specified] and that the existing array does not exceed allowable length
    if (shazam_is_array(arr, name, caller)) {
      let joined_array = this._body.object_ids.concat(arr);
      // If we ever find a limit, check it here. See Order_Search for example.
      this._body.object_ids = joined_array;
    }
  }

  //METHODS

  retrieve(id) {
    this.object_ids = id;
    return this;
  }

  get(id) {
    return this.retrieve(id);
  }

  /** @function make()  method of Catalog_Retrieve - method names are exactly the same as the property names listed
   * in the Square docs. There may be additional methods and/or shortened aliases of other methods.
   * @method object_ids
   * @param {string} id -
   * @method retrieve
   * @param {string} id -
   * @method concat_object_ids - adds the contents of an array of ids to object_ids array.
   * @param {array} arr -
   * @method object
   * @param {string} id -
   * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
   * @example
   *  You must use parentheses with every call to make and with every sub-method. If you have to make a lot
   *  of calls from different lines, it will reduce your tying and improve readability to set make() to a
   *  variable.
   *  let make = myVar.make();
   *   make.gizmo()
   *   make.gremlin()
   *
   * */
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
      concat_object_ids: function (arr) {
        this.self.object_array_concat = arr;
        return this;
      },
      object: function (id) {
        return this.object_ids(id);
      },
    };
  }
}

module.exports = Catalog_Retrieve;
