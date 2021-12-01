const { money_helper, maxLength, arrayify } = require("./utilities");
const Catalog_Object_Super = require("./catalog_object_super");
// // https://developer.squareup.com/reference/square/objects/CatalogItemVariation

class Catalog_Object_Item_Variation extends Catalog_Object_Super {
  _display_name = "Catalog_Object_Item_Variation";
  constructor() {
    super();
    this._fardel = {
      type: "ITEM_VARIATION",
      item_variation_data: {
        name: undefined,
        type: undefined,
        available_for_booking: undefined,
        service_duration: undefined,
        item_id: "", // empty string to aid next step
        item_options_values: undefined, // ARRAY of ids
        location_overrides: undefined, // [ CHAIN ]
        inventory_alert_type: undefined,
        inventory_alert_type_threshold: undefined,
        track_inventory: undefined,
        measurement_unit_id: undefined,
        pricing_type: undefined, // REQUIRED FIELD
        price_money: undefined,
        sku: undefined,
        stockable: undefined,
        stockable_conversion: undefined,
        team_member_ids: undefined,
        upc: undefined,
        user_data: undefined,
      },
    };

    this.configuration = {
      maximums: {
        name: 255,
        user_data: 255,
      },
    };
  }
  get display_name() {
    return this._display_name;
  }
  get fardel() {
    return this._fardel;
  }
  get item_id() {
    return this._fardel.item_variation_data.item_id;
  }
  get name() {
    return this._fardel.item_variation_data.name;
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
  get stockable_conversion() {
    return this._fardel.item_variation_data.stockable_conversion;
  }
  // this gets called automatically from Item - so you don't need to
  set item_id(id) {
    // will automatically be set when added to an Item, but you can set it here if you want
    this._fardel.item_variation_data.id = id;
  }
  // overrides super
  set name(str) {
    let caller = "name";
    if (maxLength(this.configuration.maximums.name, str, caller)) {
      this._fardel.item_variation_data.name = str;
    }
  }
  set available_for_booking(bool) {
    if (typeof bool !== "boolean") {
      throw new TypeError(
        `Item Variation.available_for_booking: ${
          this.name
        } received a ${typeof bool} but expects a boolean.`
      );
    }
    this.pricing_type = "VARIABLE_PRICING";
    this._fardel.item_variation_data.available_for_booking = bool;
  }
  set service_duration(num) {
    // enter the number in minutes - sets in ms (times 60 sec times 1000 ms)
    let parsed = parseInt(num);
    if (isNaN(parsed) || num != parsed) {
      throw new TypeError(
        `Item Variation: ${
          this.name
        } received a ${typeof num} but expects a number.`
      );
    }
    this.pricing_type = "VARIABLE_PRICING";
    this._fardel.item_variation_data.service_duration = num * 60 * 1000;
  }
  set item_options_values(str) {
    // todo Square docs are unclear about this - figurretowt
    if (arrayify(this._fardel.item_variation_data, "item_options_values")) {
      this._fardel.item_variation_data.item_options_values.push(str);
    }
  }
  set location_overrides(obj) {
    // todo practically a subclass unto itself...
    this._fardel.item_variation_data.location_overrides = obj;
  }
  set pricing_type(str) {
    if (str === "VARIABLE_PRICING") {
      this._fardel.item_variation_data.price_money = undefined;
    }
    this._fardel.item_variation_data.pricing_type = str;
  }
  // price_money is only used if pricing type is fixed. So set it to fixed and save a step.
  set price_money(money) {
    this._fardel.item_variation_data.pricing_type = "FIXED_PRICING";
    this._fardel.item_variation_data.price_money = money;
  }
  set inventory_alert_type(str) {
    this._fardel.item_variation_data.inventory_alert_type = str;
  }
  set inventory_alert_type_threshold(str) {
    this._fardel.item_variation_data.inventory_alert_type_threshold = str;
  }
  set track_inventory(bool) {
    this._fardel.item_variation_data.track_inventory = bool;
  }
  set measurement_unit_id(str) {
    // If left unset, the item will be sold in whole quantities.
    this._fardel.item_variation_data.measurement_unit_id = str;
  }
  set sku(sku) {
    this._fardel.item_variation_data.sku = sku;
  }
  set stockable(bool) {
    // Whether stock is counted directly on this variation (TRUE) or only on its components (FALSE).
    // For backward compatibility missing values will be interpreted as TRUE.
    if (typeof bool !== "boolean") {
      throw new TypeError(
        `Item Variation.stockable: ${
          this.name
        } received a ${typeof bool} but expects a boolean.`
      );
    }

    this._fardel.item_variation_data.stockable = bool;
  }
  set stockable_conversion(obj) {
    // todo opinionated object
    this._fardel.item_variation_data.stockable_conversion = obj;
  }
  set team_member_ids(str) {
    if (arrayify(this._fardel.item_variation_data, "team_member_ids")) {
      this._fardel.item_variation_data.team_member_ids.push(str);
    }
  }
  set upc(upc) {
    this._fardel.item_variation_data.upc = upc;
  }
  set user_data(str) {
    let caller = "user_data";
    if (maxLength(this.configuration.maximums.user_data, str, caller)) {
      this._fardel.item_variation_data.user_data = str;
    }
  }

  // PRIVATE METHODS

  #enum_inventory_alert_type() {
    return {
      self: this,
      none: function () {
        this.self.inventory_alert_type = "NONE";
        return this;
      },
      low_quantity: function () {
        this.self.inventory_alert_type = "LOW_QUANTITY";
        return this;
      },
      low: function () {
        return this.low_quantity();
      },
      out: function () {
        return this.none();
      },
    };
  }

