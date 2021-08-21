const Catalog_Object_Super = require("./catalog_object_aaa_super");

class Helper_Name extends Catalog_Object_Super {
  constructor(name) {
    super();
    this.configuration = {
      lengthLimits: {
        name: 255,
      },
    };
    // this._name;
    this._fardel = {
      name: undefined,
    };
    this.name = name;
  }
  get name() {
    return this._fardel.name;
  }
  set name(str) {
    // if (this.lengthLimits(this.character_limit, str)) {
    if (this.maxLength(this.configuration.lengthLimits.name, str)) {
      this._fardel.name = str;
    }
  }
  maxLength(max, str = "") {
    if (str.length > max) {
      throw new Error(`Surpassed maximum character limit of ${max}.\n${str}`);
    }
    return true;
  }
}

module.exports = {
  Helper_Name,
};
