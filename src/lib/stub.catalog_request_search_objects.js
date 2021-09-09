const Catalog_Request = require("./catalog_request");
const { setter_chain_generator_config } = require("./utilities_curry");

/*
 *  The query feature is INCOMPLETE
 *  It will probably need to be extracted out
 *  Catalog_Search_Objects.prototype.query = function...
 *
 * */

class Catalog_Search_Objects extends Catalog_Request {
  constructor() {
    super();
    this._method = "post";
    this._endpoint = "/search";
    this._body = {
      cursor: undefined,
      include_related_objects: undefined, // boolean
      begin_time: undefined, // RFC 3339 format
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

  get include_related_objects() {
    return this._body.include_related_objects;
  }
  get begin_time() {
    return this._body.begin_time;
  }

  set include_related_objects(bool) {
    this._body.include_related_objects = bool;
  }
  set begin_time(time) {
    // RFC 3339 format
    this._body.begin_time = time;
  }
  // METHODS
  make() {
    const methods = () => {
      const properties = {
        self: this,
        include_related_objects: function (bool) {
          this.self.include_related_objects = bool;
          return this;
        },
        begin_time: function (time) {
          this.self.begin_time = time;
          return this;
        },
      };
      setter_chain_generator_config(this.configuration, properties, this);
      return properties;
    };
    return methods();
  }
}

module.exports = Catalog_Search_Objects;
