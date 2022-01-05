const Catalog_Request = require("./catalog_request_abstract");
const { query_string_endpoint, shazam_integer } = require("./utilities");
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
  constructor() {
    super();
    this._method = "get";
    this._endpoint = "/list";
    this._query_params = {
      catalog_version: undefined,
      types: undefined,
    };
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
    let has_catalog_ver = !!this.query_params.catalog_version;
    let has_types = !!this.query_params.types;
    // if both are false return the default endpoint
    if (!has_catalog_ver && !has_types) {
      return this._endpoint;
    }
    // query params exist so build a new endpoint
    let endpoint = this._endpoint + "?";
    // it has types or both
    if (has_types) {
      endpoint += "types=" + this.types;
      if (has_catalog_ver) {
        endpoint += "&catalog_version=" + this.catalog_version;
      }
      return endpoint;
    }
    // it has just catalog version
    if (has_catalog_ver && !has_types) {
      endpoint += "catalog_version=" + this.catalog_version;
    }
    return endpoint;
  }

  get query_params() {
    return this._query_params;
  }
  get catalog_version() {
    return this._query_params.catalog_version;
  }
  get delivery() {
    return this._delivery;
  }
  get types() {
    return this._query_params.types;
  }

  // SETTERS
  set delivery(parcel) {
    this._delivery = parcel.objects;
  }
  /** use if you want to retrieve historical copies.
   * @param {number} version - the object version you want to retrieve.
   * @throws {TypeError} Throw and error if you give it a non-integer or a string that cannot be coerced to an integer.
   * */
  set catalog_version(version) {
    if (shazam_integer(version, this.display_name, "catalog_version")) {
      this._query_params.catalog_version = version;
    }
  }
  set types(str) {
    let cache = this.types;
    this.query_params.types = query_string_endpoint(cache, str);
  }

  // PRIVATE METHODS
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
