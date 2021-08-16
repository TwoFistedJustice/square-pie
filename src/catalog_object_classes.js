const { v4: uuidv4 } = require("uuid");
uuidv4();

//ToDO: refactor to make CatObj just a wrapper
//ToDO Add .parcel method CatObj

// instantiate class
// class.attach(stuff).attach(stuff)
// class.attach(stuff-I-forgot)
//class.add(same-as-attach)
// class.finalize() // todo extract this step out
// send out class.fardel
class Catalog_Object {
  constructor() {
    // this._idempotency_key = uuidv4();
    this._idempotency_key = "something unique";
    this._fardel = {
      idempotency_key: this._idempotency_key,
    };
    this._payload;
  }
  // GETTERS
  get idempotency_key() {
    return this._idempotency_key;
  }
  get payload() {
    return this._payload;
  }
  get fardel() {
    return this._fardel;
  }
  // SETTERS
  set idempotency_key(nothing) {
    // sets a new key, argument required but doesn't do anything
    // this._idempotency_key = uuidv4();
    this._idempotency_key = "something unique";
  }
  set fardel_one(parcel) {
    if (typeof parcel !== "object" || Array.isArray(parcel)) {
      throw new TypeError("Parcel must be a curly brace Object.");
    }

    if (Object.prototype.hasOwnProperty.call(this._fardel, "objects")) {
      delete this._fardel.objects;
      // } else if (!this._fardel.hasOwnProperty("object")) {
    } else if (!Object.prototype.hasOwnProperty.call(this._fardel, "object")) {
      Object.defineProperty(this._fardel, "object", {
        value: parcel,
        writable: true,
      });
    } else {
      this._fardel.object = parcel;
    }
  }

  set fardel_many(parcel) {
    if (!Array.isArray(parcel)) {
      throw new TypeError("Parcel must be an array.");
    }
    if (Object.prototype.hasOwnProperty.call(this._fardel, "object")) {
      delete this._fardel.object;
    } else if (!Object.prototype.hasOwnProperty.call(this._fardel, "objects")) {
      Object.defineProperty(this._fardel, "objects", {
        value: parcel,
        writable: true,
      });
    } else {
      this._fardel.objects = parcel;
    }
  }

  set payload_one(parcel) {
    this._payload = parcel;
  }
  set payload_array(parcel) {
    this._payload.push(parcel);
  }

  attach(parcel) {
    if (this.payload === undefined) {
      this.payload_one = parcel;
    } else if (
      typeof (this.payload === "object") &&
      !Array.isArray(this.payload)
    ) {
      let cache = this.payload;
      this.payload_one = [];
      this.payload_array = cache;
      this.payload_array = parcel;
    } else if (Array.isArray(this.payload)) {
      this.payload_array = parcel;
    } else {
      throw new TypeError(
        "Catalog Object attach method error. Make sure you passed in a Catalog Object"
      );
    }
    return this;
  }
  // because I keep calling add, even though it's supposed to be attach
  add(parcel) {
    this.attach(parcel);
    return this;
  }

  finalize() {
    // the needs of the many outweigh the needs of the few, or the one
    if (Array.isArray(this.payload)) {
      this.fardel_many = this.payload;
    } else {
      this.fardel_one = this.payload;
    }
  }
}

var a = { a: 1 };
var b = { b: 2 };
var c = { c: 3 };
var d = { d: 4 };
var e = { e: 5 };
var thing = new Catalog_Object();
thing.attach(a);
thing.add(b).attach(c).add(d);
thing.attach(e);
thing.finalize();
console.log(thing.payload);
console.log(thing.fardel);

class Helper_Name {
  constructor(name) {
    this.character_limit = 255;
    this._name;
    this.name = name;
  }
  get name() {
    return this._name;
  }
  set name(str) {
    if (this.maxLength(this.character_limit, str)) {
      this._name = str;
    }
  }
  maxLength(max, str = "") {
    if (str.length > max) {
      throw new Error(`Surpassed maximum character limit of ${max}.\n${str}`);
    }
    return true;
  }
}

class Category extends Helper_Name {
  constructor(name) {
    super(name);
    this._type = "CATEGORY";
    this._present_at_all_locations = true;
  }
  get type() {
    return this._type;
  }
  get present_at_all_locations() {
    return this._present_at_all_locations;
  }

  set type(bool) {
    this._type = "CATEGORY";
  }
  set present_at_all_locations(bool) {
    this._present_at_all_locations = bool;
  }

  parcel() {
    return {
      type: this.type,
      id: `#${this.name}`,
      present_at_all_locations: this.present_at_all_locations,
      category_data: {
        name: this.name,
      },
    };
  }
}

//MAYBE instead of a unique class, have a METHOD
// on the ITEM class that makes this as a property...
// or a have a method that instantiates this class?
// or require the user to make one, then when it's added to an item
// the item_id gets set then
class Item_Variation extends Helper_Name {
  constructor(item_id, name) {
    super(name);
    this._type = "ITEM_VARIATION";
    // id of associated item
    this._item_id = item_id; //must be set by Item class
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
  set type(bool) {
    this._type = "ITEM_VARIATION";
  }

  set id(id) {
    this._item_id = id;
  }
  // new standard name for chain setters
  spawn() {}
}

class Item extends Helper_Name {
  constructor() {
    super();
    this._type = "ITEM";
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
  set type(bool) {
    this._type = "ITEM";
  }
}

module.exports = {
  Helper_Name,
  Category,
  Item,
  Item_Variation,
};
