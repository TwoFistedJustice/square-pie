const Catalog_Item = require("../src/lib/catalog_object_item");
const Catalog_Item_Variation = require("../src/lib/catalog_object_item_variation");
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
  test("product_type should default to REGULAR ", () => {
    let expected = "REGULAR";
    expect(item.product_type).toEqual(expected);
  });

  // test("product_type should default to APPOINTMENTS_SERVICE if auto_set_appointment_service is set to true ", () => {
  //   let
  //   let expected = "APPOINTMENTS_SERVICE";
  //   expect(item.product_type).toEqual(expected);
  // });
  test("type should be ITEM", () => {
    expect(item.type).toEqual("ITEM");
  });
});

/* --------------------------------------------------------*
 *                                                         *
 *                        Error Checking
 *                                                         *
 * ------------------------------------------------------- */

// name
// description
// abbrev
// item_options array len
// fardel getter

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
    make.name(id);
    expect(item.id).toEqual(expected);
  });

  test("make().temp_id () should set ", () => {
    let expected = "#" + id;
    make.name(id);
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
  test("make().modifier_list_info () should set ", () => {
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
    make.modifier_list_info({ build: "me" });
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
    make.product_type().appt().regular();
    expect(item.product_type).toEqual(expected);
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
});
