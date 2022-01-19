// const {arrayify} = require("./utilities");
const Catalog_Object_Super = require("./catalog_object_abstract_super");
const man =
  "Describe what it does here.\n" +
  "\nhttps:// link(s) to relevant square docs go here";

class Catalog_Object_Something_Something extends Catalog_Object_Super {
  _display_name = "Catalog_Object_Something_Something";
  _last_verified_square_api_version = undefined; // change me
  _help = this.display_name + ": " + man;

  constructor() {
    super();
    this._fardel = {
      id: undefined,
      present_at_all_locations: undefined, // bool
      present_at_location_ids: undefined, //[str]
      type: "SOMETHING_ALL_CAPS",
      something_something_data: {},
    };

    this.configuration = {
      maximums: {
        name: 255,
      },
    };
  }
  // GETTERS

  // SETTERS

  //MAKE METHODs

  make() {
    return {
      self: this,
      id: function (id) {
        this.self.id = id;
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

module.exports = Catalog_Object_Something_Something;
