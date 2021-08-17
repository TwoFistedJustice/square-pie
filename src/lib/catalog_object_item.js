const { Helper_Name } = require("./catalog_object_helpers");

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

class Catalog_Item extends Helper_Name {
  constructor() {
    super();
    this._type = "ITEM";
    this._description;
    this._abbreviation;
    this._category_id; // have a config file for this? so user doesn't have to deal with id codes?
    this._label_color;
    this._available_online;
    this._available_for_pickup;
    this._available_electronically;
    this._tax_ids = [];
    this._modifier_list_info = [];
    this._variations = [];
    this._product_type = "REGULAR"; // make a switcher
    this._skip_modifier_screen; //default is false
    this._item_options = [];
    this._sort_name = undefined; // supported in Japan only
  }

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
    return this._available_electronically;
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
  set name(val) {
    // max 512
  }
  set description(val) {
    //max 4096
  }
  set abbreviation(val) {
    //max 24
  }
  set label_color(val) {
    // validate hed color code
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
  set category_id(val) {
    //The ID of the item's category, if any.
  }
  set tax_ids(id) {
    // push the id onto the array
  }
  set modifer_list_info(obj) {
    //validate the object
    // push the obj onto the array
  }
  set variations(obj) {
    //validate the object
    // push the obj onto the array
  }
  set product_type(val) {
    // "REGULAR" or "APPOINTMENTS_SERVICE"
  }
  set item_options(id) {
    // max length of 6
    // push the id obj onto the array
  }
  set sort_name(val) {
    // A name to sort the item by. If this name is unspecified, namely,
    // the sort_name field is absent, the regular name field is used for sorting.
  }

  //METHODs

  // for bools have chain propName.yes, propName.no

  // for fixed values make a link for each value
}

module.exports = Catalog_Item;
