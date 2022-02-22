const Catalog_Request = require("./catalog_request_abstract");
const { nanoid } = require("nanoid/non-secure");
const man =
  "Upserts one or more Catalog API Objects. Create the object using the appropriate Pie class then add that" +
  "class's fardel using make().add(fardel)\n" +
  "\nhttps://developer.squareup.com/reference/square/catalog-api/batch-upsert-catalog-objects ";

/**
 * {@link https://developer.squareup.com/reference/square/catalog-api/batch-upsert-catalog-objects |  **-------> Link To Square Docs <-------**}
 * @class Catalog_Upsert
 * @classdesc
 * Upserts one or more Catalog API Objects.<br>
 * Create the object using the appropriate Pie Catalog Object class then add that class's fardel.<br>
 * You can use make().add() or add()
 * using make().add(fardel)
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
  /**
   * add - adds a catalog object fardel to be uploaded to Square.
   * @typedef {function} Catalog_Upsert.add
   * @memberOf Catalog_Upsert
   * @public
   * @method
   * @param {string} id
   * @example
   * myVar.add(myOtherVar.fardel)
   * */

  add(fardel) {
    this.body = fardel;
    return this;
  }

  // MAKE METHODS
  /**
   *  make() method of Catalog_Upsert
   *  Make sure to have the Square Docs open in front of you.
   * Sub-Method names are exactly the same as the property names listed
   * in the Square docs. There may be additional methods and/or shortened aliases of other methods.
   *
   * You should read the generated docs as:
   *     method_name(arg) {type} description of arg
   *
   * @typedef {function} Catalog_Upsert.make
   * @method
   * @public
   * @memberOf Catalog_Upsert
   * @property (fardel) {fardel} - Add a Catalog_Object fardel to be upserted
   * @property (fardel) {fardel} - - alias of 'body()`
   * @example
   *  You must use parentheses with every call to make and with every sub-method. If you have to make a lot
   *  of calls from different lines, it will reduce your tying and improve readability to set make() to a
   *  variable.
   *
   *  let make = myVar.make();
   *   make.gizmo()
   *   make.gremlin()
   *    //is the same as
   *   myVar.make().gizmo().gremlin()
   * */

  make() {
    return {
      self: this,
      body: function (fardel) {
        this.self.body = fardel;
        return this;
      },
      add: function (fardel) {
        return this.body(fardel);
      },
    };
  }
}

module.exports = Catalog_Upsert;
