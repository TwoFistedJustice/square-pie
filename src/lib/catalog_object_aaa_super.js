// This class should own the "ID" value and automatically insert the required '#' character if the user does not provide it.
// (check if the first character is a hash, and insert one if it's not there)

class Catalog_Object_Super {
  constructor() {
    // do not add a constructor argument as it will interfere with subclasses
    this._id;
    this._present_at_all_locations; //bools
    this._present_at_location_ids; //[str]
  }

  get id() {
    return this._id;
  }
  get present_at_all_locations() {
    return this._present_at_all_locations;
  }
  get present_at_all_locations_ids() {
    return this._present_at_all_locations_ids;
  }

  set id(tempId) {
    if (tempId[0] !== "#") {
      this._id = "#" + tempId.slice(0);
    } else {
      this._id = tempId;
    }
  }
  set present_at_all_locations(bool) {
    this._present_at_all_locations = bool;
  }

  set present_at_all_locations_ids(id) {
    if (!Array.isArray(this.present_at_all_locations_ids)) {
      this._present_at_all_locations_ids = [];
    }
    this._present_at_all_locations_ids.push(id);
  }
} // END class

module.exports = Catalog_Object_Super;
