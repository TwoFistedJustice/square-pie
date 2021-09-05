const Catalog_Request = require("./catalog_request");
const { setter_chain_generator_config } = require("./utilities_curry");

class Catalog_Search_Objects extends Catalog_Request {
  constructor() {
    super();
    this._method = "post";
    this._endpoint = "/search-catalog-items";
    this._body = {
      cursor: undefined,
    };
    this.configuration = {
      keys: [],
    };
  }

  get cursor() {
    return this._body.cursor;
  }

  set cursor(token) {
    // this is NOT fully implemented
    // it should be handled in Square Request in the delivery setter
    this._body.cursor = token;
  }

  // METHODS
  make() {
    const methods = () => {
      const properties = {
        self: this,
        cursor: function (token) {
          this.cursor = token;
          return this;
        },
      };
      setter_chain_generator_config(this.configuration, properties, this);
      return properties;
    };
    return methods();
  }
}

module.exports = Catalog_Search_Objects;
