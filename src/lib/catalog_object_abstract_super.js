// This class should own the "ID" value and automatically insert the required '#' character if the user does not provide it.
// (check if the first character is a hash, and insert one if it's not there)
const { arrayify } = require("./utilities");
/** Base class for the Square catalog API
 *
 * This class should own the "ID" value and automatically insert the required '#' character if the user does not provide it.
 * (check if the first character is a hash, and insert one if it's not there)
 */
const man =
  "Super class for all Catalog Objects.\n" +
  "Follow the structure on the Square batch-upsert request page\n" +
  "\nhttps://developer.squareup.com/reference/square/catalog-api/batch-upsert-catalog-objects";

/** @class  Catalog_Object_Super - super class of Catalog API objects
 *  @abstract
 * {@link https://developer.squareup.com/reference/square/catalog-api/batch-upsert-catalog-objects | Link To Square Docs}
 * */

class Catalog_Object_Super {
  _display_name = "Catalog_Object_Super";
  _last_verified_square_api_version = "2021-12-15";
  _help = this.display_name + ": " + man;
  constructor() {
    // do not add a constructor argument as it will interfere with subclasses
    this._fardel = {
      id: undefined,
      present_at_all_locations: undefined, // bool
      present_at_location_ids: undefined, //[str]
    };
  }
  get display_name() {
    return this._display_name;
  }
  get square_version() {
    return `The last verified compatible Square API version is ${this._last_verified_square_api_version}`;
  }
  get help() {
    return this._help;
  }
  get id() {
    return this._fardel.id;
  }
  get fardel() {
    return this._fardel;
  }
  get present_at_all_locations() {
    return this._fardel.present_at_all_locations;
  }

  get present_at_location_ids() {
    return this._fardel.present_at_location_ids;
  }

  set id(id) {
    this._fardel.id = id;
  }

  set present_at_all_locations(bool) {
    this._fardel.present_at_all_locations = bool;
  }

  set present_at_location_ids(id) {
    arrayify(this._fardel, "present_at_location_ids", this._display_name);
    this._fardel.present_at_location_ids.push(id);
  }
} // END class

module.exports = Catalog_Object_Super;
