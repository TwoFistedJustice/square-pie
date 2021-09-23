// this is not a super of fulfillment

// todo go onto the square forums and ask about those read only props...

class Order_Object {
  // _idempotency_key;// set on the Request, NOT the object

  constructor() {
    this._fardel = {
      version: undefined, //`BETA`
      id: undefined,
      location_id: undefined, // required
      reference_id: undefined, // backend ID or this order
      customer_id: undefined, // `BETA`  MAX 191 -- make this required
      ticket_name: undefined, //`BETA`  str - this is persisted and gets displayed on any printouts
      state: undefined, //OPEN, COMPLETED, CANCELED, DRAFT
      source: undefined, //probably easiest to automatically set this to location id and leave an option to change it
      pricing_options: undefined, // {pricing_options: bool, auto_apply_taxes: bool}
      service_charges: undefined, //[{amount_money: {amount: 1, currency: "USD"} }, {applied_money: {amount: 1, currency: "USD"}]
      discounts: undefined, //[{amount_money: {amount: 1, currency: "USD"} }, {applied_money: {amount: 1, currency: "USD"}]
      taxes: undefined, // [{applied_money: {amount: 1, currency: "USD"}] - complex: see JSON example in docs
      fulfillments: undefined, // [{complex objects}]
      line_items: undefined, // [{complex objects}]
    };
    this.configuration = {
      lengthLimits: {
        customer_id: 191,
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
    this._fardel.pricing_options.push(obj);
  }
  set service_charges(obj) {
    this._fardel.service_charges.push(obj);
  }
  set discounts(obj) {
    this._fardel.discounts.push(obj);
  }
  set taxes(obj) {
    this._fardel.taxes.push(obj);
  }
  set fulfillments(obj) {
    this._fardel.fulfillments.push(obj);
  }
  set line_items(obj) {
    this._fardel.line_items.push(obj);
  }

  // METHODS`
  make() {
    const methods = function () {
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
