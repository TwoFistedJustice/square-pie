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
    this._type = "ITEM";
    this._description;
    this._abbreviation;
    this._category_id; // have a config file for this? so user doesn't have to deal with id codes?
    this._label_color;
    this._available_online;
    this._available_for_pickup;
    this._available_electroncially;
    this._tax_ids = [];
    this._modifier_list_info = [];
    this._variations = [];
    this._product_type = "REGULAR"; // make a switcher
    this._skip_modifier_screen; //default is false
    this._item_options = [];
    this._sort_name = undefined; // supported in Japan only
  }

  // for bools have chain propName.yes, propName.no

  // GETTERS
  get type() {
    return this._type;
  }
  get description() {
    return this._description;
  }
  get abbreviation() {
    return this._abbreviation;
  }
  get category_id() {
    return this._category_id;
  }
  get label_color() {
    return this._label_color;
  }
  get available_online() {
    return this._available_online;
  }
  get available_for_pickup() {
    return this._available_for_pickup;
  }
  get available_electronically() {
    return this._available_electroncially;
  }
  get tax_ids() {
    return this._tax_ids;
  }
  get modifier_list_info() {
    return this._modifier_list_info;
  }
  get variations() {
    return this._variations;
  }
  get product_type() {
    return this._product_type;
  }
  get skip_modifier_screen() {
    return this._skip_modifier_screen;
  }
  get item_options() {
    return this._item_options;
  }
  get sort_name() {
    return this._sort_name;
  }

  // SETTERS
  set type(bool) {
    this._type = "ITEM";
  }
  // set name(val) {
  //   // max 512 - shouldn't need to be explicity created bc this.configuration is premade
  // }
  set description(str) {
    if (this.maxLength(this.configuration.lengthLimits.description, str)) {
      this._description = str;
    }
  }
  set abbreviation(str) {
    if (this.maxLength(this.configuration.lengthLimits.abbreviation, str)) {
      this._abbreviation = str;
    }
  }
  set label_color(hex) {
    if (!isHexColor(hex)) {
      throw new Error(
        `label_color must be a valid hex color. /"${hex}/" is not a valid hex color.`
      );
    }
    this._label_color = hex;
  }
  set available_online(bool) {
    this._available_online = bool;
  }
  set available_for_pickup(bool) {
    this._available_for_pickup = bool;
  }
  set available_electroncially(bool) {
    this._available_electroncially = bool;
  }
  set category_id(id) {
    this._category_id = id;
  }
  set tax_ids(id) {
    this._tax_ids.push(id);
  }
  set modifer_list_info(obj) {
    //todo validate the object
    // has one required value -- the subpropery modifier_Overrids also has one required value
    this._modifier_list_info.push(obj);
  }
  set variations(obj) {
    //todo validate the object - this is complex and might be best done with a subclass
    // An item must have at least one variation.
    this._variations.push(obj);
  }
  set product_type(val) {
    this._product_type = val;
  }
  set item_options(id) {
    let lengthLimit = 6;
    if (this.item_options.length > lengthLimit - 1) {
      throw new Error(
        `Item options array can contain no more than ${lengthLimit} items.`
      );
    }
    this._item_options.push(id);
  }
  set sort_name(str) {
    // Square uses the regular name field as default
    this._sort_name = str;
  }
  //METHODS
  // have spawn to auto gen and chainSet for manual
  spawn() {
    const methods = () => {
      const properties = {
        self: this,
        name: function (str) {
          this.self._name = str;
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
          this.self._label_color = hex;
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
        modifer_list_info: function (obj) {
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
