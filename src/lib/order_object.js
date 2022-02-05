const {
  arche_money,
  arrayify,
  define,
  shazam_max_length,
} = require("./utilities");
const { order_object_enum } = require("./enum/index");
const man =
  " builds a compliant Square order object. Too add discounts, line items or order fulfillments\n" +
  "first build them with the `Order_Discount`, `Order_Line_Item` and `Order_Fulfillment` classes. To add them to your/n" +
  "order object call the appropriate make() sub-method and pass their fardel as an argument./n" +
  "There are `build` and `add` methods for service_charge_amount and service_charge applied. Use only/n" +
  "one per addition or you risk double adding. Each takes the arguments `(amount, currency)` with a default/n" +
  'currency of "USD". See Pie docs for more details. ' +
  "\nhttps://developer.squareup.com/reference/square/objects/Order";

/** @class  representing a
 * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
 * {@link https://developer.squareup.com/reference/square/objects/Order | Square Docs}
 * */
class Order_Object {
  _display_name = "Order_Object";
  _last_verified_square_api_version = "2021-07-21";
  _help = this.display_name + ": " + man;
  constructor() {
    this._fardel = {
      version: undefined, //`BETA` - only for updates
      id: undefined,
      location_id: undefined, // required
      reference_id: undefined, // backend ID or this order
      customer_id: undefined, // `BETA`  MAX 191 -- make this required
      ticket_name: undefined, //`BETA`  str - this is persisted and gets displayed on any printouts
      state: undefined,
      source: undefined, //probably easiest to automatically set this to location id and leave an option to change it
      pricing_options: undefined,
      service_charges: undefined, // [{complex objects}]
      discounts: undefined, // [{complex objects}]
      taxes: undefined, // [{applied_money: {amount: 1, currency: "USD"}] - complex: see JSON example in docs
      fulfillments: undefined, // [{complex objects}]
      line_items: undefined, // [{complex objects}]
    };
    this.configuration = {
      maximums: {
        customer_id: 191,
        ticket_name: 30,
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
    return this._fardel;
  }
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
    let caller = "customer_id";
    if (
      shazam_max_length(this.configuration.maximums.customer_id, id, caller)
    ) {
      this._fardel.customer_id = id;
    }
  }
  set ticket_name(name) {
    let caller = "ticket_name";
    if (
      shazam_max_length(this.configuration.maximums.ticket_name, name, caller)
    ) {
      this._fardel.ticket_name = name;
    }
  }
  set state(val) {
    this._fardel.state = val;
  }
  set source(val) {
    this._fardel.source = val;
  }
  set pricing_options(obj) {
    if (
      !Object.prototype.hasOwnProperty.call(obj, "auto_apply_discounts") ||
      !Object.prototype.hasOwnProperty.call(obj, "auto_apply_taxes")
    ) {
      throw new Error(
        "pricing_options requires both auto_apply_discounts and auto_apply_taxes properties."
      );
    } else if (
      typeof obj.auto_apply_discounts !== "boolean" ||
      typeof obj.auto_apply_taxes !== "boolean"
    ) {
      throw new Error(
        "pricing_options arguments must be and object containing two booleans."
      );
    }
    this._fardel.pricing_options = obj;
  }
  set service_charges(obj) {
    arrayify(this._fardel, "service_charges", this._display_name);
    this._fardel.service_charges.push(obj);
  }
  set discounts(obj) {
    arrayify(this._fardel, "discounts", this._display_name);
    this._fardel.discounts.push(obj);
  }
  set taxes(obj) {
    arrayify(this._fardel, "taxes", this._display_name);
    this._fardel.taxes.push(obj);
  }
  set fulfillments(obj) {
    arrayify(this._fardel, "fulfillments", this._display_name);
    this._fardel.fulfillments.push(obj);
  }
  set line_items(obj) {
    arrayify(this._fardel, "line_items", this._display_name);
    this._fardel.line_items.push(obj);
  }

  // METHODS

  /** @function
   *  Enumerated methods set specific values from a limited set of allowable values defined by Square.
   *  For each value, a sub-method will exist that is the lowercase version of that value. There may also
   *  exist abbreviated aliases.
   *
   *  Enumerated methods are usually called by other functions and set the value on the object on which
   *  the calling function operates.
   * @method open sets value to "OPEN"
   * @method completed sets value to "COMPLETED"
   * @method canceled sets value to "CANCELED"
   * @method draft sets value to "DRAFT"
   
   * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
   * {@link  | Square Docs}
   * @example
   *  If you were allowed to choose from the set ["GOOD", "BAD", "UGLY"] in order to set the
   *  value of `clint` on the object 'western'
   *
   *  vyMar.make_western().clint.().good() => const spaghetti = {western : {clint: "GOOD"}}
   * */
  #enum_state() {
    return order_object_enum.state(this);
  }

