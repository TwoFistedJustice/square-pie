// this is not a super of fulfillment

const { maxLength } = require("./utilities_curry");

class Order_Object {
  // _idempotency_key;// set on the Request, NOT the object

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
      service_charges: undefined,
      discounts: undefined,
      taxes: undefined, // [{applied_money: {amount: 1, currency: "USD"}] - complex: see JSON example in docs
      fulfillments: undefined, // [{complex objects}]
      line_items: undefined, // [{complex objects}]
    };
    this.configuration = {
      lengthLimits: {
        customer_id: 191,
        discount: {
          name: 255,
          percentage: 10,
          catalog_object_id: 192,
        },
        fulfillment: {
          uid: 60,
          cancel_reason: 100,
          pickup_details: {
            note: 500,
            curbside_pickup_details: {
              curbside_details: 250,
            },
          },
          shipment_details: {
            carrier: 50,
            failure_reason: 100,
            shipping_note: 500,
            shipping_type: 50,
            tracking_number: 100,
            tracking_url: 2000,
            display_name: 255,
            email_address: 255,
            phone_number: 17,
          },
        },
      },
    };
  }

  // GETTERS
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
    this._fardel.customer_id = id;
  }
  set ticket_name(name) {
    this._fardel.ticket_name = name;
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
    if (!Array.isArray(this.pricing_options)) {
      this._fardel.pricing_options = [];
    }
    this._fardel.pricing_options.push(obj);
  }
  set service_charges(obj) {
    // TODO RUSS set it to array if it isn't already
    if (!Array.isArray(this._fardel.service_charges)) {
      this._fardel.service_charges = [];
    }
    this._fardel.service_charges.push(obj);
  }
  set discounts(obj) {
    // TODO RUSS set it to array if it isn't already
    if (!Array.isArray(this._fardel.discounts)) {
      this._fardel.discounts = [];
    }
    this._fardel.discounts.push(obj);
  }
  set taxes(obj) {
    // TODO RUSS set it to array if it isn't already
    if (!Array.isArray(this._fardel.taxes)) {
      this._fardel.taxes = [];
    }
    this._fardel.taxes.push(obj);
  }
  set fulfillments(obj) {
    // TODO RUSS set it to array if it isn't already
    if (!Array.isArray(this._fardel.fulfillments)) {
      this._fardel.fulfillments = [];
    }
    this._fardel.fulfillments.push(obj);
  }
  set line_items(obj) {
    // TODO RUSS set it to array if it isn't already
    if (!Array.isArray(this._fardel.line_items)) {
      this._fardel.line_items = [];
    }
    this._fardel.line_items.push(obj);
  }

  // METHODS`

  #amount_money(amt, currency) {
    let amount = Number(amt);
    if (isNaN(amount) || typeof amt === "boolean") {
      throw new TypeError(`'amount' must be a number. received: ${typeof amt}`);
    }
    if (currency) {
      if (typeof currency !== "string" || currency.length !== 3) {
        throw new Error("Currency must be ISO 4217 compliant");
      }
    }
    return {
      amount_money: { amount, currency },
    };
  }

  #applied_money(amt, currency) {
    let amount = Number(amt);
    if (isNaN(amount) || typeof amt === "boolean") {
      throw new TypeError(`'amount' must be a number. received: ${typeof amt}`);
    }
    if (currency) {
      if (typeof currency !== "string" || currency.length !== 3) {
        throw new Error("Currency must be ISO 4217 compliant");
      }
    }
    return {
      applied_money: { amount, currency },
    };
  }

  // #applied_money(amount, currency) {
  //   if (currency) {
  //     if (typeof currency !== "string" || currency.length !== 3) {
  //       throw new Error("Currency must be ISO 4217 compliant");
  //     }
  //   }
  //   return {
  //     applied_money: amount,
  //     currency: currency,
  //   };
  // }

  build_state() {
    let methods = () => {
      let properties = {
        self: this,
        open: function () {
          this.self.state = "OPEN";
          return this;
        },
        completed: function () {
          this.self.state = "COMPLETED";
          return this;
        },
        canceled: function () {
          this.self.state = "CANCELED";
          return this;
        },
        draft: function () {
          this.self.state = "DRAFT";
          return this;
        },
      };
      return properties;
    };
    return methods();
  }

  build_service_charge_amount(amount, currency) {
    if (!currency) {
      currency = "USD";
    }
    let obj = this.#amount_money(amount, currency);
    this.service_charges = obj;
  }

  build_service_charge_applied(amount, currency) {
    if (!currency) {
      currency = "USD";
    }
    let obj = this.#applied_money(amount, currency);
    this.service_charges = obj;
  }

  build_discount() {
    let methods = () => {
      let discount = {};
      let define = (prop, val) => {
        Object.defineProperty(discount, prop, {
          value: val,
          enumerable: true,
        });
      };
      let properties = {
        self: this,
        uid: function (name) {
          define("uid", name);
          return this;
        },
        name: function (name) {
          if (maxLength(this.self.configuration.discount.name)) {
            define("catalog_object_id", name);
          }
          return this;
        },
        catalog_object_id: function (id) {
          // TODO RUSS - something funny going on in 'this'Land
          if (maxLength(this.self.configuration.discount.catalog_object_id)) {
            define("catalog_object_id", id);
          }
          return this;
        },
        scope_line: function () {
          define("scope", "LINE_ITEM");
          return this;
        },
        scope_order: function () {
          define("scope", "ORDER");
          return this;
        },
        percentage: function (percent) {
          if (
            (!typeof percent === "string" && !typeof percent === "number") ||
            Number.isNaN(Number(percent))
          ) {
            throw new Error(
              '"build_discount.percentage() only accepts numbers and strings that can be converted to a number."'
            );
          }
          define("percentage", percent);
          return this;
        },
        type_percentage: function () {
          define("type", "FIXED_PERCENTAGE");
          return this;
        },
        type_amount: function () {
          define("type", "FIXED_AMOUNT");
          return this;
        },
        amount_money: function (amount, currency) {
          let obj = this.self.#amount_money(amount, currency);
          define("amount_money", obj);
          return this;
        },
        applied_money: function (amount, currency) {
          let obj = this.self.#applied_money(amount, currency);
          define("applied_money", obj);
          return this;
        },
        pricing_rule_id: function (id) {
          define("pricing_rule_id", id);
          return this;
        },
        reward_ids: function (id) {
          // check if discount.reward_ids is an array
          if (!Array.isArray(discount.reward_ids)) {
            define("reward_ids", []);
          }
          discount.reward_ids.push(id);
          return this;
        },

        add: function () {
          if (
            !!discount.name &&
            !Object.prototype.hasOwnProperty.call(discount, "uid")
          ) {
            let uid = discount.name.toLowerCase();
            define("uid", uid.replace(" ", "-"));
          }
          if (
            !Object.prototype.hasOwnProperty.call(
              discount,
              "catalog_object_id"
            ) &&
            !Object.prototype.hasOwnProperty.call(discount, "type")
          ) {
            throw new Error(
              "If discount does not have catalog_object_id then it MUST have a type of either FIXED_PERCENTAGE or FIXED_AMOUNT."
            );
          }

          this.self.discounts = discount;
        },
      };
      return properties;
    };
    return methods();
  } // END build_discount()
  // TODO - see pie_order_object.md
  build_fulfillment_pickup() {
    let methods = () => {
      const properties = { self: this };
      return properties;
    };
    return methods();
  }
  // TODO - see pie_order_object.md
  build_fulfillment_shipment() {
    let methods = function () {
      const properties = { self: this };
      return properties;
    };
    return methods();
  }
  // TODO - see pie_order_object.md
  build_line_item() {
    let methods = () => {
      const properties = { self: this };
      return properties;
    };
    return methods();
  }

  //todo make sure object destructuring syntax works
  pricing(auto_apply_discounts, auto_apply_taxes) {
    this.pricing_options = { auto_apply_discounts, auto_apply_taxes };
  }

  make() {
    const methods = () => {
      const properties = {
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
        state: function (val) {
          this.self.state = val;
          return this;
        },
        source: function (val) {
          this.self.source = val;
          return this;
        },
        pricing_options: function (obj) {
          this.self.pricing_options = obj;
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
      return properties;
    };
    return methods();
  }
}
module.exports = Order_Object;
