const { nanoid } = require("nanoid");
const { uid_length } = require("./pie_defaults");
const {
  arrayify,
  arche_money,
  clone_object,
  define,
  generate_error_message,
  shazam_integer,
  shazam_min_length,
  shazam_max_length,
  object_does_not_have_property,
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
      uid: "uid_line_item_" + nanoid(uid_length),
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
      modifiers: undefined, // [{}...]
      pricing_blocklists: undefined, // { }
      quantity_unit: undefined, // OBJECT
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
    if (shazam_integer(int, this.display_name, "catalog_version")) {
      this._fardel.catalog_version = int;
    }
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
  set modifiers(obj) {
    arrayify(this._fardel, "modifiers", this._display_name);
    this._fardel.modifiers.push(obj);
  }

  set tax_blocklist(obj) {
    let blocklists;
    if (this._fardel.pricing_blocklists === undefined) {
      this._fardel.pricing_blocklists = {};
    }
    blocklists = this._fardel.pricing_blocklists;
    if (object_does_not_have_property(blocklists, "blocked_taxes")) {
      define(blocklists, "blocked_taxes", []);
    }
    blocklists.blocked_taxes.push(obj);
  }

  set discount_blocklist(obj) {
    let blocklists;
    if (this._fardel.pricing_blocklists === undefined) {
      this._fardel.pricing_blocklists = {};
    }
    blocklists = this._fardel.pricing_blocklists;

    if (object_does_not_have_property(blocklists, "blocked_discounts")) {
      define(blocklists, "blocked_discounts", []);
    }
    blocklists.blocked_discounts.push(obj);
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
      // todo - remove this or have it call the others
      pricing_blocklists: function (obj) {
        this.self.pricing_blocklists = obj;
        return this;
      },
      quantity_unit: function () {
        return this.self.#bake_quantity_unit();
      },
    };
  }

  /** @function make_modifier() - method one Order API Line_Item class
   * @method uid - This is set automatically. Only call this if you want to change it.
   * @param {string} uid A unique ID that identifies the modifier only within this order. Max Length 60
   * @method catalog_object_id - sets the id
   * @param {string} The catalog object ID referencing CatalogModifier. Max Length 192
   * @method catalog_version - sets teh catalog version
   * @param {number} int64 an integer - The version of the catalog object that this modifier references.
   * @method name - set the name of the modifier
   * @param {string} The name of the item modifier. Max length 255
   * @method price - set the base price and currency
   * @param {number} amount - an integer - The base price for the modifier.
   * @param {string} currency - three letter currency designation in ALL CAPS
   * @method view - returns the modifier object under construction
   * @method get_uid - returns the uid
   * @method add - calls the modifier setter and passes a  new modifier object cloned from the the one you built.
   * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
   * {@link  https://developer.squareup.com/reference/square/objects/OrderLineItemModifier| Square Docs}
   * @example
   *
   *  It is best to set the function call to a variable. Otherwise you may experience unwanted side effects.
   *  const mod = line.make_modifier()
   let obj1 = {
      uid: "123",  // no need to set this unless you want to, unique-ish id set automatically
      catalog_object_id: "456",
      catalog_version: 4,
      name: "Ethel",
      base_price_money: {
        amount: 428,
        currency: "CAD"
      }
    };
 
   let obj2 = {
      uid: "DEF", // no need to set this unless you want to, unique-ish id set automatically
      catalog_object_id: "ABC",
      catalog_version: 42,
      name: "Fred",
      base_price_money: {
        amount: 597,
        currency: "EUR"
      }
    };
   let ethel = line.make_modifier();
   let fred = line.make_modifier();
 
   ethel.uid("123").catalog_object_id("456").catalog_version(4).name("Ethel").price(428, "cad").add(); => pushes obj1
   fred.uid("DEF").catalog_object_id("ABC").name("Fred").catalog_version(42).price(597, "eur").add();  => pushes obj2
 
   line.modifiers => [obj1, obj2]
   
   ethel.view() => obj1 // returns the actual object in case you need to access it directly
   ehtel.get_uid => "123" // in case you need the uid
   
   *
   *
   * */
  make_modifier() {
    let limits = this.configuration.maximums;
    const name = this.display_name;
    const caller = "order_line_item.make_modifier().";
    let modifier = {
      uid: "uid_modifier#" + nanoid(uid_length),
      catalog_object_id: undefined,
      catalog_version: undefined,
      name: undefined,
      base_price_money: undefined,
    };
    const reset = function () {
      for (let prop in modifier) {
        if (prop === "uid") {
          modifier.uid = "uid_modifier_" + nanoid(uid_length);
        } else {
          modifier[prop] = undefined;
        }
      }
    };

    return {
      self: this,
      uid: function (uid) {
        if (shazam_max_length(limits.uid, uid, name, caller + "uid")) {
          modifier.uid = uid;
        }
        return this;
      },
      catalog_object_id: function (id) {
        let key = "catalog_object_id";
        if (shazam_max_length(limits.catalog_object_id, id, caller + key)) {
          modifier.catalog_object_id = id;
        }
        return this;
      },
      catalog_version: function (int64) {
        let key = "catalog_version";
        if (shazam_integer(int64, name, caller + key)) {
          modifier.catalog_version = int64;
        }
        return this;
      },
      name: function (val) {
        let key = "name";
        if (
          shazam_max_length(limits.catalog_object_id, val, name, caller + key)
        ) {
          modifier.name = val;
        }
        return this;
      },
      price: function (amount, currency) {
        let key = "base_price_money";
        modifier.base_price_money = arche_money(
          amount,
          currency,
          name,
          caller + key
        );
        return this;
      },

      view: function () {
        return modifier;
      },

      get_uid: function () {
        return modifier.uid;
      },
      add: function () {
        this.self.modifiers = clone_object(modifier);
        reset();
      },
    };
  }

  /** @function make_tax_blocklist
   * @method uid - A unique ID of the BlockedTax within the order. This is set automatically. Only call this method if you want to use your own uid. Max length 60.
   * @param {string} uid - A unique ID of the BlockedTax within the order
   * @method tax_catalog_object_id - The catalog_object_id of the tax that should be blocked. Use this field to block catalog taxes. For ad hoc taxes, use the tax_uid field. Max length 192.
   * @param {string} id
   * @method tax_object - alias of tax_catalog_object_id
   * @method tax_uid - The uid of the tax that should be blocked. Use this field to block ad hoc taxes. For catalog, taxes use the tax_catalog_object_id field. Max length 60.
   * @param {string} uid
   * @method ad_hoc -alias of tax_uid
   * @method view - returns the object under construction
   * @method get_uid - returns the uid of the blocklist
   * @method add - calls the tax_blocklist setter and passes a new tax_blocklist object cloned from the the one you built.
   * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
   * {@link https://developer.squareup.com/reference/square/objects/OrderLineItemPricingBlocklistsBlockedTax | Square Docs}
   * #example
   let id = "alpha_numeric_gibberish"
   let blocklist1 = {
      uid: id,  // this is actually set automatically, but I didn't want it to feel left out, so I included it.
      tax_uid:id
    };
   let blocklist2 = {
      uid: id,
      tax_catalog_object_id: id,
    };
 
   let block1 = line.make_tax_blocklist();
   let block2 = line.make_tax_blocklist();
   block1.uid(id).ad_hoc(id).add();
   block2.uid(id).tax_object(id).add();
   line.pricing_blocklists => {blocked_tax : [blocklist1, blocklist2]}
   * */

  make_tax_blocklist() {
    let limits = this.configuration.maximums;
    const name = this.display_name;
    const caller = "order_line_item.make_tax_blocklist().";
    let blocklist = {
      uid: "uid_tax_blocklist#" + nanoid(uid_length),
      tax_catalog_object_id: undefined,
      tax_uid: undefined,
    };

    const reset = function () {
      for (let prop in blocklist) {
        if (prop === "uid") {
          blocklist.uid = "uid_tax_blocklist#" + nanoid(uid_length);
        } else {
          blocklist[prop] = undefined;
        }
      }
    };

    return {
      self: this,
      uid: function (uid) {
        if (shazam_max_length(limits.uid, uid, name, caller + "uid()")) {
          blocklist.uid = uid;
        }
        return this;
      },
      tax_catalog_object_id: function (id) {
        if (
          shazam_max_length(
            limits.catalog_object_id,
            id,
            name,
            caller + "tax_catalog_object_id() / .tax_object()"
          )
        ) {
          blocklist.tax_catalog_object_id = id;
        }
        return this;
      },
      tax_object: function (id) {
        return this.tax_catalog_object_id(id);
      },
      tax_uid: function (uid) {
        if (
          shazam_max_length(
            limits.uid,
            uid,
            name,
            caller + "tax_uid() / .ad_hoc()"
          )
        ) {
          blocklist.tax_uid = uid;
        }
        return this;
      },
      ad_hoc: function (uid) {
        return this.tax_uid(uid);
      },
      view: function () {
        return blocklist;
      },
      get_uid: function () {
        return blocklist.uid;
      },
      add: function () {
        this.self.tax_blocklist = clone_object(blocklist);
        reset();
      },
    };
  }
}

module.exports = Order_Line_Item;
