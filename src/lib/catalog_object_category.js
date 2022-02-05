const { shazam_max_length } = require("./utilities");
const Catalog_Object_Super = require("./catalog_object_abstract_super");
const man =
  "creates a Catalog Object.\n" +
  "Give it temporary ID. Use the same temporary ID in other objects being inserted or updated within\n" +
  " the same request to link them together.\n" +
  'Give your category a name up to 255 characters long. Use make().name("name")' +
  "\nhttps://developer.squareup.com/reference/square/objects/CatalogCategory";

/** @class  Catalog_Category
 * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
 * {@link  | Square Docs}
 * @example
 * */

class Catalog_Category extends Catalog_Object_Super {
  _display_name = "Catalog_Category";
  _last_verified_square_api_version = "2021-07-21";
  _help = this.display_name + ": " + man;
  constructor() {
    super();
    this._fardel = {
      type: "CATEGORY",
      id: undefined,
      category_data: {
        name: undefined,
      },
    };

    this.configuration = {
      maximums: {
        name: 255,
      },
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
  get type() {
    return this._fardel.type;
  }
  get id() {
    return this._fardel.id;
  }
  get name() {
    return this._fardel.category_data.name;
  }
  get fardel() {
    if (this.name === undefined) {
      throw new TypeError(
        "Category must have a name assigned. Please assign a name."
      );
    }
    if (this._fardel.id === undefined) {
      this.id = this.name;
    }
    return this._fardel;
  }
  // SETTERS
  set id(str) {
    str[0] !== "#" ? (this._fardel.id = "#" + str) : (this._fardel.id = str);
  }
  set name(str) {
    let caller = "name";
    if (shazam_max_length(this.configuration.maximums.name, str, caller)) {
      this._fardel.category_data.name = str;
    }
  }

  //MAKER METHODS
  /** @function make()  method of Catalog_Category - method names are exactly the same as the property names listed
   * in the Square docs. There may be additional methods and/or shortened aliases of other methods.
   * @method name
   * @param {string} str -
   * @method id
   * @param {string} str -
   * @method present_at_all_locations
   * @param {bool}  -
   * @method present_at_location_ids
   * @param {string} id -
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
      name: function (str) {
        this.self.name = str;
        return this;
      },
      id: function (str) {
        this.self.id = str;
        return this;
      },
      present_at_all_locations: function (bool) {
        this.self.present_at_all_locations = bool;
        return this;
      },
      present_at_location_ids: function (id) {
        this.self.present_at_location_ids = id;
        return this;
      },
    };
  }
}

module.exports = Catalog_Category;
