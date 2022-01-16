const Catalog_Search_Objects_Super = require("./catalog_request_abstract_search_objects_super");
const { define, shazam_is_array } = require("./utilities");
const man =
  "can search for any type of catalog objects\n" +
  "This is complicated. Read the Pie doc before you try to use it: " +
  "https://github.com/TwoFistedJustice/square-pie/blob/main/docs/pie_catalog_request_search.md\n" +
  "This class uses ONE array of ids to cross reference your search.\n" +
  "To search by sets of key:value pairs use Catalog_Search_Filter" +
  "\nhttps://developer.squareup.com/reference/square/catalog-api/search-catalog-objects";
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

  variations(id) {
    this.item_variations_for_item_option_values_query = id;
    return this;
  }
  items(id) {
    this.items_for_item_options_query = id;
    return this;
  }
  modifiers(id) {
    this.items_for_modifier_list_query = id;
    return this;
  }
  taxes(id) {
    this.items_for_tax_query = id;
    return this;
  }

  concat_variations(arr) {
    this.concat_item_variations_for_item_option_values_query = arr;
    return this;
  }
  concat_items(arr) {
    this.concat_items_for_item_options_query = arr;
    return this;
  }
  concat_modifiers(arr) {
    this.concat_items_for_modifier_list_query = arr;
    return this;
  }
  concat_taxes(arr) {
    this.concat_items_for_tax_query = arr;
    return this;
  }

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
        return this.self.enum_object_types();
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
    };
  }
}
module.exports = Catalog_Search_Cross_Reference;
