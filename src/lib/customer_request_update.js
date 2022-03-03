const Retrieve_Update_Delete = require("./customer_request_abstract_R_U_D_super");
const {
  shazam_max_length,
  normalize_email,
  shazam_is_time_RFC3339,
  shazam_is_integer,
} = require("./utilities");
const man =
  "updates a Square customer record.\n" +
  "Update a record by sending a sparse customer object containing only the fields you want to update, along with\n" +
  "the current version of the record in Square's db. You can add the sparse object in two ways:\n" +
  "Firstly, you can make one using Customer_Object and pass the fardel as an argument to make().customer(fardel)\n" +
  "or you can build one using the make() method of this class, which works just like the one in Customer_Object.\n" +
  "To add the version, first fetch it from Square, then add it using make().version(version). This is not absolutely\n" +
  "necessary. But is a good idea if there is more than one potential source of updates.\n" +
  "https://developer.squareup.com/reference/square/customers-api/update-customer";

/**
 * {@link https://developer.squareup.com/reference/square/customers-api/update-customer |  **-------> Link To Square Docs <-------**}
 * @class Customer_Update
 * @extends Square_Request
 * @classdesc
 * Some fields that are available on Customer_Object are not updatable. This class has its own make() method which omits those fields. It has additional fields
 * not present in Customer_Object (`city` - for example)<br>
 * You do not need to use the Customer_Object class to create an update. You can. But you don't have to. You can build and send your update entirely from
 * within this class.
 *
 * Update a record by sending a sparse customer object containing only the fields you want to update, along with<br>
 * the current version of the record in Square's db. You can add the sparse object in two ways:<br>
 * Firstly, you can make one using Customer_Object and pass the fardel as an argument to make().customer(fardel)<br>
 * or you can build one using the make() method of this class, which works just like the one in Customer_Object.<br>
 * To add the version, first fetch it from Square, then add it using make().version(version). This is not absolutely<br>
 * necessary. But is a good idea if there is more than one potential source of updates.<br>
 * */

class Customer_Update extends Retrieve_Update_Delete {
  _display_name = "Customer_Update";
  _last_verified_square_api_version = "2021-12-15";
  _help = this.display_name + ": " + man;
  constructor(id) {
    super(id);
    this._method = "PUT";
    this._body = {
      given_name: undefined,
      family_name: undefined,
      company_name: undefined,
      nickname: undefined,
      email_address: undefined,
      address: {
        address_line_1: undefined,
        address_line_2: undefined,
        locality: undefined, // city
        administrative_district_level_1: undefined, // state/province
        postal_code: undefined,
        country: undefined,
      },
      phone_number: undefined, // str11
      reference_id: undefined,
      note: undefined,
      birthday: undefined, // RFC3339
      version: undefined, // int64 Square will automatically increment this on their end when update is made
      tax_ids: undefined,
    };
    this.configuration = {
      maximums: {
        phone_number: 11,
        tax_ids: 20,
      },
    };
  }

  //GETTERS
  get body() {
    return this._body;
  }
  get given_name() {
    return this._body.given_name;
  }
  get family_name() {
    return this._body.family_name;
  }
  get company_name() {
    return this._body.company_name;
  }
  get nickname() {
    return this._body.nickname;
  }
  get email_address() {
    return this._body.email_address;
  }
  get address() {
    return this._body.address;
  }
  get phone_number() {
    return this._body.phone_number;
  }
  get reference_id() {
    return this._body.reference_id;
  }
  get note() {
    return this._body.note;
  }
  get birthday() {
    return this._body.birthday;
  }
  get version() {
    return this._body.version;
  }
  get tax_ids() {
    return this._body.tax_ids;
  }

  // SETTERS
  set body(fardel) {
    for (let prop in fardel) {
      this._body[prop] = fardel[prop];
    }
  }
  set given_name(first_name) {
    this._body.given_name = first_name;
  }
  set family_name(last_name) {
    this._body.family_name = last_name;
  }
  set company_name(company) {
    this._body.company_name = company;
  }
  set nickname(nick) {
    this._body.nickname = nick;
  }
  set email_address(email) {
    let caller = "email_address";
    let shazam = normalize_email(email, this.display_name, caller);
    this._body.email_address = shazam;
  }
  set phone_number(phone) {
    if (
      shazam_max_length(
        phone,
        this.configuration.maximums.phone_number,
        this.display_name,
        "phone_number"
      )
    )
      this._body.phone_number = phone;
  }

