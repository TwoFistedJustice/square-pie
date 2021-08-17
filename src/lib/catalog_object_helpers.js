class Helper_Name {
  constructor(name) {
    this.character_limit = 255;
    this._name;
    this.name = name;
  }
  get name() {
    return this._name;
  }
  set name(str) {
    if (this.maxLength(this.character_limit, str)) {
      this._name = str;
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
