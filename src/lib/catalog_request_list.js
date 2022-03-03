const Catalog_Request = require("./catalog_request_abstract");
const {
  query_param_is_present,
  query_param_is_query_string,
  query_param_add_value,
  query_param_replace_value,
  shazam_is_integer,
} = require("./utilities");

const man =
  "fetches a list of all Catalog API documents in your db. You can filter that list by type." +
  "Add the types one at a time using  make().type().type_you_want_to_add(). Or even easier -  \n" +
  " make().type_you_want_to_add()\n" +
  "i.e. make().tax().category()" +
  "https://developer.squareup.com/reference/square/catalog-api/list-catalog";

/**
 * {@link  https://developer.squareup.com/reference/square/catalog-api/list-catalog |  **-------> Link To Square Docs <-------**}
 * @class Catalog_List
 * @extends Square_Request
 * @classdesc
 * Fetches a list of all Catalog API documents in your db. You can filter that list by type.<br>
 * This class is unusual in that it has both a standard enumerated type() function as well as
 * individual types-as-methods on make().
 * @example
 *  myvar.make().type().type_you_want_to_add()
 *  //would be the same as (for Catalog_List class only)
 *  myvar.make().type_you_want_to_add()
 * */

class Catalog_List extends Catalog_Request {
  _display_name = "Catalog_List";
  _last_verified_square_api_version = "2021-11-17";
  _help = this.display_name + ": " + man;
  constructor() {
    super();
    this._method = "GET";
    this._endpoint = "/list";
    this._delivery;
  }
  get delivery() {
    return this._delivery;
  }
  // SETTERS