  #enum_pricing_type() {
    return {
      self: this,
      fixed_pricing: function () {
        this.self.pricing_type = "FIXED_PRICING";
        return this;
      },
      variable_pricing: function () {
        this.self.pricing_type = "VARIABLE_PRICING";
        return this;
      },
      fixed: function () {
        return this.fixed_pricing();
      },
      variable: function () {
        return this.variable_pricing();
      },
    };
  }

  //METHODS
  make() {
    return {
      self: this,
      name: function (str) {
        this.self.name = str;
        return this;
      },
      present_at_all_locations: function (bool) {
        this.self.present_at_all_locations = bool;
        return this;
      },
      present_at_location_ids: function (id) {
        this.self.present_at_location_ids = id;
        return this;
      },
      available_for_booking: function (bool) {
        this.self.available_for_booking = bool;
        return this;
      },
      service_duration: function (num) {
        this.self.service_duration = num;
        return this;
      },
      item_options_values: function (str) {
        this.self.item_options_values = str;
        return this;
      },
      location_overrides: function (obj) {
        this.self.location_overrides = obj;
        return this;
      },
      inventory_alert_type_threshold: function (str) {
        this.self.inventory_alert_type_threshold = str;
        return this;
      },
      track_inventory: function (bool) {
        this.self.track_inventory = bool;
        return this;
      },
      measurement_unit_id: function (str) {
        this.self.measurement_unit_id = str;
        return this;
      },
      price_money: function (amount, currency) {
        this.self.price_money = money_helper(amount, currency);
        return this;
      },
      sku: function (str) {
        this.self.sku = str;
        return this;
      },
      stockable: function (bool) {
        this.self.stockable = bool;
        return this;
      },
      stockable_conversion: function (obj) {
        this.self.stockable_conversion = obj;
        return this;
      },
      team_member_ids: function (str) {
        this.self.team_member_ids = str;
        return this;
      },
      upc: function (upc) {
        this.self.upc = upc;
        return this;
      },
      user_data: function (str) {
        this.self.user_data = str;
        return this;
      },
      inventory_alert_type: function () {
        return this.self.#enum_inventory_alert_type();
      },
      pricing_type: function () {
        return this.self.#enum_pricing_type();
      },
    };
  }
}

module.exports = Catalog_Object_Item_Variation;
