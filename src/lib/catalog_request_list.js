const Catalog_Request = require("./catalog_request");
const { setter_chain_generator_config } = require("./utilities");

class Catalog_List extends Catalog_Request {
  constructor() {
    super();
    this._method = "get";
    this._endpoint = "/list";

    this.configuration = {
      keys: ["types"],
      types: [
        "ITEM_VARIATION",
        "CATEGORY",
        "DISCOUNT",
        "TAX",
        "MODIFIER",
        "MODIFIER_LIST",
        "IMAGE",
      ],
    };
    this._fardel = {
      catalog_version: undefined,
    };
    this._delivery;
  }
  get fardel() {
    return this._fardel;
  }
  get catalog_version() {
    return this._fardel.catalog_version;
  }
  get delivery() {
    return this._delivery;
  }

  // SETTERS
  set delivery(parcel) {
    this._delivery = parcel.objects;
  }
  // /* catalog version
  //  * Square uses ISO date format :  str "YYYY-MM-DD"
  //  * go to their docs to see what their versions are.
  //  * */
  set catalog_version(version) {
    this._fardel.catalog_version = version;
  }

  // METHODS
  make() {
    const methods = () => {
      const properties = {
        self: this,
        catalog_version: function (version) {
          this.self.catalog_version = version;
        },
      };
      setter_chain_generator_config(this.configuration, properties, this);
      return properties;
    };
    return methods();
  }
}

module.exports = Catalog_List;
