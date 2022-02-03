const Catalog_Request = require("./catalog_request_abstract");
const { nanoid } = require("nanoid/non-secure");
const man =
  "Upserts one or more Catalog API Objects. Create the object using the appropriate Pie class then add that" +
  "class's fardel using make().add(fardel)\n" +
  "\nhttps://developer.squareup.com/reference/square/catalog-api/batch-upsert-catalog-objects";

/** @class Catalog_Upsert
 * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
 * {@link  | Square Docs}
 * */

class Catalog_Upsert extends Catalog_Request {
  _display_name = "Catalog_Upsert";
  _last_verified_square_api_version = "2021-12-15";
  _help = this.display_name + ": " + man;
  constructor() {
    super();
    this._method = "POST";
    this._endpoint = "/batch-upsert";
    this._delivery; // what comes back
    this._body = {
      idempotency_key: nanoid(),
      batches: [
        {
          objects: [],
        },
      ],
    };
  }

  // GETTERS
  get body() {
    return this._body;
  }

  // SETTERS
  set body(fardel) {
    this.body.batches[0].objects.push(fardel);
  }

  // METHODS
  /**
   * @param {object} Item Object
   * @return Adds Item Objects to the body to be sent to Square
   * */
  add(fardel) {
    this.body = fardel;
    return this;
  }

  // MAKER METHODS
  /** @function make()  method of Catalog_Upsert - method names are exactly the same as the property names listed
   * in the Square docs. There may be additional methods and/or shortened aliases of other methods.
   * @method body - adds an object fardel to be upserted
   * @param {object} fardel - the fardel property of a Catalog Object
   * @method add - alias of body
   * @method
   * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
   * @example
   *  You must use parentheses with every call to make and with every sub-method. If you have to make a lot
   *  of calls from different lines, it will reduce your tying and improve readability to set make() to a
   *  variable.
   *  let make = myVar.make();
   *   make.gizmo()
   *   make.gremlin()
   *
   * */
  make() {
    return {
      self: this,
      body: function (fardel) {
        this.self.body = fardel;
        return this;
      },
      add: function (fardel) {
        this.body(fardel);
        return this;
      },
    };
  }
}

module.exports = Catalog_Upsert;
