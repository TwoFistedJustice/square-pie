const Catalog_Object_Super = require("./catalog_object_abstract_super");
const {
  shazam_boolean,
  shazam_max_length,
  shazam_max_length_array,
  arrayify,
} = require("./utilities");
const { isHexColor } = require("validator");

const man =
  "Creates a Catalog Item. Every Item must have at least one Item Variation (that's a different Core Class)\n" +
  "This class follows standard Pie syntax using .make(). You can add variation using `make().variations(variation.fardel)`\n" +
  "or skip make() and just call the setter `.variations = variation.fardel`" +
  "\nhttps://developer.squareup.com/reference/square_2021-12-15/objects/CatalogItem";

class Catalog_Item extends Catalog_Object_Super {
  _display_name = "Catalog_Item";
  _last_verified_square_api_version = "2021-12-15";
  _help = this.display_name + ": " + man;
  constructor() {
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
      id: undefined,
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
    // todo Arrayify
    if (!Array.isArray(this._fardel.item_data.variations)) {
      this._fardel.item_data.variations = [];
    }

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

  //MAKER METHODS
  make() {
    return {
      self: this,
      id: function (id) {
        this.self.id = id;
        return this;
      },
      temp_id: function (temp_id) {
        this.self.id = "#" + temp_id;
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
      modifier_list_info: function (obj) {
        this.self.modifier_list_info = obj;
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
