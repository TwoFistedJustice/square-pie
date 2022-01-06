const Catalog_Search_Objects_Super = require("./catalog_request_abstract_search_objects_super");
const { define } = require("./utilities");
const man =
  "can search for any type of catalog objects\n" +
  "This is complicated. Read the Pie doc before you try to use it: " +
  "https://github.com/TwoFistedJustice/square-pie/blob/main/docs/pie_catalog_request_search.md\n" +
  "This class uses arrays of ids to cross reference your search.\n" +
  "To search by sets of key:value pairs use Catalog_Search_Filter" +
  "\nhttps://developer.squareup.com/reference/square/catalog-api/search-catalog-objects";
class Catalog_Search_Cross_Reference extends Catalog_Search_Objects_Super {
  _display_name = "Catalog_Search_Cross_Reference";
  _last_verified_square_api_version = "2021-07-21";
  _help = this.display_name + ": " + man;
  #_ids;
  constructor() {
    super();
    this.#_ids = [];
  }
  get display_name() {
    return this._display_name;
  }
  get square_version() {
    return `The last verified compatible Square API version is ${this._last_verified_square_api_version}`;
  }
  get help() {
    return this._help;
  }
  get ids() {
    return this.#_ids;
  }

  set #ids(id) {
    this.#_ids.push(id);
  }

  set #clearIds(any) {
    this.#_ids = [];
  }

  variations() {
    this.queryRemove();
    define(
      this._body,
      "item_variations_for_item_option_values_query",
      this.ids
    );
    return this;
  }
  items() {
    this.queryRemove();
    define(this._body, "items_for_item_options_query", this.ids);
    return this;
  }
  modifiers() {
    this.queryRemove();
    define(this._body, "items_for_modifier_list_query", this.ids);
    return this;
  }
  taxes() {
    this.queryRemove();
    define(this._body, "items_for_tax_query", this.ids);
    return this;
  }

  add_id(id) {
    this.#ids = id;
    return this;
  }

  clear_ids() {
    this.#clearIds = true;
    return this;
  }

  // todo - remove 'return this' from methods with query-remove

  //todo make unified functions for make()
  //  call id adder
  //  call appropriate setting function

  make() {
    // any changes made to super modification methods should be replicated on Catalog_Search_Filter
    return {
      self: this,
      include_related_objects: function (bool) {
        this.self.include_related_objects = bool;
        return this;
      },
      begin_time: function (time) {
        this.begin_time = time;
        return this;
      },
      object_types: function () {
        return this.self.enum_object_types();
      },
    };
  }
}
module.exports = Catalog_Search_Cross_Reference;
