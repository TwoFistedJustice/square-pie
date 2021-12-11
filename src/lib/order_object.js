const {
  define,
  shazam_max_length,
  arrayify,
  arche_money,
} = require("./utilities/aaa_index");
const order_object_enum = require("./enum/order_object_enum");

/** @class  representing a
 * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
 * {@link https://developer.squareup.com/reference/square/objects/Order | Square Docs}
 * */
class Order_Object {
  _display_name = "Order_Object";
  _last_verified_square_api_version = "2021-07-21";
  constructor() {
    this._fardel = {
      version: undefined, //`BETA` - only for updates
      id: undefined,
      location_id: undefined, // required
      reference_id: undefined, // backend ID or this order
      customer_id: undefined, // `BETA`  MAX 191 -- make this required
      ticket_name: undefined, //`BETA`  str - this is persisted and gets displayed on any printouts
      state: undefined,
      source: undefined, //probably easiest to automatically set this to location id and leave an option to change it
      pricing_options: undefined,
      service_charges: undefined, // [{complex objects}]
      discounts: undefined, // [{complex objects}]
      taxes: undefined, // [{applied_money: {amount: 1, currency: "USD"}] - complex: see JSON example in docs
      fulfillments: undefined, // [{complex objects}]
      line_items: undefined, // [{complex objects}]
    };
    this.configuration = {
      maximums: {
        customer_id: 191,
        ticket_name: 30,
      },
    };
  }

  // GETTERS
  get display_name() {
    return this._display_name;
  }
  get square_version() {
    return `The last verified compatible Square API version is ${this._last_verified_square_api_version}`;
  }
  get fardel() {
    return this._fardel;
  }
  get version() {
    return this._fardel.version;
  }
  get id() {
    return this._fardel.id;
  }
  get location_id() {
    return this._fardel.location_id;
  }
  get reference_id() {
    return this._fardel.reference_id;
  }
  get customer_id() {
    return this._fardel.customer_id;
  }
  get ticket_name() {
    return this._fardel.ticket_name;
  }
  get state() {
    return this._fardel.state;
  }
  get source() {
    return this._fardel.source;
  }
  get pricing_options() {
    return this._fardel.pricing_options;
  }
  get service_charges() {
    return this._fardel.service_charges;
  }
  get discounts() {
    return this._fardel.discounts;
  }
  get taxes() {
    return this._fardel.taxes;
  }
  get fulfillments() {
    return this._fardel.fulfillments;
  }
  get line_items() {
    return this._fardel.line_items;
  }

  // SETTERS
  set version(ver) {
    this._fardel.version = ver;
  }
  set id(id) {
    this._fardel.id = id;
  }
  set location_id(id) {
    this._fardel.location_id = id;
  }
  set reference_id(id) {
    this._fardel.reference_id = id;
  }
  set customer_id(id) {
    let caller = "customer_id";
    if (
      shazam_max_length(this.configuration.maximums.customer_id, id, caller)
    ) {
      this._fardel.customer_id = id;
    }
  }
  set ticket_name(name) {
    let caller = "ticket_name";
    if (
      shazam_max_length(this.configuration.maximums.ticket_name, name, caller)
    ) {
      this._fardel.ticket_name = name;
    }
  }
  set state(val) {
    this._fardel.state = val;
  }
  set source(val) {
    this._fardel.source = val;
  }
  set pricing_options(obj) {
    if (
      !Object.prototype.hasOwnProperty.call(obj, "auto_apply_discounts") ||
      !Object.prototype.hasOwnProperty.call(obj, "auto_apply_taxes")
    ) {
      throw new Error(
        "pricing_options requires both auto_apply_discounts and auto_apply_taxes properties."
      );
    } else if (
      typeof obj.auto_apply_discounts !== "boolean" ||
      typeof obj.auto_apply_taxes !== "boolean"
    ) {
      throw new Error(
        "pricing_options arguments must be and object containing two booleans."
      );
    }
    if (arrayify(this._fardel, "pricing_options")) {
      this._fardel.pricing_options.push(obj);
    }
  }
  set service_charges(obj) {
    if (arrayify(this._fardel, "service_charges")) {
      this._fardel.service_charges.push(obj);
    }
  }
  set discounts(obj) {
    if (arrayify(this._fardel, "discounts")) {
      this._fardel.discounts.push(obj);
    }
  }
  set taxes(obj) {
    if (arrayify(this._fardel, "taxes")) {
      this._fardel.taxes.push(obj);
    }
  }
  set fulfillments(obj) {
    if (arrayify(this._fardel, "fulfillments")) {
      this._fardel.fulfillments.push(obj);
    }
  }
  set line_items(obj) {
    if (arrayify(this._fardel, "line_items")) {
      this._fardel.line_items.push(obj);
    }
  }

  // METHODS

  #enum_state() {
    return order_object_enum.state(this);
  }

  build_service_charge_amount(amount, currency) {
    let service_charge = {};
    let money = arche_money(amount, currency);
    define(service_charge, "amount_money", money);
    return service_charge;
  }

  build_service_charge_applied(amount, currency) {
    let service_charge = {};
    let money = arche_money(amount, currency);
    define(service_charge, "applied_money", money);
    return service_charge;
  }

  add_service_charge_amount(amount, currency) {
    let service_charge = {};
    let money = arche_money(amount, currency);
    define(service_charge, "amount_money", money);
    this.service_charges = service_charge;
    return service_charge;
  }

  add_service_charge_applied(amount, currency) {
    let service_charge = {};
    let money = arche_money(amount, currency);
    define(service_charge, "applied_money", money);
    this.service_charges = service_charge;
    return service_charge;
  }

  make() {
    return {
      self: this,
      version: function (ver) {
        this.self.version = ver;
        return this;
      },
      id: function (id) {
        this.self.id = id;
        return this;
      },
      location_id: function (id) {
        this.self.location_id = id;
        return this;
      },
      reference_id: function (id) {
        this.self.reference_id = id;
        return this;
      },
      customer_id: function (id) {
        this.self.customer_id = id;
        return this;
      },
      ticket_name: function (name) {
        this.self.ticket_name = name;
        return this;
      },
      state: function () {
        return this.self.#enum_state();
      },
      source: function (val) {
        this.self.source = val;
        return this;
      },
      pricing_options: function (auto_apply_discounts, auto_apply_taxes) {
        this.self.pricing_options = {
          auto_apply_discounts,
          auto_apply_taxes,
        };
        return this;
      },
      service_charges: function (obj) {
        this.self.service_charges = obj;
        return this;
      },
      discounts: function (obj) {
        this.self.discounts = obj;
        return this;
      },
      taxes: function (obj) {
        this.self.taxes = obj;
        return this;
      },
      fulfillments: function (obj) {
        this.self.fulfillments = obj;
        return this;
      },
      line_items: function (obj) {
        this.self.line_items = obj;
        return this;
      },
    };
  }
}
module.exports = Order_Object;
