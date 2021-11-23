const Catalog_Search_Objects_Super = require("./catalog_request_search_objects_super");
const { define } = require("./utilities");

class Catalog_Search_Cross_Reference extends Catalog_Search_Objects_Super {
  #_ids;
  constructor() {
    super();
    this.#_ids = [];
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

  addId(id) {
    this.#ids = id;
    return this;
  }

  clearIds() {
    this.#clearIds = true;
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
