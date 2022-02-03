const Catalog_Object_Super = require("./catalog_object_abstract_super");
const { nanoid } = require("nanoid");
const {
  arrayify,
  clone_object,
  shazam_boolean,
  shazam_integer,
  shazam_max_length,
  shazam_max_length_array,
} = require("./utilities");
const { isHexColor } = require("validator");

const man =
  "Creates a Catalog Item. Every Item must have at least one Item Variation (that's a different Core Class)\n" +
  "You can pass an id as a constructor argument. If you choose not to do so, a temporary one with a leading '#temp_id_' will be\n" +
  "generated by nanoid to 8 characters.\n If you wish to change it later, do so before adding any Item Variations. You can\n" +
  "change it by calling make().id() to change it to a non-leading-# id, or by calling make().temp_id() which adds a '#temp_id_' for you.\n" +
  "This class follows standard Pie syntax using .make(). You can add variation using `make().variations(variation.fardel)`\n" +
  "or skip make() and just call the setter `.variations = variation.fardel`" +
  "\nhttps://developer.squareup.com/reference/square_2021-12-15/objects/CatalogItem";

/** @class Catalog_Item
 * @param {string} id -  Optional. A temporary id will be assigned if you omit this.
 * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
 * {@link  | Square Docs}
 * @example
 * */

class Catalog_Item extends Catalog_Object_Super {
  _display_name = "Catalog_Item";
  _last_verified_square_api_version = "2021-12-15";
  _help = this.display_name + ": " + man;
  constructor(id = "#temp_id_" + nanoid(8)) {
    super();
    this.configuration = {
      maximums: {
        name: 512,
        description: 4096,
        abbreviation: 24,
        item_options: 6,
      },
      defaults: {
        // todo move this to a user config file
        auto_set_appointment_service: false,
      },
    };

    this._fardel = {
      id: id,
      present_at_all_locations: undefined, // bool
      present_at_location_ids: undefined, //[str]
      type: "ITEM",
      item_data: {
        name: undefined,
        description: undefined,
        abbreviation: undefined,
        category_id: undefined, // add a property to configuration so user doesn't have to deal with id codes?
        label_color: undefined,
        available_online: undefined,
        available_for_pickup: undefined,
        available_electronically: undefined,
        tax_ids: undefined, // => array of strings
        modifier_list_info: undefined, // [modifier, ...]
        variations: undefined, // [item_variation, ...]
        product_type: this.configuration.defaults.auto_set_appointment_service
          ? "APPOINTMENTS_SERVICE"
          : "REGULAR",
        skip_modifier_screen: undefined, //defaults to false
        item_options: undefined, // => array of objects
        sort_name: undefined, // supported in Japan only
      },
    };
  }

  // GETTERS
  get fardel() {
    if (
      !Array.isArray(this._fardel.item_data.variations) ||
      this._fardel.item_data.variations.length < 1
    ) {
      throw new Error(
        "Items must have at least one variation or Square will reject the request."
      );
    }
    return this._fardel;
  }
  get type() {
    return this._fardel.type;
  }
  get name() {
    return this._fardel.item_data.name;
  }
  get description() {
    return this._fardel.item_data.description;
  }
  get abbreviation() {
    return this._fardel.item_data.abbreviation;
  }
  get category_id() {
    return this._fardel.item_data.category_id;
  }
  get label_color() {
    return this._fardel.item_data.label_color;
  }
  get available_online() {
    return this._fardel.item_data.available_online;
  }
  get available_for_pickup() {
    return this._fardel.item_data.available_for_pickup;
  }
  get available_electronically() {
    return this._fardel.item_data.available_electronically;
  }
  get tax_ids() {
    return this._fardel.item_data.tax_ids;
  }
  get modifier_list_info() {
    return this._fardel.item_data.modifier_list_info;
  }
  get variations() {
    return this._fardel.item_data.variations;
  }
  get product_type() {
    return this._fardel.item_data.product_type;
  }
  get skip_modifier_screen() {
    return this._fardel.item_data.skip_modifier_screen;
  }
  get item_options() {
    return this._fardel.item_data.item_options;
  }
  get sort_name() {
    return this._fardel.item_data.sort_name;
  }

