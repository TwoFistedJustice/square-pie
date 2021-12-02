const Catalog_Request = require("./catalog_request");
const { shazam_RFC3339 } = require("./utilities");
// https://developer.squareup.com/reference/square/catalog-api/search-catalog-objects

/*
 *  The query feature is INCOMPLETE
 *  It will probably need to be extracted out
 *  Catalog_Search_Objects.prototype.query = function...
 *
 * */

class Catalog_Search_Objects_Super extends Catalog_Request {
  _display_name = "Catalog_Search_Objects_Super";
  _last_verified_square_api_version = "2021-07-21";
  constructor() {
    super();
    this._method = "post";
    this._endpoint = "/search";
    this._body = {
      cursor: undefined,
      include_related_objects: undefined, // boolean
      begin_time: undefined, // RFC 3339 format
      object_types: undefined,
      query: {},
    };
  }
  get display_name() {
    return this._display_name;
  }
  get square_version() {
    return `The last verified compatible Square API version is ${this._last_verified_square_api_version}`;
  }
  get cursor() {
    return this._body.cursor;
  }
  get include_related_objects() {
    return this._body.include_related_objects;
  }
  get begin_time() {
    return this._body.begin_time;
  }
  get object_types() {
    return this._body.object_types;
  }

  get query() {
    return this._body.query;
  }

  set #reset(obj) {
    this._body.query = {};
  }

  set #removeQuery(any) {
    this._body.query = undefined;
  }

  set cursor(token) {
    this._body.cursor = token;
  }
  set include_related_objects(bool) {
    this._body.include_related_objects = bool;
  }
  set begin_time(time) {
    if (shazam_RFC3339(time, this.display_name, "begin_time")) {
      this._body.begin_time = time;
    }
  }
  set object_types(type) {
    let callback = (word) => word === type;
    if (!Array.isArray(this.object_types)) {
      this._body.object_types = [];
    }

    if (this.object_types.some(callback)) {
      throw new Error(`object_types array already contains ${type}`);
    }
    this._body.object_types.push(type);
  }
  queryReset() {
    this.#reset = {};
  }
  queryRemove() {
    this.#removeQuery = true;
  }

  // NOT PRIVATE METHODS = because you can't reference private functions from subclasses

  enum_object_types() {
    return {
      self: this,
      item: function () {
        this.self.object_types = "ITEM";
        return this;
      },
      item_variation: function () {
        this.self.object_types = "ITEM_VARIATION";
        return this;
      },
      item_option: function () {
        this.self.object_types = "ITEM_OPTION";
        return this;
      },
      item_option_val: function () {
        this.self.object_types = "ITEM_OPTION_VAL";
        return this;
      },
      image: function () {
        this.self.object_types = "IMAGE";
        return this;
      },
      category: function () {
        this.self.object_types = "CATEGORY";
        return this;
      },
      tax: function () {
        this.self.object_types = "TAX";
        return this;
      },
      discount: function () {
        this.self.object_types = "DISCOUNT";
        return this;
      },
      modifier: function () {
        this.self.object_types = "MODIFIER";
        return this;
      },
      modifier_list: function () {
        this.self.object_types = "MODIFIER_LIST";
        return this;
      },
      pricing_rule: function () {
        this.self.object_types = "PRICING_RULE";
        return this;
      },
      product_set: function () {
        this.self.object_types = "PRODUCT_SET";
        return this;
      },
      time_period: function () {
        this.self.object_types = "TIME_PERIOD";
        return this;
      },
      measurement_unit: function () {
        this.self.object_types = "MEASUREMENT_UNIT";
        return this;
      },
      subscription_plan: function () {
        this.self.object_types = "SUBSCRIPTION_PLAN";
        return this;
      },
      custom_attribute_definition: function () {
        this.self.object_types = "CUSTOM_ATTRIBUTE_DEFINITION";
        return this;
      },
      quick_amounts_setting: function () {
        this.self.object_types = "QUICK_AMOUNTS_SETTINGS";
        return this;
      },
    };
  }
} // END class

module.exports = Catalog_Search_Objects_Super;
