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
      keys: ["product_type"], // array of property names where Square expects specific values
      product_type: ["REGULAR", "APPOINTMENTS_SERVICE"],
    };
    this._fardel = {
      type: "ITEM",
      name: undefined,
      description: undefined,
      abbreviation: undefined,
      category_id: undefined, // have a config file for this? so user doesn't have to deal with id codes?
      label_color: undefined,
      available_online: undefined,
      available_for_pickup: undefined,
      available_electroncially: undefined,
      tax_ids: undefined, // => array of strings
      modifier_list_info: undefined, // =>  array of objects
      variations: undefined, // => array of objects
      product_type: "REGULAR", // make a switcher
      skip_modifier_screen: undefined, //default is false
      item_options: undefined, // => array of strings
      sort_name: undefined, // supported in Japan only
    };
  }

  // for bools have chain propName.yes, propName.no

  // GETTERS
  get fardel() {
    return this._fardel;
  }
  get type() {
    return this._fardel.type;
  }
  get description() {
    return this._fardel.description;
  }
  get abbreviation() {
    return this._fardel.abbreviation;
  }
  get category_id() {
    return this._fardel.category_id;
  }
  get label_color() {
    return this._fardel.label_color;
  }
  get available_online() {
    return this._fardel.available_online;
  }
  get available_for_pickup() {
    return this._fardel.available_for_pickup;
  }
  get available_electronically() {
    return this._fardel.available_electroncially;
  }
  get tax_ids() {
    return this._fardel.tax_ids;
  }
  get modifier_list_info() {
    return this._fardel.modifier_list_info;
  }
  get variations() {
    return this._fardel.variations;
  }
  get product_type() {
    return this._fardel.product_type;
  }
  get skip_modifier_screen() {
    return this._fardel.skip_modifier_screen;
  }
  get item_options() {
    return this._fardel.item_options;
  }
  get sort_name() {
    return this._fardel.sort_name;
  }

  // SETTERS
  set type(bool) {
    this._fardel.type = "ITEM";
  }
  // set name(val) {
  //   // max 512 - shouldn't need to be explicity created bc this.configuration is premade
  // }
  set description(str) {
    if (this.maxLength(this.configuration.lengthLimits.description, str)) {
      this._fardel.description = str;
    }
  }
  set abbreviation(str) {
    if (this.maxLength(this.configuration.lengthLimits.abbreviation, str)) {
      this._fardel.abbreviation = str;
    }
  }
  set label_color(hex) {
    if (!isHexColor(hex)) {
      throw new Error(
        `label_color must be a valid hex color. /"${hex}/" is not a valid hex color.`
      );
    }
    this._fardel.label_color = hex;
  }
  set available_online(bool) {
    this._fardel.available_online = bool;
  }
  set available_for_pickup(bool) {
    this._fardel.available_for_pickup = bool;
  }
  set available_electronically(bool) {
    this._fardel.available_electroncially = bool;
  }
  set category_id(id) {
    this._fardel.category_id = id;
  }
  set tax_ids(id) {
    if (!Array.isArray(this.tax_ids)) {
      this._fardel.tax_ids = [];
    }
    this._fardel.tax_ids.push(id);
  }
  set modifier_list_info(obj) {
    //todo validate the object
    // has one required value -- the subpropery modifier_Overrids also has one required value
    if (!Array.isArray(this.modifier_list_info)) {
      this._fardel.modifier_list_info = [];
    }
    this._fardel.modifier_list_info.push(obj);
  }
  set variations(obj) {
    //todo validate the object - this is complex and might be best done with a subclass
    // An item must have at least one variation.
    if (!Array.isArray(this._fardel.variations)) {
      this._fardel.variations = [];
    }
    this._fardel.variations.push(obj);
  }
  set product_type(val) {
    this._fardel.product_type = val;
  }
  set item_options(id) {
    let lengthLimit = 6;
    if (!Array.isArray(this._fardel.item_options)) {
      this._fardel.item_options = [];
    }
    if (this.item_options.length > lengthLimit - 1) {
      throw new Error(
        `Item options array can contain no more than ${lengthLimit} items.`
      );
    }
    this._fardel.item_options.push(id);
  }
  set sort_name(str) {
    // Square uses the regular name field as default
    this._fardel.sort_name = str;
  }
  //METHODS
  // have spawn to auto gen and chainSet for manual
  spawn() {
    const methods = () => {
      const properties = {
        self: this,
        name: function (str) {
          this.self.name = str;
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

// const configuration = {
//   lengthLimits: {
//     name: 512,
//     description: 4096,
//     abbreviation: 24,
//   },
//   keys: ["product_type"], // array of property names where Square expects specific values
//   product_type: ["REGULAR", "APPOINTMENTS_SERVICE"],
// };

// https://developer.squareup.com/reference/square/objects/CatalogItemVariation
// const allowedValues_item_variation = {
//   lengthLimits: {
//     name: 255,
//   },
//   pricing_type: ["FIXED_PRICING", " VARIABLE_PRICING"],
//   inventory_alert_type: ["NONE", "LOW_QUANTITY"],
// };

/* -------------------------------------------------------------------
//  MAKE ITEM A SUB CLASS OF ITEM-VARIATION OR VICE VERSA
// GIVE ITEM A 'DEFAULT' VARIATION METHOD THAT CREATES A 'REGULAR' ONE
// OR
Make item variation a mixin...

or make a method called 'variation' and curry it

-------------------------------------------------------------------*/

//MAYBE instead of a unique class, have a METHOD
// on the ITEM class that makes this as a property...
// or a have a method that instantiates this class?
// or require the user to make one, then when it's added to an item
// the item_id gets set then
// class Item_Variation extends Helper_Name {
//   constructor(item_id, name) {
//     super(name);
//     this._type = "ITEM_VARIATION";
//     // id of associated item
//     this._item_id = item_id; //must be set by Item class
//     this._sku; // can it be validated?
//     this._upc; // can it be validated? min ln:12 max ln:14
//     this._pricing_type; // [ CHAIN ]
//     this._price_money; // [ CHAIN ]
//     this._location_overrides; // [ CHAIN ]
//     this._track_inventory; // [ CHAIN T/F ]
//     this._inventory_alert_type;
//     this._inventory_alert_type_threshold;
//     this._user_data; //255
//     this._service_duration;
//     this._available_for_booking;
//     this._item_options_values;
//     this._measurement_unit_id;
//     this._stockable;
//     this._team_member_ids;
//     this._stockable_coversion;
//   }
//   // new standard name for chain setters
//   spawn() {}
// }

module.exports = Catalog_Item;