  // SETTERS
  set name(str) {
    let caller = "name";
    if (shazam_max_length(this.configuration.maximums.name, str, caller)) {
      this._fardel.item_data.name = str;
    }
  }
  set description(str) {
    let caller = "description";
    if (
      shazam_max_length(this.configuration.maximums.description, str, caller)
    ) {
      this._fardel.item_data.description = str;
    }
  }
  set abbreviation(str) {
    let caller = "abbreviation";
    if (
      shazam_max_length(this.configuration.maximums.abbreviation, str, caller)
    ) {
      this._fardel.item_data.abbreviation = str;
    }
  }
  set label_color(hex) {
    if (!isHexColor(hex)) {
      throw new Error(
        `label_color must be a valid hex color. /"${hex}/" is not a valid hex color.`
      );
    }
    this._fardel.item_data.label_color = hex;
  }
  set available_online(bool) {
    this._fardel.item_data.available_online = bool;
  }
  set available_for_pickup(bool) {
    this._fardel.item_data.available_for_pickup = bool;
  }
  set available_electronically(bool) {
    this._fardel.item_data.available_electronically = bool;
  }
  set category_id(id) {
    this._fardel.item_data.category_id = id;
  }
  set tax_ids(id) {
    arrayify(this._fardel.item_data, "tax_ids", this._display_name);
    this._fardel.item_data.tax_ids.push(id);
  }
  set modifier_list_info(obj) {
    // has one required value -- the sub-property modifier_overrides also has one required value
    // check for presence of modifier_list_id
    // throw error if not
    // check for presence of modifier_overrides.modifier_id
    // throw error if parent is present but required child is not
    arrayify(this._fardel.item_data, "modifier_list_info");
    this._fardel.item_data.modifier_list_info.push(obj);
  }

  // item_variation id should be "#item.name" + "item_variation.name"
  /**
   * @param {}
   * @throws
   * @return
   * */
  set variations(obj) {
    // An item must have at least one variation.
    // If user didn't add an id, create an id for the variation by combining name fields
    // the ID is mentioned in the UPSERT docs
    if (obj.item_id === undefined || obj.item_id === "") {
      // obj.item_id = `#${this.name}_${obj.item_variation_data.name}`;
      obj.item_id = this.id;
    }
    arrayify(this._fardel.item_data, "variations", this.display_name);

    if (obj.item_variation_data.item_id !== this.id) {
      obj.item_variation_data.item_id = this.id;
    }

    // if either property is set, change product_type to appointment
    if (
      obj.item_variation_data.available_for_booking !== undefined ||
      obj.item_variation_data.service_duration !== undefined
    ) {
      this.product_type = "APPOINTMENTS_SERVICE";
    }
    this._fardel.item_data.variations.push(obj);
  }

  set product_type(val) {
    this._fardel.item_data.product_type = val;
  }

  set skip_modifier_screen(bool) {
    if (shazam_boolean(bool, this._display_name, "skip_modifier_screen")) {
      this._fardel.item_data.skip_modifier_screen = bool;
    }
  }
  set item_options(id) {
    arrayify(this._fardel.item_data, "item_options", this._display_name);
    if (
      shazam_max_length_array(
        this.configuration.item_options,
        this._fardel.item_data.item_options,
        this._display_name,
        "item_options"
      )
    ) {
      this._fardel.item_data.item_options.push({ item_option_id: id });
    }
  }
  set sort_name(str) {
    // Square uses the regular name field as default
    this._fardel.item_data.sort_name = str;
  }

  // PRIVATE METHODS