  set address(address_object) {
    this._body.address = address_object;
  }
  set city(city) {
    this._body.address.locality = city;
  }
  set postal_code(val) {
    this.body.address.postal_code = val;
  }

  set state(province) {
    this.body.address.administrative_district_level_1 = province;
  }
  set birthday(time) {
    if (shazam_is_time_RFC3339(time, this._display_name, "birthday")) {
      this._body.birthday = time;
    }
  }
  set reference_id(id) {
    this._body.reference_id = id;
  }
  set note(note) {
    this._body.note = note;
  }
  set version(int) {
    if (shazam_is_integer(int)) {
      this._body.version = int;
    }
  }
  set tax_ids(eu_vat) {
    if (
      shazam_max_length(
        eu_vat,
        this.configuration.tax_ids,
        this._display_name,
        "tax_ids"
      )
    ) {
      this._body.tax_ids = { eu_vat };
    }
  }

  // MAKE METHODS
  /**
   *  make() method of Customer_Update
   *  Make sure to have the Square Docs open in front of you.
   * Sub-Method names are exactly the same as the property names listed
   * in the Square docs. There may be additional methods and/or shortened aliases of other methods.
   *
   * You should read the generated docs as:
   *     method_name(arg) {type} description of arg
   *
   * @typedef {function} Customer_Update.make
   * @method
   * @public
   * @memberOf Customer_Update
   * @property given_name(first_name) {string} -
   * @property family_name(last_name) {string} -
   * @property company_name(company) {string} -
   * @property nickname(nick) {string} -
   * @property email_address(email) {string} -
   * @property phone_number(phone) {string} - should be a phone number of no more than 11 characters
   * @property address(address_object) {object} - an Address Object
   * @property birthday(time) {string} - a date in RFC3339 format
   * @property reference_id(id) {string<id>} -
   * @property note(note) {string}
   * @property version(int) {integer}
   * @property creation_source() {Enumerated} -
   * @property preferences() {string}
   * @property tax_ids(eu_vat) {string} - a European Union VAT ID of no more than 20 characters
   * @property first_name(first_name) {string} - alias of `given_name`
   * @property last_name(last_name) {string} - alias of `family_name`
   * @property company(company) {string} - alias of `company_name`
   * @property email(email) {string} - alias of `email_address`
   * @property phone(phone) {string} - alias of `phone_number`
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
      given_name: function (first_name) {
        this.self.given_name = first_name;
        return this;
      },
      family_name: function (last_name) {
        this.self.family_name = last_name;
        return this;
      },
      company_name: function (company) {
        this.self.company_name = company;
        return this;
      },
      nickname: function (nick) {
        this.self.nickname = nick;
        return this;
      },
      address: function (address_object) {
        this.self.address = address_object;
        return this;
      },
      email_address: function (email) {
        this.self.email_address = email;
        return this;
      },
      phone_number: function (val) {
        this.self.phone_number = val;
        return this;
      },
      reference_id: function (id) {
        this.self.reference_id = id;
        return this;
      },
      note: function (note) {
        this.self.note = note;
        return this;
      },
      birthday: function (time) {
        this.self.birthday = time;
        return this;
      },
      version: function (int) {
        this.self.version = int;
        return this;
      },
      tax_ids: function (eu_vat) {
        this.self.tax_ids = eu_vat;
        return this;
      },
      customer: function (fardel) {
        this.self.body = fardel;
        return this;
      },
      city: function (city) {
        this.self.city = city;
        return this;
      },
      postal_code: function (zip) {
        this.self.postal_code = zip;
        return this;
      },
      state: function (state) {
        this.self.state = state;
        return this;
      },
      first_name: function (first_name) {
        return this.given_name(first_name);
      },
      last_name: function (last_name) {
        return this.family_name(last_name);
      },
      company: function (company) {
        return this.company_name(company);
      },
      email: function (email) {
        return this.email_address(email);
      },
      phone: function (phone) {
        return this.phone_number(phone);
      },
    };
  }
}

module.exports = Customer_Update;
