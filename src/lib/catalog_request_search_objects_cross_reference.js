const Catalog_Search_Objects_Super = require("./catalog_request_abstract_search_objects_super");
const { define, shazam_is_array } = require("./utilities");
const { catalog_search_objects_enum } = require("./enum/index");
const man =
  "can search for any type of catalog objects\n" +
  "This is complicated. Read the Pie doc before you try to use it: " +
  "https://github.com/TwoFistedJustice/square-pie/blob/main/docs/pie_catalog_request_search.md\n" +
  "This class uses ONE array of ids to cross reference your search.\n" +
  "To search by sets of key:value pairs use Catalog_Search_Filter" +
  "\nhttps://developer.squareup.com/reference/square/catalog-api/search-catalog-objects";

/** @class Catalog_Search_Cross_Reference
 * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
 * {@link https://developer.squareup.com/reference/square/catalog-api/search-catalog-objects | Square Docs}
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

  /** @function variations
   * @param {string} id an ID of a an item variation.
   * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
   * */

  variations(id) {
    this.item_variations_for_item_option_values_query = id;
    return this;
  }
  /** @function items
   * @param {string} id an ID of a an item
   * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
   * */

  items(id) {
    this.items_for_item_options_query = id;
    return this;
  }
  /** @function modifiers
   * @param {string} id an ID of a a modifier_list
   * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
   * */

  modifiers(id) {
    this.items_for_modifier_list_query = id;
    return this;
  }
  /** @function taxes
   * @param {string} id an ID of a a tax object
   * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
   * */

  taxes(id) {
    this.items_for_tax_query = id;
    return this;
  }

  /** @function concat_variations
   * @param {array} arr an array of IDs of Item Variations.
   * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
   * */

  concat_variations(arr) {
    this.concat_item_variations_for_item_option_values_query = arr;
    return this;
  }
  /** @function concat_item
   * @param {array} arr an array of IDs of Item objects
   * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
   * */

  concat_items(arr) {
    this.concat_items_for_item_options_query = arr;
    return this;
  }
  /** @function concat_modifiers
   * @param {array} arr an array of IDs of Modifier List objects
   * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
   * */

  concat_modifiers(arr) {
    this.concat_items_for_modifier_list_query = arr;
    return this;
  }
  /** @function concat_taxes
   * @param {array} arr an array of IDs of Tax objects
   * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
   * */

  concat_taxes(arr) {
    this.concat_items_for_tax_query = arr;
    return this;
  }

  /** @function make()  method of Catalog_Search_Cross_Reference - method names are exactly the same as the property names listed
   * in the Square docs. If the method is not listed here it takes one argument of the type specified by
   * the Square docs and sets the appropriate value. Only methods that do not behave as simple setters are
   * listed here.
   * @method object_type - enumerated function - method names are same as lower case allowable values.
   *{@link https://developer.squareup.com/reference/square/enums/CatalogObjectType | Square Docs}
   * @method type - alias of object_type
   * @method concat_variations - concatenates and array of ids
   * @param {array} an array of ids
   * @method concat_items- concatenates and array of ids
   * @param {array} an array of ids
   * @method concat_modifiers- concatenates and array of ids
   * @param {array} an array of ids
   * @method concat_taxes- concatenates and array of ids
   * @param {array} an array of ids
   * @method concat_object_types- concatenates an array of object types
   * @param {array} array_to_add -an array of of object type string values
   * @example
   *  You must use parentheses with every call to make and with every sub-method. If you have to make a lot
   *  of calls from different lines, it will reduce your tying and improve readability to set make() to a
   *  variable.
   *  let make = myVar.make();
   *   make.gizmo()
   *   make.gremlin()
   *
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
