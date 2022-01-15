const Catalog_Request = require("./catalog_request_abstract");
const {
  query_param_is_present,
  query_param_add_value,
  query_param_replace_value,
  shazam_integer,
} = require("./utilities");
// https://developer.squareup.com/reference/square/catalog-api/list-catalog
const man =
  "fetches a list of all Catalog API documents in your db. You can filter that list by type." +
  "Add the types one at a time using  make().type().type_you_want_to_add(). Or even easier -  \n" +
  " make().type_you_want_to_add()\n" +
  "i.e. make().tax().category()" +
  "https://developer.squareup.com/reference/square/catalog-api/list-catalog";

class Catalog_List extends Catalog_Request {
  _display_name = "Catalog_List";
  _last_verified_square_api_version = "2021-11-17";
  _help = this.display_name + ": " + man;
  #_unmodified_endpoint;
  constructor() {
    super();
    this._method = "GET";
    this._endpoint = "/list";
    this.#_unmodified_endpoint = this._endpoint; // for comparison in query param init
    this._delivery;
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

  get endpoint() {
    return this._endpoint;
  }
  get unmodified_endpoint() {
    return this.#_unmodified_endpoint;
  }
  get delivery() {
    return this._delivery;
  }

  // SETTERS

  set #endpoint(str) {
    this._endpoint = str;
  }
  set delivery(parcel) {
    this._delivery = parcel.objects;
  }
  /** use if you want to retrieve historical copies.
   * @param {number} version - the object version you want to retrieve.
   * @throws {TypeError} Throw and error if you give it a non-integer or a string that cannot be coerced to an integer.
   * */
  set catalog_version(version) {
    if (shazam_integer(version, this.display_name, "catalog_version")) {
      // this.#query_param_builder("catalog_version", version);
      this.#query_param_replace("catalog_version", version);
    }
  }

  set types(value) {
    this.#query_param_insert("types", value);
  }

  // PRIVATE METHODS
  #init_query_param_sequence(param, value) {
    let modified_endpoint = this.endpoint;
    // check if endpoint is modified.
    if (modified_endpoint === this.unmodified_endpoint) {
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

  // these are actually case-insensitive - using uppercase for consisency
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
  // MAKER METHODS
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
