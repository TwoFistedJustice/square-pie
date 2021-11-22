const Catalog_Request = require("./catalog_request");
const { arrayify } = require("./utilities");

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
    //todo disallow duplicates
    if (level !== "OUT" && level !== "LOW") {
      throw new Error('stock_levels only accepts "OUT" and "LOW"');
    }
    if (this._body.stock_levels >= 2) {
      throw new Error("stock_levels can contain a maximum of 2 entries.");
    }
    if (arrayify(this._body, "stock_levels")) {
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
  // arrayify is not appropriate here bc of the additional error checking
  // the length check MUST follow or it will crash on first use.
  set custom_attribute_filters(obj) {
    if (!Array.isArray(this._body.custom_attribute_filters)) {
      this._body.custom_attribute_filters = [];
    }
    if (this._body.custom_attribute_filters.length >= 10) {
      throw new Error(
        "custom_attribute_filters can contain a maximum of 10 filters."
      );
    }
    this._body.custom_attribute_filters.push(obj);
  }

  // PRIVATE METHODS

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
}

module.exports = Catalog_Search_Items;
