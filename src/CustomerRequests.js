const { v4: uuidv4 } = require("uuid");
const validator = require("validator");
const SquareRequest = require("./SquareRequest");

//-----------------------------------------------
// LEVEL TWO CLASSES
//-----------------------------------------------

class CustomerRequest extends SquareRequest {
  constructor() {
    super();
    this._apiName = "customers";
  }
  // METHODS

  normalizeEmail(email) {
    let normalizeOptions = {
      yahoo_remove_subaddress: false,
    };
    if (!validator.isEmail(email)) {
      throw new Error("Email is not valid. Please use a valid email address.");
    }
    return validator.normalizeEmail(email, normalizeOptions);
  }
} // END class

//-----------------------------------------------
// LEVEL THREE CLASSES
//-----------------------------------------------

class CustomerList extends CustomerRequest {
  constructor() {
    super();
    this._method = "get";
  }
} // END class

// creates a new document in the db
class CustomerCreate extends CustomerRequest {
  constructor(customer) {
    super();
    this._method = "post";
    this.idempotency_key = uuidv4();
    this.customer = customer;
  }
  // GETTERS
  get getIdempotency_key() {
    return this.idempotency_key;
  }

  // COMPUTED PROPERTIES
  set customer(customer) {
    customer.idempotency_key = this.idempotency_key;
    customer.email_address = super.normalizeEmail(customer.email_address);
    this.body = customer;
  }
} // END class

// https://developer.squareup.com/docs/customers-api/use-the-api/keep-records#update-a-customer-profile
//ToDO whenever something is updated or deleted, log it to a file in some retrievable location
class RetrieveUpdateDelete extends CustomerRequest {
  constructor(id = "you_still_need_to_set_the _id") {
    super();
    this._endpoint = `/${id}`;
  }
  get id() {
    return this._endpoint;
  }
  // METHODS
  set id(someId) {
    this._endpoint = `/${someId}`;
  }
} // END class

// THREE props on body: query, limit, cursor - these are same as for Invoices
// differentiation begins inside the query object
class CustomerSearch extends CustomerRequest {
  constructor() {
    super();
    this._method = "post";
    this._endpoint = "/search";
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

//-----------------------------------------------
// LEVEL FOUR CLASSES
//-----------------------------------------------
//

// update needs to be flexible in structure so it can be used for single fields or multiple fields
// json stringfify ignores props set to undefined, so build a _body structure that mimics
//  a Square customer doc, but set everything to undefined so the chainer won't blow out
// on an undeclared sub-property
// to acitvate it call the .id(id) method which exists on the super

//ToDO normalize all incoming email via super method
class CustomerUpdate extends RetrieveUpdateDelete {
  constructor(id) {
    super(id);
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
  // allows chaining
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
  constructor(id) {
    super(id);
    this._method = "get";
  }
} // END class

class CustomerDelete extends RetrieveUpdateDelete {
  constructor(id) {
    super(id);
    this._method = "delete";
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