  /** @function build_service_charge_amount Returns the object. If you wan to build and add it use the 'add' version of this funcion.
   *  Standard compliant money object builder.
   * @param {number} amount - an integer. The price in the smallest currency designation. Usually cents.
   * @param {string} currency - Three letter currency designation. Enforces ISO 4217 format. Case insensitive.
   * @return {object} service_charge - a standard Square Money Object
   * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
   * {@link https://developer.squareup.com/reference/square/objects/Money | Square Docs}
   * */

  build_service_charge_amount(amount, currency) {
    let service_charge = {};
    let money = arche_money(amount, currency);
    define(service_charge, "amount_money", money);
    return service_charge;
  }

  /** @function build_service_charge_applied Returns the object. If you wan to build and add it use the 'add' version of this funcion.
   *  Standard compliant money object builder.
   * @param {number} amount - an integer. The price in the smallest currency designation. Usually cents.
   * @param {string} currency - Three letter currency designation. Enforces ISO 4217 format. Case insensitive.
   * @return {object} service_charge - a standard Square Money Object
   * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
   * {@link https://developer.squareup.com/reference/square/objects/Money | Square Docs}
   * */

  build_service_charge_applied(amount, currency) {
    let service_charge = {};
    let money = arche_money(amount, currency);
    define(service_charge, "applied_money", money);
    return service_charge;
  }

  /** @function add_service_charge_amount Returns the object AND adds it to the appropriate array. If you want to just return the object without
   * adding it, then use the 'build' version of this function.
   *  Standard compliant money object builder.
   * @param {number} amount - an integer. The price in the smallest currency designation. Usually cents.
   * @param {string} currency - Three letter currency designation. Enforces ISO 4217 format. Case insensitive.
   * @return {object} service_charge - a standard Square Money Object
   * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
   * {@link https://developer.squareup.com/reference/square/objects/Money | Square Docs}
   * */

  add_service_charge_amount(amount, currency) {
    let service_charge = {};
    let money = arche_money(amount, currency);
    define(service_charge, "amount_money", money);
    this.service_charges = service_charge;
    return service_charge;
  }
  /** @function add_service_charge_applied Returns the object AND adds it to the appropriate array. If you want to just return the object without
   * adding it, then use the 'build' version of this function.
   *  Standard compliant money object builder.
   * @param {number} amount - an integer. The price in the smallest currency designation. Usually cents.
   * @param {string} currency - Three letter currency designation. Enforces ISO 4217 format. Case insensitive.
   * @return {object} service_charge - a standard Square Money Object
   * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
   * {@link https://developer.squareup.com/reference/square/objects/Money | Square Docs}
   * */

  add_service_charge_applied(amount, currency) {
    let service_charge = {};
    let money = arche_money(amount, currency);
    define(service_charge, "applied_money", money);
    this.service_charges = service_charge;
    return service_charge;
  }

  /** @function make()  method of SOME_CLASS - method names are exactly the same as the property names listed
   * in the Square docs. There may be additional methods and/or shortened aliases of other methods.
   * @method version
   * @param {number} ver -
   * @method id
   * @param {string} id -
   * @method location_id
   * @param {string} id -
   * @method reference_id
   * @param {string} id -
   * @method customer_id
   * @param {string} id -
   * @method ticket_name
   * @param {string} name -
   * @method state Enumerated. Calls #enum_state()
   * @method source
   * @param {string} val -
   * @method pricing_options
   * @param {bool} auto_apply_discounts -
   * @param {bool} auto_apply_taxes -
   * @method service_charges
   * @param {object} obj -
   * @method discounts
   * @param {object} obj -
   * @method taxes
   * @param {object} obj -
   * @method fulfillments
   * @param {object} obj -
   * @method line_items
   * @param {object} obj -
   
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
      state: function () {
        return this.self.#enum_state();
      },
      source: function (val) {
        this.self.source = val;
        return this;
      },
      pricing_options: function (auto_apply_discounts, auto_apply_taxes) {
        this.self.pricing_options = {
          auto_apply_discounts,
          auto_apply_taxes,
        };
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
  }
}
module.exports = Order_Object;
