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
  set sort_order(val) {
    this._body.sort_order = val;
  }
  set text_filter(val) {
    this._body.text_filter = val;
  }
  set product_types(val) {
    this._body.product_types = val;
  }
  set stock_levels(val) {
    this._body.stock_levels = val;
  }
  set category_ids(val) {
    this._body.category_ids = val;
  }
  set enabled_location_ids(val) {
    this._body.enabled_location_ids = val;
  }
  set custom_attribute_filters(val) {
    this._body.custom_attribute_filters = val;
  }

  // METHODS

  sort() {
    /*curry*/
  }
  filter() {}
  type() {
    /*curry regular or appt*/
  }
  stock() {
    /*curry low or out */
  }
  catetory() {
    /*push ids*/
  }
  locations() {
    /*push ids*/
  }
  custom() {
    /* ooooh boy */
  }

  make() {
    const methods = () => {
      const properties = {
        self: this,
        // todo grab like properties off the filter class
        sort_order: function () {},
        text_filter: function () {},
        product_types: function () {},
        category_ids: function () {},
        enabled_location_ids: function () {},
        custom_attribute_filters: function () {},
      };
      return properties;
    };
    return methods();
  }
}

module.exports = Catalog_Search_Items;
