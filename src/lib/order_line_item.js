const { nanoid } = require("nanoid");
const { uid_length } = require("./pie_defaults");
const {
  arrayify,
  arche_money,
  define,
  generate_error_message,
  shazam_min_length,
  shazam_max_length,
} = require("./utilities");
const order_line_item_enum = require("./enum/order_line_item_enum");
const man =
  "build one line item for an order.  \n" +
  "There are two make() methods here. The normal one. And make_modifier()\n" +
  "The make_modifier method builds a modifier object. But it does not insert\n" +
  " it into the modifiers array unless you tell it to. Call it's `add()` sub-method\n" +
  " last, with no arguments to insert the object\n\n" +
  "There are also standard Pie build and add methods for applied_tax and applied_discount.\n" +
  "\nhttps://developer.squareup.com/reference/square/objects/OrderLineItem";

class Order_Line_Item {
  _display_name = "Order_Line_Item";
  _last_verified_square_api_version = "2021-07-21";
  _help = this.display_name + ": " + man;
  constructor() {
    this._fardel = {
      uid: nanoid(uid_length),
      quantity: undefined, // 1-12 REQUIRED set auto min of 1
      name: undefined,
      note: undefined,
      variation_name: undefined,
      catalog_object_id: undefined,
      catalog_version: undefined, // integer
      item_type: undefined, // enum
      base_price_money: undefined, // Arche Money
      applied_discounts: undefined, // [id...]
      applied_taxes: undefined, // [id...]
      modifiers: undefined, // [id...]
      pricing_blocklists: undefined, // [id...]
      quantity_unit: undefined, // OBJECT
      metadata: undefined, // do not implement in v1
    };
    this._modifier = {}; // this will get cleared when it is added to the modifiers array
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
        // uid: 1,
      },
    };
  }

  //PRIVATE METHODS
  #init_modifier() {
    this.#modifier = {
      uid: nanoid(uid_length),
    };
  }

  #bake_quantity_unit() {
    this._fardel.quantity_unit = {};
    let obj = this._fardel.quantity_unit;

    return {
      // The catalog object ID referencing the CatalogMeasurementUnit when the unit already exists in the db
      catalog_object_id: function (val) {
        let key = "catalog_object_id";
        define(obj, key, val);
        return this;
      },
      // int64"
      catalog_version: function (int) {
        if (!Number.isInteger(int)) {
          throw new TypeError(
            generate_error_message("catalog_version", "integer 64", int)
          );
        }
        let key = "catalog_version";
        define(obj, key, int);
        return this;
      },
      // Archetype https://developer.squareup.com/reference/square/objects/MeasurementUnit
      measurement_unit: function (archetype) {
        let key = "measurement_unit";
        define(obj, key, archetype);
        return this;
      },
      // int between 0 and 5
      precision: function (int) {
        if (!Number.isInteger(int) || int < 0 || int > 5) {
          throw new TypeError(
            generate_error_message("precision", "integer 0-5", int)
          );
        }
        let key = "precision";
        define(obj, key, int);
        return this;
      },
    };
  }

  #applied_tax_or_discount(type, tax_or_discount_uid) {
    let caller = `#applied_tax_or_discount - ${type}`;
    if (
      shazam_min_length(
        this.configuration.minimums.uid,
        tax_or_discount_uid,
        caller
      ) &&
      shazam_max_length(
        this.configuration.maximums.uid,
        tax_or_discount_uid,
        caller
      )
    ) {
      let key;
      if (type === "discount" || type === "d") {
        key = "discount_uid";
      } else if (type === "tax" || type === "t") {
        key = "tax_uid";
      }
      return {
        [key]: tax_or_discount_uid,
        uid: nanoid(uid_length),
      };
    }
  }

  #enum_item_type() {
    return order_line_item_enum.item_type(this);
  }

  // GETTERS
  get display_name() {
    return this._display_name;
  }
  get square_version() {
    return `The last verified compatible Square API version is ${this._last_verified_square_api_version}`;
  }
  get help() {
    return this._help;
  }
  get fardel() {
    return this._fardel;
  }
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
  get applied_discounts() {
    return this._fardel.applied_discounts;
  }
  get applied_taxes() {
    return this._fardel.applied_taxes;
  }
  get modifiers() {
    // the array where modifiers are put
    return this._fardel.modifiers;
  }

  get modifier() {
    // gets the individual modifier object property which is a cache used to build the modifiers array
    return this._modifier;
  }

  get pricing_blocklists() {
    return this._fardel.pricing_blocklists;
  }
  get quantity_unit() {
    return this._fardel.quantity_unit;
  }

  // SETTERS
  set uid(str) {
    if (shazam_max_length(this.configuration.maximums.uid, str)) {
      this._fardel.uid = str;
    }
  }
  set quantity(str) {
    if (
      shazam_max_length(this.configuration.maximums.quantity, str) &&
      shazam_min_length(this.configuration.minimums.quantity, str)
    ) {
      this._fardel.quantity = str;
    }
  }
  set name(str) {
    if (shazam_max_length(this.configuration.maximums.name, str)) {
      this._fardel.name = str;
    }
  }
  set note(str) {
    if (shazam_max_length(this.configuration.maximums.note, str)) {
      this._fardel.note = str;
    }
  }
  set variation_name(str) {
    if (shazam_max_length(this.configuration.maximums.variation_name, str)) {
      this._fardel.variation_name = str;
    }
  }
  set catalog_object_id(id) {
    if (shazam_max_length(this.configuration.maximums.catalog_object_id, id)) {
      this._fardel.catalog_object_id = id;
    }
  }
  set catalog_version(int) {
    if (!Number.isInteger(int)) {
      throw new TypeError("catalog_version expects an integer.");
    }
    this._fardel.catalog_version = int;
  }
  set item_type(fixed) {
    this._fardel.item_type = fixed;
  }
  set base_price_money(money) {
    this._fardel.base_price_money = money;
  }
  set applied_discounts(obj) {
    arrayify(this._fardel, "applied_discounts", this._display_name);
    this._fardel.applied_discounts.push(obj);
  }
  set applied_taxes(obj) {
    arrayify(this._fardel, "applied_taxes", this._display_name);
    this._fardel.applied_taxes.push(obj);
  }
  /** @private made private to prevent accidentally calling the wrong setter- should only be called by #init_modifier
/** @private made private to prevent accidentally calling the wrong setter- should only be called by #init_modifier
 * */
  set #modifier(obj) {
    this._modifier = obj;
  }

  set modifiers(obj) {
    arrayify(this._fardel, "modifiers", this._display_name);
    this._fardel.modifiers.push(obj);
    // clear the modifier property after adding it the array
    this.#init_modifier();
  }

  set pricing_blocklists(obj) {
    arrayify(this._fardel, "pricing_blocklists", this._display_name);
    this._fardel.pricing_blocklists.push(obj);
  }
  set quantity_unit(obj) {
    this._fardel.quantity_unit = obj;
  }

  // BUILDER METHODS

  build_applied_tax(id) {
    let type = "tax";
    let obj = this.#applied_tax_or_discount(type, id);
    return obj;
  }

  build_applied_discount(id) {
    let type = "discount";
    let obj = this.#applied_tax_or_discount(type, id);
    return obj;
  }

  add_applied_tax(id) {
    let obj = this.build_applied_tax(id);
    this.applied_taxes = obj;
    return obj;
  }

  add_applied_discount(id) {
    let obj = this.build_applied_discount(id);
    this.applied_discounts = obj;
    return obj;
  }

  // MAKER METHODS

  make() {
    return {
      self: this,
      uid: function (val) {
        this.self.uid = val;
        return this;
      },
      quantity: function (val) {
        this.self.quantity = val;
        return this;
      },
      name: function (val) {
        this.self.name = val;
        return this;
      },
      note: function (val) {
        this.self.note = val;
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
      item_type: function () {
        return this.self.#enum_item_type();
      },
      base_price_money: function (amount, currency) {
        this.self.base_price_money = arche_money(amount, currency);
        return this;
      },
      /* make() applied taxes and discounts makes it
       * easy to put the info in, but hard to reference it after
       * Use the Build methods if you need to reference it afterwards
       * */
      applied_discounts: function (id) {
        let obj = this.self.#applied_tax_or_discount("discount", id);
        this.self.applied_discounts = obj;
        return this;
      },
      applied_taxes: function (id) {
        let obj = this.self.#applied_tax_or_discount("tax", id);
        this.self.applied_taxes = obj;
        return this;
      },
      modifiers: function (obj) {
        this.self.modifiers = obj;
        return this;
      },
      pricing_blocklists: function (obj) {
        this.self.pricing_blocklists = obj;
        return this;
      },
      quantity_unit: function () {
        return this.self.#bake_quantity_unit();
      },
    };
  }

  make_modifier() {
    this.#init_modifier();
    let caller = "order_line_item.make_modifier()";
    let modifier = this._modifier;
    return {
      self: this,
      price: function (amount, currency) {
        let key = "base_price_money";
        let value = arche_money(amount, currency);
        define(modifier, key, value);
        return this;
      },
      catalog_object_id: function (id) {
        if (
          shazam_max_length(
            this.self.configuration.catalog_object_id,
            id,
            caller
          )
        ) {
          let key = "catalog_object_id";
          define(modifier, key, id);
        }
        return this;
      },
      catalog_version: function (int64) {
        let key = "catalog_version";
        if (!Number.isInteger(int64)) {
          throw new TypeError(generate_error_message(key, "integer", int64));
        }
        define(modifier, key, int64);
        return this;
      },
      name: function (val) {
        if (
          shazam_max_length(
            this.self.configuration.catalog_object_id,
            val,
            caller
          )
        ) {
          let key = "name";
          define(modifier, key, val);
        }
        return this;
      },
      add: function () {
        this.self.modifiers = modifier;
      },
    };
  }
}

module.exports = Order_Line_Item;