  set #endpoint(str) {
    this._endpoint = str;
  }
  set delivery(parcel) {
    if (Object.prototype.hasOwnProperty.call(parcel, "objects")) {
      this._delivery = parcel.objects;
      if (Object.prototype.hasOwnProperty.call(parcel, "cursor")) {
        this.cursor = parcel.cursor;
      }
    } else {
      this._delivery = parcel;
    }
  }
  /** Use this setter if you want to retrieve historical copies.<br>
   * This is a setter so you use myVar.setter = 'somevalue'
   * @typedef Catalog_List.catalog_version
   * @function
   * @param {number} version - the object version you want to retrieve.
   * @throws {TypeError} Throw and error if you give it a non-integer or a string that cannot be coerced to an integer.
   * @example
   * myList.catalog_version = 5
   *
   * */
  set catalog_version(version) {
    if (shazam_is_integer(version, this.display_name, "catalog_version")) {
      // this.#query_param_builder("catalog_version", version);
      this.#query_param_replace("catalog_version", version);
    }
  }

  set types(value) {
    this.#query_param_insert("types", value);
  }

  set cursor(value) {
    this.#query_param_replace("cursor", value);
  }
  // PRIVATE METHODS
  #init_query_param_sequence(param, value) {
    let modified_endpoint = this.endpoint;
    // check if endpoint is already formatted as a query string.
    if (!query_param_is_query_string(modified_endpoint)) {
      // if not then append ?param=value and return false
      modified_endpoint += "?" + param + "=" + value;
      this.#endpoint = modified_endpoint;
      return false;
    } else {
      // if it is modified - check for presence of param
      if (!query_param_is_present(modified_endpoint, param)) {
        // if param is not present- append &param=value and return false
        modified_endpoint += "&" + param + "=" + value;
        this.#endpoint = modified_endpoint;
        return false;
      } else {
        // if param is present return true.
        return true;
      }
    }
  }
  #query_param_insert(param, value) {
    if (this.#init_query_param_sequence(param, value)) {
      this.#endpoint = query_param_add_value(this.endpoint, param, value);
    }
  }
  #query_param_replace(param, value) {
    if (this.#init_query_param_sequence(param, value)) {
      this.#endpoint = query_param_replace_value(this.endpoint, param, value);
    }
  }

  /** * {@link https://developer.squareup.com/reference/square/catalog-api/list-catalog | Link To Square Docs}<br>
   *
   *  #enum_types<br>
   *  Enumerated methods set specific values from a limited set of allowable values defined by Square.
   *  For each value, a sub-method will exist that is the lowercase version of that value. There may also
   *  exist abbreviated aliases.
   *
   *  Enumerated methods are usually called by other functions and set the value on the object on which
   *  the calling function operates.
   *  @typedef {function} Catalog_List.enum_types
   *  @enum
   * @private
   * @abstract
   * @memberOf Catalog_List
   * @property item() sets query parameter to "ITEM"
   * @property item_variation() sets query parameter to "ITEM_VARIATION"
   * @property category() sets query parameter to "CATEGORY"
   * @property discount() sets query parameter to "DISCOUNT"
   * @property tax() sets query parameter to "TAX"
   * @property modifier() sets query parameter to "MODIFIER"
   * @property modifier_list() sets query parameter to "MODIFIER_LIST"
   * @property image() sets query parameter to "IMAGE"
   * @example
   *  If you were allowed to choose from the set ["GOOD", "BAD", "UGLY"] in order to set the
   *  value of `clint` on the object 'western'
   *
   *  vyMar.make_western().clint.().good() => const spaghetti = {western : {clint: "GOOD"}}
   * */

  #enum_types() {
    return {
      self: this,
      item: function () {
        this.self.types = "ITEM";
        return this;
      },
      item_variation: function () {
        this.self.types = "ITEM_VARIATION";
        return this;
      },
      category: function () {
        this.self.types = "CATEGORY";
        return this;
      },
      discount: function () {
        this.self.types = "DISCOUNT";
        return this;
      },
      tax: function () {
        this.self.types = "TAX";
        return this;
      },
      modifier: function () {
        this.self.types = "MODIFIER";
        return this;
      },
      modifier_list: function () {
        this.self.types = "MODIFIER_LIST";
        return this;
      },
      image: function () {
        this.self.types = "IMAGE";
        return this;
      },
    };
  }
  // MAKE METHODS

  /**
   *  make() method of Catalog_List
   *
   * Sub-Method names are exactly the same as the property names listed
   * in the Square docs. There may be additional methods and/or shortened aliases of other methods.
   *
   * You should read the generated docs as:
   *     method_name(arg) {type} Which query parameter is set
   *
   * @typedef {function} Catalog_List.make
   * @method
   * @public
   * @memberOf Catalog_List
   * @property catalog_version(ver) {integer} - adds the catalog version to the query parameters
   * @property types() {Enumerated} - calls {@link Catalog_List.enum_types|`#enum_types()`} - Duplicated by methods below.
   * @property item() sets query parameter to "ITEM"
   * @property item_variation() sets query parameter to "ITEM_VARIATION"
   * @property category() sets query parameter to "CATEGORY"
   * @property discount() sets query parameter to "DISCOUNT"
   * @property tax() sets query parameter to "TAX"
   * @property modifier() sets query parameter to "MODIFIER"
   * @property modifier_list() sets query parameter to "MODIFIER_LIST"
   * @property image() sets query parameter to "IMAGE"
   * @example
   *  myvar.make().type().item()
   *  //would be the same as (for Catalog_List class only)
   *  myvar.make().item()
   * */

  // this violates DRY - BUT it makes this class A LOT easier and more intuitive to use
  // while maintaining compliance with Pie standard syntax

  make() {
    return {
      self: this,
      catalog_version: function (version) {
        this.self.catalog_version = version;
        return this;
      },
      version: function (version) {
        return this.catalog_version(version);
      },
      types: function () {
        return this.self.#enum_types();
      },
      item: function () {
        this.self.types = "ITEM";
        return this;
      },
      item_variation: function () {
        this.self.types = "ITEM_VARIATION";
        return this;
      },
      category: function () {
        this.self.types = "CATEGORY";
        return this;
      },
      discount: function () {
        this.self.types = "DISCOUNT";
        return this;
      },
      tax: function () {
        this.self.types = "TAX";
        return this;
      },
      modifier: function () {
        this.self.types = "MODIFIER";
        return this;
      },
      modifier_list: function () {
        this.self.types = "MODIFIER_LIST";
        return this;
      },
      image: function () {
        this.self.types = "IMAGE";
        return this;
      },
    };
  }
}

module.exports = Catalog_List;
