const { shazam_max_length, arche_money } = require("./utilities");
const { nanoid } = require("nanoid");
const { uid_length } = require("./pie_defaults");
const order_discount_enum = require("./enum/order_discount_enum");
const man =
  " builds a discount which will be applied to one or more line items in an order.\n" +
  "make().amount_money and .applied_money() take two arguments (amount, currency). Currency\n" +
  'defaults to "USD".\n' +
  "https://developer.squareup.com/reference/square/objects/OrderLineItemDiscount";

/**
 * {@link https://developer.squareup.com/reference/square/objects/OrderLineItemDiscount|  **-------> Link To Square Docs <-------**}
 * @class Order_Discount
 * @classdesc
 *
 * Builds a discount which will be applied to one or more line items in an order.
 * */

class Order_Discount {
  _display_name = "Order_Discount";
  _last_verified_square_api_version = "2021-07-21";
  _help = this.display_name + ": " + man;

  constructor() {
    this._fardel = {
      uid: "uid_order_discount#" + nanoid(uid_length), // str60
      catalog_object_id: undefined, // str192  Discounts that do not reference a catalog object ID must have a type of FIXED_PERCENTAGE or FIXED_AMOUNT.
      catalog_version: undefined, // int64
      name: undefined, // str255
      percentage: undefined, // str10
      amount_money: undefined, // archetype money
      applied_money: undefined, // archetype money
      type: undefined, // str enum_state
      scope: undefined, // str enum_state
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
  set uid(uid) {
    let caller = "uid";
    if (
      shazam_max_length(
        uid,
        this.configuration.maximums.uid,
        this.display_name,
        caller
      )
    );
    {
      this._fardel.uid = uid;
    }
  }
  set catalog_object_id(id) {
    let caller = "catalog_object_id";
    if (
      shazam_max_length(
        id,
        this.configuration.maximums.catalog_object_id,
        this.display_name,
        caller
      )
    );
    {
      this._fardel.catalog_object_id = id;
    }
  }
  set catalog_version(ver) {
    this._fardel.catalog_version = ver;
  }
  set name(str) {
    let caller = "name";
    if (
      shazam_max_length(
        str,
        this.configuration.maximums.name,
        this.display_name,
        caller
      )
    );
    {
      this._fardel.name = str;
    }
  }
  set type(val) {
    this._fardel.type = val;
  }
  set percentage(percent) {
    if (
      (typeof percent !== "string" && typeof percent !== "number") ||
      Number.isNaN(Number(percent))
    ) {
      throw new Error(
        '"percentage expects strings that can be converted to a number and actual numbers."'
      );
    }
    let caller = "percentage";
    if (
      shazam_max_length(
        percent,
        this.configuration.maximums.percentage,
        this.display_name,
        caller
      )
    ) {
      this._fardel.percentage = percent;
    }
  }
  set amount_money(money_object) {
    this._fardel.amount_money = money_object;
  }
  set applied_money(money_object) {
    this._fardel.applied_money = money_object;
  }
  set scope(str) {
    this._fardel.scope = str;
  }

  // PRIVATE METHODS

  /**
   * {@link https://developer.squareup.com/reference/square/enums/OrderLineItemDiscountType| Square Docs}<br>
   *
   *  ##enum_type
   *  Enumerated methods set specific values from a limited set of allowable values defined by Square.
   *  For each value, a sub-method will exist that is the lowercase version of that value. There may also
   *  exist abbreviated aliases.
   *
   *  Enumerated methods are usually called by other functions and set the value on the object on which
   *  the calling function operates.
   *  @typedef {function} Order_Discount.enum_type
   * @private
   * @abstract
   * @memberOf  Order_Discount
   * @property unknown() - sets value to "UNKNOWN_DISCOUNT"
   * @property fixed_percentage() - sets value to "FIXED_PERCENTAGE"
   * @property fixed_amount() - sets value to "FIXED_AMOUNT"
   * @property variable_percentage() - sets value to "VARIABLE_PERCENTAGE"
   * @property variable_amount() - sets value to "VARIABLE_AMOUNT"
   * @example
   *  If you were allowed to choose from the set ["GOOD", "BAD", "UGLY"] in order to set the
   *  value of `clint` on the object 'western'
   *
   *  vyMar.make_western().clint.().good() => const spaghetti = {western : {clint: "GOOD"}}
   * */

  #enum_type(calling_this) {
    return order_discount_enum.type(this, calling_this);
  }

  /** * {@link https://developer.squareup.com/reference/square/enums/OrderLineItemDiscountScope| Link To Square Docs}<br>
   *
   *  #enum_scope
   *  Enumerated methods set specific values from a limited set of allowable values defined by Square.
   *  For each value, a sub-method will exist that is the lowercase version of that value. There may also
   *  exist abbreviated aliases.
   *
   *  Enumerated methods are usually called by other functions and set the value on the object on which
   *  the calling function operates.
   *  @typedef {function} Order_Discount.enum_scope
   * @private
   * @abstract
   * @memberOf  Order_Discount
   * @property other() -sets value to "OTHER_DISCOUNT_SCOPE"
   * @property line_item() -sets value to "LINE_ITEM"
   * @property order() -sets value to "ORDER"
   * @example
   *  If you were allowed to choose from the set ["GOOD", "BAD", "UGLY"] in order to set the
   *  value of `clint` on the object 'western'
   *
   *  vyMar.make_western().clint.().good() => const spaghetti = {western : {clint: "GOOD"}}
   * */
  #enum_scope(calling_this) {
    return order_discount_enum.scope(this, calling_this);
  }

  // MAKE METHODS
  /**
   *  make() method of Order_Discount
   *  Make sure to have the Square Docs open in front of you.
   * Sub-Method names are exactly the same as the property names listed
   * in the Square docs. There may be additional methods and/or shortened aliases of other methods.
   *
   * You should read the generated docs as:
   *     method_name(arg) {type} description of arg
   *
   * @typedef {function} Order_Discount.make
   * @method
   * @public
   * @memberOf Order_Discount
   * @property uid(uid) {string} - set automatically. Use this if you want to change it.
   * @property catalog_object_id(id) {string<id>} -
   * @property catalog_version(ver) {integer} -
   * @property name(str) {string} -
   * @property type() {Enumerated} - Calls {@link Order_Discount.enum_type|`#enum_type()`}
   * @property percentage(percent) {string} -
   * @property amount_money(amount,currency) {money} - Standard compliant money object builder.
   * @property applied_money(amount,currency) {money} - Standard compliant money object builder.
   * @property scope() {Enumerated} - Calls {@link Order_Discount.enum_scope|`#enum_scope()`}
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
      catalog_object_id: function (id) {
        this.self.catalog_object_id = id;
        return this;
      },
      catalog_version: function (ver) {
        this.self.catalog_version = ver;
        return this;
      },
      name: function (str) {
        this.self.name = str;
        return this;
      },
      type: function () {
        return this.self.#enum_type(this);
      },
      percentage: function (percent) {
        this.self.percentage = percent;
        return this;
      },
      amount_money: function (amount, currency) {
        this.self.amount_money = arche_money(amount, currency);
        return this;
      },
      applied_money: function (amount, currency) {
        this.self.applied_money = arche_money(amount, currency);
        return this;
      },
      scope: function () {
        return this.self.#enum_scope(this);
      },
    };
  }
}

module.exports = Order_Discount;
