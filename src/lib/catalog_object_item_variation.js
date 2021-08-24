const { Helper_Name } = require("./catalog_object_helpers");
const { setter_chain_generator_config } = require("./utilities_curry");
// const { setter_chain_generator_config } = require("./utilities_curry");

class Catalog_Object_Item_Variation extends Helper_Name {
  constructor() {
    super();
    this._type = "ITEM_VARIATION";
    (this.configuration = {
      lengthLimits: {
        name: 255,
        user_data: 255,
      },
      keys: ["pricing_type", "inventory_alert_type"],
      pricing_type: ["FIXED_PRICING", "VARIABLE_PRICING"],
      inventory_alert_type: ["NONE", "LOW_QUANTITY"],
    }),
      (this._fardel = {
        item_variation_data: {
          available_for_booking: undefined, //
          service_duration: undefined, //
          item_id: "", // empty string to aid next step
          item_options_values: undefined, // ARRAY of ids
          location_overrides: undefined, // // [ CHAIN ]
          inventory_alert_type: undefined, //
          inventory_alert_type_threshold: undefined, //
          track_inventory: undefined, // // [ CHAIN T/F ]
          measurement_unit_id: undefined, //
          pricing_type: undefined, // // [ CHAIN ]
          price_money: undefined, // // [ CHAIN ]
          sku: undefined, // // can it be validated?
          stockable: undefined, //
          stockable_coversion: undefined, //
          team_member_ids: undefined, //
          upc: undefined, // // can it be validated? min ln:12 max ln:14
          user_data: undefined, // //255
        },
      });
  }

  get item_id() {
    return this._fardel.item_variation_data.item_id;
  }

  get sku() {
    return this._fardel.item_variation_data.sku;
  }
  get upc() {
    return this._fardel.item_variation_data.upc;
  }
  get pricing_type() {
    return this._fardel.item_variation_data.pricing_type;
  }
  get price_money() {
    return this._fardel.item_variation_data.price_money;
  }
  get location_overrides() {
    return this._fardel.item_variation_data.location_overrides;
  }
  get track_inventory() {
    return this._fardel.item_variation_data.track_inventory;
  }
  get inventory_alert_type() {
    return this._fardel.item_variation_data.inventory_alert_type;
  }
  get inventory_alert_type_threshold() {
    return this._fardel.item_variation_data.inventory_alert_type_threshold;
  }
  get user_data() {
    return this._fardel.item_variation_data.user_data;
  }
  get service_duration() {
    return this._fardel.item_variation_data.service_duration;
  }
  get available_for_booking() {
    return this._fardel.item_variation_data.available_for_booking;
  }
  get item_options_values() {
    return this._fardel.item_variation_data.item_options_values;
  }
  get measurement_unit_id() {
    return this._fardel.item_variation_data.measurement_unit_id;
  }
  get stockable() {
    return this._fardel.item_variation_data.stockable;
  }
  get team_member_ids() {
    return this._fardel.item_variation_data.team_member_ids;
  }
  get stockable_coversion() {
    return this._fardel.item_variation_data.stockable_coversion;
  }

  // call this from Item
  set item_id(id) {
    // will automatically be set when added to an Item, but you can set it here if you want
    this._fardel.item_variation_data.id = id;
  }
  set sku(sku) {
    this._fardel.item_variation_data.sku = sku;
  }

  set upc(upc) {
    // todo convert it to a string first
    // create validator for this - submit to validator.js
    // https://en.wikipedia.org/wiki/Universal_Product_Code#Check_digit_calculation
    this._fardel.item_variation_data.upc = upc;
  }

  // todo PRIORITY PRIORITY PRIORITY
  //  PRIORITY PRIORITY PRIORITY PRIORITY PRIORITY PRIORITY PRIORITY PRIORITY PRIORITY
  set pricing_type(str) {
    // todo obj, two props, one with fixed string value
    //  maybe make a central repository for all these fixed values...
    //  that would really simplify maintenance
    // The item variation's price, if fixed pricing is used.
    this._fardel.item_variation_data.pricing_type = str;
  }

