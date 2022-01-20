const Catalog_Search_Objects_Super = require("./catalog_request_abstract_search_objects_super");
const { define, shazam_object_has_property } = require("./utilities");
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
      shazam_object_has_property(
        obj,
        "attribute_name",
        this.display_name,
        "exact_query"
      ) ||
      shazam_object_has_property(
        obj,
        "attribute_value",
        this.display_name,
        "exact_query"
      )
    ) {
      if (
        typeof obj.attribute_name != "string" ||
        typeof obj.attribute_value != "string"
      ) {
        throw new TypeError(
          "The object provided for an exact search must have string values in both properties."
        );
      }
    }
    if (
      !Object.prototype.hasOwnProperty.call(this._body.query, "exact_query")
    ) {
      define(this._body.query, "exact_query", undefined);
    }
    this._body.query.exact_query = obj;
  }

  set set_query(obj) {
    if (
      shazam_object_has_property(
        obj,
        "attribute_name",
        this.display_name,
        "set_query"
      ) ||
      shazam_object_has_property(
        obj,
        "attribute_values",
        this.display_name,
        "set_query"
      )
    ) {
      if (typeof obj.attribute_name != "string") {
        throw new TypeError(
          'The object "attribute_name" provided for a set_query search must have string value.'
        );
      } else if (!Array.isArray(obj.attribute_values)) {
        throw new TypeError(
          "The object provided for a set_query search must have an array of string values."
        );
      }
    }
    if (!Object.prototype.hasOwnProperty.call(this._body.query, "set_query")) {
      define(this._body.query, "set_query", undefined);
    }

    this._body.query.set_query = obj;
  }

  set prefix_query(obj) {
    if (
      shazam_object_has_property(
        obj,
        "attribute_name",
        this.display_name,
        "prefix_query"
      ) ||
      shazam_object_has_property(
        obj,
        "attribute_prefix",
        this.display_name,
        "prefix_query"
      )
    ) {
      if (
        typeof obj.attribute_name != "string" ||
        typeof obj.attribute_prefix != "string"
      ) {
        throw new TypeError(
          "The object provided for an exact search must have string values in both properties."
        );
      }
    }
    if (
      !Object.prototype.hasOwnProperty.call(this._body.query, "prefix_query")
    ) {
      define(this._body.query, "prefix_query", undefined);
    }

    this._body.query.prefix_query = obj;
  }

  set range_query(obj) {
    if (
      shazam_object_has_property(
        obj,
        "attribute_name",
        this.display_name,
        "range_query"
      )
    ) {
      if (typeof obj.attribute_name != "string") {
        throw new TypeError(
          'The object "attribute_name" provided for an set_query search must have string value.'
        );
      }
    }
    if (typeof obj.attribute_name != "string") {
      throw new TypeError(
        'The object "attribute_name" provided for an set_query search must have string value.'
      );
    }
    if (
      !Object.prototype.hasOwnProperty.call(this._body.query, "range_query")
    ) {
      define(this._body.query, "range_query", undefined);
    }

    this._body.query.range_query = obj;
  }
  set sorted_attribute_query(obj) {
    if (
      shazam_object_has_property(
        obj,
        "attribute_name",
        this.display_name,
        "sorted_attribute_query"
      )
    ) {
      if (
        !!obj.sort_order &&
        obj.sort_order !== "ASC" &&
        obj.sort_order !== "DESC"
      ) {
        throw new Error(
          'range query sort order must be set to either "ASC" or "DESC"'
        );
      }
    }
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

  set text_query(arr) {
    if (!Array.isArray(arr) || arr.length > 3) {
      throw new Error(
        "text_query requires an Array of no more than 3 strings."
      );
    }
    if (!Object.prototype.hasOwnProperty.call(this._body.query, "text_query")) {
      define(this._body.query, "text_query", undefined);
    }
    this._body.query.text_query = { keywords: arr };
  }

  // TODO write a method for exact_query which takes two arguments (name, value) and parses them into
  //  a setter friendly format and calls the exact_query setter.
  // METHODS
  text_query_add(word) {
    let arr = [];
    if (!Object.prototype.hasOwnProperty.call(this._body.query, "text_query")) {
      define(this._body.query, "text_query", {});
    }
    let textQuery = this.text_query;
    if (Object.prototype.hasOwnProperty.call(textQuery, "keywords")) {
      arr = textQuery.keywords;
    }
    if (arr.length > 2) {
      // console.log(`Removing ${arr[2]} from text_query array.`);
      arr = arr.slice(0, 2);
    }
    arr.push(word);
    this.text_query = arr;
    return this;
  }

  text_query_remove(word) {
    if (
      !Array.isArray(this._body.query.text_query.keywords) ||
      this._body.query.text_query.keywords.length === 0
    ) {
      throw new Error("No words have been added to text_query yet.");
    }
    let arr = this._body.query.text_query.keywords.filter(
      (exclude) => exclude !== word
    );
    this.text_query = arr;
    return this;
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
      exact_query: function (obj) {
        this.self.exact_query = obj;
        return this;
      },
      prefix_query: function (obj) {
        this.self.query.prefix_query = obj;
        return this;
      },
      range_query: function (obj) {
        this.self.query.range_query = obj;
        return this;
      },
      sorted_attribute_query: function (obj) {
        this.self.query.sorted_attribute_query = obj;
        return this;
      },
      object_type: function () {
        return this.self.enum_object_types();
      },
      text_query: function (arr) {
        this.self.text_query = arr;
        return this;
      },
      text_query_add: function (word) {
        this.self.text_query_add(word);
        return this;
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
