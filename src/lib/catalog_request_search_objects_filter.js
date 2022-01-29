const Catalog_Search_Objects_Super = require("./catalog_request_abstract_search_objects_super");
const {
  clone_object,
  define,
  shazam_integer,
  shazam_max_length_array,
} = require("./utilities");
const man =
  "can search for any type of catalog objects\n" +
  "This is complicated. Read the Pie doc before you try to use it:\n" +
  "This is the class to use if you want to search by key:value pairs.\n" +
  "To cross reference by Square document ids use Catalog_Search_Cross_Reference";
"https://github.com/TwoFistedJustice/square-pie/blob/main/docs/pie_catalog_request_search.md" +
  "\nhttps://developer.squareup.com/reference/square/catalog-api/search-catalog-objects";

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
    if (
      !Object.prototype.hasOwnProperty.call(
        this._body.query,
        "sorted_attribute_query"
      )
    ) {
      define(this._body.query, "sorted_attribute_query", undefined);
    }
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

  #build_set_query() {
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

  #build_range_query(name, min, max) {
    let caller = "range_query";
    let range_query = {
      attribute_name: name,
      attribute_max_value: undefined,
      attribute_min_value: undefined,
    };

    if (min !== undefined) {
      if (shazam_integer(min, this.display_name, caller)) {
        range_query.attribute_min_value = min;
      }
    }
    if (max !== undefined) {
      if (shazam_integer(max, this.display_name, caller)) {
        range_query.attribute_max_value = max;
      }
    }
    return clone_object(range_query);
  }

  // METHODS

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

  concat_text_query(arr, calling_this) {
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
      // https://developer.squareup.com/reference/square/objects/CatalogQueryExact
      exact_query: function (key, value) {
        this.self.exact_query = {
          attribute_name: key,
          attribute_value: value,
        };
        return this;
      },
      // https://developer.squareup.com/reference/square/objects/CatalogQueryPrefix
      prefix_query: function (key, prefix) {
        this.self.prefix_query = {
          attribute_name: key,
          attribute_prefix: prefix,
        };
        return this;
      },
      // https://developer.squareup.com/reference/square/objects/CatalogQueryRange
      range_query: function (name, min, max) {
        this.self.range_query = this.self.#build_range_query(name, min, max);
        return this;
      },
      set_query: function () {
        return this.self.#build_set_query();
      },
      sorted_attribute_query: function (obj) {
        this.self.query.sorted_attribute_query = obj;
        return this;
      },
      object_type: function () {
        return this.self.enum_object_types();
      },
      text_query: function (word) {
        this.self.text_query = word;
        return this;
      },
      text_query_concat: function (arr) {
        return this.self.concat_text_query(arr, this);
      },

      text_query_remove: function (word) {
        this.self.text_query_remove(word);
        return this;
      },
      limit: function (int32) {
        this.self.limit = int32;
        return this;
      },
    };
  }
}
module.exports = Catalog_Search_Filter;
