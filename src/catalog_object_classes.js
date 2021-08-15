const { v4: uuidv4 } = require("uuid");
uuidv4();

class Catalog_Object {
  constructor() {
    this._idempotency_key = uuidv4();
  }
  // GETTERS
  get idempotency_key() {
    return this._idempotency_key;
  }

  // SETTERS

  set idempotency_key(nothing) {
    // sets a new key, argument required but doesn't do anything
    this._idempotency_key = uuidv4();
  }

  maxLength(max, str) {
    if (str.length > max) {
      throw new Error(`Surpassed maximum character limit of ${max}.\n${str}`);
    }
    return true;
  }
}

class Category extends Catalog_Object {
  constructor(name) {
    super();
    this._type = "CATEGORY";
    this._name;
    this.name = name;
  }
  get type() {
    return this._type;
  }

  get name() {
    return this._name;
  }
  set type(bool) {
    this._type = "CATEGORY";
  }

  set name(str) {
    let max = 255;
    if (this.maxLength(max, str)) {
      this._name = str;
    }
  }
}

//MAYBE instead of a unique class, have a METHOD
// on the ITEM class that makes this as a property...
// or a have a method that instantiates this class?
// or require the user to make one, then when it's added to an item
// the item_id gets set then
class Item_Variation extends Catalog_Object {
  constructor(item_id, name) {
    super(name);
    this._type = "ITEM_VARIATION";
    // id of associated item
    this._item_id = item_id; //must be set by Item class
    this._name = name; // 255
    this._sku; // can it be validated?
    this._upc; // can it be validated? min ln:12 max ln:14
    this._pricing_type; // [ CHAIN ]
    this._price_money; // [ CHAIN ]
    this._location_overrides; // [ CHAIN ]
    this._track_inventory; // [ CHAIN T/F ]
    this._inventory_alert_type;
    this._inventory_alert_type_threshold;
    this._user_data; //255
    this._service_duration;
    this._available_for_booking;
    this._item_options_values;
    this._measurement_unit_id;
    this._stockable;
    this._team_member_ids;
    this._stockable_coversion;
  }
  // GETTERS
  get id() {
    return this._item_id;
  }
  get type() {
    return this._type;
  }
  get name() {
    return this._name;
  }

  set name(str) {
    this._name = str;
  }
  set type(bool) {
    this._type = "ITEM_VARIATION";
  }

  set id(id) {
    this._item_id = id;
  }
  // new standard name for chain setters
  spawn() {}
}

class Item extends Catalog_Object {
  constructor(name) {
    super();
    this._type = "ITEM";
    this._name = name; // 255
    this._description;
    this._abbreviation;
    this._category_id; // have a config file for this? so user doesn't have to deal with id codes?
    this._label_color;
    this._available_online;
    this._available_for_pickup;
    this._available_electronically;
    this._tax_ids;
    this._modifier_list_info;
    this._variations;
    this._product_type = "REGULAR"; // make a switcher
    this._skip_modifier_screen; //default is false
    this._item_options;
    this._sort_name = undefined; // supported in Japan only
  }

  get type() {
    return this._type;
  }
  get name() {
    return this._name;
  }

  set name(str) {
    this._name = str;
  }
  set type(bool) {
    this._type = "ITEM";
  }
}

module.exports = {
  Category,
  Item,
  Item_Variation,
};
