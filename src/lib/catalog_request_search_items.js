const Catalog_Request = require("./catalog_request_abstract");
const {
  arrayify,
  generate_error_message,
  shazam_is_array,
} = require("./utilities");
const man =
  "Can only search for Item and Item Variation type objects. To find another type use one of the\n" +
  "other Catalog Search classes.\n" +
  "Searches by category_id, enabled_location_id and lets you build custom attribute filters. \n" +
  'For adding ids follow standard Pie syntax (make().name_of_id( "someId"). To build custom filters use the \n' +
  "make_custom_attribute_filter() function, which works just like make(), but is an entirely separate function.\n" +
  "Follow standard Pie syntax and reference the Square docs for names of properties and allowable values.\n" +
  "https://developer.squareup.com/reference/square/catalog-api/search-catalog-items";

/**
 * {@link https://developer.squareup.com/reference/square/catalog-api/search-catalog-items |  **-------> Link To Square Docs <-------**}
 * @class Catalog_Search_Items
 * @extends Square_Request
 * @classdesc
 * Search only for Item and Item Variation type objects. To find another type use one of the other Catalog Search classes.<br>
 * Searches by category_id, enabled_location_id and lets you build custom attribute filters.<br>
 * For adding ids follow standard Pie syntax (make().name_of_id( "someId"). To build custom filters use the
 * `make_custom_attribute_filter()` function, which works just like `make()`, but is an entirely separate function.<br>
 * Follow standard Pie syntax and reference the Square docs for names of properties and allowable values.
 * */

