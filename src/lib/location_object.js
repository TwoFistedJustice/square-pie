const { language_code_enum } = require("./enum");
const {
  normalize_email,
  shazam_exact_length,
  shazam_is_coords,
  shazam_is_url,
  shazam_is_url_facebook,
  shazam_max_length,
} = require("./utilities");
const man =
  "Builds a compliant Location Object\n" +
  "https://developer.squareup.com/reference/square/objects/Location";

/**
 * {@link https://developer.squareup.com/reference/square/objects/Location  |  **-------> Link To Square Docs <-------**}
 * @class Location_Object
 * @classdesc
 *
 * Builds a compliant Location object
 * */

class Location_Object {
  _display_name = "Location_Object";
  _last_verified_square_api_version = "2022-01-20";
  _help = this.display_name + ": " + man;
  constructor() {
    this._fardel = {
      name: undefined, //255
      address: undefined, // {} address arche
      timezone: undefined, // 30 no content validation - do not use unless you know your IANA Timezone
      phone_number: undefined, //17
      business_name: undefined, // 255
      business_email: undefined, // 255 validate
      business_hours: undefined, //{periods: [ {obj}... ] }//https://developer.squareup.com/reference/square/objects/BusinessHoursPeriod
      description: undefined, // 1024
      language_code: undefined, //ENUM 5 BCP 47 make an enum  https://www.techonthenet.com/js/language_tags.php (english().queens() => UK
      type: undefined, // enum PHYSICAL MOBILE //https://developer.squareup.com/reference/square/enums/LocationType
      status: undefined, // enum ACTIVE INACTIVE
      twitter_username: undefined, // 15
      instagram_username: undefined, // 30
      facebook_url: undefined, // 255 // validate should begin with 'facebook.com/
      website_url: undefined, //255 validate, offer a bypass with second arg
      coordinates: undefined, // {latitude: 123, longitude: 456}, validator.isLatLong//https://developer.squareup.com/reference/square/objects/Coordinates
      mcc: undefined, // length must be 4, // https://developer.squareup.com/docs/locations-api#initialize-a-merchant-category-code
      tax_ids: undefined, // https://developer.squareup.com/reference/square/objects/TaxIds
    };

    this.configuration = {
      maximums: {
        name: 255,
        email: 255,
        url: 255,
        timezone: 30,
        phone_number: 17,
        description: 1024,
        twitter: 15,
        ig: 30,
      },
      exacts: {
        mcc: 4,
        language_code: 5,
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

  get name() {
    return this._fardel.name;
  }
  get address() {
    return this._fardel.address;
  }
  get timezone() {
    return this._fardel.timezone;
  }
  get phone_number() {
    return this._fardel.phone_number;
  }
  get business_name() {
    return this._fardel.business_name;
  }
  get business_email() {
    return this._fardel.business_email;
  }
  get business_hours() {
    return this._fardel.business_hours.periods;
  }
  get description() {
    return this._fardel.description;
  }
  get language_code() {
    return this._fardel.language_code;
  }
  get type() {
    return this._fardel.type;
  }
  get status() {
    return this._fardel.status;
  }
  get twitter_username() {
    return this._fardel.twitter_username;
  }
  get instagram_username() {
    return this._fardel.instagram_username;
  }
  get facebook_url() {
    return this._fardel.facebook_url;
  }
  get website_url() {
    return this._fardel.website_url;
  }
  get coordinates() {
    return this._fardel.coordinates;
  }
  get mcc() {
    return this._fardel.mcc;
  }
  get tax_ids() {
    return this._fardel.tax_ids;
  }

  // SETTERS
  set name(name) {
    if (
      shazam_max_length(
        name,
        this.configuration.maximums.name,
        this.display_name,
        "name"
      )
    ) {
      this._fardel.name = name;
    }
  }
  set address(address_object) {
    this._fardel.address = address_object;
  }
  set timezone(IANA_time_zone) {
    if (
      shazam_max_length(
        IANA_time_zone,
        this.configuration.maximums.timezone,
        this.display_name,
        "timezone"
      )
    ) {
      this._fardel.timezone = IANA_time_zone;
    }
  }
  set phone_number(phone) {
    if (
      shazam_max_length(
        phone,
        this.configuration.maximums.phone_number,
        this.display_name,
        "phone_number"
      )
    ) {
      this._fardel.phone_number = phone;
    }
  }
  set business_name(name) {
    if (
      shazam_max_length(
        name,
        this.configuration.maximums.name,
        this.display_name,
        "business_name"
      )
    ) {
      this._fardel.business_name = name;
    }
  }
  set business_email(email) {
    if (
      shazam_max_length(
        email,
        this.configuration.maximums.email,
        this.display_name,
        "business_email"
      )
    ) {
      this._fardel.business_email = normalize_email(
        email,
        this.display_name,
        "business_email"
      );
    }
  }
  set business_hours(period) {
    if (
      !Object.prototype.hasOwnProperty.call(
        this._fardel,
        "business_hours.periods"
      )
    ) {
      this._fardel.business_hours = { periods: [] };
    }
    this._fardel.business_hours.periods.push(period);
  }
  set description(description) {
    if (
      shazam_max_length(
        description,
        this.configuration.maximums.description,
        this.display_name,
        "description"
      )
    ) {
      this._fardel.description = description;
    }
  }
  set language_code(bcp47) {
    if (
      shazam_exact_length(
        bcp47,
        this.configuration.exacts.language_code,
        this.display_name,
        "language_code"
      )
    ) {
      this._fardel.language_code = bcp47;
    }
  }
  set type(type) {
    this._fardel.type = type;
  }
  set status(status) {
    this._fardel.status = status;
  }
  set twitter_username(twittle) {
    if (
      shazam_max_length(
        twittle,
        this.configuration.maximums.twitter,
        this.display_name,
        "twitter_username"
      )
    ) {
      this._fardel.twitter_username = twittle;
    }
  }
  set instagram_username(ig) {
    if (
      shazam_max_length(
        ig,
        this.configuration.maximums.ig,
        this.display_name,
        "instagram_username"
      )
    ) {
      this._fardel.instagram_username = ig;
    }
  }
  set facebook_url(url) {
    let caller = "facebook_url";
    if (
      shazam_max_length(
        url,
        this.configuration.maximums.url,
        this.display_name,
        caller
      ) &&
      shazam_is_url_facebook(url, this.display_name, caller)
    ) {
      this._fardel.facebook_url = url;
    }
  }
  set website_url(url) {
    let caller = "website_url";
    if (
      shazam_max_length(
        url,
        this.configuration.maximums.url,
        this.display_name,
        caller
      ) &&
      shazam_is_url(url, this.display_name, caller)
    ) {
      this._fardel.website_url = url;
    }
  }
  set coordinates(coords) {
    //todo validate
    if (shazam_is_coords(coords, this.display_name, "coordinates")) {
      this._fardel.coordinates = coords;
    }
  }
  set mcc(mcc) {
    if (typeof mcc !== "string") {
      mcc = mcc + "";
    }
    if (
      shazam_exact_length(
        mcc,
        this.configuration.exacts.mcc,
        this.display_name,
        "mcc"
      )
    ) {
      this._fardel.mcc = mcc;
    }
  }
  set tax_ids(val) {
    this._fardel.tax_ids = val;
  }
  // Private Methods

  /** * {@link https://developer.squareup.com/reference/square/enums/LocationType | Link To Square Docs}<br>
   *
   *  #enum_type
   *  Enumerated methods set specific values from a limited set of allowable values defined by Square.
   *  For each value, a sub-method will exist that is the lowercase version of that value. There may also
   *  exist abbreviated aliases.
   *
   *  Enumerated methods are usually called by other functions and set the value on the object on which
   *  the calling function operates.
   *  @typedef {function} Location_Object.enum_type
   * @private
   * @abstract
   * @memberOf Location_Object
   * @property physical() sets value to "PHYSICAL"
   * @property mobile() sets value to "MOBILE"
   * @example
   *  If you were allowed to choose from the set ["GOOD", "BAD", "UGLY"] in order to set the
   *  value of `clint` on the object 'western'
   *
   *  vyMar.make_western().clint.().good() => const spaghetti = {western : {clint: "GOOD"}}
   * */
  #enum_type(calling_this) {
    return {
      self: this,
      physical: function () {
        this.self.type = "PHYSICAL";
        return calling_this;
      },
      mobile: function () {
        this.self.type = "MOBILE";
        return calling_this;
      },
    };
  }

  /** * {@link https://developer.squareup.com/reference/square/enums/LocationStatus | Link To Square Docs}<br>
   *
   *  #enum_status
   *  Enumerated methods set specific values from a limited set of allowable values defined by Square.
   *  For each value, a sub-method will exist that is the lowercase version of that value. There may also
   *  exist abbreviated aliases.
   *
   *  Enumerated methods are usually called by other functions and set the value on the object on which
   *  the calling function operates.
   *  @typedef {function} Location_Object.enum_status
   * @private
   * @abstract
   * @memberOf Location_Object
   * @property active() sets value to "ACTIVE"
   * @property inactive() sets value to "INACTIVE"
   * @example
   *  If you were allowed to choose from the set ["GOOD", "BAD", "UGLY"] in order to set the
   *  value of `clint` on the object 'western'
   *
   *  vyMar.make_western().clint.().good() => const spaghetti = {western : {clint: "GOOD"}}
   * */
  #enum_status(calling_this) {
    return {
      self: this,
      active: function () {
        this.self.status = "ACTIVE";
        return calling_this;
      },
      inactive: function () {
        this.self.status = "INACTIVE";
        return calling_this;
      },
    };
  }

  // MAKE METHODS

  /**
   * {@link https://developer.squareup.com/reference/square/objects/BusinessHours |  Link To Square Docs}<br>
   *
   * business_hours.
   *
   * You can expect to make one for each day of the week.
   *
   * @typedef {function} Location_Object.business_hours
   * @memberOf Location_Object
   * @private
   * @method
   * @param {string} day - The day of the week. Must be either first three letters in all caps (SUN, MON, etc) or first letter capitalized, eg(Sunday, Monday, etc)
   * @param {string} start - start of business hours in 24 hour format, omitting the leading zero. You should append ":00" for seconds to the end.
   * @param {string} end - end of business hours in 24 hour format, omitting the leading zero. You should append ":00" for seconds to the end.
   * @example
   *
   * myvar.make().business_hours("Monday", "8:30:00", "18:30:00").business_hours("Tuesday", "8:30:00", "18:30:00")...
   * */

  /**
   *  make() method of Location_Object
   *  Make sure to have the Square Docs open in front of you.
   * Sub-Method names are exactly the same as the property names listed
   * in the Square docs. There may be additional methods and/or shortened aliases of other methods.
   *
   * You should read the generated docs as:
   *     method_name(arg) {type} description of arg
   *
   * @typedef {function} Location_Object.make
   * @method
   * @public
   * @memberOf Location_Object
   * @property name(name) {string} -
   * @property address(address_object) {object}
   * @property timezone(IANA_timezone) {string} -
   * @property phone_number(phone) {string} -
   * @property business_name(name) {string} -
   * @property business_email(email) {string} -
   * @property business_hours((day,start,end)) {string} - Pushes a business_hours object onto the array. See entry.
   * @property description(decription) {string} -
   * @property language_code() {Enumerated} - Calls `language_code_enum.language_code()` - See enums.
   * @property type() {Enumerated} - Calls `#enum_type()`
   * @property status() {Enumerated} - Calls `#enum_status()`
   * @property twitter_username(tweety) {string} -
   * @property instagram_username(ig) {string} -
   * @property facebook_url(url) {string} - must contain "facebook.com"
   * @property website_url(url) {string} -
   * @property coordinates(latitude,longitude) {string} - will accept number or string
   * @property mcc(mcc) {string} -
   * @property tax_ids(eu_vat) {string} -
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
      name: function (name) {
        this.self.name = name;
        return this;
      },
      address: function (address_object) {
        this.self.address = address_object;
        return this;
      },
      timezone: function (IANA_timezone) {
        this.self.timezone = IANA_timezone;
        return this;
      },
      phone_number: function (phone) {
        this.self.phone_number = phone;
        return this;
      },
      business_name: function (name) {
        this.self.business_name = name;
        return this;
      },
      business_email: function (email) {
        this.self.business_email = email;
        return this;
      },
      business_hours: function (day, start, end) {
        this.self.business_hours = {
          day_of_week: day,
          start_local_time: start,
          end_local_time: end,
        };
        return this;
      },
      description: function (decription) {
        this.self.description = decription;
        return this;
      },
      language_code: function () {
        return language_code_enum.language_code(this.self, this);
      },
      type: function () {
        return this.self.#enum_type(this);
      },
      status: function () {
        return this.self.#enum_status(this);
      },
      twitter_username: function (tweety) {
        this.self.twitter_username = tweety;
        return this;
      },
      instagram_username: function (ig) {
        this.self.instagram_username = ig;
        return this;
      },
      facebook_url: function (url) {
        this.self.facebook_url = url;
        return this;
      },
      website_url: function (url) {
        this.self.website_url = url;
        return this;
      },
      coordinates: function (latitude, longitude) {
        this.self.coordinates = {
          latitude: latitude,
          longitude: longitude,
        };
        return this;
      },
      mcc: function (mcc) {
        this.self.mcc = mcc;
        return this;
      },
      tax_ids: function (eu_vat) {
        this.self.tax_ids = eu_vat;
        return this;
      },
    };
  }
}

module.exports = Location_Object;
