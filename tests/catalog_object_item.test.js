const Catalog_Item = require("../src/lib/catalog_object_item");
const Catalog_Item_Variation = require("../src/lib/catalog_object_item_variation");
const {
  id_patterns,
} = require("../src/lib/utilities/regular_expression_patterns");

// const { long_strings } = require("./helper_objects");
// const {expect} = require ("chai");

let item, make;
let id = "123";
const class_name = "Catalog_Item";

/* --------------------------------------------------------*
 *                                                         *
 *                        common structures
 *                                                         *
 * ------------------------------------------------------- */
describe("basic object class structures", () => {
  beforeEach(() => {
    item = new Catalog_Item();
    make = item.make();
  });
  test("should have display name", () => {
    expect(item.display_name).toBeDefined();
  });
  test("display name should be same as class name", () => {
    expect(item.display_name).toEqual(class_name);
  });
  test("should have help", () => {
    expect(item.help).toBeDefined();
  });
  test("should have defined square version", () => {
    expect(item.square_version).toBeDefined();
  });
  test("should have defined _fardel", () => {
    expect(item._fardel).toBeDefined();
  });
  test("auto_set_appointment_service: product_type should default to REGULAR ", () => {
    let expected = "REGULAR";
    expect(item.product_type).toEqual(expected);
  });

  test("type should be ITEM", () => {
    expect(item.type).toEqual("ITEM");
  });

  test("Should set a new temporary id if none is provided", () => {
    expect(id_patterns.temporary_id.test(item.id)).toEqual(true);
  });
});

/* --------------------------------------------------------*
 *                                                         *
 *                        Error Checking
 *                                                         *
 * ------------------------------------------------------- */

describe(`${class_name} Error Checking`, () => {
  beforeEach(() => {
    item = new Catalog_Item();
  });

  test("fardel getter should throw if variations array does not exist  ", () => {
    expect(() => {
      item.fardel;
    }).toThrowError(
      new Error(
        "Items must have at least one variation or Square will reject the request."
      )
    );
  });

  test("fardel getter should throw if variations array is empty ", () => {
    item._fardel.item_data.variations = [];
    expect(() => {
      item.fardel;
    }).toThrowError(
      new Error(
        "Items must have at least one variation or Square will reject the request."
      )
    );
  });

  test("set label color shoul throw if color is not a hex color", () => {
    let hex = "chartreuse";
    expect(() => {
      item.label_color = hex;
    }).toThrowError(
      `label_color must be a valid hex color. /"${hex}/" is not a valid hex color.`
    );
  });
});

// name
// description
// abbrev
// item_options array len
// 53 product type auto set
// 70-79 fardel error check
// 154-157  label color error check

/* --------------------------------------------------------*
 *                                                         *
 *                        getters/setters
 *                                                         *
 * ------------------------------------------------------- */

