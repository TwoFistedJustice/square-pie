const { shazam_maxLength } = require("./utilities/aaa_index");
const Catalog_Object_Super = require("./catalog_object_abstract_super");
class Catalog_Category extends Catalog_Object_Super {
  _display_name = "Catalog_Category";
  _last_verified_square_api_version = "2021-07-21";
  constructor() {
    super();
    this._fardel = {
      type: "CATEGORY",
      id: undefined,
      category_data: {
        name: undefined,
      },
    };

    this.configuration = {
      maximums: {
        name: 255,
      },
    };
  }
  get display_name() {
    return this._display_name;
  }
  get square_version() {
    return `The last verified compatible Square API version is ${this._last_verified_square_api_version}`;
  }
  get type() {
    return this._fardel.type;
  }
  get id() {
    return this._fardel.id;
  }
  get name() {
    return this._fardel.category_data.name;
  }
  get fardel() {
    if (this.name === undefined) {
      throw new TypeError(
        "Category must have a name assigned. Please assign a name."
      );
    }
    if (this._fardel.id === undefined) {
      this.id = this.name;
    }
    return this._fardel;
  }
  // SETTERS
  set type(any) {
    this._fardel.type = "CATEGORY";
  }
  set id(str) {
    str[0] !== "#" ? (this._fardel.id = "#" + str) : (this._fardel.id = str);
  }
  set name(str) {
    let caller = "name";
    if (shazam_maxLength(this.configuration.maximums.name, str, caller)) {
      this._fardel.category_data.name = str;
    }
  }

  //MAKER METHODS
  make() {
    return {
      self: this,
      name: function (str) {
        this.self.name = str;
        return this;
      },
      id: function (str) {
        this.self.id = str;
        return this;
      },
      present_at_all_locations: function (bool) {
        this.self.present_at_all_locations = bool;
        return this;
      },
      present_at_location_ids: function (id) {
        this.self.present_at_location_ids = id;
        return this;
      },
    };
  }
}

module.exports = Catalog_Category;
