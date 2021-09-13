const Catalog_Search_Objects_Super = require("./stub.catalog_request_search_objects_super");
const { setter_chain_generator_config } = require("./utilities_curry");

class Catalog_Search_Filter extends Catalog_Search_Objects_Super {
  constructor() {
    super();
  }

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

  set exact_query(obj) {
    if (
      !Object.prototype.hasOwnProperty.call(obj, "attribute_name") ||
      !Object.prototype.hasOwnProperty.call(obj, "attribute_value")
    ) {
      throw new Error(
        'The object provided for an exact search must have the properties "attribute_name" and "attribute_value".'
      );
    } else if (
      typeof obj.attribute_name != "string" ||
      typeof obj.attribute_value != "string"
    ) {
      throw new TypeError(
        "The object provided for an exact search must have string values in both properties."
      );
    }
    if (
      !Object.prototype.hasOwnProperty.call(this._body.query, "exact_query")
    ) {
      Object.defineProperty(this._body.query, "exact_query", {
        value: undefined,
        writable: true,
        enumerable: true,
      });
    }
    this._body.query.exact_query = obj;
  }

  set set_query(obj) {
    if (
      !Object.prototype.hasOwnProperty.call(obj, "attribute_name") ||
      !Object.prototype.hasOwnProperty.call(obj, "attribute_values")
    ) {
      throw new Error(
        'The object provided for an set_query search must have the properties "attribute_name" and "attribute_value".'
      );
    } else if (typeof obj.attribute_name != "string") {
      throw new TypeError(
        'The object "attribute_name" provided for an set_query search must have string value.'
      );
    } else if (!Array.isArray(obj.attribute_values)) {
      throw new TypeError(
        "The object provided for an set_query search must have an array of string values."
      );
    }

    if (!Object.prototype.hasOwnProperty.call(this._body.query, "set_query")) {
      Object.defineProperty(this._body.query, "set_query", {
        value: undefined,
        writable: true,
        enumerable: true,
      });
    }

    this._body.query.set_query = obj;
  }

  set prefix_query(obj) {
    if (
      !Object.prototype.hasOwnProperty.call(obj, "attribute_name") ||
      !Object.prototype.hasOwnProperty.call(obj, "attribute_prefix")
    ) {
      throw new Error(
        'The object provided for an exact search must have the properties "attribute_name" and "attribute_prefix".'
      );
    } else if (
      typeof obj.attribute_name != "string" ||
      typeof obj.attribute_prefix != "string"
    ) {
      throw new TypeError(
        "The object provided for an exact search must have string values in both properties."
      );
    }
    if (
      !Object.prototype.hasOwnProperty.call(this._body.query, "prefix_query")
    ) {
      Object.defineProperty(this._body.query, "prefix_query", {
        value: undefined,
        writable: true,
        enumerable: true,
      });
    }

    this._body.query.prefix_query = obj;
  }

  set range_query(obj) {
    if (!Object.prototype.hasOwnProperty.call(obj, "attribute_name")) {
      throw new Error(
        'The object provided for an set_query search must have the properties "attribute_name"".'
      );
    } else if (typeof obj.attribute_name != "string") {
      throw new TypeError(
        'The object "attribute_name" provided for an set_query search must have string value.'
      );
    }
    if (
      !Object.prototype.hasOwnProperty.call(this._body.query, "range_query")
    ) {
      Object.defineProperty(this._body.query, "range_query", {
        value: undefined,
        writable: true,
        enumerable: true,
      });
    }

    this._body.query.range_query = obj;
  }
  set sorted_attribute_query(obj) {
    if (!Object.prototype.hasOwnProperty.call(obj, "attribute_name")) {
      throw new Error(
        'range query expects a property called "attribute_name" with a string value;'
      );
    }
    if (
      !!obj.sort_order &&
      obj.sort_order !== "ASC" &&
      obj.sort_order !== "DESC"
    ) {
      throw new Error(
        'range query sort order must be set to either "ASC" or "DESC"'
      );
    }

    if (
      !Object.prototype.hasOwnProperty.call(
        this._body.query,
        "sorted_attribute_query"
      )
    ) {
      Object.defineProperty(this._body.query, "sorted_attribute_query", {
        value: undefined,
        writable: true,
        enumerable: true,
      });
    }
    this._body.query.sorted_attribute_query = obj;
  }

  set text_query(arr) {
    if (!Array.isArray(arr) || arr.length > 3 || arr.length < 1) {
      throw new Error(
        "text_query requires an Array of no more than 3 strings."
      );
    }
    if (!Object.prototype.hasOwnProperty.call(this._body.query, "text_query")) {
      Object.defineProperty(this._body.query, "text_query", {
        value: undefined,
        writable: true,
        enumerable: true,
      });
    }
    this._body.query.text_query = { keywords: arr };
  }

  // TODO write a method for exact_query which takes two arguments (name, value) and parsest them into
  //  a setter friendly format and calls the exact_query setter.
  // METHODS
  text_query_add(word) {
    let arr = [];
    let textQuery = this.text_query;
    if (Object.prototype.hasOwnProperty.call(textQuery, "keywords")) {
      arr = textQuery.keywords;
    }
    if (arr.length > 2) {
      console.log(`Removing ${arr[2]} from text_query array.`);
      arr = arr.slice(0, 2);
    }
    arr.push(word);
    this.exact_query = arr;
  }

  text_query_remove(word) {
    if (!Array.isArray(this._body.query.text_query)) {
      throw new Error("No words have been added to text_query yet.");
    }
    let arr = this._body.query.text_query.filter((exclude) => exclude !== word);
    this.text_query = arr;
  }
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
        add_object_type: function (type) {
          this.self.object_types = type;
          return this;
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
      };
      setter_chain_generator_config(this.configuration, properties, this);
      return properties;
    };
    return methods();
  }
}
module.exports = Catalog_Search_Filter;
