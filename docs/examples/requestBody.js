var Req_Body_looks_like = {
  query: {},
  limit: {},
  cursor: {}
}


var Query_structure_looks_like = {
  Query: {
    filter: {},
    sort: {}
  }
}

// should create the base object then tack on properties maybe using Object.defineProperty() (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)
// then once the object is created, tack it on the class body property and make the request


// "exact" and "fuzzy" are mutually exclusive. Use only one of them at a time.
var Customer_Filter_looks_like = {
  // set created and updated at with a factory function
  created_at: {
    end_at: 'A datetime value in RFC 3339 format indicating when the time range ends.',
    start_at: 'A datetime value in RFC 3339 format indicating when the time range starts.'
  },
  updated_at:{
    end_at: 'A datetime value in RFC 3339 format indicating when the time range ends.',
    start_at: 'A datetime value in RFC 3339 format indicating when the time range starts.'
  },
  creation_source: {
    rule: 'INCLUDE or EXCLUDE', //do this when search criteria are met
    values: "Don't implement this yet, it gets complicated fast. A lot of opportunity for error."
  },
  // set exact and fuzzy with a factory function
  // we could even implement it from either or both directions
  // email.fuzzy, or fuzzy.email - just have the second one return the first - that way end users don't have to memorize everything exactly
  email_address: {
    exact: "exact email address",
    fuzzy: "part of an email address"
  },
  group_ids :"don't implement this yet",
  phone_number: {
    exact: "exact phone number",
    fuzzy: "partial phone number"
  },
  reference_id: {
    exact: "exact ID",
    fuzzy: "partial ID"
  },
  
}

// copied from Square Postman Collection
var Customer_Query_EXAMPLE = {
  "query": {
    "filter": {
      "creation_source": {
        "values": [
          "THIRD_PARTY"
        ],
        "rule": "INCLUDE"
      },
      "created_at": {
        "start_at": "2018-01-01T00:00:00-00:00",
        "end_at": "2019-02-01T00:00:00-00:00"
      }
    },
    "sort": {
      "field": "CREATED_AT",
      "order": "ASC"
    }
  },
  "limit": 2
};

// EARLY idea for Customer Search Class
class CustomerSearch extends Search {
  _apiName  = 'customers';
  // _method = 'post';
  
  constructor(isProduction) {
    super(isProduction)
  }
  
  // METHODS
  fuzzy(){
    return {
      email: function(partialEmail){},
      phone: function (paritalPhone){},
      id: function (partialId){}
    }
  }
  exact(){
    return {
      email: function(partialEmail){},
      phone: function (paritalPhone){},
      id: function (partialId){}
    }
  }
  
  timeRange(begin, end) {}
  
  group(group_id){
    throw new Error("Groups are not implemented yet")
  }
  
} // END class
