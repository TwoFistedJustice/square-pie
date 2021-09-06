const Catalog_Request = require("./catalog_request");
const { setter_chain_generator_config } = require("./utilities_curry");

class Catalog_Search_Objects extends Catalog_Request {
  constructor() {
    super();
    this._method = "post";
    this._endpoint = "/search";
    this._body = {
      cursor: undefined,
    };
    this.configuration = {
      keys: [],
    };
  }

  // METHODS
  make() {
    const methods = () => {
      const properties = {
        self: this,
      };
      setter_chain_generator_config(this.configuration, properties, this);
      return properties;
    };
    return methods();
  }
}

module.exports = Catalog_Search_Objects;