  /** @function enum_product_type
   * @private
   *  Enumerated methods set specific values from a limited set of allowable values defined by Square.
   *  For each value, a sub-method will exist that is the lowercase version of that value. There may also
   *  exist abbreviated aliases.
   *
   *  Enumerated methods are usually called by other functions and set the value on the object on which
   *  the calling function operates.
   * @method regular - sets value to "REGULAR"
   * @method appointments_service - sets value to "APPOINTMENTS_SERVICE"
   * @method appointment alias of appointments_service
   * @method appt alias of appointments_service
   * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
   * {@link https://developer.squareup.com/reference/square_2021-12-15/enums/CatalogItemProductType | Square Docs}
   * @example
   *  If you were allowed to choose from the set ["GOOD", "BAD", "UGLY"] in order to set the
   *  value of `clint` on the object 'western'
   *
   *  vyMar.make_western().clint.().good() => const spaghetti = {western : {clint: "GOOD"}}
   * */
  #enum_product_type() {
    return {
      self: this,
      regular: function () {
        this.self.product_type = "REGULAR";
        return this;
      },
      appointments_service: function () {
        this.self.product_type = "APPOINTMENTS_SERVICE";
        return this;
      },
      appointment: function () {
        return this.appointments_service();
      },
      appt: function () {
        return this.appointments_service();
      },
    };
  }

  // MAKE METHODS
  /** @function make_modifier_list - builds a compliant modifier_list_Info object. To use the 'view' method you must set the function
   * to a variable and call the method on the variable. If you don't do this, it will return an un-constructed  object.
   *
   *
   * @method modifier_list_id
   * @param{string} id
   * @method modifier_overrides
   * @param{string} id
   * @param{boolean} bool - default value is false
   * @throws{TypeError} throws an error if passed a non-boolean
   * @method min_selected_modifiers
   * @param{number} int32 - must be an integer
   * @throws{TypeError} throws an error if passed a non-integer
   * @method max_selected_modifiers
   * @param{number} int32 - must be an integer
   * @throws{TypeError} throws an error if passed a non-integer
   * @method enabled
   * @param{boolean} bool
   * @throws{TypeError} throws an error if passed a non-boolean
   * @method clear - clears your entries
   * @method view - returns the catalog_modifier_list object under construction
   * @method add - adds a copy of the constructed catalog_modifier_list to the array and calls clear()
   * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
   * {@link https://developer.squareup.com/reference/square_2021-12-15/objects/CatalogItemModifierListInfo | Square Docs}
   * @example
   *
   * */
  make_modifier_list() {
    const name = this.display_name + ".make_modifier_list";
    let catalog_modifier_list = {
      modifier_list_id: undefined,
      modifier_overrides: undefined,
      min_selected_modifiers: undefined,
      max_selected_modifiers: undefined,
      enabled: undefined,
    };
    let reinitialize = function () {
      for (let property in catalog_modifier_list) {
        catalog_modifier_list[property] = undefined;
      }
    };

    return {
      self: this,
      modifier_list_id: function (id) {
        catalog_modifier_list.modifier_list_id = id;
        return this;
      },
      modifier_overrides: function (id, bool = false) {
        if (shazam_boolean(bool, name, "modifier_overrides")) {
          catalog_modifier_list.modifier_overrides = {
            modifier_id: id,
            on_by_default: bool,
          };
        }
        return this;
      },
      min_selected_modifiers: function (int32) {
        if (shazam_integer(int32, name, "min_selected_modifiers")) {
          catalog_modifier_list.min_selected_modifiers = int32;
        }
        return this;
      },
      max_selected_modifiers: function (int32) {
        if (shazam_integer(int32, name, "max_selected_modifiers")) {
          catalog_modifier_list.max_selected_modifiers = int32;
        }
        return this;
      },
      enabled: function (bool = true) {
        if (shazam_boolean(bool, name, "enabled")) {
          catalog_modifier_list.enabled = bool;
        }
        return this;
      },
      clear: function () {
        reinitialize();
      },
      view: function () {
        return catalog_modifier_list;
      },
      add: function () {
        this.self.modifier_list_info = clone_object(catalog_modifier_list);
        this.clear();
      },
    };
  }

  /** @function make()  method of Catalog_Item - method names are exactly the same as the property names listed
   * in the Square docs. There may be additional methods and/or shortened aliases of other methods.
   * @method id
   * @param {string} id -
   * @method temp_id
   * @param {string} temp_id - will concatenate the argument to "#temp_id_"
   * @method present_at_all_locations
   * @param {bool} bool -
   * @method present_at_all_locations_ids
   * @param {string} id -
   * @method name
   * @param {string} str -
   * @method description
   * @param {string} str -
   * @method abbreviation
   * @param {string} str -
   * @method label_color
   * @param {string} hex - a hexadecimal color
   * @method available_online
   * @param {bool} bool -
   * @method available_for_pickup
   * @param {bool} bool -
   * @method available_electronically
   * @param {bool} bool -
   * @method category_id
   * @param {string} id -
   * @method tax_ids
   * @param {string} id -
   * @method modifier_list_info
   * @param {object} mod - a modifier list object
   * @method variations
   * @param {object} obj - an item_variation object
   * @method skip_modifier_screen
   * @param {bool} bool -
   * @method item_options
   * @param {string} id -
   * @method sort_name
   * @method product_type - enumerated function
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
      id: function (id) {
        this.self.id = id;
        return this;
      },
      temp_id: function (temp_id) {
        this.self.id = "#temp_id_" + temp_id;
        return this;
      },
      present_at_all_locations: function (bool) {
        this.self.present_at_all_locations = bool;
        return this;
      },
      present_at_all_locations_ids: function (id) {
        this.self.present_at_location_ids = id;
        return this;
      },
      name: function (str) {
        this.self.name = str;
        return this;
      },
      description: function (str) {
        this.self.description = str;
        return this;
      },
      abbreviation: function (str) {
        this.self.abbreviation = str;
        return this;
      },
      label_color: function (hex) {
        this.self.label_color = hex;
        return this;
      },
      available_online: function (bool) {
        this.self.available_online = bool;
        return this;
      },
      available_for_pickup: function (bool) {
        this.self.available_for_pickup = bool;
        return this;
      },
      available_electronically: function (bool) {
        this.self.available_electronically = bool;
        return this;
      },
      category_id: function (id) {
        this.self.category_id = id;
        return this;
      },
      tax_ids: function (id) {
        this.self.tax_ids = id;
        return this;
      },
      /** @method  make().modifier_list_info() - use this to pass a fully formed modifier list object as an argument.
       * To build one and push it to the array with one function use item.make_modifier_list()
       * @param {object} mod - a fully constructed modifier list object.
       * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
       * {@link https://developer.squareup.com/reference/square_2021-12-15/objects/CatalogItemModifierListInfo | Square Docs}
       * */
      modifier_list_info: function (mod) {
        this.self.modifier_list_info = mod;
        return this;
      },
      variations: function (obj) {
        this.self.variations = obj;
        return this;
      },
      skip_modifier_screen: function (bool) {
        this.self.skip_modifier_screen = bool;
        return this;
      },
      item_options: function (id) {
        this.self.item_options = id;
        return this;
      },
      sort_name: function (str) {
        this.self.sort_name = str;
        return this;
      },
      product_type: function () {
        return this.self.#enum_product_type();
      },
    };
  }
}

module.exports = Catalog_Item;
