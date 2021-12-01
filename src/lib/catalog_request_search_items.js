const Catalog_Request = require("./catalog_request");
const { arrayify, generate_error_message } = require("./utilities");

// TODO lookup custom_attribute_filters obj
// https://developer.squareup.com/reference/square/objects/CustomAttributeFilter

class Catalog_Search_Items extends Catalog_Request {
  _display_name = "Catalog_Search_Items";
  _last_verified_square_api_version = "2021-07-21";
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
    this._attribute_filter = {};
  }
  // GETTERS
  get display_name() {
    return this._display_name;
  }
  get square_version() {
    return `The last verified compatible Square API version is ${this._last_verified_square_api_version}`;
  }
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
  get attribute_filter() {
    return this._attribute_filter;
  }

  // SETTERS
  set sort_order(sort) {
    if (sort !== "ASC" && sort !== "DESC") {
      throw new Error('sort_order only accepts "ASC" or "DESC"');
    }
    this._body.sort_order = sort;
  }
  set text_filter(str) {
    this._body.text_filter = str;
  }
  // todo change to regexp so user can type in partial case insenstive
  set product_types(type) {
    if (type !== "REGULAR" && type !== "APPOINTMENTS_SERVICE") {
      throw new Error(
        'product_types only accepts "APPOINTMENTS_SERVICE" or "REGULAR"'
      );
    }
    if (arrayify(this._body, "product_types")) {
      this._body.product_types = type;
    }
  }
  set stock_levels(level) {
    if (level !== "OUT" && level !== "LOW") {
      throw new Error('stock_levels only accepts "OUT" and "LOW"');
    }
    if (arrayify(this._body, "stock_levels")) {
      // prevent more than two
      if (this._body.stock_levels.length >= 2) {
        throw new Error("stock_levels can contain a maximum of 2 entries.");
      }
      // disallow duplicates
      if (
        this._body.stock_levels.length === 1 &&
        this.stock_levels[0] === level
      ) {
        throw new Error(`stock levels already contain ${level}`);
      }
      this._body.stock_levels.push(level);
    }
  }

  set category_ids(id) {
    if (arrayify(this._body, "category_ids")) {
      this._body.category_ids.push(id);
    }
  }

  set enabled_location_ids(id) {
    if (arrayify(this._body, "enabled_location_ids")) {
      this._body.enabled_location_ids.push(id);
    }
  }
  set custom_attribute_filters(obj) {
    if (arrayify(this._body, "custom_attribute_filters")) {
      if (this._body.custom_attribute_filters.length >= 10) {
        throw new Error(
          "custom_attribute_filters can contain a maximum of 10 filters."
        );
      }
      this._body.custom_attribute_filters.push(obj);
    }
  }
  set attribute_filter(obj) {
    this._attribute_filter = obj;
  }

  // PRIVATE METHODS

  #init_filter() {
    this.attribute_filter = {
      custom_attribute_definition_id: undefined,
      key: undefined,
      string_filter: undefined,
      number_filter: undefined,
      selection_uids_filter: [],
      bool_filter: undefined,
    };
  }

  #enum_sort_order() {
    return {
      self: this,
      asc: function () {
        this.self.sort_order = "ASC";
        return this;
      },
      desc: function () {
        this.self.sort_order = "DESC";
        return this;
      },
      up: function () {
        return this.asc();
      },
      down: function () {
        return this.desc();
      },
    };
  }

  #enum_product_type() {
    return {
      self: this,
      regular: function () {
        this.self.product_types = "REGULAR";
        return this;
      },
      appointments_service: function () {
        this.self.product_types = "APPOINTMENTS_SERVICE";
        return this;
      },
      appt: function () {
        return this.appointments_service();
      },
    };
  }

  // stock_levels is an ARRAY. It can take multiple values.
  #enum_stock_levels() {
    return {
      self: this,
      low: function () {
        this.self.stock_levels = "LOW";
        return this;
      },
      out: function () {
        this.self.stock_levels = "OUT";
        return this;
      },
      any: function () {
        this.self.stock_levels = "LOW";
        this.self.stock_levels = "OUT";
        return this;
      },
    };
  }

  // MAKER METHODS
  make() {
    return {
      self: this,
      sort_order: function () {
        return this.self.#enum_sort_order();
      },
      stock_levels: function () {
        return this.self.#enum_stock_levels();
      },
      text_filter: function (str) {
        this.self.text_filter = str;
        return this;
      },
      product_types: function () {
        return this.self.#enum_product_type();
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
      sort: function () {
        return this.sort_order();
      },
      product() {
        return this.product_types();
      },
      stock() {
        return this.stock_levels();
      },
      text(str) {
        return this.text_filter(str);
      },
      custom(obj) {
        return this.custom_attribute_filters(obj);
      },
      category(id) {
        return this.category_ids(id);
      },
      location(id) {
        return this.enabled_location_ids(id);
      },
    };
  }

  make_custom_attribute_filter() {
    this.#init_filter();
    let filter = this._attribute_filter;
    return {
      self: this,
      custom_attribute_definition_id: function (id) {
        filter.custom_attribute_definition_id = id;
        return this;
      },
      key: function (str) {
        filter.key = str;
        return this;
      },
      string_filter: function (str) {
        filter.string_filter = str;
        return this;
      },
      number_filter: function (num1, num2 = 0) {
        // set min and max, if they are same, set them to same
        let min = num1 >= num2 ? num2 : num1;
        let max = num1 <= num2 ? num2 : num1;
        filter.number_filter = { min, max };
        return this;
      },
      selection_uids_filter: function (str) {
        filter.selection_uids_filter.push(str);
        return this;
      },
      bool_filter: function (bool) {
        if (typeof bool !== "boolean") {
          throw new Error(
            generate_error_message(
              "custom attribute filter bool_filter",
              "boolean",
              bool
            )
          );
        }
        filter.bool_filter = bool;
        return this;
      },
    };
  }
}

module.exports = Catalog_Search_Items;
