// const { nanoid } = require("nanoid");
// const {
// define,
// shazam_max_length,
// normalize_email,
// shazam_time_RFC3339,
// shazam_integer,
// shazam_boolean,
// } = require("./utilities/aaa_index");
// const { uid_length } = require("./pie_defaults");

/** @class Generic_Object representing a
 * @param {}  You must do this before calling .request()
 * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
 * @example
 *
 *  const myVar = new Generic_Object()
 *
 *  myVar.fardel => pass this to a request class to send your data
 *
 * */

class Generic_Object {
  _display_name = "";
  _last_verified_square_api_version = "";
  _help = "";
  constructor() {
    this._fardel = {
      prop1: undefined, //
      prop2: undefined, //
      prop3: undefined, //
      prop4: undefined, //
      prop5: undefined, //
    };

    this.configuration = {
      maximums: {},
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

  // FARDEL GETTERS
  get prop1() {
    return this._fardel.prop1;
  }
  get prop2() {
    return this._fardel.prop2;
  }
  get prop3() {
    return this._fardel.prop3;
  }
  get prop4() {
    return this._fardel.prop4;
  }
  get prop5() {
    return this._fardel.prop5;
  }

  // FARDEL SETTERS
  set prop1(val) {
    this._fardel.prop1 = val;
  }
  set prop2(val) {
    this._fardel.prop2 = val;
  }
  set prop3(val) {
    this._fardel.prop3 = val;
  }
  set prop4(val) {
    this._fardel.prop4 = val;
  }
  set prop5(val) {
    this._fardel.prop5 = val;
  }

  // MAKER METHODS
  make() {
    return {
      self: this,
    };
  }
}

module.exports = Generic_Object;
