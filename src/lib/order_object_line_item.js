const { nanoid } = require("nanoid");
const { uid_length } = require("./pie_defaults");
const {
  arrayify,
  arche_money,
  clone_object,
  define,
  generate_error_message,
  shazam_is_integer,
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
  "https://developer.squareup.com/reference/square/objects/OrderLineItem";

/**
 * {@link https://developer.squareup.com/reference/square/objects/OrderLineItem |  **-------> Link To Square Docs <-------**}
 * @class Order_Line_Item
 * @classdesc
 *
 * Build one line item for an order.<br><br>
 * There are two make() methods here: The normal one. And make_modifier()<br><br>
 * The make_modifier method builds a modifier object. But it does not insert it into the modifiers array unless you tell it to. Call it's `add()` sub-method last, with no arguments to insert the object <br><br>
 * There are also standard Pie build and add methods for applied_tax and applied_discount.
 
 * */

class Order_Line_Item {
  _display_name = "Order_Line_Item";
  _last_verified_square_api_version = "2021-07-21";
  _help = this.display_name + ": " + man;
  constructor() {
    this._fardel = {
      uid: "uid_line_item#" + nanoid(uid_length),
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
      quantity_unit: undefined, // { }
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
      shazam_min_length(uid, this.configuration.minimums.uid, caller) &&
      shazam_max_length(uid, this.configuration.maximums.uid, caller)
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
      shazam_min_length(uid, this.configuration.minimums.uid, caller) &&
      shazam_max_length(uid, this.configuration.maximums.uid, caller)
    ) {
      return {
        discount_uid: uid,
        uid: "uid_applied_discount#" + nanoid(uid_length),
      };
    }
  }

  /**
   * {@link https://developer.squareup.com/reference/square/enums/OrderLineItemItemType | Link To Square Docs}<br>
   * <br>{@link Order_Line_Item.make| Back to make()}<br>
   *  #enum_item_type<br>
   *  Enumerated methods set specific values from a limited set of allowable values defined by Square.
   *  For each value, a sub-method will exist that is the lowercase version of that value. There may also
   *  exist abbreviated aliases.
   *
   *  Enumerated methods are usually called by other functions and set the value on the object on which
   *  the calling function operates.
   * @typedef {function} Order_Line_Item.enum_item_type
   * @private
   * @abstract
   * @memberOf Order_Line_Item
   * @property item() sets value to "ITEM"
   * @property custom_amount() sets value to "CUSTOM_AMOUNT"
   * @property gift_card() sets value to "GIFT_CARD"
   * @property custom() - `alias of custom_amount`
   * @property gift() - alias of gift_card`
   * @example
   *  If you were allowed to choose from the set ["GOOD", "BAD", "UGLY"] in order to set the
   *  value of `clint` on the object 'western'
   *
   *  vyMar.make_western().clint.().good() => const spaghetti = {western : {clint: "GOOD"}}
   * */
  #enum_item_type(self, calling_this) {
    return order_line_item_enum.item_type(self, calling_this);
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
    if (
      shazam_max_length(
        str,
        this.configuration.maximums.uid,
        this.display_name,
        "uid"
      )
    ) {
      this._fardel.uid = str;
    }
  }
  set quantity(str) {
    let name = this.display_name;
    let caller = "quantity";
    if (
      shazam_max_length(
        str,
        this.configuration.maximums.quantity,
        name,
        caller
      ) &&
      shazam_min_length(str, this.configuration.minimums.quantity, name, caller)
    ) {
      this._fardel.quantity = str;
    }
  }
  set name(str) {
    if (
      shazam_max_length(
        str,
        this.configuration.maximums.name,
        this.display_name,
        "name"
      )
    ) {
      this._fardel.name = str;
    }
  }
  set note(str) {
    if (shazam_max_length(this.configuration.maximums.note, str)) {
      this._fardel.note = str;
    }
  }
  set variation_name(str) {
    if (
      shazam_max_length(
        str,
        this.configuration.maximums.variation_name,
        this.display_name,
        "variation_name"
      )
    ) {
      this._fardel.variation_name = str;
    }
  }
  set catalog_object_id(id) {
    if (
      shazam_max_length(
        id,
        this.configuration.maximums.catalog_object_id,
        this.display_name,
        "catalog_object_id"
      )
    ) {
      this._fardel.catalog_object_id = id;
    }
  }
  set catalog_version(int) {
    if (shazam_is_integer(int, this.display_name, "catalog_version")) {
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

  /**
   * Builds a compliant applied_tax object and returns it.
   * @typedef {function} Order_Line_Item.build_applied_tax
   * @memberOf Order_Line_Item
   * @public
   * @method
   * @param {string} uid - The UID of the tax you want to apply
   * @returns A compliant tax object
   * */
  build_applied_tax(uid) {
    let obj = this.#applied_tax(uid);
    return obj;
  }

  /**
   * Builds a compliant applied_discount object and returns it.
   * @typedef {function} Order_Line_Item.build_applied_discount
   * @memberOf Order_Line_Item
   * @public
   * @method
   * @param {string} uid - The UID of the discount you want to apply
   * @returns A compliant discount object
   * */

  build_applied_discount(uid) {
    let obj = this.#applied_discount(uid);
    return obj;
  }

  /**
   * Builds a compliant applied_tax object, adds it to the array and returns the object.
   * @typedef {function} Order_Line_Item.add_applied_tax
   * @memberOf Order_Line_Item
   * @public
   * @method
   * @param {string} uid - The UID of the tax you want to apply
   * @returns A compliant tax object
   * */

  add_applied_tax(uid) {
    let obj = this.build_applied_tax(uid);
    this.applied_taxes = obj;
    return obj;
  }

  /**
   * Builds a compliant applied_discount object, adds it to the array and returns the object.
   * @typedef {function} Order_Line_Item.add_applied_discount
   * @memberOf Order_Line_Item
   * @public
   * @method
   * @param {string} uid - The UID of the discount you want to apply
   * @returns A compliant discount object
   * */

  add_applied_discount(uid) {
    let obj = this.build_applied_discount(uid);
    this.applied_discounts = obj;
    return obj;
  }

  // MAKE METHODS

  /**
   *  make() method of Order_Line_Item
   *  Make sure to have the Square Docs open in front of you.
   *
   *  Special: pricing_blocklists - has two submethods 'discount' and 'tax' which call  make_discount_blocklist and make_tax_blocklist. - See entries for those.
   *
   * Sub-Method names are exactly the same as the property names listed
   * in the Square docs. There may be additional methods and/or shortened aliases of other methods.
   *
   * You should read the generated docs as:
   *     method_name(arg) {type} description of arg
   *
   * @typedef {function} Order_Line_Item.make
   * @method
   * @public
   * @memberOf Order_Line_Item
   * @property uid(uid) {string} - uid is automatically set
   * @property quantity(qty) {string} -
   * @property name(name) {string} -
   * @property note(note) {string} -
   * @property variation_name(name) {string} -
   * @property catalog_object_id(id) {string<id>} -
   * @property catalog_version(int) {integer} -
   * @property item_type() {Enumerated} - Calls {@link Order_Line_Item.enum_item_type|`#enum_item_type()}
   * @property base_price_money(amount,currency) {money} - Standard compliant money object builder.
   * @property applied_discounts(uid) {string} -
   * @property applied_taxes(uid) {string} -
   * @property pricing_blocklists().discount() - Calls {@link Order_Line_Item.make_discount_blocklist|`make_discount_blocklist()`}
   * @property pricing_blocklists().tax() - Calls {@link Order_Line_Item.make_tax_blocklist|`make_tax_blocklist()`}
   * @property quantity_unit() - Calls {@link Order_Line_Item.make_quantity_unit|`make_quantity_unit()`}
   * @example
   *  You must use parentheses with every call to make and with every sub-method. If you have to make a lot
   *  of calls from different lines, it will reduce your tying and improve readability to set make() to a
   *  variable.
   *
   *  let make = myVar.make();
   *   make.gizmo()
   *   make.gremlin()
   *    //is the same as
   *   myVar.make().gizmo().gremlin()
   * */

  make() {
    return {
      self: this,
      uid: function (uid) {
        this.self.uid = uid;
        return this;
      },
      quantity: function (qty) {
        this.self.quantity = qty;
        return this;
      },
      name: function (name) {
        this.self.name = name;
        return this;
      },
      note: function (note) {
        this.self.note = note;
        return this;
      },
      variation_name: function (name) {
        this.self.variation_name = name;
        return this;
      },
      catalog_object_id: function (id) {
        this.self.catalog_object_id = id;
        return this;
      },
      catalog_version: function (int) {
        this.self.catalog_version = int;
        return this;
      },
      item_type: function () {
        return this.self.#enum_item_type(this.self, this);
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

  /**
   * {@link  https://developer.squareup.com/reference/square/objects/OrderLineItemModifier| Link To Square Docs}<br>
   * <br>{@link Order_Line_Item.make| Back to make()}<br>
   *  make_modifier() method of Order_Line_Item
   *  Make sure to have the Square Docs open in front of you.
   * Sub-Method names are exactly the same as the property names listed
   * in the Square docs. There may be additional methods and/or shortened aliases of other methods.
   *
   * You should read the generated docs as:
   *     method_name(arg) {type} description of arg
   *
   * @typedef {function} Order_Line_Item.make_modifier
   * @method
   * @public
   * @memberOf Order_Line_Item
   * @property uid(uid) {string} - UID is set automatically. Only call this if you want to change it.
   * @property catalog_object_id(id) {string<id>} -
   * @property catalog_version(int64) {integer} -
   * @property name(val) {string} -
   * @property base_price_money(amount,currency) {money} - Standard compliant money object builder.
   * @property view - returns the modifier object under construction
   * @property get_uid - returns the uid
   * @property add - calls the modifier setter and passes a  new modifier object cloned from the the one you built.
   * @example
   *  It is best to set the function call to a variable. Otherwise you may experience unwanted side effects.
   *  const mod = line.make_modifier()
   *    let obj1 = {
   *       uid: "123",  // no need to set this unless you want to, unique-ish id set automatically
   *       catalog_object_id: "456",
   *       catalog_version: 4,
   *       name: "Ethel",
   *       base_price_money: {
   *         amount: 428,
   *         currency: "CAD"
   *       }
   *     };
   *
   *    let obj2 = {
   *       uid: "DEF", // no need to set this unless you want to, unique-ish id set automatically
   *       catalog_object_id: "ABC",
   *       catalog_version: 42,
   *       name: "Fred",
   *       base_price_money: {
   *         amount: 597,
   *         currency: "EUR"
   *       }
   *      };
   *     let ethel = line.make_modifier();
   *     let fred = line.make_modifier();
   *
   *     ethel.uid("123").catalog_object_id("456").catalog_version(4).name("Ethel").base_price_money(428, "cad").add(); => pushes obj1
   *     fred.uid("DEF").catalog_object_id("ABC").name("Fred").catalog_version(42).base_price_money(597, "eur").add();  => pushes obj2
   *
   *    line.modifiers => [obj1, obj2]
   *
   *    ethel.view() => obj1 // returns the actual object in case you need to access it directly
   *    ethel.get_uid => "123" // in case you need the uid
   *    * */

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
          modifier.uid = "uid_modifier#" + nanoid(uid_length);
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
        if (shazam_is_integer(int64, name, caller + key)) {
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
      base_price_money: function (amount, currency) {
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

  /**
   * {@link https://developer.squareup.com/reference/square/objects/OrderLineItemPricingBlocklistsBlockedTax | Link To Square Docs}<br>
   * <br>{@link Order_Line_Item.make| Back to make()}<br>
   *  make_discount_blocklist() method of Order_Line_Item
   *  Make sure to have the Square Docs open in front of you.
   * Sub-Method names are exactly the same as the property names listed
   * in the Square docs. There may be additional methods and/or shortened aliases of other methods.
   *
   * You should read the generated docs as:
   *     method_name(arg) {type} description of arg
   *
   * @typedef {function} Order_Line_Item.make_discount_blocklist
   * @method
   * @public
   * @memberOf Order_Line_Item
   * @property uid(uid) {string} - UID is set automatically. Only call this if you want to change it.
   * @property discount_catalog_object_id(id) {string<id>} - The catalog_object_id of the discount that should be blocked. Use this field to block catalog discounts. For ad hoc discounts, use the discount_uid field. Max length 192.
   * @property discount_object(id) {string<id>} - alias of `discount_catalog_object_id`
   * @property discount_uid(uid) {string} - The uid of the discount that should be blocked. Use this field to block ad hoc discounts. For catalog, discounts use the discount_catalog_object_id field. Max length 60.
   * @property ad_hoc(id) {string<id>}-alias of `discount_uid`
   * @property view() - returns the object under construction
   * @property get_uid() - returns the uid of the blocklist
   * @property add() - calls the discount_blocklist setter and passes a new discount_blocklist object cloned from the the one you built.
   * @example
   * let id = "alpha_numeric_gibberish"
   *    let blocklist1 = {
   *       uid: id,  // this is actually set automatically, but I didn't want it to feel left out, so I included it.
   *       discount_uid:id
   *     };
   *    let blocklist2 = {
   *       uid: id,
   *       discount_catalog_object_id: id,
   *     };
   *
   *    let block1 = line.make_discount_blocklist();
   *    let block2 = line.make_discount_blocklist();
   *    block1.uid(id).ad_hoc(id).add();
   *    block2.uid(id).discount_object(id).add();
   *    line.pricing_blocklists => {blocked_discount : [blocklist1, blocklist2]}
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

  /**
   * {@link https://developer.squareup.com/reference/square/objects/OrderLineItemPricingBlocklistsBlockedTax | Link To Square Docs}<br>
   * <br>{@link Order_Line_Item.make| Back to make()}<br>
   *  make_tax_blocklist() method of Order_Line_Item
   *  Make sure to have the Square Docs open in front of you.
   * Sub-Method names are exactly the same as the property names listed
   * in the Square docs. There may be additional methods and/or shortened aliases of other methods.
   *
   * You should read the generated docs as:
   *     method_name(arg) {type} description of arg
   *
   * @typedef {function} Order_Line_Item.make_tax_blocklist
   * @method
   * @public
   * @memberOf Order_Line_Item
   * @property uid(uid) {string} - UID is set automatically. Only call this if you want to change it.
   * @property tax_catalog_object_id(id) {string<id>} -The catalog_object_id of the tax that should be blocked. Use this field to block catalog taxes. For ad hoc taxes, use the tax_uid field. Max length 192.
   * @property tax_object(id) {string<id>} - alias of `tax_catalog_object_id`
   * @property tax_uid(uid) {string} -The uid of the tax that should be blocked. Use this field to block ad hoc taxes. For catalog, taxes use the tax_catalog_object_id field. Max length 60.
   * @property ad_hoc(uid) {string} - alias of `tax_uid`
   * @property view - returns the object under construction
   * @property get_uid - returns the uid of the blocklist
   * @property add - calls the tax_blocklist setter and passes a new tax_blocklist object cloned from the the one you built.
   * @example
   * let id = "alpha_numeric_gibberish"
   * let blocklist1 = {
   *    uid: id,  // this is actually set automatically, but I didn't want it to feel left out, so I included it.
   *    tax_uid:id
   *  };
   * let blocklist2 = {
   *    uid: id,
   *       tax_catalog_object_id: id,
   *     };
   *
   *    let block1 = line.make_tax_blocklist();
   *    let block2 = line.make_tax_blocklist();
   *    block1.uid(id).ad_hoc(id).add();
   *    block2.uid(id).tax_object(id).add();
   *    line.pricing_blocklists => {blocked_tax : [blocklist1, blocklist2]}
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

  /**
   * {@link https://developer.squareup.com/reference/square/objects/OrderQuantityUnit | Link To Square Docs}<br>
   * <br>{@link Order_Line_Item.make| Back to make()}<br>
   *  make_quantity_unit() method of Order_Line_Item
   *  Make sure to have the Square Docs open in front of you.
   * Sub-Method names are exactly the same as the property names listed
   * in the Square docs. There may be additional methods and/or shortened aliases of other methods.
   *
   * You should read the generated docs as:
   *     method_name(arg) {type} description of arg
   *
   * @typedef {function} Order_Line_Item.make_quantity_unit
   * @method
   * @public
   * @memberOf Order_Line_Item
   * @property catalog_object_id(id) {string<id>} -The catalog object ID referencing the CatalogMeasurementUnit when the unit already exists in the db
   * @property catalog_version(int) {integer} -
   * @property measurement_unit(archetype) {object} - A MeasurementUnit  object that represents the unit of measure for the quantity.
   * @property precision(int) {integer} - an integer number. the number of digits after the decimal point that are recorded for this quantity. See Square docs.
   * @property id(id) {string<id>} - alias of `catalog_object_id`
   * @property version(int) {integer} - alias of `catalog_version`
   * @example
   *  You must use parentheses with every call to make and with every sub-method. If you have to make a lot
   *  of calls from different lines, it will reduce your tying and improve readability to set make() to a
   *  variable.
   *
   *  let make = myVar.make();
   *   make.gizmo()
   *   make.gremlin()
   *    //is the same as
   *   myVar.make().gizmo().gremlin()
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
        if (shazam_is_integer(int, name, key)) {
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
