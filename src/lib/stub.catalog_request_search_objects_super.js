const Catalog_Request = require("./catalog_request");
// const { setter_chain_generator_config } = require("./utilities_curry");
// todo, this is getting bloated and ugly
// split it up into three classes:
// super: holds common elements that are presently in body
// combinable i.e
// list of ids

/*
 *  The query feature is INCOMPLETE
 *  It will probably need to be extracted out
 *  Catalog_Search_Objects.prototype.query = function...
 *
 * */

class Catalog_Search_Objects_Super extends Catalog_Request {
  constructor() {
    super();
    this._method = "post";
    this._endpoint = "/search";
    this._body = {
      cursor: undefined,
      include_related_objects: undefined, // boolean
      begin_time: undefined, // RFC 3339 format
      object_types: undefined,
      query: undefined,
    };
    this.configuration = {
      keys: ["object_types"],
      object_types: [
        "ITEM",
        "IMAGE",
        "CATEGORY",
        "ITEM_VARIATION",
        "TAX",
        "DISCOUNT",
        "MODIFIER_LIST",
        "MODIFIER",
        "PRICING_RULE",
        "PRODUCT_SET",
        "TIME_PERIOD",
        "MEASUREMENT_UNIT",
        "SUBSCRIPTION_PLAN",
        "ITEM_OPTION",
        "ITEM_OPTION_VAL",
        "CUSTOM_ATTRIBUTE_DEFINITION",
        "QUICK_AMOUNTS_SETTINGS",
      ],
    };
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

  set cursor(token) {
    this._body.cursor = token;
  }
  set include_related_objects(bool) {
    this._body.include_related_objects = bool;
  }
  set begin_time(time) {
    // RFC 3339 format
    this._body.begin_time = time;
  }
  set object_types(str) {
    let contains = (word) => word === str;
    if (!Array.isArray(this.object_types)) {
      this._body.object_types = [];
    }
    // check if the array already contains the string, if it does, return, if not add it
    if (this.object_types.some(contains)) {
      return;
    }
    this._body.object_types.push(str);
  }
} // END class

module.exports = Catalog_Search_Objects_Super;