describe("getters/setters", () => {
  beforeEach(() => {
    item = new Catalog_Item();
    make = item.make();
  });

  test("make().id () should set ", () => {
    let expected = id;
    make.id(id);
    expect(item.id).toEqual(expected);
  });

  test("make().temp_id () should set ", () => {
    let expected = "#temp_id_" + id;
    make.temp_id(id);
    expect(item.id).toEqual(expected);
  });

  test("make().present_at_all_locations () should set ", () => {
    let expected = true;
    make.present_at_all_locations(true);
    expect(item.present_at_all_locations).toEqual(expected);
  });

  test("make().present_at_all_locations_ids () should set ", () => {
    let expected = [id];
    make.present_at_all_locations_ids(id);
    expect(item.present_at_location_ids).toEqual(expected);
  });

  test("make().name () should set ", () => {
    let expected = "Butterscotch Zombie";
    make.name("Butterscotch Zombie");
    expect(item.name).toEqual(expected);
  });
  test("make().description () should set ", () => {
    let expected = "A delicious meeting of two timeless classics!";
    make.description(expected);
    expect(item.description).toEqual(expected);
  });
  test("make().abbreviation () should set ", () => {
    let expected = "BZ";
    make.abbreviation("BZ");
    expect(item.abbreviation).toEqual(expected);
  });
  test("make().category_id () should set ", () => {
    let expected = id;
    make.category_id(expected);
    expect(item.category_id).toEqual(expected);
  });
  test("make().label_color () should set ", () => {
    let expected = "#54C571";
    make.label_color("#54C571");
    expect(item.label_color).toEqual(expected);
  });
  test("make().available_online () should set ", () => {
    let expected = true;
    make.available_online(true);
    expect(item.available_online).toEqual(expected);
  });
  test("make().available_for_pickup () should set ", () => {
    let expected = true;
    make.available_for_pickup(true);
    expect(item.available_for_pickup).toEqual(expected);
  });
  test("make().available_electroncially () should set ", () => {
    let expected = true;
    make.available_electronically(true);
    expect(item.available_electronically).toEqual(expected);
  });
  test("make().tax_ids () should set ", () => {
    let expected = [id];
    make.tax_ids(id);
    expect(item.tax_ids).toEqual(expected);
  });

  test("make().modifier_list_info() should set", () => {
    let mod = {
      modifier_list_id: id,
      enabled: false,
      max_selected_modifiers: 15,
      min_selected_modifiers: 5,
      modifier_overrides: {
        modifier_id: id,
        on_by_default: true, // If true, this CatalogModifier should be selected by default for this CatalogItem
      },
    };
    let expected = [mod];
    make.modifier_list_info(mod);
    expect(item.modifier_list_info).toMatchObject(expected);
  });

  test("make().variations () should set ", () => {
    let variation = new Catalog_Item_Variation();
    variation.name = "Herman";
    let expected = [variation.fardel];
    make.variations(variation.fardel);
    expect(item.variations).toMatchObject(expected);
  });

  test("variation setter should automatically set the variation item_id ", () => {
    item.id = id;
    let variation = new Catalog_Item_Variation();
    make.name("Herman").variations(variation.fardel);
    expect(item.id).toEqual(variation.item_id);
  });

  test("variation setter should automatically set product_type to APPOINTMENTS_SERVICE if variation.available_for_booking is set", () => {
    item.id = id;
    let variation = new Catalog_Item_Variation();
    variation.make().available_for_booking(true);
    make.name("Herman").variations(variation.fardel);
    expect(item.product_type).toEqual("APPOINTMENTS_SERVICE");
  });

  test("variation setter should automatically set product_type to APPOINTMENTS_SERVICE if variation.service_duration is set", () => {
    item.id = id;
    let variation = new Catalog_Item_Variation();
    variation.make().service_duration(40);
    make.name("Herman").variations(variation.fardel);
    expect(item.product_type).toEqual("APPOINTMENTS_SERVICE");
  });

  test("make().product_type().appointments_service() should set ", () => {
    let expected = "APPOINTMENTS_SERVICE";
    make.product_type().appointments_service();
    expect(item.product_type).toEqual(expected);
  });

  test("make().product_type().appointment() should set ", () => {
    let expected = "APPOINTMENTS_SERVICE";
    make.product_type().appointment();
    expect(item.product_type).toEqual(expected);
  });

  test("make().product_type().appt() should set ", () => {
    let expected = "APPOINTMENTS_SERVICE";
    make.product_type().appt();
    expect(item.product_type).toEqual(expected);
  });

  test("make().product_type().regular() should set ", () => {
    let expected = "REGULAR";
    item.product_type = "STEEE-RANNNNGE";
    expect(item.product_type).toEqual("STEEE-RANNNNGE");
    make.product_type().regular();
    expect(item.product_type).toEqual(expected);
  });
  test("make().product_type() should curry-over ", () => {
    make.product_type().regular().skip_modifier_screen(true);
    expect(item.skip_modifier_screen).toEqual(true);
    expect(item.product_type).toEqual("REGULAR");
  });

  test("make().skip_modifier_screen () should set ", () => {
    let expected = true;
    make.skip_modifier_screen(expected);
    expect(item.skip_modifier_screen).toEqual(expected);
  });
  test("make().item_options () should set ", () => {
    let expected = [{ item_option_id: id }];
    make.item_options(id);
    expect(item.item_options).toEqual(expected);
  });

  test("make().sort_name () should set ", () => {
    let expected = "muffin";
    make.sort_name("muffin");
    expect(item.sort_name).toEqual(expected);
  });

  /* --------------------------------------------------------*
   *                                                         *
   *                make_modifier_list()
   *                different from make().modifier_list_info()
   *                                                         *
   * ------------------------------------------------------- */
  test("make_modifier_list_ () should build one compliant object and send it to the array ", () => {
    let expected = [
      {
        modifier_list_id: id,
        enabled: false,
        max_selected_modifiers: 15,
        min_selected_modifiers: 5,
        modifier_overrides: {
          modifier_id: id,
          on_by_default: true, // If true, this CatalogModifier should be selected by default for this CatalogItem
        },
      },
    ];
    item
      .make_modifier_list()
      .modifier_list_id(id)
      .enabled(false)
      .max_selected_modifiers(15)
      .min_selected_modifiers(5)
      .modifier_overrides(id, true)
      .add();
    expect(item.modifier_list_info).toMatchObject(expected);
  });

  test("make_modifier_list  () should build two different compliant object and send it to the array ", () => {
    let obj1 = {
      modifier_list_id: id,
      enabled: true,
      max_selected_modifiers: 15,
      min_selected_modifiers: 5,
      modifier_overrides: {
        modifier_id: id,
        on_by_default: true,
      },
    };

    let obj2 = {
      modifier_list_id: "ABC",
      enabled: undefined,
      max_selected_modifiers: undefined,
      min_selected_modifiers: undefined,
      modifier_overrides: {
        modifier_id: "DEF",
        on_by_default: true,
      },
    };

    let expected = [obj1, obj2];
    item
      .make_modifier_list()
      .modifier_list_id(id)
      .enabled()
      .max_selected_modifiers(15)
      .min_selected_modifiers(5)
      .modifier_overrides(id, true)
      .add();
    item
      .make_modifier_list()
      .modifier_list_id("ABC")
      .modifier_overrides("DEF", true)
      .add();
    expect(item.modifier_list_info).toMatchObject(expected);
  });

  test("make_modifier_list ().view() should return the object under construction ", () => {
    let expected = {
      modifier_list_id: id,
      enabled: false,
      max_selected_modifiers: 15,
      min_selected_modifiers: 5,
      modifier_overrides: {
        modifier_id: id,
        on_by_default: true, // If true, this CatalogModifier should be selected by default for this CatalogItem
      },
    };
    let mod = item.make_modifier_list();
    mod
      .modifier_list_id(id)
      .enabled(false)
      .max_selected_modifiers(15)
      .min_selected_modifiers(5)
      .modifier_overrides(id, true);
    expect(mod.view()).toMatchObject(expected);
  });

  test("make_modifier_list ().clear() should return the object under construction to its un-constructed state ", () => {
    let expected = {
      modifier_list_id: undefined,
      modifier_overrides: undefined,
      min_selected_modifiers: undefined,
      max_selected_modifiers: undefined,
      enabled: undefined,
    };
    let mod = item.make_modifier_list();
    mod
      .modifier_list_id(id)
      .enabled(false)
      .max_selected_modifiers(15)
      .min_selected_modifiers(5)
      .modifier_overrides(id, true)
      .clear();
    expect(mod.view()).toMatchObject(expected);
  });
});