class Catalog_Search_Items extends Catalog_Request {
  _display_name = "Catalog_Search_Items";
  _last_verified_square_api_version = "2021-07-21";
  _help = this.display_name + ": " + man;
  constructor() {
    super();
    this._method = "post";
    this._endpoint = "/search-catalog-items";
    this._body = {
      cursor: undefined,
      limit: 100,
      sort_order: undefined, //str "ASC" or "DESC"
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
  set product_types(type) {
    if (type !== "REGULAR" && type !== "APPOINTMENTS_SERVICE") {
      throw new Error(
        'product_types only accepts "APPOINTMENTS_SERVICE" or "REGULAR"'
      );
    }
    arrayify(this._body, "product_types", this._display_name);
    this._body.product_types = type;
  }
  set stock_levels(level) {
    if (level !== "OUT" && level !== "LOW") {
      throw new Error('stock_levels only accepts "OUT" and "LOW"');
    }
    arrayify(this._body, "stock_levels", this._display_name);
    // prevent more than two - no point since duplicates are prevented and there are only two options
    // disallow duplicates
    if (
      this._body.stock_levels.length === 1 &&
      this.stock_levels[0] === level
    ) {
      throw new Error(`stock levels already contain ${level}`);
    }
    this._body.stock_levels.push(level);
  }

  set category_ids(id) {
    arrayify(this._body, "category_ids", this._display_name);
    this._body.category_ids.push(id);
  }
  set enabled_location_ids(id) {
    arrayify(this._body, "enabled_location_ids", this._display_name);
    this._body.enabled_location_ids.push(id);
  }
  set custom_attribute_filters(obj) {
    arrayify(this._body, "custom_attribute_filters", this._display_name);
    if (this._body.custom_attribute_filters.length >= 10) {
      throw new Error(
        "custom_attribute_filters can contain a maximum of 10 filters."
      );
    }
    this._body.custom_attribute_filters.push(obj);
  }
  set attribute_filter(obj) {
    this._attribute_filter = obj;
  }
  set category_array_concat(arr) {
    let caller = "category_array_concat";
    let name = this._display_name;
    arrayify(this._body, "category_ids", name, caller);
    // check that arr is an array [NI - no limit specified] and that the existing array does not exceed allowable length
    if (shazam_is_array(arr, name, caller)) {
      let joined_array = this._body.category_ids.concat(arr);
      // If we ever find a limit, check it here. See Order_Search for example.
      this._body.category_ids = joined_array;
    }
  }
  set enabled_location_array_concat(arr) {
    let name = this._display_name;
    let caller = "enabled_location_array_concat";
    arrayify(this._body, "enabled_location_ids", name, caller);

    // check that arr is an array [NI - no limit specified] and that the existing array does not exceed allowable length
    if (shazam_is_array(arr, name, caller)) {
      let joined_array = this._body.enabled_location_ids.concat(arr);
      // If we ever find a limit, check it here. See Order_Search for example.
      this._body.enabled_location_ids = joined_array;
    }
  }
  set custom_attribute_filter_array_concat(arr) {
    let caller = "custom_attribute_filter_array_concat";
    let name = this._display_name;
    arrayify(this._body, "custom_attribute_filters", name, caller);
    // check that arr is an array [NI - no limit specified] and that the existing array does not exceed allowable length
    if (shazam_is_array(arr, name, caller)) {
      let joined_array = this._body.custom_attribute_filters.concat(arr);
      // If we ever find a limit, check it here. See Order_Search for example.
      this._body.custom_attribute_filters = joined_array;
    }
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

  /** * {@link https://developer.squareup.com/reference/square/enums/SortOrder | Link To Square Docs}<br>
   *
   *  #enum_sort_order
   *  Enumerated methods set specific values from a limited set of allowable values defined by Square.
   *  For each value, a sub-method will exist that is the lowercase version of that value. There may also
   *  exist abbreviated aliases.
   *
   *  Enumerated methods are usually called by other functions and set the value on the object on which
   *  the calling function operates.
   *  @typedef {function} Catalog_Search_Items.enum_sort_order
   * @private
   * @abstract
   * @memberOf Catalog_Search_Items
   * @property asc() sets value to "ASC"
   * @property desc() sets value to "DESC"
   * @property up() alias of `asc`
   * @property down() alias of `desc`
   * @example
   *  If you were allowed to choose from the set ["GOOD", "BAD", "UGLY"] in order to set the
   *  value of `clint` on the object 'western'
   *
   *  vyMar.make_western().clint.().good() => const spaghetti = {western : {clint: "GOOD"}}
   * */

  #enum_sort_order(calling_this) {
    return {
      self: this,
      asc: function () {
        this.self.sort_order = "ASC";
        return calling_this;
      },
      desc: function () {
        this.self.sort_order = "DESC";
        return calling_this;
      },
      up: function () {
        return this.asc();
      },
      down: function () {
        return this.desc();
      },
    };
  }

  /** * {@link https://developer.squareup.com/reference/square/enums/CatalogItemProductType | Link To Square Docs}
   *
   *  #enum_product_type
   *  Enumerated methods set specific values from a limited set of allowable values defined by Square.
   *  For each value, a sub-method will exist that is the lowercase version of that value. There may also
   *  exist abbreviated aliases.
   *
   *  Enumerated methods are usually called by other functions and set the value on the object on which
   *  the calling function operates.
   *  @typedef {function} Catalog_Search_Items.enum_product_type
   * @private
   * @abstract
   * @memberOf Catalog_Search_Items
   * @property regular() sets value to "REGULAR"
   * @property appointments_service() sets value to "APPOINTMENTS_SERVICE"
   * @property appt() alias of `appointments_service`
   * @example
   *  If you were allowed to choose from the set ["GOOD", "BAD", "UGLY"] in order to set the
   *  value of `clint` on the object 'western'
   *
   *  vyMar.make_western().clint.().good() => const spaghetti = {western : {clint: "GOOD"}}
   * */

  #enum_product_type(calling_this) {
    return {
      self: this,
      regular: function () {
        this.self.product_types = "REGULAR";
        return calling_this;
      },
      appointments_service: function () {
        this.self.product_types = "APPOINTMENTS_SERVICE";
        return calling_this;
      },
      appt: function () {
        return this.appointments_service();
      },
    };
  }

  /** * {@link https://developer.squareup.com/reference/square/enums/SearchCatalogItemsRequestStockLevel | Link To Square Docs}
   *
   *  #enum_stock_levels
   *  stock_levels is an ARRAY. It can take multiple values.
   *
   *  Enumerated methods set specific values from a limited set of allowable values defined by Square.
   *  For each value, a sub-method will exist that is the lowercase version of that value. There may also
   *  exist abbreviated aliases.
   *
   *  Enumerated methods are usually called by other functions and set the value on the object on which
   *  the calling function operates.
   *  @typedef {function} Catalog_Search_Items.enum_stock_levels
   * @private
   * @abstract
   * @memberOf Catalog_Search_Items
   * @property low() adds value to array:  "LOW"
   * @property out() adds value to array:  "OUT"
   * @property any() adds both values to array:  "LOW", "OUT"
   * @example
   *  If you were allowed to choose from the set ["GOOD", "BAD", "UGLY"] in order to set the
   *  value of `clint` on the object 'western'
   *
   *  vyMar.make_western().clint.().good() => const spaghetti = {western : {clint: "GOOD"}}
   * */

  #enum_stock_levels(calling_this) {
    return {
      self: this,
      low: function () {
        this.self.stock_levels = "LOW";
        return calling_this;
      },
      out: function () {
        this.self.stock_levels = "OUT";
        return calling_this;
      },
      any: function () {
        this.self.stock_levels = "LOW";
        this.self.stock_levels = "OUT";
        return calling_this;
      },
    };
  }

