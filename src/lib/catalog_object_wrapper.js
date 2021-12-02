const { nanoid } = require("nanoid/non-secure");
const { define } = require("./utilities");

// instantiate class
// class.attach(stuff).attach(stuff)
// class.attach(stuff-I-forgot)
//class.add(same-as-attach)
// class.finalize() // todo extract this step out
// send out class.delivery
//ToDO add ability to remove an item from payload array
// todo consider renaming Wrapper to Container because that is more clear

class Catalog_Object_Wrapper {
  _display_name = "Catalog_Object_Wrapper";
  _last_verified_square_api_version = "2021-07-21";
  constructor() {
    this._fardel = {
      idempotency_key: nanoid(),
    };
    this._payload;
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
  get payload() {
    return this._payload;
  }
  get fardel() {
    return this._fardel;
  }
  // SETTERS
  set idempotency_key(nothing) {
    this._idempotency_key = nanoid();
  }
  set fardel_one(parcel) {
    if (typeof parcel !== "object" || Array.isArray(parcel)) {
      throw new TypeError("Parcel must be a curly brace Object.");
    }
    if (Object.prototype.hasOwnProperty.call(this._fardel, "objects")) {
      this._fardel.objects = undefined;
    } else if (!Object.prototype.hasOwnProperty.call(this._fardel, "object")) {
      define(this._fardel, "object", parcel);
    } else {
      this._fardel.object = parcel;
    }
  }
  // todo refactor - see if it works to just use the many
  //   if it does, refactor to eliminate the single-upsert
  set fardel_many(parcel) {
    if (!Array.isArray(parcel)) {
      throw new TypeError("Parcel must be an array.");
    }
    if (Object.prototype.hasOwnProperty.call(this._fardel, "object")) {
      // delete this._delivery.object;
      this._fardel.object = undefined;
    } else if (!Object.prototype.hasOwnProperty.call(this._fardel, "objects")) {
      define(this._fardel, "objects", parcel);
    } else {
      this._fardel.objects = parcel;
    }
  }

  set payload_one(parcel) {
    this._payload = parcel;
  }
  set payload_array(parcel) {
    this._payload.push(parcel);
  }

  attach(parcel) {
    if (this.payload === undefined) {
      this.payload_one = parcel;
    } else if (
      typeof (this.payload === "object") &&
      !Array.isArray(this.payload)
    ) {
      let cache = this.payload;
      this.payload_one = [];
      this.payload_array = cache;
      this.payload_array = parcel;
    } else if (Array.isArray(this.payload)) {
      this.payload_array = parcel;
    } else {
      throw new TypeError(
        "Catalog Object attach method error. Make sure you passed in a Catalog Object"
      );
    }
    return this;
  }
  // because I keep calling add, even though it's supposed to be attach
  add(parcel) {
    this.attach(parcel);
    return this;
  }
  // Todo try to eliminate this step
  // integrate it into attach or something
  finalize() {
    // the needs of the many outweigh the needs of the few, or the one
    if (Array.isArray(this.payload)) {
      this.fardel_many = this.payload;
    } else {
      this.fardel_one = this.payload;
    }
  }
}

module.exports = Catalog_Object_Wrapper;
