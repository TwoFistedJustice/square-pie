const Catalog_Search_Objects_Super = require("./catalog_request_abstract_search_objects_super");
const {
  clone_object,
  define,
  shazam_is_integer,
  shazam_max_length_array,
} = require("./utilities");
const {
  arche_sorting_enum,
  catalog_search_objects_enum,
} = require("./enum/index");
const man =
  "can search for any type of catalog objects\n" +
  "This is complicated. Read the Pie doc before you try to use it:\n" +
  "This is the class to use if you want to search by key:value pairs.\n" +
  "To cross reference by Square document ids use Catalog_Search_Cross_Reference" +
  "https://github.com/TwoFistedJustice/square-pie/blob/main/docs/pie_catalog_request_search.md\n" +
  "https://developer.squareup.com/reference/square/catalog-api/search-catalog-objects";

/**
 * {@link https://developer.squareup.com/reference/square/catalog-api/search-catalog-objects  |  **-------> Link To Square Docs <-------**}
 * @class Catalog_Search_Filter
 * @extends Square_Request
 * @classdesc
 * Can search for any type of catalog objects.<br>
 * This is complicated. Read the {@link https://github.com/TwoFistedJustice/square-pie/blob/main/docs/pie_catalog_request_search.md |  Pie Doc} before you try to use it.<br><br>
 * This is the class to use if you want to search by key:value pairs.<br><br>
 * To cross reference by Square document ids use Catalog_Search_Cross_Reference
 * */

class Catalog_Search_Filter extends Catalog_Search_Objects_Super {
  _display_name = "Catalog_Search_Filter";
  _last_verified_square_api_version = "2021-07-21";
  _help = this.display_name + ": " + man;
  constructor() {
    super();
    this.configuration = {
      maximums: {
        attribute_values: 250,
        text_query: 3,
      },
    };
  }
  // GETTERS
  get exact_query() {
    return this._body.query.exact_query;
  }
  get prefix_query() {
    return this._body.query.prefix_query;
  }
  get range_query() {
    return this._body.query.range_query;
  }
  get set_query() {
    return this._body.query.set_query;
  }

  get sorted_attribute_query() {
    return this._body.query.sorted_attribute_query;
  }
  get text_query() {
    return this._body.query.text_query;
  }
  // SETTERS
  set exact_query(obj) {
    if (
      !Object.prototype.hasOwnProperty.call(this._body.query, "exact_query")
    ) {
      define(this._body.query, "exact_query", undefined);
    }
    this._body.query.exact_query = obj;
  }

  set prefix_query(obj) {
    this.#init_prefix_query();
    this._body.query.prefix_query = obj;
  }

  set range_query(obj) {
    if (
      !Object.prototype.hasOwnProperty.call(this._body.query, "range_query")
    ) {
      define(this._body.query, "range_query", undefined);
    }

    this._body.query.range_query = obj;
  }

  set set_query(obj) {
    this.#init_set_query();
    this._body.query.set_query = obj;
  }

  set sorted_attribute_query(obj) {
    this.#init_sorted_attribute_query();
    this._body.query.sorted_attribute_query = obj;
  }

  set text_query(keyword) {
    let limit = this.configuration.maximums.text_query;
    this.#init_text_query();
    if (this._body.query.text_query.keywords.length >= limit) {
      let message = "text_query can hold a maximum of " + limit + " keywords.";
      throw new Error(message);
    }
    this._body.query.text_query.keywords.push(keyword);
  }

  // PRIVATE METHODS

