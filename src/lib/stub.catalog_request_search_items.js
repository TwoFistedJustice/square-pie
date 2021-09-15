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
  set product_types(type) {
    // todo change to regexp so user can type in partial case insenstive
    if (type !== "REGULAR" || type !== "APPOINTMENTS_SERVICE") {
      throw new Error(
        'product_types only accepts "APPOINTMENTS_SERVICE" or "REGULAR"'
      );
    }
    this._body.product_types = type;
  }
  set stock_levels(level) {
    if (level !== "OUT" || level !== "LOW") {
      throw new Error('stock_levels only accepts "OUT" and "LOW"');
    }
    this._body.stock_levels.push(level);
  }
  set category_ids(id) {
    this._body.category_ids.push(id);
  }
  set enabled_location_ids(id) {
    this._body.enabled_location_ids.push(id);
  }
  set custom_attribute_filters(obj) {
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
          this.sort_order = sort;
          return this;
        },
        text_filter: function (str) {
          this.text_filter = str;
          return this;
        },
        product_types: function (type) {
          this.product_types = type;
          return this;
        },
        category_ids: function (id) {
          this.category_ids = id;
          return this;
        },
        enabled_location_ids: function (id) {
          this.enabled_location_ids = id;
          return this;
        },
        custom_attribute_filters: function (obj) {
          this.custom_attribute_filters = obj;
          return this;
        },
      };
      return properties;
    };
    return methods();
  }
}

module.exports = Catalog_Search_Items;
