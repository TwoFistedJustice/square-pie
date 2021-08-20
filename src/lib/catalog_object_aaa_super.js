// This class should own the "ID" value and automatically insert the required '#' character if the user does not provide it.
// (check if the first character is a hash, and insert one if it's not there)

class Catalog_Object_Super {
  constructor() {
    // do not add a constructor argument as it will interfere with subclasses
    this._id;
  }

  get id() {
    return this._id;
  }

  set id(tempId) {
    if (tempId[0] !== "#") {
      this._id = "#" + tempId.slice(0);
    } else {
      this._id = tempId;
    }
  }
}

module.exports = Catalog_Object_Super;
