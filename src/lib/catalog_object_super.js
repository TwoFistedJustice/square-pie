// This class should own the "ID" value and automatically insert the required '#' character if the user does not provide it.
// (check if the first character is a hash, and insert one if it's not there)

class Catalog_Object_Super {
  constructor() {
    // do not add a constructor argument as it will interfere with subclasses
    this._fardel = {
      id: undefined,
      present_at_all_locations: undefined, // bool
      present_at_location_ids: undefined, //[str]
    };
  }
  get id() {
    return this._fardel.id;
  }

  get present_at_all_locations() {
    return this._fardel.present_at_all_locations;
  }
  get present_at_location_ids() {
    return this._fardel.present_at_location_ids;
  }

  set id(tempId) {
    if (tempId[0] !== "#") {
      this._fardel.id = "#" + tempId.slice(0);
    } else {
      this._fardel.id = tempId;
    }
  }

  set present_at_all_locations(bool) {
    this._fardel.present_at_all_locations = bool;
  }
  set present_at_location_ids(id) {
    if (!Array.isArray(this.present_at_location_ids)) {
      this._fardel.present_at_location_ids = [];
    }
    this._fardel.present_at_location_ids.push(id);
  }
  // METHODS
  maxLength(max, str = "") {
    if (str.length > max) {
      throw new Error(`Surpassed maximum character limit of ${max}.\n${str}`);
    }
    return true;
  }
} // END class

module.exports = Catalog_Object_Super;
