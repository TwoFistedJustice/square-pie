const { maxLength, money_helper } = require("./utilities");

class Order_Discount {
  constructor() {
    this._fardel = {
      uid: undefined, // str60
      catalog_object_id: undefined, // str192  Discounts that do not reference a catalog object ID must have a type of FIXED_PERCENTAGE or FIXED_AMOUNT.
      catalog_version: undefined, // int64
      name: undefined, // str255
      percentage: undefined, // str10
      amount_money: undefined, // archetype money
      applied_money: undefined, // archetype money
      type: undefined, // str enum
      scope: undefined, // str enum
    };
    this.configuration = {
      maximums: {
        uid: 60,
        catalog_object_id: 192,
        name: 255,
        percentage: 10,
      },
    };
  }

  // GETTERS
  get fardel() {
    if (this._fardel.catalog_object_id == undefined) {
      if (
        this._fardel.type !== "FIXED_PERCENTAGE" &&
        this._fardel.type !== "FIXED_AMOUNT"
      ) {
        let message =
          "Discounts that do not reference a catalog object ID must have a type of FIXED_PERCENTAGE or FIXED_AMOUNT.";
        throw new Error(message);
      }
    }
    return this._fardel;
  }
  get uid() {
    return this._fardel.uid;
  }
  get catalog_object_id() {
    return this._fardel.catalog_object_id;
  }
  get catalog_version() {
    return this._fardel.catalog_version;
  }
  get name() {
    return this._fardel.name;
  }
  get type() {
    return this._fardel.type;
  }
  get percentage() {
    return this._fardel.percentage;
  }
  get amount_money() {
    return this._fardel.amount_money;
  }
  get applied_money() {
    return this._fardel.applied_money;
  }
  get scope() {
    return this._fardel.scope;
  }
  // SETTERS
  set uid(val) {
    let caller = "uid";
    if (maxLength(this.configuration.maximums.uid, val, caller));
    {
      this._fardel.uid = val;
    }
  }
  set catalog_object_id(val) {
    let caller = "catalog_object_id";
    if (maxLength(this.configuration.maximums.catalog_object_id, val, caller));
    {
      this._fardel.catalog_object_id = val;
    }
  }
  set catalog_version(val) {
    this._fardel.catalog_version = val;
  }
  set name(val) {
    let caller = "name";
    if (maxLength(this.configuration.maximums.name, val, caller));
    {
      this._fardel.name = val;
    }
  }
  set type(val) {
    this._fardel.type = val;
  }
  set percentage(percent) {
    if (
      (!typeof percent === "string" && !typeof percent === "number") ||
      Number.isNaN(Number(percent))
    ) {
      throw new Error(
        '"percentage expects strings that can be converted to a number and actual numbers."'
      );
    }
    let caller = "percentage";
    if (maxLength(this.configuration.maximums.percentage, percent, caller)) {
      this._fardel.percentage = percent;
    }
  }
  set amount_money(val) {
    this._fardel.amount_money = val;
  }
  set applied_money(val) {
    this._fardel.applied_money = val;
  }
  set scope(val) {
    this._fardel.scope = val;
  }

  // PRIVATE METHODS

  #enum_type() {
    let methods = () => {
      let properties = {
        self: this,
        unknown: function () {
          this.self.type = "UNKNOWN_DISCOUNT";
          return this;
        },
        fixed_percentage: function () {
          this.self.type = "FIXED_PERCENTAGE";
          return this;
        },
        fixed_amount: function () {
          this.self.type = "FIXED_AMOUNT";
          return this;
        },
        variable_percentage: function () {
          this.self.type = "VARIABLE_PERCENTAGE";
          return this;
        },
        variable_amount: function () {
          this.self.type = "VARIABLE_AMOUNT";
          return this;
        },
      };
      return properties;
    };
    return methods();
  }

  #enum_scope() {
    let methods = () => {
      let properties = {
        self: this,
        other: function () {
          this.self.scope = "OTHER_DISCOUNT_SCOPE";
          return this;
        },
        line_item: function () {
          this.self.scope = "LINE_ITEM";
          return this;
        },
        order: function () {
          this.self.scope = "ORDER";
          return this;
        },
      };
      return properties;
    };
    return methods();
  }

  // VANILLA METHODS
  make() {
    let methods = () => {
      let properties = {
        self: this,
        uid: function (val) {
          this.self.uid = val;
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
        name: function (val) {
          this.self.name = val;
          return this;
        },
        type: function () {
          return this.self.#enum_type();
        },
        percentage: function (val) {
          this.self.percentage = val;
          return this;
        },
        amount_money: function (amount, currency) {
          this.self.amount_money = money_helper(amount, currency);
          return this;
        },
        applied_money: function (amount, currency) {
          this.self.applied_money = money_helper(amount, currency);
          return this;
        },
        scope: function () {
          return this.self.#enum_scope();
        },
      };
      return properties;
    };
    return methods();
  }
}

module.exports = Order_Discount;
