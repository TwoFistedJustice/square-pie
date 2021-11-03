const Catalog_Search_Objects_Super = require("./catalog_request_search_objects_super");
const { setter_chain_generator_config } = require("./utilities");
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
    Object.defineProperty(
      this._body,
      "item_variations_for_item_option_values_query",
      {
        value: this.ids,
        writable: true,
        enumerable: true,
      }
    );
    return this;
  }
  items() {
    this.queryRemove();
    Object.defineProperty(this._body, "items_for_item_options_query", {
      value: this.ids,
      writable: true,
      enumerable: true,
    });
    return this;
  }
  modifiers() {
    this.queryRemove();
    Object.defineProperty(this._body, "items_for_modifier_list_query", {
      value: this.ids,
      writable: true,
      enumerable: true,
    });
    return this;
  }
  taxes() {
    this.queryRemove();
    Object.defineProperty(this._body, "items_for_tax_query", {
      value: this.ids,
      writable: true,
      enumerable: true,
    });
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
    const methods = () => {
      // any changes made to super modification methods should be replicated on Catalog_Search_Filter
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
      };
      setter_chain_generator_config(this.configuration, properties, this);
      return properties;
    };
    return methods();
  }
}
module.exports = Catalog_Search_Cross_Reference;
