const Catalog_Object_Super = require("./catalog_object_super");

class Catalog_Category extends Catalog_Object_Super {
  constructor() {
    super();
    (this.configuration = {
      lengthLimits: {
        name: 255,
      },
    }),
      (this._fardel = {
        type: "CATEGORY",
        id: undefined,
        category_data: {
          name: undefined,
        },
      });
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
    console.log(JSON.stringify(this._fardel, null, 2));
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
    if (this.maxLength(this.configuration.lengthLimits.name, str)) {
      this._fardel.category_data.name = str;
    }
  }

  //todo document removal of parcel method

  //METHODS
  spawn() {
    const methods = {
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
      present_at_all_locations_ids: function (id) {
        this.self.present_at_all_locations_ids = id;
        return this;
      },
    };
    return methods;
  }
}

module.exports = Catalog_Category;
