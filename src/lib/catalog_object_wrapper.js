const { nanoid } = require("nanoid/non-secure");

// instantiate class
// class.attach(stuff).attach(stuff)
// class.attach(stuff-I-forgot)
//class.add(same-as-attach)
//ToDO add ability to remove an item from payload array
// todo consider renaming Wrapper to Container because that is more clear

class Catalog_Object_Wrapper {
  _display_name = "Catalog_Object_Wrapper";
  _last_verified_square_api_version = "2021-07-21";
  constructor() {
    this._fardel = {
      idempotency_key: nanoid(),
      objects: [],
    };
  }
  // GETTERS
  get display_name() {
    return this._display_name;
  }
  get square_version() {
    return `The last verified compatible Square API version is ${this._last_verified_square_api_version}`;
  }
  get idempotency_key() {
    return this._idempotency_key;
  }
  get fardel() {
    return this._fardel;
  }
  get objects() {
    return this._fardel.objects;
  }
  // SETTERS
  set idempotency_key(nothing) {
    this._idempotency_key = nanoid();
  }

  attach(fardel) {
    this._fardel.objects.push(fardel);
    return this;
  }

  add(fardel) {
    this.attach(fardel);
    return this;
  }
}

module.exports = Catalog_Object_Wrapper;
