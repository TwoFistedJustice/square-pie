import { fetch } from 'wix-fetch';
import { getSecret } from 'wix-secrets-backend'
const { v4: uuidv4 } = require('uuid');
const validator = require('validator');

const config = {
  sandbox: false,
  squareVersion: '2021-06-16',
  sandboxSecretName: 'square_sandbox',
  productionSecretName: 'square_token',
  contentType: 'application/json',
  Accept: 'application/json'
};

var shortCustomer = {
  given_name: "Amelia",
  email_address: "aMe.lia698214271522544412252474@gmail.com"
}

var spiritualCustomer = {
  "given_name": "Freddie",
  "family_name": "Krueger",
  "email_address": "freddie@iscream.org",
  "address": {
    "address_line_1": "187 Elm Street",
    "address_line_2": "Suite 86",
    "locality": "Springwood",
    "administrative_district_level_1": "OH",
    "postal_code": "43086",
    "country": "US"
  },
  "phone_number": "1-937-555-1054",
  "reference_id": "10-Claws",
  "note": "goooo toooo sleeeeeeep",
  "preferences": {
    "email_unsubscribed": false
  },
}

var stoneageCustomer = {
  "given_name": "Fred",
  "family_name": "Flintsone",
  "email_address": "fred@slaterock.com",
  "address": {
    "address_line_1": "301 Cobblestone Way",
    "address_line_2": "",
    "locality": "Bedrock",
    "administrative_district_level_1": "BR",
    "postal_code": "70777",
    "country": "BR"
  },
  "phone_number": "1-937-555-7777",
  "reference_id": "Flintsone-7777",
  "note": "yubba dubba doooo",
  "preferences": {
    "email_unsubscribed": false
  },
}

var unhappyCustomer = {
  "given_name": "Jason",
  "family_name": "Voorhees",
  "email_address": "machete@iscream.org",
  "address": {
    "address_line_1": "1054 Camp Crystal Lake Street",
    "address_line_2": "Cabin 86",
    "locality": "Crystal Lake",
    "administrative_district_level_1": "OH",
    "postal_code": "43086",
    "country": "US"
  },
  "phone_number": "1-937-555-0013",
  "reference_id": "Friday-The-13th",
  "note": "naughty children go to sleep",
  "preferences": {
    "email_unsubscribed": false
  },
}

var trickrTreatCustomer = {
  "given_name": "Michael",
  "family_name": "Myers",
  "email_address": "candyTime@iscream.org",
  "address": {
    "address_line_1": "86 Nowhere Is Safe Court",
    "address_line_2": "",
    "locality": "Haddonfield",
    "administrative_district_level_1": "IL",
    "postal_code": "60686",
    "country": "US"
  },
  "phone_number": "1-937-555-1031",
  "reference_id": "Halloween-31",
  "note": "want some candy?",
  "preferences": {
    "email_unsubscribed": false
  },
}



// TOP LEVEL CLASSES

// instantiate the class with a boolean
// before calling class.makeRequest(secret) you have to get the secret from wix
// by calling getSecret(class.secretName)
class SquareRequest {
  _method = '';
  _body;
  _endpoint = '';
  
  constructor(isProduction) {
    this.isProduction = isProduction;
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
    return (this.isProduction === true) ? `${config.productionSecretName}` : `${config.sandboxSecretName}`;
  }
  
  get baseUrl() {
    return (this.isProduction === true) ? `https://connect.squareup.com/v2/${this._apiName}` : `https://connect.squareupsandbox.com/v2/${this._apiName}`;
  }
  get url() {
    return `${this.baseUrl}${this._endpoint}`;
  }
  
  // METHODS
  
  headers(secret) {
    return {
      'Square-Version': `${config.squareVersion}`,
      'Content-Type': `${config.contentType}`,
      'Accept': `${config.Accept}`,
      'Authorization': `Bearer ${secret}`
    };
  }
  // you have to get the secret before calling this method
  makeRequest(secret) {
    
    let request = async (url, options) => {
      const httpResponse = await fetch(url, options);
      if (!httpResponse.ok) {
        let message = `\ngenerated url: ${this.url}\nmethod: ${options.method}\n${httpResponse.status}: ${httpResponse.statusText}`
        throw new Error(message);
      }
      let response = await httpResponse.json();
      return response;
    }
    return request(this.url, this.options(secret));
  }
  
  normalizeEmail(email) {
    let normalizeOptions = {
      yahoo_remove_subaddress: false
    };
    if (!validator.isEmail(email)) {
      throw new Error("Email is not valid. Please use a valid email address.")
    }
    return validator.normalizeEmail(email, normalizeOptions);
  }
  options(secret) {
    return {
      method: this._method,
      headers: this.headers(secret),
      body: JSON.stringify(this._body)
    }
  }
} // END class

// LEVEL TWO CLASSES

class List extends SquareRequest {
  _method = 'get';
  
  constructor(isProduction) {
    super(isProduction);
  }
} // END class

// creates a whole new document
// you tell it what to store in its subclass
class Create extends SquareRequest {
  _method = 'post';
  
