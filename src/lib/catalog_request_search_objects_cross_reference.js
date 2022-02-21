const Catalog_Search_Objects_Super = require("./catalog_request_abstract_search_objects_super");
const { define, shazam_is_array } = require("./utilities");
const { catalog_search_objects_enum } = require("./enum/index");
const man =
  "can search for any type of catalog object\n" +
  "This is complicated. Read the Pie doc before you try to use it: " +
  "https://github.com/TwoFistedJustice/square-pie/blob/main/docs/pie_catalog_request_search.md\n" +
  "This class uses ONE array of ids to cross reference your search.\n" +
  "To search by sets of key:value pairs use Catalog_Search_Filter" +
  "\nhttps://developer.squareup.com/reference/square/catalog-api/search-catalog-objects";

/**
 * {@link https://developer.squareup.com/reference/square/catalog-api/search-catalog-objects |  **-------> Link To Square Docs <-------**}
 * @class Catalog_Search_Cross_Reference
 * @classdesc
 * This is complicated. Read the {@link https://github.com/TwoFistedJustice/square-pie/blob/main/docs/pie_catalog_request_search.md | Pie Doc} before you try to use it.
 * This class uses ONE array of ids to cross reference your search
 * To search by sets of key:value pairs use `Catalog_Search_Filter`
 * */

class Catalog_Search_Cross_Reference extends Catalog_Search_Objects_Super {
  _display_name = "Catalog_Search_Cross_Reference";
  _last_verified_square_api_version = "2021-12-15";
  _help = this.display_name + ": " + man;
  constructor() {
    super();
  }