  // MAKE METHODS
  /**
   *  make() method of Catalog_Search_Items
   *  Make sure to have the Square Docs open in front of you.
   * Sub-Method names are exactly the same as the property names listed
   * in the Square docs. There may be additional methods and/or shortened aliases of other methods.
   *
   * You should read the generated docs as:
   *     method_name(arg) {type} description of arg
   *
   * @typedef {function} Catalog_Search_Items.make
   * @method
   * @public
   * @memberOf Catalog_Search_Items
   * @property sort_order() {Enumerated} - calls `#enum_sort_order`
   * @property stock_levels() {Enumerated} -- calls `#enum_stock_levels`
   * @property text_filter(id) {string} -
   * @property product_types() {Enumerated} -- calls `#enum_product_type`
   * @property category_ids(id) {string} -
   * @property enabled_location_ids(id) {string} -
   * @property custom_attribute_filters(obj) {object} - Takes a **complete** custom attribute filter object.
   * @property (obj) {object}
   * @property sort() alias of `sort_order`
   * @property product() alias of `product_types`
   * @property stock() alias of `stock_levels`
   * @property text() alias of `text_filter`
   * @property custom() alias of `custom_attribute_filters`
   * @property category() alias of `category_ids`
   * @property location() alias of `enabled_location_ids`
   * @property concat_categories(arr) {array<id>} - adds the contents of an array of category ids
   * @property concat_enabled_locations(arr) {array<id>} - adds the contents of an array of location ids
   * @property concat_custom_attribute_filters(arr) {array<fardel>} - adds the contents of an array of custom attribute filter objects
   * @example
   *  You must use parentheses with every call to make and with every sub-method. If you have to make a lot
   *  of calls from different lines, it will reduce your tying and improve readability to set make() to a
   *  variable.
   *
   *  let make = myVar.make();
   *   make.gizmo()
   *   make.gremlin()
   *    //is the same as
   *   myVar.make().gizmo().gremlin()
   * */

  make() {
    return {
      self: this,
      sort_order: function () {
        return this.self.#enum_sort_order(this);
      },
      stock_levels: function () {
        return this.self.#enum_stock_levels(this);
      },
      text_filter: function (str) {
        this.self.text_filter = str;
        return this;
      },
      product_types: function () {
        return this.self.#enum_product_type(this);
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
      concat_categories: function (arr) {
        this.self.category_array_concat = arr;
        return this;
      },
      concat_enabled_locations: function (arr) {
        this.self.enabled_location_array_concat = arr;
        return this;
      },
      concat_custom_attribute_filters: function (arr) {
        this.self.custom_attribute_filter_array_concat = arr;
        return this;
      },
    };
  }

  /**
   * {@link https://developer.squareup.com/reference/square/objects/CustomAttributeFilter | Square Docs}<br>
   *  make_custom_attribute_filter() method of Catalog_Search_Items
   *  Make sure to have the Square Docs open in front of you.
   * Sub-Method names are exactly the same as the property names listed
   * in the Square docs. There may be additional methods and/or shortened aliases of other methods.
   *
   * You should read the generated docs as:
   *     method_name(arg) {type} description of arg
   *
   * @typedef {function} Catalog_Search_Items.make_custom_attribute_filter
   * @method
   * @public
   * @memberOf Catalog_Search_Items
   * @property custom_attribute_definition_id(id) {string} -
   * @property key(id) {string} -
   * @property string_filter(id) {string} -
   * @property number_filter(num1,num2) {number|number}
   * @property selection_uids_filter(id) {string} -
   * @property bool_filter(bool) {boolean}
   * @property add() - NOT IMPLEMENTED
   * @example
   *  You must use parentheses with every call to make and with every sub-method. If you have to make a lot
   *  of calls from different lines, it will reduce your tying and improve readability to set make() to a
   *  variable.
   *
   *  let make = myVar.make();
   *   make.gizmo()
   *   make.gremlin()
   *    //is the same as
   *   myVar.make().gizmo().gremlin()
   * */

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
