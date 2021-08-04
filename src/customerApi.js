const { v4: uuidv4 } = require("uuid");
const validator = require("validator");

const config = require("./config");

//-----------------------------------------------
// TOP LEVEL CLASSES
//-----------------------------------------------

// instantiate the class with a boolean
// before calling class.makeRequest(secret) you have to get the secret from wix
// by calling getSecret(class.secretName)
//ToDO - Move SquareRequest into its own file and then require it
//ToDo - edit tables to reflect change
class SquareRequest {
  constructor(isProduction = true) {
    this.isProduction = isProduction;
    this._method = "";
    this._body;
    this._endpoint = "";
  }

  // GETTERS
  get method() {
    return this._method;
  }
  get body() {
    return this._body;
  }

  // SETTERS
  set body(val) {
    this._body = val;
  }
  set method(method) {
    this._method = method;
  }

  // COMPUTED PROPERTIES
  get secretName() {
    return this.isProduction === true
      ? `${config.productionSecretName}`
      : `${config.sandboxSecretName}`;
  }
  get baseUrl() {
    return this.isProduction === true
      ? `https://connect.squareup.com/v2/${this._apiName}`
      : `https://connect.squareupsandbox.com/v2/${this._apiName}`;
  }
  get url() {
    return `${this.baseUrl}${this._endpoint}`;
  }

  // METHODS

  headers(secret) {
    return {
      "Square-Version": `${config.squareVersion}`,
      "Content-Type": `${config.contentType}`,
      Accept: `${config.Accept}`,
      Authorization: `Bearer ${secret}`,
    };
  }
  // you have to get the secret before calling this method
  makeRequest(secret) {
    let request = async (url, options) => {
      const httpResponse = await fetch(url, options);
      if (!httpResponse.ok) {
        let message = `\ngenerated url: ${this.url}\nmethod: ${options.method}\n${httpResponse.status}: ${httpResponse.statusText}`;
        throw new Error(message);
      }
      let response = await httpResponse.json();
      return response;
    };
    return request(this.url, this.options(secret));
  }

  normalizeEmail(email) {
    let normalizeOptions = {
      yahoo_remove_subaddress: false,
    };
    if (!validator.isEmail(email)) {
      throw new Error("Email is not valid. Please use a valid email address.");
    }
    return validator.normalizeEmail(email, normalizeOptions);
  }
  options(secret) {
    return {
      method: this._method,
      headers: this.headers(secret),
      body: JSON.stringify(this._body),
    };
  }
} // END class

//-----------------------------------------------
// LEVEL TWO CLASSES
//-----------------------------------------------
// ToDo move api name into Level Two classes

class List extends SquareRequest {
  constructor(isProduction) {
    super(isProduction);
    this._method = "get";
  }
} // END class

// creates a whole new document
// you tell it what to store in its subclass
class Create extends SquareRequest {
  constructor(isProduction) {
    super(isProduction);
    this._method = "post";
    this.idempotency_key = uuidv4();
  }

  get getIdempotency_key() {
    return this.idempotency_key;
  }
} // END class

// https://developer.squareup.com/docs/customers-api/use-the-api/keep-records#update-a-customer-profile

// THREE props on body: query, limit, cursor - these are same as for Invoices
// differentiation begins inside the query object
class Search extends SquareRequest {
  constructor(isProduction) {
    super(isProduction);
    this._method = "post";
    this._endpoint = "/search";
  }
}

//ToDO whenever something is updated or deleted, log it to a file in some retrievable location
class RetrieveUpdateDelete extends SquareRequest {
  constructor(isProduction) {
    super(isProduction);
  }
  // METHODS
  set id(someId) {
    this._endpoint = `/${someId}`;
  }
} // END class

//-----------------------------------------------
// LEVEL THREE CLASSES
//-----------------------------------------------
//

// ToDO merge List and CustomerList
//ToDo - edit tables to reflect change

class CustomerList extends List {
  constructor(isProduction) {
    super(isProduction);
    this._apiName = "customers";
  }
} // END class

//ToDo merge Search and CustomerSearch
//ToDo - edit tables to reflect change

class CustomerSearch extends Search {
  constructor(isProduction) {
    super(isProduction);
    this._apiName = "customers";
    this._body = {
      query: {
        filter: {},
        sort: {
          field: "CREATED_AT",
          order: "ASC",
        },
        limit: "",
      },
    };
  }