  // todo PRIORITY PRIORITY PRIORITY
  //  PRIORITY PRIORITY PRIORITY PRIORITY PRIORITY PRIORITY PRIORITY PRIORITY PRIORITY
  set price_money(num) {
    this._fardel.item_variation_data.price_money = num;
  }

  set location_overrides(obj) {
    // todo practically a subclass unto itself...
    this._fardel.item_variation_data.location_overrides = obj;
  }
  set track_inventory(bool) {
    this._fardel.item_variation_data.track_inventory = bool;
  }
  set inventory_alert_type(str) {
    this._fardel.item_variation_data.inventory_alert_type = str;
  }
  set inventory_alert_type_threshold(str) {
    this._fardel.item_variation_data.inventory_alert_type_threshold = str;
  }
  set service_duration(num) {
    // todo If the CatalogItem that owns this item variation is of type APPOINTMENTS_SERVICE
    // enter the number in minutes - sets in ms (times 60 sec times 1000 ms)
    this._fardel.item_variation_data.service_duration = num * 60 * 1000;
  }
  set available_for_booking(bool) {
    // todo If the CatalogItem that owns this item variation is of type APPOINTMENTS_SERVICE
    this._fardel.item_variation_data.available_for_booking = bool;
  }
  set item_options_values(str) {
    // todo docs are unclear about this
    if (!Array.isArray(this._fardel.item_variation_data.item_options_values)) {
      this._fardel.item_variation_data.item_options_values = [];
    }
    this._fardel.item_variation_data.item_options_values.push(str);
  }
  set measurement_unit_id(str) {
    // If left unset, the item will be sold in whole quantities.
    this._fardel.item_variation_data.measurement_unit_id = str;
  }
  set stockable(bool) {
    // Whether stock is counted directly on this variation (TRUE) or only on its components (FALSE).
    // For backward compatibility missing values will be interpreted as TRUE.
    this._fardel.item_variation_data.stockable = bool;
  }
  set team_member_ids(str) {
    if (!Array.isArray(this._fardel.item_variation_data.team_member_ids)) {
      this._fardel.item_variation_data.team_member_ids = [];
    }
    this._fardel.item_variation_data.team_member_ids.push(str);
  }
  set stockable_coversion(obj) {
    // todo opinionated object
    this._fardel.item_variation_data.stockable_coversion = obj;
  }

  //

  set user_data(str) {
    // todo validate
    this._fardel.item_variation_data.user_data = str;
  }

  //METHODS
  spawn() {
    const methods = () => {
      const properties = {
        self: this,
        name: function (str) {
          this.self.name = str;
          return this;
        },
        present_at_all_locations: function (bool) {
          this.self.present_at_all_locations = bool;
          return this;
        },
        present_at_all_locations_ids: function (id) {
          this.present_at_all_locations_ids = id;
          return this;
        },
      };

      setter_chain_generator_config(this.configuration, properties, this);
      return properties;
    };
    return methods();
  }
}

// https://developer.squareup.com/reference/square/objects/CatalogItemVariation

/* -------------------------------------------------------------------
//  MAKE ITEM A SUB CLASS OF ITEM-VARIATION OR VICE VERSA
// GIVE ITEM A 'DEFAULT' VARIATION METHOD THAT CREATES A 'REGULAR' ONE
// OR
Make item variation a mixin...

or make a method called 'variation' and curry it

-------------------------------------------------------------------*/

//MAYBE instead of a unique class, have a METHOD
// on the ITEM class that makes this as a property...
// or a have a method that instantiates this class?
// or require the user to make one, then when it's added to an item
// the item_id gets set then
// class Item_Variation extends Helper_Name {
//   constructor(item_id, name) {
//     super(name);

// id of associated item

//   }
//   spawn() {}
// }

module.exports = Catalog_Object_Item_Variation;
