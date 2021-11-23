const Catalog_Request = require("./catalog_request");

class Catalog_Info extends Catalog_Request {
  // #standard_unit_json;
  constructor() {
    super();
    this._method = "get";
    this._endpoint = "/info";
    this._standard_unit_descriptions;
    this._standard_unit_json = [];
    this._language_code;
    this._limits;
  }

  get delivery() {
    return this._delivery;
  }

  get language_code() {
    return this._language_code;
  }
  get limits() {
    return this._limits;
  }
  get standard_units() {
    return this._standard_unit_descriptions;
  }
  get standard_unit_json() {
    return this._standard_unit_json;
  }

  set delivery(parcel) {
    if (
      Object.prototype.hasOwnProperty.call(
        parcel,
        "standard_unit_description_group"
      )
    ) {
      this.standard_units =
        parcel.standard_unit_description_group.standard_unit_descriptions;
      this.#convertToJson();
      this.#limits = parcel.limits;
      this.language_code = parcel.standard_unit_description_group.language_code;
    }
    this._delivery = parcel;
  }
  set #limits(obj) {
    this._limits = obj;
  }

  set #standard_unit_json(json) {
    this._standard_unit_json.push(json);
  }

  set language_code(code) {
    this._language_code = code;
  }

  set standard_units(arr) {
    this._standard_unit_descriptions = arr;
  }
  /*
   * Standard Units are included in Response.
   * They are converted into an array in set-delivery
   * stringifies incoming data
   * pushes the
   * */
  #convertToJson() {
    if (!Array.isArray(this._standard_unit_descriptions)) {
      throw new Error("standard unit descriptions not included in response.");
    }
    this._standard_unit_descriptions.forEach((element) => {
      let json = JSON.stringify(element, null, 2);
      this.#standard_unit_json = json;
    });
  }
}
module.exports = Catalog_Info;
