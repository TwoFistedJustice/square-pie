const { nanoid } = require("nanoid");
const { pie_defaults } = require("./pie_defaults");
const {
  // define,
  minLength,
  maxLength,
  arrayify,
  money_helper,
} = require("./utilities");

class Order_Line_Item {
  constructor() {
    this._fardel = {
      uid: nanoid(pie_defaults.uid_length),
      quantity: undefined, // 1-12 REQUIRED set auto min of 1
      name: undefined,
      note: undefined,
      variation_name: undefined,
      catalog_object_id: undefined,
      catalog_version: undefined, // integer
      item_type: undefined, // FIXED
      base_price_money: undefined, // HELPER MONEY
      gross_sales_money: undefined, // HELPER MONEY
      applied_discounts: undefined, // ARRAY
      applied_taxes: undefined, // ARRAY
      modifiers: undefined, // ARRAY
      pricing_blocklists: undefined, // ARRAY
      quantity_unit: undefined, // ARRAY
      metadata: undefined, // do not implement in v1
    };
    this.configuration = {
      maximums: {
        quantity: 12,
        uid: 60,
        note: 2000,
        name: 512,
        variation_name: 400,
        catalog_object_id: 192,
      },
      minimums: {
        quantity: 1,
      },
    };
  }

  // GETTERS
  get uid() {
    return this._fardel.uid;
  }
  get quantity() {
    return this._fardel.quantity;
  }
  get name() {
    return this._fardel.name;
  }
  get note() {
    return this._fardel.note;
  }
  get variation_name() {
    return this._fardel.variation_name;
  }
  get catalog_object_id() {
    return this._fardel.catalog_object_id;
  }
  get catalog_version() {
    return this._fardel.catalog_version;
  }
  get item_type() {
    return this._fardel.item_type;
  }
  get base_price_money() {
    return this._fardel.base_price_money;
  }
  get gross_sales_money() {
    return this._fardel.gross_sales_money;
  }
  get applied_discounts() {
    return this._fardel.applied_discounts;
  }
  get applied_taxes() {
    return this._fardel.applied_taxes;
  }
  get modifiers() {
    return this._fardel.modifiers;
  }
  get pricing_blocklists() {
    return this._fardel.pricing_blocklists;
  }
  get quantity_unit() {
    return this._fardel.quantity_unit;
  }

  // SETTERS
  set uid(str) {
    if (maxLength(this.configuration.maximums.uid, str)) {
      this._fardel.uid = str;
    }
  }
  set quantity(str) {
    if (
      maxLength(this.configuration.maximums.quantity, str) &&
      minLength(this.configuration.minimums.quantity, str)
    ) {
      this._fardel.quantity = str;
    }
  }
  set name(str) {
    if (maxLength(this.configuration.maximums.name, str)) {
      this._fardel.name = str;
    }
  }
  set note(str) {
    if (maxLength(this.configuration.maximums.note, str)) {
      this._fardel.note = str;
    }
  }
  set variation_name(str) {
    if (maxLength(this.configuration.maximums.variation_name, str)) {
      this._fardel.variation_name = str;
    }
  }
  set catalog_object_id(id) {
    if (maxLength(this.configuration.maximums.catalog_object_id, id)) {
      this._fardel.catalog_object_id = id;
    }
  }
  set catalog_version(int) {
    this._fardel.catalog_version = int;
  }
  set item_type(fixed) {
    this._fardel.item_type = fixed;
  }
  set base_price_money(money) {
    this._fardel.base_price_money = money;
  }
  set gross_sales_money(money) {
    this._fardel.gross_sales_money = money;
  }
  set applied_discounts(obj) {
    if (arrayify(this._fardel, "applied_discounts")) {
      this._fardel.applied_discounts.push(obj);
    }
  }
  set applied_taxes(obj) {
    if (arrayify(this._fardel, "applied_taxes")) {
      this._fardel.applied_taxes.push(obj);
    }
  }
  set modifiers(obj) {
    if (arrayify(this._fardel, "modifiers")) {
      this._fardel.modifiers.push(obj);
    }
  }
  set pricing_blocklists(obj) {
    if (arrayify(this._fardel, "pricing_blocklist")) {
      this._fardel.pricing_blocklists.push(obj);
    }
  }
  set quantity_unit(obj) {
    if (arrayify(this._fardel, "quanity_unit")) {
      this._fardel.quantity_unit.push(obj);
    }
  }

  //PRIVATE METHODS
  // BUILDER METHODS
  // VANILLA METHODS

  make() {
    let methods = () => {
      const properties = {
        self: this,
        uid: function (val) {
          this.self.function = val;
          return this;
        },
        quantity: function (val) {
          this.self.function = val;
          return this;
        },
        name: function (val) {
          this.self.function = val;
          return this;
        },
        note: function (val) {
          this.self.function = val;
          return this;
        },
        variation_name: function (val) {
          this.self.variation_name = val;
          return this;
        },
        catalog_object_id: function (val) {
          this.self.catalog_object_id = val;
          return this;
        },
        catalog_version: function (val) {
          this.self.catalog_version = val;
          return this;
        },
        item_type: function (val) {
          this.self.function = val;
          return this;
        },
        base_price_money: function (amount, currency) {
          this.self.base_price_money = money_helper(amount, currency);
          return this;
        },
        gross_sales_money: function (amount, currency) {
          this.self.gross_sales_money = money_helper(amount, currency);
          return this;
        },
        applied_discounts: function (obj) {
          this.self.applied_discounts = obj;
          return this;
        },
        applied_taxes: function (obj) {
          this.self.applied_taxes = obj;
          return this;
        },
        modifiers: function (obj) {
          this.self.function = obj;
          return this;
        },
        pricing_blocklists: function (obj) {
          this.self.pricing_blocklists = obj;
          return this;
        },
        quantity_unit: function (obj) {
          this.self.quanity_unit = obj;
          return this;
        },
      };
      return properties;
    };
    return methods();
  }
}

module.exports = Order_Line_Item;
