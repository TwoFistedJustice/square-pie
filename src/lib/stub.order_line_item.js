const { nanoid } = require("nanoid");
// const { define, maxLength } = require("./utilities");

class Order_Line_Item {
  constructor() {
    this._fardel = {
      uid: nanoid(10),
      quantity: undefined, // 1-12 REQUIRED set auto min of 1
      name: undefined,
      note: undefined,
      variation_name: undefined,
      catalog_object_id: undefined,
      catalog_version: undefined, // integer
      item_type: undefined, // FIXED
      base_price_money: undefined, // ARCHETYPE MONEY
      gross_sales_money: undefined, // ARCHETYPE MONEY
      applied_discounts: undefined, // ARRAY
      applied_taxes: undefined, // ARRAY
      modifiers: undefined, // ARRAY
      pricing_blocklists: undefined, // ARRAY
      quanity_unit: undefined, // ARRAY
      metadata: undefined, // do not implement in v1
    };
    this.configuration = {
      lengthLimits: {
        uid: 60,
        note: 2000,
        name: 512,
        variation_name: 400,
        catalog_object_id: 192,
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
  get quanity_unit() {
    return this._fardel.quanity_unit;
  }

  // SETTERS
  set uid(val) {
    this._fardel.uid = val;
  }
  set quantity(val) {
    this._fardel.quantity = val;
  }
  set name(val) {
    this._fardel.name = val;
  }
  set variation_name(val) {
    this._fardel.variation_name = val;
  }
  set catalog_object_id(val) {
    this._fardel.catalog_object_id = val;
  }
  set catalog_version(val) {
    this._fardel.catalog_version = val;
  }
  set item_type(val) {
    this._fardel.item_type = val;
  }
  set base_price_money(val) {
    this._fardel.base_price_money = val;
  }
  set gross_sales_money(val) {
    this._fardel.gross_sales_money = val;
  }
  set applied_discounts(obj) {
    // check if array exists on property
    // if not, then create it
    // push object onto array
    this._fardel.applied_discounts.push(obj);
  }
  set applied_taxes(obj) {
    // check if array exists on property
    // if not, then create it
    // push object onto array
    this._fardel.applied_taxes.push(obj);
  }
  set modifiers(obj) {
    // check if array exists on property
    // if not, then create it
    // push object onto array
    this._fardel.modifiers.push(obj);
  }
  set pricing_blocklists(obj) {
    // check if array exists on property
    // if not, then create it
    // push object onto array
    this._fardel.pricing_blocklists.push(obj);
  }
  set quanity_unit(obj) {
    // check if array exists on property
    // if not, then create it
    // push object onto array
    this._fardel.quanity_unit.push(obj);
  }

  //PRIVATE METHODS
  // BUILDER METHODS
  // VANILLA METHODS

  make() {
    let methods = () => {
      const properties = {
        self: this,
      };
      return properties;
    };
    return methods();
  }
}

module.exports = Order_Line_Item;