  #init_set_query() {
    if (!Object.prototype.hasOwnProperty.call(this._body.query, "set_query")) {
      define(this._body.query, "set_query", {
        attribute_name: undefined,
        attribute_values: [],
      });
    }
  }

  #init_text_query() {
    if (!Object.prototype.hasOwnProperty.call(this.body.query, "text_query")) {
      define(this._body.query, "text_query", { keywords: [] });
    }
  }

  #init_prefix_query() {
    if (
      !Object.prototype.hasOwnProperty.call(this.body.query, "prefix_query")
    ) {
      define(this._body.query, "text_query", undefined);
    }
  }

  #init_sorted_attribute_query() {
    if (
      !Object.prototype.hasOwnProperty.call(
        this.body.query,
        "sorted_attribute_query"
      )
    ) {
      define(this._body.query, "sorted_attribute_query", {
        attribute_name: undefined,
        initial_attribute_value: undefined,
        sort_order: "ASC",
      });
    }
  }

  #build_range_query(name, min, max) {
    let caller = "range_query";
    let range_query = {
      attribute_name: name,
      attribute_max_value: undefined,
      attribute_min_value: undefined,
    };

    if (min !== undefined) {
      if (shazam_is_integer(min, this.display_name, caller)) {
        range_query.attribute_min_value = min;
      }
    }
    if (max !== undefined) {
      if (shazam_is_integer(max, this.display_name, caller)) {
        range_query.attribute_max_value = max;
      }
    }
    return clone_object(range_query);
  }

  // METHODS
  /**
   * `text_query_remove` removes a keyword from text_query
   * @typedef {function} Catalog_Search_Filter.text_query_remove
   * @memberOf Catalog_Search_Filter
   * @public
   * @method
   * @param {string} word - a keyword to remove from the text_query. Case sensitive.
   * @throws {Error} Throws error if word is not found.
   * */
  text_query_remove(word) {
    this.#init_text_query();
    let existing_array = this._body.query.text_query.keywords;
    if (!existing_array.includes(word)) {
      let message =
        '"' +
        word +
        '" not found in text_query.keywords. Current array: [' +
        existing_array +
        "]";
      throw new Error(message);
    }

    this.#init_text_query();
    let arr = this._body.query.text_query.keywords.filter(
      (exclude) => exclude !== word
    );
    this._body.query.text_query.keywords = arr;
  }

  #concat_text_query(arr, calling_this) {
    this.#init_text_query();
    let limit = this.configuration.maximums.text_query;
    let text_query_array = this._body.query.text_query.keywords;
    let combined = text_query_array.length + arr.length;
    if (combined > limit) {
      let message =
        "text_query can hold a maximum of " +
        limit +
        " keywords. Concatenated length: " +
        combined;
      throw new Error(message);
    }
    let replacement = this._body.query.text_query.keywords.concat(arr);

    this._body.query.text_query.keywords = replacement;
    return calling_this;
  }

  /**
   * {@link https://developer.squareup.com/reference/square/objects/CatalogQueryExact | Square Docs: Exact Query}<br>
   * {@link https://developer.squareup.com/reference/square/objects/CatalogQueryPrefix | Square Docs: Prefix Query}<br>
   * {@link https://developer.squareup.com/reference/square/objects/CatalogQueryRange | Square Docs: Range Query}<br>
   * {@link https://developer.squareup.com/reference/square/objects/CatalogQueryText | Square Docs: Text Query}<br>
   * {@link https://developer.squareup.com/reference/square/enums/CatalogObjectType | Square Docs: Object Types}<br>
   *  make() method of Catalog_Search_Filter
   *  Make sure to have the Square Docs open in front of you.
   * Sub-Method names are exactly the same as the property names listed
   * in the Square docs. There may be additional methods and/or shortened aliases of other methods.
   *
   * You should read the generated docs as:
   *     method_name(arg) {type} description of arg
   *
   * @typedef {function} Catalog_Search_Filter.make
   * @method
   * @public
   * @memberOf Catalog_Search_Filter
   * @property include_related_objects(bool) {boolean}
   * @property begin_time(time) {string} -
   * @property exact_query(key,) {string|string} -
   * @property prefix_query(key,) {string|string} -
   * @property range_query(name,min,max) {string|number|number} -
   * @property set_query()  - Calls 'make_set_query'
   * @property sorted_attribute_query()  - Calls 'make_sorted_attribute_query'
   * @property object_type() {Enumerated} - Calls 'catalog_search_objects_enum.object_types' - Different page.
   * @property text_query(word) {string} - adds a word onto the text query array
   * @property text_query_remove(word) {string} - A word to remove from the text query.  Must be exact.
   * @property text_query_concat(arr) {array<string>} -adds the contents of an array of words onto the text query array
   * @property limit(int32) {integer}
   * @property type() alias of `object_type`
   * @property concat_object_types(array_to_add) {array<enum>} - Calls {@link Catalog_Search_Objects_Super.concat_object_types| `super.concat_object_types`}adds the contents of an array of object type strings to th object_types array.
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
    // any changes made to super modification methods should be replicated on Catalog_Search_Cross_Reference
    return {
      self: this,
      include_related_objects: function (bool) {
        this.self.include_related_objects = bool;
        return this;
      },
      begin_time: function (time) {
        this.self.begin_time = time;
        return this;
      },
      exact_query: function (key, value) {
        this.self.exact_query = {
          attribute_name: key,
          attribute_value: value,
        };
        return this;
      },
      prefix_query: function (key, prefix) {
        this.self.prefix_query = {
          attribute_name: key,
          attribute_prefix: prefix,
        };
        return this;
      },
      range_query: function (name, min, max) {
        this.self.range_query = this.self.#build_range_query(name, min, max);
        return this;
      },
      set_query: function () {
        return this.self.make_set_query();
      },
      sorted_attribute_query: function () {
        return this.self.make_sorted_attribute_query();
      },
      object_type: function () {
        return catalog_search_objects_enum.object_types(this.self, this);
      },
      text_query: function (word) {
        this.self.text_query = word;
        return this;
      },
      text_query_concat: function (arr) {
        return this.self.#concat_text_query(arr, this);
      },

      text_query_remove: function (word) {
        this.self.text_query_remove(word);
        return this;
      },
      limit: function (int32) {
        this.self.limit = int32;
        return this;
      },
      type: function () {
        return this.object_type();
      },
      concat_object_types: function (array_to_add) {
        this.self.concat_object_types(array_to_add);
        return this;
      },
    };
  }

  /**
   * {@link https://developer.squareup.com/reference/square/enums/SortOrder | Square Docs: Sort Order}<br>
   * {@link https://developer.squareup.com/reference/square/objects/CatalogQuerySortedAttribute | Square Docs: Sorted Attribute Query}<br>
   *  make_sorted_attribute_query() method of Catalog_Search_Filter
   *  Make sure to have the Square Docs open in front of you.
   * Sub-Method names are exactly the same as the property names listed
   * in the Square docs. There may be additional methods and/or shortened aliases of other methods.
   *
   * You should read the generated docs as:
   *     method_name(arg) {type} description of arg
   *
   * @typedef {function} Catalog_Search_Filter.make_sorted_attribute_query
   * @method
   * @public
   * @memberOf Catalog_Search_Filter
   * @property attribute_name(key) {string} - sets attribute_name
   * @property initial_attribute_value(value) {string} -sets initial_attribute_value
   * @property sort_order() {Enumerated} - Calls `arche_sorting_enum.sort_order()`
   * @property key(key) {string} - -alias of `attribute_name()`
   * @property name(key) {string} - -alias of `attribute_name()`
   * @property value(value) {string} -alias of `initial_attribute_value()`
   * @property sort() - alias of 'sort_order()`
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

  make_sorted_attribute_query() {
    this.#init_sorted_attribute_query();
    let sorted_attribute_query = this._body.query.sorted_attribute_query;
    return {
      self: this,
      attribute_name: function (key) {
        sorted_attribute_query.attribute_name = key;
        return this;
      },
      initial_attribute_value: function (value) {
        sorted_attribute_query.initial_attribute_value = value;
        return this;
      },
      sort_order: function () {
        return arche_sorting_enum.sort_order(sorted_attribute_query, this);
      },
      key: function (key) {
        return this.attribute_name(key);
      },
      name: function (key) {
        return this.attribute_name(key);
      },
      value: function (value) {
        return this.initial_attribute_value(value);
      },
      sort: function () {
        return this.sort_order();
      },
    };
  }

  /**
   * {@link https://developer.squareup.com/reference/square/objects/CatalogQuerySet | Square Docs}<br>
   *  make_set_query() method of Catalog_Search_Filter
   *  Make sure to have the Square Docs open in front of you.
   * Sub-Method names are exactly the same as the property names listed
   * in the Square docs. There may be additional methods and/or shortened aliases of other methods.
   *
   * You should read the generated docs as:
   *     method_name(arg) {type} description of arg
   *
   * @typedef {function} Catalog_Search_Filter.make_set_query
   * @method
   * @public
   * @memberOf Catalog_Search_Filter
   * @property name(name) {string} -The exact name (key) of the attribute to be searched
   * @property value(val) {string} - adds a value to the attribute_values array
   * @property concat_values(arr) {array<string>} - concatenates an array to the attribute_values array
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

  make_set_query() {
    this.#init_set_query();
    let limit = this.configuration.maximums.attribute_values;
    let caller = "set_query";
    let set_query_array = this._body.query.set_query.attribute_values;

    return {
      self: this,
      name: function (name) {
        this.self._body.query.set_query.attribute_name = name;
        return this;
      },
      value: function (val) {
        if (
          shazam_max_length_array(
            limit,
            set_query_array,
            this.self.display_name,
            caller
          )
        ) {
          set_query_array.push(val);
        }
        return this;
      },
      concat_values: function (arr) {
        // if the sums of the lengths are equal or less than limit
        let sum = set_query_array.length + arr.length;
        if (sum > limit) {
          let message =
            "set_query holds an array with a maximum length of " +
            limit +
            " Concatenated length: " +
            sum;
          throw new Error(message);
        }
        let replacement = set_query_array.concat(arr);
        this.self._body.query.set_query.attribute_values = replacement;
        return this;
      },
    };
  }
}
module.exports = Catalog_Search_Filter;
