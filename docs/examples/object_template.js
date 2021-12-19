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
    this._fardel = {};

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

  // MAKER METHODS
  make() {
    return {
      self: this,
    };
  }
}

module.exports = Generic_Object;