  constructor(isProduction) {
    super(isProduction);
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
  _method = 'post';
  _endpoint = '/search'
  constructor(isProduction) {
    super(isProduction);
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


// CUSTOMER CUSTOMER CUSTOMER CUSTOMER CUSTOMER CUSTOMER  CUSTOMER
// CUSTOMER CUSTOMER CUSTOMER  CUSTOMER CUSTOMER CUSTOMER  CUSTOMER CUSTOMER CUSTOMER

class CustomerList extends List {
  _apiName = 'customers';
  
  constructor(isProduction) {
    super(isProduction);
  }
} // END class

class CustomerSearch extends Search {
  _apiName = 'customers';
  _body = {
    query: {
      filter:{},
      sort: {
          field: "CREATED_AT",
          order: "ASC"
        },
      limit: ''
    },
  };
  
  constructor(isProduction) {
    super(isProduction)
  }
  
  // METHODS
  // this works like so:
  // the 'this' inside  query() is the class
  // call Search.query.fuzzy.the-method-you-want
  // call Search.query.exact.the-method-you-want
  query(){
    const methods = (fuzzacto) => {
        return {
        self: this,
        typeOfSearch: `${fuzzacto}`,
        email: function (email) {
          this.self._body.query.filter.email_address = { [this.typeOfSearch]: email };
          return this;
        },
        phone: function (phone) {
          this.self._body.query.filter.phone_number = { [this.typeOfSearch]: phone };
          return this;
        },
        id: function (id) {
          this.self._body.query.filter.reference_id = { [this.typeOfSearch]: id };
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
        }
      }
    }
    return {
      fuzzy: () => {
        return methods('fuzzy');
        },
      exact: () => {
        return methods('exact');
      }
    };
  }  // END query method
} // END class

class CustomerRetrieve extends RetrieveUpdateDelete {
  _apiName = 'customers';
  _method = 'get';
  
  constructor(isProduction) {
    super(isProduction)
  }
} // END class

class CustomerDelete extends RetrieveUpdateDelete {
  _apiName = 'customers';
  _method = 'delete';
  
  constructor(isProduction) {
    super(isProduction);
  }
} // END class
// ToDo execute a search on name, email, phone make sure no duplicates are created
class CustomerCreate extends Create {
  _apiName = 'customers';
  constructor(isProduction) {
    super(isProduction);
  }
  //METHODS
  set customer(customer) {
    customer.idempotency_key = this.idempotency_key;
    customer.email_address = super.normalizeEmail(customer.email_address);
    this.body = customer;
  }
} // END class

// TESTING FUNCTIONS BELOW HERE
// the function that calls the async getter MUST be async
// that way they go into the same call stack

// returns the ID of the first customer in the customers list
// creates a customer if none exists
const fetchIndexZeroCustomerId = async function () {
  let testCustomerSqID;
  let sandbox = false;
  let secret = await getSecret(config.sandboxSecretName);
  let list = await testList();
  
  if (!list.customers) {
    let newCustomer = await testCreate();
    testCustomerSqID = newCustomer.customer.id;
  } else {
    testCustomerSqID = list.customers[0].id;
  }
  if (!testCustomerSqID) {
    throw new Error('Something went wrong with setting the ID in testDelete();')
  }
  return list.customers[0].id;
}

export async function testList() {
  var list = new CustomerList(false)
  let secret = await getSecret(list.secretName);
  let customerList = await list.makeRequest(secret);
  return customerList;
}

export async function testRetrieve() {
  let testCustomerSqID = await fetchIndexZeroCustomerId();
  let retrieve = new CustomerRetrieve(false);
  let secret = await getSecret(retrieve.secretName);
  retrieve.id = testCustomerSqID;
  let customer = await retrieve.makeRequest(secret);
  return customer.customer;
}

export async function testCreate() {
  let someGuy = new CustomerCreate(false);
  let secret = await getSecret(someGuy.secretName);
  // someGuy.customer = shortCustomer;
  // someGuy.customer = spiritualCustomer;
  // someGuy.customer = unhappyCustomer;
  someGuy.customer = stoneageCustomer;
  let response = await someGuy.makeRequest(secret);
  console.log('Customer created:');
  return response;
}

export async function testDelete() {
  let sandbox = false;
  let secret = await getSecret(config.sandboxSecretName);
  let deleteCustomer = new CustomerDelete(sandbox);
  deleteCustomer.id = await fetchIndexZeroCustomerId();
  let vaporized = await deleteCustomer.makeRequest(secret);
  return vaporized;
}


export async function testSearchLimit() {
  let secret = await getSecret(config.sandboxSecretName);
  let search = new CustomerSearch(config.sandbox);
  search.query().fuzzy().email('fred').limit(1);
 let response = await search.makeRequest(secret)
  console.log('expect ONE fred to come back- Either one okay');
  return response;
};

export async function testSearchPhone() {
  let secret = await getSecret(config.sandboxSecretName);
  let search = new CustomerSearch(config.sandbox);
  search.query().fuzzy().email('fred').phone('77');
  let response = await search.makeRequest(secret)
  console.log('expect ONE fred to come back - FLINTSTONE');
  return response;
};


export async function testSortSearchDown(){
  let secret = await getSecret(config.sandboxSecretName);
  let search = new CustomerSearch(config.sandbox);
  search.query().fuzzy().sortDown().sortByName();
  return await search.makeRequest(secret);
};

export async function testSortSearchUp(){
  let secret = await getSecret(config.sandboxSecretName);
  let search = new CustomerSearch(config.sandbox);
  search.query().fuzzy().sortUp().sortByName();
  return await search.makeRequest(secret);
};

