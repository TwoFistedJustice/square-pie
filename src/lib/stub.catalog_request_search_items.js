const Catalog_Request = require("./catalog_request");

class Catalog_Search_Items extends Catalog_Request {
  constructor() {
    super();
    this._method = "post";
    this._endpoint = "/search-catalog-items";
    this._body = {
      cursor: undefined,
      limit: 100,
      sort_order: undefined, //str "ASC" or "DESC" - steal
      text_filter: undefined, //str
      product_types: undefined, // ["REGULAR", "APPOINTMENTS_SERVICE"]
      stock_levels: undefined, // ["OUT", "LOW"]

      category_ids: undefined, // [ ids ]
      enabled_location_ids: undefined, // [ ids ]

      custom_attribute_filters: undefined, //[ {}, {}] max 10
    };
  }
  // GETTERS
  get sort_order() {
    return this._body.sort_order;
  }
  get text_filter() {
    return this._body.text_filter;
  }
  get product_types() {
    return this._body.product_types;
  }
  get stock_levels() {
    return this._body.stock_levels;
  }
  get category_ids() {
    return this._body.category_ids;
  }
  get enabled_location_ids() {
    return this._body.enabled_location_ids;
  }
  get custom_attribute_filters() {
    return this._body.custom_attribute_filters;
  }
  // SETTERS
  set sort_order(sort) {
    if (sort !== "ASC" || sort !== "DESC") {
      throw new Error('sort_order only accepts "ASC" or "DESC"');
    }
    this._body.sort_order = sort;
  }
  set text_filter(str) {
    this._body.text_filter = str;
  }
  // todo change to regexp so user can type in partial case insenstive
  set product_types(type) {
    if (type !== "REGULAR" || type !== "APPOINTMENTS_SERVICE") {
      throw new Error(
        'product_types only accepts "APPOINTMENTS_SERVICE" or "REGULAR"'
      );
    }
    if (!Array.isArray(this._body.product_types)) {
      this._body.product_types = [];
    }

    this._body.product_types = type;
  }
  set stock_levels(level) {
    if (level !== "OUT" || level !== "LOW") {
      throw new Error('stock_levels only accepts "OUT" and "LOW"');
    }
    if (!Array.isArray(this._body.stock_levels)) {
      this._body.stock_levels = [];
    }
    this._body.stock_levels.push(level);
  }
  set category_ids(id) {
    if (!Array.isArray(this._body.category_ids)) {
      this._body.category_ids = [];
    }
    this._body.category_ids.push(id);
  }
  set enabled_location_ids(id) {
    if (!Array.isArray(this._body.enabled_location_ids)) {
      this._body.enabled_location_ids = [];
    }
    this._body.enabled_location_ids.push(id);
  }
  set custom_attribute_filters(obj) {
    if (!Array.isArray(this._body.custom_attribute_filters)) {
      this._body.custom_attribute_filters = [];
    }
    if (this._body.custom_attribute_filters >= 10) {
      throw new Error(
        "custom_attribute_filters can contain a maximum of 10 filters."
      );
    }
    this._body.custom_attribute_filters.push(obj);
  }

  // METHODS

  sort() {
    /*curry*/
  }
  filter() {
    return this;
  }
  type() {
    /*curry regular or appt*/
    return this;
  }
  stock() {
    /*curry low or out */
    return this;
  }
  catetory() {
    /*push ids*/
    return this;
  }
  locations() {
    /*push ids*/
    return this;
  }
  // TODO this one is complex - do last
  custom() {
    /* ooooh boy */
    return this;
  }

  make() {
    const methods = () => {
      const properties = {
        self: this,
        sort_order: function (sort) {
          this.self.sort_order = sort;
          return this;
        },
        text_filter: function (str) {
          this.self.text_filter = str;
          return this;
        },
        product_types: function (type) {
          this.self.product_types = type;
          return this;
        },
        category_ids: function (id) {
          this.self.category_ids = id;
          return this;
        },
        enabled_location_ids: function (id) {
          this.self.enabled_location_ids = id;
          return this;
        },
        custom_attribute_filters: function (obj) {
          this.self.custom_attribute_filters = obj;
          return this;
        },
      };
      return properties;
    };
    return methods();
  }
}

module.exports = Catalog_Search_Items;
