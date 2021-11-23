const Catalog_Request = require("./catalog_request");
// todo change fardel to body ?? Why should it be one or the other?
// todo types expects a CSV list - build a utility for this and use it here
// https://developer.squareup.com/reference/square/catalog-api/list-catalog

class Catalog_List extends Catalog_Request {
  constructor() {
    super();
    this._method = "get";
    this._endpoint = "/list";

    this._fardel = {
      catalog_version: undefined,
      types: undefined,
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
  get types() {
    return this._fardel.types;
  }

  // SETTERS
  set delivery(parcel) {
    this._delivery = parcel.objects;
  }
  // /* catalog version
  //  * Square uses ISO date format to define catalog versions:  str "YYYY-MM-DD"
  //  * go to their docs to see what their versions are.
  //  * */
  set catalog_version(version) {
    this._fardel.catalog_version = version;
  }
  set types(str) {
    // todo replace this crappy version with a purpose made utility see issue #116
    //  this is just a holdover, it adds the first intance twice,
    //  which shouldn't harm anything but it's sloppy
    if (typeof this._fardel.types !== "string") {
      this._fardel.types = str;
    }
    let csv = this.types;
    csv += ", " + str;
    this._fardel.types = csv;
  }

  // PRIVATE METHODS

  #enum_types() {
    return {
      self: this,
      item_variation: function () {
        this.self.types = "ITEM_VARIATION";
        return this;
      },
      category: function () {
        this.self.types = "CATEGORY";
        return this;
      },
      discount: function () {
        this.self.types = "DISCOUNT";
        return this;
      },
      tax: function () {
        this.self.types = "TAX";
        return this;
      },
      modifier: function () {
        this.self.types = "MODIFIER";
        return this;
      },
      modifier_list: function () {
        this.self.types = "MODIFIER_LIST";
        return this;
      },
      image: function () {
        this.self.types = "IMAGE";
        return this;
      },
    };
  }

  // MAKER METHODS
  make() {
    return {
      self: this,
      catalog_version: function (version) {
        this.self.catalog_version = version;
      },
      types: function () {
        return this.self.#enum_types();
      },
    };
  }
}

module.exports = Catalog_List;
