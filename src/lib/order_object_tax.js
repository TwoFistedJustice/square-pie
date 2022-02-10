const { nanoid } = require("nanoid");
const {
  arche_money,
  shazam_max_length,
  shazam_integer,
} = require("./utilities");
const { uid_length } = require("./pie_defaults");
const man =
  "build one Line Item Tax for an order. (goes in taxes array of Order_Object) \n" +
  "Uses standard Pie syntax. There is nothing unusual about this class.\n" +
  "uid is set automatically. But you can change it using make().uid()\n" +
  "https://developer.squareup.com/reference/square_2022-01-20/objects/OrderLineItemTax";

/** @class Order_Tax representing an OrderLineItemTax
 * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
 * {@link https://developer.squareup.com/reference/square_2022-01-20/objects/OrderLineItemTax | Square Docs}
 * @example
 *  const myVar = new Order_Tax()
 *  myVar.fardel => pass this to a request class to send your data
 * */

class Order_Tax {
  _display_name = "Order_Tax";
  _last_verified_square_api_version = "2022-01-20";
  _help = this.display_name + ": " + man;

  constructor() {
    this._fardel = {
      uid: "uid_order_tax#" + nanoid(uid_length),
      name: undefined, //str 255
      catalog_object_id: undefined, // id 192
      catalog_version: undefined, //int
      percentage: undefined, // str 10
      applied_money: undefined, //'money object',
      scope: undefined, // enum
    };

    this.configuration = {
      maximums: {
        uid: 60,
        name: 255,
        catalog_object_id: 192,
        percentage: 10,
      },
    };
  }

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

  // GETTERS
  get uid() {
    return this._fardel.uid;
  }
  get name() {
    return this._fardel.name;
  }
  get catalog_object_id() {
    return this._fardel.catalog_object_id;
  }
  get catalog_version() {
    return this._fardel.catalog_version;
  }
  get percentage() {
    return this._fardel.percentage;
  }
  get applied_money() {
    return this._fardel.applied_money;
  }
  get scope() {
    return this._fardel.scope;
  }

  // SETTERS
  set uid(uid) {
    if (
      shazam_max_length(
        this.configuration.maximums.uid,
        uid,
        this.display_name,
        "uid"
      )
    ) {
      this._fardel.uid = uid;
    }
  }
  set name(name) {
    if (
      shazam_max_length(
        this.configuration.maximums.name,
        name,
        this.display_name,
        "name"
      )
    ) {
      this._fardel.name = name;
    }
  }
  set catalog_object_id(id) {
    if (
      shazam_max_length(
        this.configuration.maximums.catalog_object_id,
        id,
        this.display_name,
        "catalog_object_id"
      )
    ) {
      this._fardel.catalog_object_id = id;
    }
  }
  set catalog_version(ver) {
    if (shazam_integer(ver, this.display_name, "catalog_version")) {
      this._fardel.catalog_version = ver;
    }
  }
  set percentage(percent) {
    if (
      shazam_max_length(
        this.configuration.maximums.percentage,
        percent,
        this.display_name,
        "percentage"
      )
    ) {
      this._fardel.percentage = percent;
    }
  }
  set applied_money(money) {
    this._fardel.applied_money = money;
  }
  set scope(str) {
    this._fardel.scope = str;
  }

  /** @function #enum_scope
   *  Enumerated methods set specific values from a limited set of allowable values defined by Square.
   *  For each value, a sub-method will exist that is the lowercase version of that value. There may also
   *  exist abbreviated aliases.
   *
   *  Enumerated methods are usually called by other functions and set the value on the object on which
   *  the calling function operates.
   * @method other_tax_scope  sets value to "OTHER_TAX_SCOPE"
   * @method line_item  sets value to "LINE_ITEM"
   * @method order  sets value to "ORDER"
   * @method other alias of `other_tax_scope`
   * @method line  alias of `line_item`
   * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
   * {@link https://developer.squareup.com/reference/square_2022-01-20/enums/OrderLineItemTaxScope | Square Docs}
   * @example
   *  If you were allowed to choose from the set ["GOOD", "BAD", "UGLY"] in order to set the
   *  value of `clint` on the object 'western'
   *
   *  vyMar.make_western().clint.().good() => const spaghetti = {western : {clint: "GOOD"}}
   * */
  #enum_scope(calling_this) {
    return {
      self: this,
      other_tax_scope: function () {
        this.self.scope = "OTHER_TAX_SCOPE";
        return calling_this;
      },
      line_item: function () {
        this.self.scope = "LINE_ITEM";
        return calling_this;
      },
      order: function () {
        this.self.scope = "ORDER";
        return calling_this;
      },
      other: function () {
        return this.other_tax_scope();
      },
      line: function () {
        return this.line_item();
      },
    };
  }

  // MAKE METHODS
  /** @function make()  method of Order_Tax - method names are exactly the same as the property names listed
   * in the Square docs. There may be additional methods and/or shortened aliases of other methods.
   * @method uid
   * @param {string} uid - this is automatically set.
   * @method name
   * @param {string} name -
   * @method catalog_object_id
   * @param {string} id -
   * @method catalog_version
   * @param {number} ver -
   * @method percentage
   * @param {string} percent - a percentage amount in the form of a string.
   * @method applied_money Standard compliant money object builder.
   * @param {number} amount - an integer. The price in the smallest currency designation. Usually cents.
   * @param {string} currency - Three letter currency designation. Enforces ISO 4217 format. Case insensitive.
   * @method scope Enumerated. Calls #enum_scope
   * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
   * @example
   *  You must use parentheses with every call to make and with every sub-method. If you have to make a lot
   *  of calls from different lines, it will reduce your tying and improve readability to set make() to a
   *  variable.
   *  let make = myVar.make();
   *   make.gizmo()
   *   make.gremlin()
   * */

  make() {
    return {
      self: this,
      uid: function (uid) {
        this.self.uid = uid;
        return this;
      },
      name: function (name) {
        this.self.name = name;
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
      percentage: function (percent) {
        this.self.percentage = percent;
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

module.exports = Order_Tax;
