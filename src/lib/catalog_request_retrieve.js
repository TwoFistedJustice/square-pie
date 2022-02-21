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

/**
 * {@link https://developer.squareup.com/reference/square/catalog-api/batch-retrieve-catalog-objects |  **-------> Link To Square Docs <-------**}
 * @class Catalog_Retrieve
 * @classdesc
 *Can fetch one or more catalog objects by sending the desired objects Square document ID. Add them one at a time or add an array of ids.<br>
 * There are several aliases that do the same thing, but have different names.
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
  /**
   * `retrieve` is a quick function (short syntax) to add a single id to your request.
   * @typedef {function} Catalog_Retrieve.retrieve
   * @memberOf Catalog_Retrieve
   * @public
   * @method
   * @param {string} id
   * @example
   * myVar.retrieve("some_id")
   * */
  retrieve(id) {
    this.object_ids = id;
    return this;
  }

  /**
   * `get` is an alias of `retrieve`.
   * @typedef {function} Catalog_Retrieve.get
   * @memberOf Catalog_Retrieve
   * @public
   * @method
   * @param {string} id
   * @example
   * myVar.get("some_id")
   * */

  get(id) {
    return this.retrieve(id);
  }

  /**
   *  make() method of Catalog_Retrieve
   * Make sure to have the Square Docs open in front of you.
   * Sub-Method names are exactly the same as the property names listed
   * in the Square docs. There may be additional methods and/or shortened aliases of other methods.
   *
   * You should read the generated docs as:
   *     method_name(arg) {type} description of arg
   *
   * @typedef {function} Catalog_Retrieve.make
   * @method
   * @public
   * @memberOf Catalog_Retrieve
   * @property object_ids(id) {string} -
   * @property object(id) {string} - alias of `object_ids`
   * @property retrieve(id) {string} -
   * @property concat_object_ids(arr) {array}
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
      concat: function (arr) {
        return this.concat_object_ids(arr);
      },
    };
  }
}

module.exports = Catalog_Retrieve;