  // METHODS
  // this works like so:
  // the 'this' inside  query() is the class
  // call Search.query.fuzzy.the-method-you-want
  // call Search.query.exact.the-method-you-want
  //TODO consider changing the name of query() to search()
  query() {
    const methods = (fuzzacto) => {
      return {
        self: this,
        typeOfSearch: `${fuzzacto}`,
        email: function (email) {
          this.self._body.query.filter.email_address = {
            [this.typeOfSearch]: email,
          };
          return this;
        },
        phone: function (phone) {
          this.self._body.query.filter.phone_number = {
            [this.typeOfSearch]: phone,
          };
          return this;
        },
        id: function (id) {
          this.self._body.query.filter.reference_id = {
            [this.typeOfSearch]: id,
          };
          return this;
        },
        limit: function (limit) {
          this.self._body.limit = limit;
          return this;
        },
        sortUp: function () {
          this.self._body.query.sort.order = "ASC";
          return this;
        },
        sortDown: function () {
          this.self._body.query.sort.order = "DESC";
          return this;
        },
        sortByFirstName: function () {
          this.self._body.query.sort.field = "DEFAULT";
          return this;
        },
        sortByDate: function () {
          this.self._body.query.sort.field = "CREATED_AT";
          return this;
        },
        sortByMostRecent: function () {
          this.self._body.query.sort.field = "CREATED_AT";
          this.self._body.query.sort.order = "ASC";
          return this;
        },
      };
    };
    return {
      fuzzy: () => {
        return methods("fuzzy");
      },
      exact: () => {
        return methods("exact");
      },
    };
  } // END query method
} // END class

// update needs to be flexible in structure so it can be used for single fields or multiple fields
// json stringfify ignores props set to undefined, so build a _body structure that mimics
//  a Square customer doc, but set everything to undefined so the chainer won't blow out
// on an undeclared sub-property
// to acitvate it call the .id(id) method which exists on the super

//ToDO normalize all incoming email via super method
class CustomerUpdate extends RetrieveUpdateDelete {
  constructor(isProduction) {
    super(isProduction);
    this._apiName = "customers";
    this._method = "put";
    // the props on _body aren't necessary, at this point they are just here for reference
    // the curly braces are necessary
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
      phone_number: undefined,
      reference_id: undefined,
      note: undefined,
      birthday: undefined, // specify this value in YYYY-MM-DD format.
      version: undefined, // Square will automatically increment this on their end when update is made
    };
  }

  //GETTERS
  // make getters for each customer field
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

  get version() {
    return this._body.version;
  }

  // SETTERS
  // make setters for each customer field
  set given_name(val) {
    this._body.given_name = val;
  }
  set family_name(val) {
    this._body.family_name = val;
  }
  set company_name(val) {
    this._body.company_name = val;
  }
  set nickname(val) {
    this._body.nickname = val;
  }
  //TODO normalize email
  set email_address(val) {
    this._body.email_address = val;
  }

  //TODO normalize addresses
  set address(preFormattedAddressObject) {
    this._body.address = preFormattedAddressObject;
  }
  set city(city) {
    this._body.address.locality = city;
  }
  set postalCode(val) {
    this.body.address.postal_code = val;
  }

  set state(province) {
    this.body.administrative_district_level_1 = province;
  }

  // TODO provide localized normalizer for phone numbers
  set phone_number(val) {
    this._body.phone_number = val;
  }
  set reference_id(val) {
    this._body.reference_id = val;
  }
  set note(val) {
    this._body.note = val;
  }

  set version(val) {
    this._body.version = val;
  }

  // METHODS
  // make a chainer
  chainSet() {
    return {
      self: this,
      firstName: function (val) {
        this.self.given_name = val;
        return this;
      },
      lastName: function (val) {
        this.self.family_name = val;
        return this;
      },
      company: function (val) {
        this.self._body.company_name = val;
        return this;
      },
      nickname: function (val) {
        this.self._body.nickname = val;
        return this;
      },
      email: function (val) {
        this.self.email_address = val;
        return this;
      },
      phone: function (val) {
        this.self.phone_number = val;
        return this;
      },
      note: function (val) {
        this.self.note = val;
        return this;
      },
      //TODO normalize birthday input with dayjs
      birthday: function (val) {
        //specify val in YYYY-MM-DD format.
        this.self._body.birthday = val;
        return this;
      },
    };
  }
} // END class

class CustomerRetrieve extends RetrieveUpdateDelete {
  constructor(isProduction) {
    super(isProduction);
    this._apiName = "customers";
    this._method = "get";
  }
} // END class

class CustomerDelete extends RetrieveUpdateDelete {
  constructor(isProduction) {
    super(isProduction);
    this._apiName = "customers";
    this._method = "delete";
  }
} // END class
// ToDo execute a search on name, email, phone make sure no duplicates are created
class CustomerCreate extends Create {
  constructor(isProduction) {
    super(isProduction);
    this._apiName = "customers";
  }
  //METHODS
  set customer(customer) {
    customer.idempotency_key = this.idempotency_key;
    customer.email_address = super.normalizeEmail(customer.email_address);
    this.body = customer;
  }
} // END class

module.exports = {
  CustomerList,
  CustomerSearch,
  CustomerUpdate,
  CustomerRetrieve,
  CustomerDelete,
  CustomerCreate,
};
