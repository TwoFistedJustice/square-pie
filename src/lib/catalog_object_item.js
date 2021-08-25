const { Helper_Name } = require("./catalog_object_helpers");
const { setter_chain_generator_config } = require("./utilities_curry");
const { isHexColor } = require("validator");

class Catalog_Item extends Helper_Name {
  constructor() {
    super();
    this.configuration = {
      lengthLimits: {
        name: 512,
        description: 4096,
        abbreviation: 24,
      },
      defaults: {
        auto_set_appointment_service: true,
      },
      keys: ["product_type"], // array of property names where Square expects specific values
      product_type: ["REGULAR", "APPOINTMENTS_SERVICE"],
    };
    this._fardel = {
      type: "ITEM",
      item_data: {
        name: undefined,
        description: undefined,
        abbreviation: undefined,
        category_id: undefined, // add a property to configuration so user doesn't have to deal with id codes?
        label_color: undefined,
        available_online: undefined,
        available_for_pickup: undefined,
        available_electroncially: undefined,
        tax_ids: undefined, // => array of strings
        modifier_list_info: undefined, // =>  array of objects
        variations: undefined, // => array of objects
        product_type: this.configuration.defaults.auto_set_appointment_service
          ? "APPOINTMENTS_SERVICE"
          : "REGULAR",
        skip_modifier_screen: undefined, //default is false
        item_options: undefined, // => array of strings
        sort_name: undefined, // supported in Japan only
      },
    };
  }

  // for bools have chain propName.yes, propName.no

  // GETTERS
  get fardel() {
    if (
      !Array.isArray(this._fardel.item_data.variations) ||
      this._fardel.item_data.variations.length <= 1
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
    return this._fardel.item_data.available_electroncially;
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
  set type(bool) {
    this._fardel.type = "ITEM";
  }
  set description(str) {
    if (this.maxLength(this.configuration.lengthLimits.description, str)) {
      this._fardel.item_data.description = str;
    }
  }
  set abbreviation(str) {
    if (this.maxLength(this.configuration.lengthLimits.abbreviation, str)) {
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
    this._fardel.item_data.available_electroncially = bool;
  }
  set category_id(id) {
    this._fardel.item_data.category_id = id;
  }
  set tax_ids(id) {
    if (!Array.isArray(this.tax_ids)) {
      this._fardel.item_data.tax_ids = [];
    }
    this._fardel.item_data.tax_ids.push(id);
  }
  set modifier_list_info(obj) {
    //todo validate the object
    // has one required value -- the subpropery modifier_Overrids also has one required value
    if (!Array.isArray(this.modifier_list_info)) {
      this._fardel.item_data.modifier_list_info = [];
    }
    this._fardel.item_data.modifier_list_info.push(obj);
  }
  set variations(obj) {
    //todo validate the object - this is complex and might be best done with a subclass
    // An item must have at least one variation.
    if (!Array.isArray(this._fardel.item_data.variations)) {
      this._fardel.item_data.variations = [];
    }
    if (obj.item_id !== this.id) {
      obj.item_id = this.id;
    }
    if (
      obj.available_for_booking !== undefined ||
      obj.service_duration !== undefined
    ) {
      this.product_type = "APPOINTMENTS_SERVICE";
    }
    this._fardel.item_data.variations.push(obj);
  }
  set product_type(val) {
    this._fardel.item_data.product_type = val;
  }
  set item_options(id) {
    let lengthLimit = 6;
    if (!Array.isArray(this._fardel.item_data.item_options)) {
      this._fardel.item_data.item_options = [];
    }
    if (this.item_options.length > lengthLimit - 1) {
      throw new Error(
        `Item options array can contain no more than ${lengthLimit} items.`
      );
    }
    this._fardel.item_data.item_options.push(id);
  }
  set sort_name(str) {
    // Square uses the regular name field as default
    this._fardel.item_data.sort_name = str;
  }
  //METHODS
  spawn() {
    const methods = () => {
      const properties = {
        self: this,
        name: function (str) {
          this.self.name = str;
          return this;
        },
        present_at_all_locations: function (bool) {
          this.self.present_at_all_locations = bool;
          return this;
        },
        present_at_all_locations_ids: function (id) {
          this.present_at_all_locations_ids = id;
          return this;
        },
        id: function (tempId) {
          this.id = tempId;
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
          // if arg is defined, set
          //otherwise .yes and .no
          this.self.available_online = bool;
          return this;
        },
        available_for_pickup: function (bool) {
          this.self.available_for_pickup = bool;
          return this;
        },
        //TODO fix spelling here and in tests to available_electronically
        available_electroncially: function (bool) {
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
          // todo validate object
          // if obj contains .service_duration or .available_for_booking
          // chekc if product type is appointements type

          this.self.variations = obj;
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
      };
      setter_chain_generator_config(this.configuration, properties, this);
      return properties;
    };
    return methods();
  }
}

module.exports = Catalog_Item;