  // SETTERS
  set item_variations_for_item_option_values_query(id) {
    // check for prop, clear anything on query, create and set to array
    this.#init_query_array(
      "item_variations_for_item_option_values_query",
      "item_option_value_ids"
    );
    this._body.query.item_variations_for_item_option_values_query.item_option_value_ids.push(
      id
    );
  }
  set concat_item_variations_for_item_option_values_query(arr) {
    // validate input is array, check for prop, clear anything on query, create and set to array
    if (
      shazam_is_array(
        arr,
        this._display_name,
        "concat_item_variations_for_item_option_values_query"
      )
    ) {
      this.#init_query_array(
        "item_variations_for_item_option_values_query",
        "item_option_value_ids"
      );
      let joined_array =
        this._body.query.item_variations_for_item_option_values_query.item_option_value_ids.concat(
          arr
        );
      this._body.query.item_variations_for_item_option_values_query.item_option_value_ids =
        joined_array;
    }
  }

  set items_for_item_options_query(id) {
    this.#init_query_array("items_for_item_options_query", "item_option_ids");
    this._body.query.items_for_item_options_query.item_option_ids.push(id);
  }
  set concat_items_for_item_options_query(arr) {
    // validate input is array, check for prop, clear anything on query, create and set to array
    if (
      shazam_is_array(
        arr,
        this._display_name,
        "concat_items_for_item_options_query"
      )
    ) {
      this.#init_query_array("items_for_item_options_query", "item_option_ids");
      let joined_array =
        this._body.query.items_for_item_options_query.item_option_ids.concat(
          arr
        );
      this._body.query.items_for_item_options_query.item_option_ids =
        joined_array;
    }
  }

  set items_for_modifier_list_query(id) {
    this.#init_query_array(
      "items_for_modifier_list_query",
      "modifier_list_ids"
    );
    this._body.query.items_for_modifier_list_query.modifier_list_ids.push(id);
  }
  set concat_items_for_modifier_list_query(arr) {
    // validate input is array, check for prop, clear anything on query, create and set to array
    if (
      shazam_is_array(
        arr,
        this._display_name,
        "concat_items_for_modifier_list_query"
      )
    ) {
      this.#init_query_array(
        "items_for_modifier_list_query",
        "modifier_list_ids"
      );
      let joined_array =
        this._body.query.items_for_modifier_list_query.modifier_list_ids.concat(
          arr
        );
      this._body.query.items_for_modifier_list_query.modifier_list_ids =
        joined_array;
    }
  }

  set items_for_tax_query(id) {
    this.#init_query_array("items_for_tax_query", "tax_ids");
    this._body.query.items_for_tax_query.tax_ids.push(id);
  }
  set concat_items_for_tax_query(arr) {
    // validate input is array, check for prop, clear anything on query, create and set to array
    if (
      shazam_is_array(arr, this._display_name, "concat_items_for_tax_query")
    ) {
      this.#init_query_array("items_for_tax_query", "tax_ids");
      let joined_array =
        this._body.query.items_for_tax_query.tax_ids.concat(arr);
      this._body.query.items_for_tax_query.tax_ids = joined_array;
    }
  }

  #init_query_array(property_name, array_name) {
    if (
      !Object.prototype.hasOwnProperty.call(this._body.query, property_name)
    ) {
      this.query_reset();
      define(this._body.query, property_name, { [array_name]: [] });
    }
  }

  /**
   * add an item_variation id to your query
   *  @typedef {function}  Catalog_Search_Cross_Reference.variations
   * @memberOf Catalog_Search_Cross_Reference
   * @method
   * @public
   * @param {string} id an ID of a an item variation.
   * */

  variations(id) {
    this.item_variations_for_item_option_values_query = id;
    return this;
  }

  /**
   * Add an item id to your query.
   * @typedef {function}  Catalog_Search_Cross_Reference.items
   * @memberOf Catalog_Search_Cross_Reference
   * @method
   * @public
   * @param {string} id an ID of a an item
   * */
  items(id) {
    this.items_for_item_options_query = id;
    return this;
  }

  /**
   * add a modifier list id to your query
   * @typedef {function}  Catalog_Search_Cross_Reference.modifiers
   * @memberOf Catalog_Search_Cross_Reference
   * @method
   * @public
   * @param {string} id an ID of a a modifier_list
   * */

  modifiers(id) {
    this.items_for_modifier_list_query = id;
    return this;
  }

  /**
   * Add a tax id to your query
   * @typedef {function}  Catalog_Search_Cross_Reference.taxes
   * @memberOf Catalog_Search_Cross_Reference
   * @method
   * @public
   * @param {string} id an ID of a a tax object
   * */

  taxes(id) {
    this.items_for_tax_query = id;
    return this;
  }

  /**
   * Add the contents of an array of item variation ids to your query.
   * @typedef {function}  Catalog_Search_Cross_Reference.concat_variations
   * @memberOf Catalog_Search_Cross_Reference
   * @method
   * @public
   * @param {array} arr an array of IDs of Item Variations.
   * */

  concat_variations(arr) {
    this.concat_item_variations_for_item_option_values_query = arr;
    return this;
  }
  /**
   * Add the contents of an array of item_option ids to your query.
   * @typedef{function}  Catalog_Search_Cross_Reference.concat_item
   * @memberOf Catalog_Search_Cross_Reference
   * @method
   * @public
   * @param {array} arr an array of IDs of Item objects
   * */

  concat_items(arr) {
    this.concat_items_for_item_options_query = arr;
    return this;
  }
  /**
   * Add the contents of an array of modifier list ids to your query.
   * @typedef {function}  Catalog_Search_Cross_Reference.concat_modifiers
   * @memberOf Catalog_Search_Cross_Reference
   * @method
   * @public
   * @param {array} arr an array of IDs of Modifier List objects
   * */

  concat_modifiers(arr) {
    this.concat_items_for_modifier_list_query = arr;
    return this;
  }
  /**
   * Add the contents of an array of tax ids to your query.
   * @typedef {function}  Catalog_Search_Cross_Reference.concat_taxes
   * @memberOf Catalog_Search_Cross_Reference
   * @method
   * @public
   * @param {array} arr an array of IDs of Tax objects
   * */

  concat_taxes(arr) {
    this.concat_items_for_tax_query = arr;
    return this;
  }

  /**
   *  make() method of Catalog_Search_Cross_Reference
   *
   * Sub-Method names are exactly the same as the property names listed
   * in the Square docs. There may be additional methods and/or shortened aliases of other methods.
   *
   * You should read the generated docs as:
   *     method_name(arg) {type} description of arg
   *
   * @typedef {function} Catalog_Search_Cross_Reference.make
   * @method
   * @public
   * @memberOf Catalog_Search_Cross_Reference
   * @property include_related_objects(bool) {boolean}
   * @property begin_time(id) {string} -
   * @property  object_types() {Enumerated}
   * @property variations (id) {string} -
   * @property items(id) {string} -
   * @property modifiers(id) {string} -
   * @property taxes(arr) {array} -
   * @property concat_variations(arr) {array} - adds the contents of an array of ids
   * @property concat_items(arr) {array} - adds the contents of an array of ids
   * @property concat_modifiers(arr) {array} - adds the contents of an array of ids
   * @property concat_taxes(arr) {array} - adds the contents of an array of ids
   * @property  concat_object_types() - adds the contents of an array of object types
   * @property  types() - alias of object_type
   
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
    // any changes made to super modification methods should be replicated on Catalog_Search_Filter
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
      object_types: function () {
        return catalog_search_objects_enum.object_types(this.self, this);
      },
      variations: function (id) {
        this.self.item_variations_for_item_option_values_query = id;
        return this;
      },
      items: function (id) {
        this.self.items_for_item_options_query = id;
        return this;
      },
      modifiers: function (id) {
        this.self.items_for_modifier_list_query = id;
        return this;
      },
      taxes: function (id) {
        this.self.items_for_tax_query = id;
        return this;
      },
      concat_variations: function (arr) {
        this.self.concat_item_variations_for_item_option_values_query = arr;
        return this;
      },
      concat_items: function (arr) {
        this.self.concat_items_for_item_options_query = arr;
        return this;
      },
      concat_modifiers: function (arr) {
        this.self.concat_items_for_modifier_list_query = arr;
        return this;
      },
      concat_taxes: function (arr) {
        this.self.concat_items_for_tax_query = arr;
        return this;
      },
      concat_object_types: function (array_to_add) {
        this.self.concat_object_types(array_to_add);
        return this;
      },
      types: function () {
        return this.object_types();
      },
    };
  }
}
module.exports = Catalog_Search_Cross_Reference;
