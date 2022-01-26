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

  #applied_tax(uid) {
    let caller = `#applied_tax`;
    if (
      shazam_min_length(this.configuration.minimums.uid, uid, caller) &&
      shazam_max_length(this.configuration.maximums.uid, uid, caller)
    ) {
      return {
        tax_uid: uid,
        uid: "uid_applied_tax#" + nanoid(uid_length),
      };
    }
  }

  #applied_discount(uid) {
    let caller = `#applied_discount`;
    if (
      shazam_min_length(this.configuration.minimums.uid, uid, caller) &&
      shazam_max_length(this.configuration.maximums.uid, uid, caller)
    ) {
      return {
        discount_uid: uid,
        uid: "uid_applied_discount#" + nanoid(uid_length),
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

  build_applied_tax(uid) {
    let obj = this.#applied_tax(uid);
    return obj;
  }

  build_applied_discount(uid) {
    let obj = this.#applied_discount(uid);
    return obj;
  }

  add_applied_tax(uid) {
    let obj = this.build_applied_tax(uid);
    this.applied_taxes = obj;
    return obj;
  }

  add_applied_discount(uid) {
    let obj = this.build_applied_discount(uid);
    this.applied_discounts = obj;
    return obj;
  }

  // MAKER METHODS

  /** @function make()  method of SOME_CLASS - method names are exactly the same as the property names listed
   * in the Square docs. If the method is not listed here it takes one argument of the type specified by
   * the Square docs and sets the appropriate value. Only methods that do not behave as simple setters are
   * listed here.
   * @method base_price_money
   * @param {number} amount - an integer. Use the smallest currency, i.e. cents or pence. No decimals.
   * @param {string} currency = the three character currency designation. Automatically converts to uppercase.
   * @method applied_discounts
   * @param {string} id- the discount id. It will automatically build the expected object.
   * @method applied_taxes
   * @param {string} id- the tax id. It will automatically build the expected object.
   * @method modifiers - calls make_modifier()
   * @method pricing_blocklists - has two submethods 'discount' and 'tax' which call  make_discount_blocklist and make_tax_blocklist
   * @method quantity_unit
   * @param {}
   * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
   * @example
   *  You must use parentheses with every call to make and with every sub-method. If you have to make a lot
   *  of calls from different lines, it will reduce your tying and improve readability to set make() to a
   *  variable.
   *  let make = myVar.make();
   *   make.gizmo()
   *   make.gremlin()
   *
   * */
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
      applied_discounts: function (uid) {
        let obj = this.self.#applied_discount(uid);
        this.self.applied_discounts = obj;
        return this;
      },
      applied_taxes: function (uid) {
        let obj = this.self.#applied_tax(uid);
        this.self.applied_taxes = obj;
        return this;
      },
      modifiers: function () {
        return this.self.make_modifier();
      },
      pricing_blocklists: function () {
        return {
          discount: () => {
            return this.self.make_discount_blocklist();
          },
          tax: () => {
            return this.self.make_tax_blocklist();
          },
        };
      },
      quantity_unit: function () {
        return this.self.make_quantity_unit();
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
  /** @function make_discount_blocklist
   * @method uid - A unique ID of the BlockedTax within the order. This is set automatically. Only call this method if you want to use your own uid. Max length 60.
   * @param {string} uid - A unique ID of the BlockedTax within the order
   * @method discount_catalog_object_id - The catalog_object_id of the discount that should be blocked. Use this field to block catalog discounts. For ad hoc discounts, use the discount_uid field. Max length 192.
   * @param {string} id
   * @method discount_object - alias of discount_catalog_object_id
   * @method discount_uid - The uid of the discount that should be blocked. Use this field to block ad hoc discounts. For catalog, discounts use the discount_catalog_object_id field. Max length 60.
   * @param {string} uid
   * @method ad_hoc -alias of discount_uid
   * @method view - returns the object under construction
   * @method get_uid - returns the uid of the blocklist
   * @method add - calls the discount_blocklist setter and passes a new discount_blocklist object cloned from the the one you built.
   * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
   * {@link https://developer.squareup.com/reference/square/objects/OrderLineItemPricingBlocklistsBlockedTax | Square Docs}
   * #example
   let id = "alpha_numeric_gibberish"
   let blocklist1 = {
      uid: id,  // this is actually set automatically, but I didn't want it to feel left out, so I included it.
      discount_uid:id
    };
   let blocklist2 = {
      uid: id,
      discount_catalog_object_id: id,
    };
   
   let block1 = line.make_discount_blocklist();
   let block2 = line.make_discount_blocklist();
   block1.uid(id).ad_hoc(id).add();
   block2.uid(id).discount_object(id).add();
   line.pricing_blocklists => {blocked_discount : [blocklist1, blocklist2]}
   * */

  make_discount_blocklist() {
    let limits = this.configuration.maximums;
    const name = this.display_name;
    const caller = "order_line_item.make_discount_blocklist().";
    let blocklist = {
      uid: "uid_discount_blocklist#" + nanoid(uid_length),
      discount_catalog_object_id: undefined,
      discount_uid: undefined,
    };

    const reset = function () {
      for (let prop in blocklist) {
        if (prop === "uid") {
          blocklist.uid = "uid_discount_blocklist#" + nanoid(uid_length);
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
      discount_catalog_object_id: function (id) {
        if (
          shazam_max_length(
            limits.catalog_object_id,
            id,
            name,
            caller + "discount_catalog_object_id() / .discount_object()"
          )
        ) {
          blocklist.discount_catalog_object_id = id;
        }
        return this;
      },
      discount_object: function (id) {
        return this.discount_catalog_object_id(id);
      },
      discount_uid: function (uid) {
        if (
          shazam_max_length(
            limits.uid,
            uid,
            name,
            caller + "discount_uid() / .ad_hoc()"
          )
        ) {
          blocklist.discount_uid = uid;
        }
        return this;
      },
      ad_hoc: function (uid) {
        return this.discount_uid(uid);
      },
      view: function () {
        return blocklist;
      },
      get_uid: function () {
        return blocklist.uid;
      },
      add: function () {
        this.self.discount_blocklist = clone_object(blocklist);
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

  /** @function #make_quantity_unit(). Can be called directly or via make().quantity_unit().
   * @method catalog_object_id
   * @param {string} id - - The catalog object ID referencing the CatalogMeasurementUnit when the unit already exists in the db
   * @method catalog_version
   * @param {number} int - an integer number.
   * @method measurement_unit
   * @param {object} archetype - A MeasurementUnit that represents the unit of measure for the quantity.
   * @method precision
   * @param {number} int - an integer number. the number of digits after the decimal point that are recorded for this quantity. See Square docs.
   * @method id - alias of catalog_object_id
   * @method version- alias of catalog_version
   * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
   * {@link https://developer.squareup.com/reference/square/objects/OrderQuantityUnit | Square Docs}
   * */

  make_quantity_unit() {
    this._fardel.quantity_unit = {};
    let obj = this._fardel.quantity_unit;
    let name = this.display_name + ".make_quantity_unit.";
    return {
      catalog_object_id: function (id) {
        let key = "catalog_object_id";
        define(obj, key, id);
        return this;
      },
      catalog_version: function (int) {
        let key = "catalog_version";
        if (shazam_integer(int, name, key)) {
          define(obj, key, int);
        }
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
      id: function (id) {
        return this.catalog_object_id(id);
      },
      version: function (int) {
        return this.catalog_version(int);
      },
    };
  }
}

module.exports = Order_Line_Item;
