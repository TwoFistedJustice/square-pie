const { Helper_Name } = require("./catalog_object_helpers");

class Catalog_Category extends Helper_Name {
  constructor(name) {
    super(name);
    this._type = "CATEGORY";
    this._present_at_all_locations = true;
  }
  get type() {
    return this._type;
  }
  get present_at_all_locations() {
    return this._present_at_all_locations;
  }

  set type(bool) {
    this._type = "CATEGORY";
  }
  set present_at_all_locations(bool) {
    this._present_at_all_locations = bool;
  }

  parcel() {
    return {
      type: this.type,
      id: `#${this.name}`,
      present_at_all_locations: this.present_at_all_locations,
      category_data: {
        name: this.name,
      },
    };
  }
}

module.exports = Catalog_Category;
