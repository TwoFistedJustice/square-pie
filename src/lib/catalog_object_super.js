// This class should own the "ID" value and automatically insert the required '#' character if the user does not provide it.
// (check if the first character is a hash, and insert one if it's not there)

/** Base class for the Square catalog API 
 * 
 * This class should own the "ID" value and automatically insert the required '#' character if the user does not provide it.
 * (check if the first character is a hash, and insert one if it's not there)
*/
class Catalog_Object_Super {
	/**
  * Create a catalog object
  */
	constructor() {
		// do not add a constructor argument as it will interfere with subclasses
		this._fardel = {
			id                       : undefined,
			present_at_all_locations : undefined, // bool
			present_at_location_ids  : undefined //[str]
		};
	}
	/**
   * Gets catalog object id
   * @returns {string} id
   */
	get id() {
		return this._fardel.id;
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
   * @param {string} tempId
   * @returns {string} the new id
   */
	set id(tempId) {
		if (tempId[0] !== '#') {
			this._fardel.id = '#' + tempId.slice(0);
		} else {
			this._fardel.id = tempId;
		}
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
		if (!Array.isArray(this.present_at_location_ids)) {
			this._fardel.present_at_location_ids = [];
		}
		this._fardel.present_at_location_ids.push(id);
	}

	// METHODS
	/**
  * Sets max character length and throws error if surpassed
	* 
  * @param {number} max - max character length
  * @param {string} [str=''] - string to be tested. default is ''
  * @returns {boolean} if string is under max length
  */
	maxLength(max, str = '') {
		if (str.length > max) {
			throw new Error(`Surpassed maximum character limit of ${max}.\n${str}`);
		}
		return true;
	}
} // END class

module.exports = Catalog_Object_Super;
