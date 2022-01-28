const { number_quantity_regex } = require("./regex");
const {
  arche_money,
  arrayify,
  clone_object,
  shazam_max_length,
  shazam_boolean,
  shazam_integer,
} = require("./utilities");
const Catalog_Object_Super = require("./catalog_object_abstract_super");
const man =
  "Creates a Catalog Item-Variation which you must then add to an 'Item'.\n" +
  "\nhttps://developer.squareup.com/reference/square_2021-12-15/objects/CatalogItemVariation";

class Catalog_Item_Variation extends Catalog_Object_Super {
  _display_name = "Catalog_Item_Variation";
  _last_verified_square_api_version = "2021-12-15";
  _help = this.display_name + ": " + man;
  constructor() {
    super();
    this._fardel = {
      id: undefined,
      present_at_all_locations: undefined, // bool
      present_at_location_ids: undefined, //[str]
      type: "ITEM_VARIATION",
      item_variation_data: {
        name: undefined, // str 255
        type: undefined, //
        available_for_booking: undefined,
        service_duration: undefined, // int64
        item_id: "", // empty string to aid next step
        item_option_values: undefined, // [ {}, {}, ... ]
        location_overrides: undefined, // [ {}, {}, ... ]
        inventory_alert_type: undefined,
        inventory_alert_threshold: undefined,
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
  get inventory_alert_threshold() {
    return this._fardel.item_variation_data.inventory_alert_threshold;
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
  get item_option_values() {
    return this._fardel.item_variation_data.item_option_values;
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
  /** setter: id
   *  will automatically be set when added to an Item, but you can set it here if you want
   * @param {string} an item ID
   * @return sets the id
   * */
  set item_id(id) {
    this._fardel.item_variation_data.item_id = id;
  }
  // overrides super
  set name(str) {
    if (shazam_max_length(this.configuration.maximums.name, str, "name")) {
      this._fardel.item_variation_data.name = str;
    }
  }
  set available_for_booking(bool) {
    if (shazam_boolean(bool, this._display_name, "available_for_booking")) {
      this.pricing_type = "VARIABLE_PRICING";
      this._fardel.item_variation_data.available_for_booking = bool;
    }
  }
  /**
   * @param {number} num must be an integer representing the number of minutes
   * @throws Throws a Typeerror if num is not an integer
   * @return Sets pricing_type to "VARIABLE_PRICING" and sets service_duration to duration in milliseconds
   * */
  set service_duration(num) {
    if (shazam_integer(num, this._display_name, "service_duration")) {
      this.pricing_type = "VARIABLE_PRICING";
      this._fardel.item_variation_data.service_duration = num * 60 * 1000;
    }
  }
  // todo - this is wrong, it takes an object
  set item_option_values(obj) {
    // Square docs are unclear about this
    arrayify(this._fardel.item_variation_data, "item_option_values");
    this._fardel.item_variation_data.item_option_values.push(obj);
  }
  set location_overrides(obj) {
    arrayify(
      this._fardel.item_variation_data,
      "location_overrides",
      this.display_name
    );
    this._fardel.item_variation_data.location_overrides.push(obj);
  }
  set pricing_type(str) {
    if (str === "VARIABLE_PRICING" && this.price_money !== undefined) {
      this.#price_money_error("pricing_type", this.price_money);
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
  set inventory_alert_threshold(int) {
    if (shazam_integer(int, this._display_name, "inventory_alert_threshold"));
    {
      this._fardel.item_variation_data.inventory_alert_threshold = int;
    }
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
    if (shazam_boolean(bool, this._display_name, "stockable")) {
      this._fardel.item_variation_data.stockable = bool;
    }
  }
  set stockable_conversion(obj) {
    this._fardel.item_variation_data.stockable_conversion = obj;
  }
  set team_member_ids(str) {
    arrayify(
      this._fardel.item_variation_data,
      "team_member_ids",
      this._display_name
    );
    this._fardel.item_variation_data.team_member_ids.push(str);
  }
  set upc(upc) {
    this._fardel.item_variation_data.upc = upc;
  }
  set user_data(str) {
    if (
      shazam_max_length(this.configuration.maximums.user_data, str, "user_data")
    ) {
      this._fardel.item_variation_data.user_data = str;
    }
  }

  // PRIVATE METHODS

  #build_stockable_conversion() {
    if (this._fardel.item_variation_data.stockable_conversion === undefined) {
      this._fardel.item_variation_data.stockable_conversion = {
        stockable_item_variation_id: undefined,
        nonstockable_quantity: undefined,
        stockable_quantity: undefined,
      };
    }

    let stockable_conversion =
      this._fardel.item_variation_data.stockable_conversion;

    return {
      self: this,
      stockable_item_variation_id: function (id) {
        stockable_conversion.stockable_item_variation_id = id;
        return this;
      },
      nonstockable_quantity: function (qty) {
        if (
          this.self.#stockable_quantity_validate(qty, "nonstockable_quantity")
        ) {
          stockable_conversion.nonstockable_quantity = qty;
        }
        return this;
      },
      stockable_quantity: function (qty) {
        if (this.self.#stockable_quantity_validate(qty, "stockable_quantity")) {
          stockable_conversion.stockable_quantity = qty;
        }
        return this;
      },
      id: function (id) {
        return this.stockable_item_variation_id(id);
      },
    };
  }

  #stockable_quantity_validate(quantity, caller) {
    let name = this.display_name + " stockable_conversions";
    quantity = quantity + "";
    if (number_quantity_regex.test(quantity) !== true) {
      let message =
        name +
        "." +
        caller +
        " accepts a decimal number in a string format that can take up " +
        "to 10 digits before the decimal point and up to 5 digits after the decimal point. Leading zeros are not allowed. " +
        "Received: " +
        quantity;
      throw new Error(message);
    } else {
      return true;
    }
  }

  #price_money_error(caller, price_money) {
    let message =
      this.display_name +
      "." +
      caller +
      " attempted to set price_money to " +
      "{amount: " +
      price_money.amount +
      ", currency: " +
      '"' +
      price_money.currency +
      '"' +
      "} and pricing_type " +
      'to "VARIABLE_PRICING". This is not allowed.';

    throw new Error(message);
  }

  #enum_inventory_alert_type(object_to_modify, calling_this) {
    return {
      self: this,
      none: function () {
        object_to_modify.inventory_alert_type = "NONE";
        return calling_this;
      },
      low_quantity: function () {
        object_to_modify.inventory_alert_type = "LOW_QUANTITY";
        return calling_this;
      },
      low: function () {
        return this.low_quantity();
      },
      out: function () {
        return this.none();
      },
    };
  }

  //  won't need 'return this' since it only sets one value and doesn't stack with make() sub-methods
  #enum_pricing_type(object_to_modify, calling_this) {
    return {
      self: this,
      fixed_pricing: function () {
        object_to_modify.pricing_type = "FIXED_PRICING";
        return calling_this;
      },
      variable_pricing: function () {
        object_to_modify.pricing_type = "VARIABLE_PRICING";
        return calling_this;
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
      item_id: function (id) {
        this.self.item_id = id;
        return this;
      },
      item_option_values: function (option_id, value_id) {
        this.self.item_option_values = {
          item_option_id: option_id,
          item_option_value_id: value_id,
        };
        return this;
      },
      location_overrides: function () {
        return this.self.make_location_override();
      },
      inventory_alert_threshold: function (int) {
        this.self.inventory_alert_threshold = int;
        return this;
      },
      inventory_alert_type: function () {
        return this.self.#enum_inventory_alert_type(this.self, this);
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
        this.self.price_money = arche_money(amount, currency);
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
      stockable_conversion: function () {
        return this.self.#build_stockable_conversion();
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

      pricing_type: function () {
        return this.self.#enum_pricing_type(this.self, this);
      },
    };
  }

  make_location_override() {
    let name = this.display_name + ".make_location_override().";
    let override = {
      location_id: undefined, // id
      price_money: undefined, // money // arch money
      pricing_type: undefined, // enum fixed or variable  // use #enum_pricing_type() {
      track_inventory: undefined, //bool
      inventory_alert_type: undefined, // none or low // #enum_inventory_alert_type() {
      inventory_alert_threshold: undefined, // int
    };
    return {
      self: this,
      location_id: function (id) {
        override.location_id = id;
        return this;
      },
      price_money: function (amount, currency) {
        override.pricing_type = "FIXED_PRICING";
        override.price_money = arche_money(amount, currency);
        return this;
      },
      pricing_type: function () {
        return this.self.#enum_pricing_type(override, this);
      },
      track_inventory: function (bool) {
        override.track_inventory = bool;
        return this;
      },
      inventory_alert_type: function () {
        return this.self.#enum_inventory_alert_type(override, this);
      },
      inventory_alert_threshold: function (int) {
        if (shazam_integer(int, name, "inventory_alert_threshold")) {
          override.inventory_alert_threshold = int;
        }
        return this;
      },
      price(amount, currency) {
        return this.price_money(amount, currency);
      },
      alert_type: function () {
        return this.inventory_alert_type();
      },
      alert_threshold: function (int) {
        return this.inventory_alert_threshold(int);
      },

      view: function () {
        return override;
      },
      add: function () {
        if (
          override.price_money !== undefined &&
          override.pricing_type === "VARIABLE_PRICING"
        ) {
          this.self.#price_money_error(
            "make_location_override().add()",
            override.price_money
          );
        }
        this.self.location_overrides = clone_object(override);
      },
    };
  }
}

module.exports = Catalog_Item_Variation;
