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

class Catalog_Object_Super {
  _display_name = "Catalog_Object_Super";
  _last_verified_square_api_version = "2021-12-15";
  _help = this.display_name + ": " + man;
  /**
   * Create a catalog object
   */
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
  /**
   * Gets catalog object id
   * @returns {string} id
   */
  get id() {
    return this._fardel.id;
  }
  get fardel() {
    return this._fardel;
  }
  /**
   * Gets if object can be found at all locations
   * @returns {boolean}
   */
  get present_at_all_locations() {
    return this._fardel.present_at_all_locations;
  }

  /**
   * Gets list of ids for locations that have object
   * @returns {(string[])} of location ids
   */
  get present_at_location_ids() {
    return this._fardel.present_at_location_ids;
  }

  /**
   * Sets the catalog object id
   * @param {string} id
   */
  set id(id) {
    this._fardel.id = id;
  }

  /**
   * Sets if object can be found at all locations
   *
   * @param {boolean} bool
   * @returns {boolean} true or false
   */
  set present_at_all_locations(bool) {
    this._fardel.present_at_all_locations = bool;
  }

  /**
   * Sets locations by id of were the object is stocked
   *
   * @param {string[]} id
   * @returns {string[]} list of location ids
   */
  set present_at_location_ids(id) {
    arrayify(this._fardel, "present_at_location_ids", this._display_name);
    this._fardel.present_at_location_ids.push(id);
  }
} // END class

module.exports = Catalog_Object_Super;
