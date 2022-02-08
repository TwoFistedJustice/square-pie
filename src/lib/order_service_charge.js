const { nanoid } = require("nanoid");
const {
  arche_money,
  arrayify,
  shazam_max_length,
  shazam_integer,
  shazam_boolean,
} = require("./utilities/");
const { uid_length } = require("./pie_defaults");

const man =
  "build one service charge for an order.  \n" +
  "\nhttps://developer.squareup.com/reference/square_2022-01-20/objects/OrderServiceCharge";

/** @class Order_Service_Charge build a service charge to add to an Order Object
 * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
 * @example
 *  const myVar = new Order_Service_Charge()
 *  myVar.fardel => pass this to a request class to send your data
 * */

class Order_Service_Charge {
  _display_name = "Order_Service_Charge";
  _last_verified_square_api_version = "2022-01-20";
  _help = this.display_name + ": " + man;

  constructor() {
    this._fardel = {
      uid: "#service_charge_uid_" + nanoid(uid_length), // pie uid
      name: undefined, //str 255
      catalog_object_id: undefined, // id 192
      catalog_version: undefined, //int
      percentage: undefined, // str 10
      amount_money: undefined, //'money object',
      calculation_phase: undefined, //enum,
      taxable: undefined, //bool
      applied_taxes: undefined, // ['uid'...],
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
  get amount_money() {
    return this._fardel.amount_money;
  }
  get calculation_phase() {
    return this._fardel.calculation_phase;
  }
  get taxable() {
    return this._fardel.taxable;
  }
  get applied_taxes() {
    return this._fardel.applied_taxes;
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
  set amount_money(money) {
    this._fardel.amount_money = money;
  }
  set calculation_phase(str) {
    this._fardel.calculation_phase = str;
  }
  set taxable(bool) {
    if (shazam_boolean(bool, this.display_name, "taxable")) {
      this._fardel.taxable = bool;
    }
  }
  set applied_taxes(uid) {
    arrayify(this._fardel, "applied_taxes", this.display_name);
    this._fardel.applied_taxes.push(uid);
  }

  // PRIVATE METHODS

  /** @function
   *  Enumerated methods set specific values from a limited set of allowable values defined by Square.
   *  For each value, a sub-method will exist that is the lowercase version of that value. There may also
   *  exist abbreviated aliases.
   *
   *  Enumerated methods are usually called by other functions and set the value on the object on which
   *  the calling function operates.
   * @method subtotal_phase  sets value to "SUBTOTAL_PHASE"
   * @method total_phase  sets value to "TOTAL_PHASE"
   * @method subtotal alias of `subtotal_phase`
   * @method total  alias of `total_phase`
   
   * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
   * {@link https://developer.squareup.com/reference/square_2022-01-20/enums/OrderServiceChargeCalculationPhase | Square Docs}
   * @example
   *  If you were allowed to choose from the set ["GOOD", "BAD", "UGLY"] in order to set the
   *  value of `clint` on the object 'western'
   *
   *  vyMar.make_western().clint.().good() => const spaghetti = {western : {clint: "GOOD"}}
   * */
  #calculation_phase_enum(calling_this) {
    return {
      self: this,
      subtotal_phase: function () {
        this.self.calculation_phase = "SUBTOTAL_PHASE";
        return calling_this;
      },
      total_phase: function () {
        this.self.calculation_phase = "TOTAL_PHASE";
        return calling_this;
      },
      subtotal: function () {
        return this.subtotal_phase();
      },
      total: function () {
        return this.total_phase();
      },
    };
  }

  // MAKER METHODS
  /** @function make()  method of Order_Service_Charge - method names are exactly the same as the property names listed
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
   * @method amount_money Standard compliant money object builder.
   * @param {number} amount - an integer. The price in the smallest currency designation. Usually cents.
   * @param {string} currency - Three letter currency designation. Enforces ISO 4217 format. Case insensitive.
   * @method calculation_phase Enumerated. Calls #calculation_phase_enum
   * @method taxable
   * @param {bool} bool -
   * @method applied_taxes
   * @param {string} id -
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
      amount_money: function (amount, currency) {
        this.self.amount_money = arche_money(amount, currency);
        return this;
      },
      calculation_phase: function () {
        return this.self.#calculation_phase_enum(this);
      },
      taxable: function (bool) {
        this.self.taxable = bool;
        return this;
      },
      applied_taxes: function (id) {
        this.self.applied_taxes = id;
        return this;
      },
    };
  }
}

module.exports = Order_Service_Charge;
