const Catalog_Item_Variation = require("../src/lib/catalog_object_item_variation");

let variation, make;
let id = "123";
const class_name = "Catalog_Item_Variation";

describe("Silence test suite", () => {
  test("Catalog_Item_Variation", () => {});
});

/* --------------------------------------------------------*
 *                                                         *
 *                        common structures
 *                                                         *
 * ------------------------------------------------------- */
describe("basic object class structures", () => {
  beforeEach(() => {
    variation = new Catalog_Item_Variation();
    make = variation.make();
  });
  test("should have display name", () => {
    expect(variation.display_name).toBeDefined();
  });
  test("display name should be same as class name", () => {
    expect(variation.display_name).toEqual(class_name);
  });
  test("should have help", () => {
    expect(variation.help).toBeDefined();
  });
  test("should have defined square version", () => {
    expect(variation.square_version).toBeDefined();
  });
  test("should have defined _fardel", () => {
    expect(variation.fardel).toBeDefined();
  });
});

/* --------------------------------------------------------*
 *                                                         *
 *                        Error Checking
 *                                                         *
 * ------------------------------------------------------- */

// stockable_conversion

/* --------------------------------------------------------*
 *                                                         *
 *                        getters/setters
 *                                                         *
 * ------------------------------------------------------- */

describe("getters/setters", () => {
  beforeEach(() => {
    variation = new Catalog_Item_Variation();
    make = variation.make();
  });

  test("make().name () should set ", () => {
    let expected = "Possum Patties";
    make.name(expected);
    expect(variation.name).toEqual(expected);
  });
  test("make().present_at_all_locations () should set ", () => {
    let expected = true;
    make.present_at_all_locations(expected);
    expect(variation.present_at_all_locations).toEqual(expected);
  });
  test("make().present_at_location_ids () should set ", () => {
    let expected = [id];
    make.present_at_location_ids(id);
    expect(variation.present_at_location_ids).toEqual(expected);
  });
  test("make().available_for_booking () should set ", () => {
    let expected = true;
    make.available_for_booking(expected);
    expect(variation.available_for_booking).toEqual(expected);
  });
  test("make().service_duration () should convert minutes input to milliseconds", () => {
    let val = 40;
    let expected = 40 * 60000;
    make.service_duration(val);
    expect(variation.service_duration).toEqual(expected);
  });
  test("make().item_id() should set", () => {
    make.item_id(id);
    expect(variation.item_id).toEqual(id);
  });
  test("make().item_option_values () should create complieant object and push it onto the array ", () => {
    let expected = [{ item_option_id: "123", item_option_value_id: "ABC" }];
    make.item_option_values("123", "ABC");
    expect(variation.item_option_values).toEqual(expected);
  });
  test("make().location_overrides () should set ", () => {
    let expected = {
      inventory_alert_threshold: 200,
      inventory_alert_type: "LOW_QUANTITY",
      location_id: id,
      price_money: { amount: 42, currency: "EUR" },
      pricing_type: "VARIABLE_PRICING",
      track_inventory: true,
    };
    make
      .location_overrides()
      .inventory_alert_threshold(200)
      .location_id(id)
      .track_inventory(true);
    make.location_overrides().alert().low();
    make.location_overrides().pricing().variable();
    expect(variation.location_overrides).toMatchObject(expected);
  });
  test("make().inventory_alert_type () should set ", () => {
    let expected = "LOW_QUANTITY";
    make.inventory_alert_type().low_quantity();
    expect(variation.inventory_alert_type).toEqual(expected);
  });
  test("make().inventory_alert_type () should set ", () => {
    let expected = "LOW_QUANTITY";
    make.inventory_alert_type().low();
    expect(variation.inventory_alert_type).toEqual(expected);
  });
  test("make().inventory_alert_type () should set ", () => {
    let expected = "NONE";
    make.inventory_alert_type().none();
    expect(variation.inventory_alert_type).toEqual(expected);
  });
  test("make().inventory_alert_type () should set ", () => {
    let expected = "NONE";
    make.inventory_alert_type().out();
    expect(variation.inventory_alert_type).toEqual(expected);
  });

  test("make().inventory_alert_threshold () should set ", () => {
    let expected = 5;
    make.inventory_alert_threshold(expected);
    expect(variation.inventory_alert_threshold).toEqual(expected);
  });
  test("make().track_inventory () should set ", () => {
    let expected = true;
    make.track_inventory(expected);
    expect(variation.track_inventory).toEqual(expected);
  });
  test("make().measurement_unit_id () should set ", () => {
    let expected = id;
    make.measurement_unit_id(expected);
    expect(variation.measurement_unit_id).toEqual(expected);
  });
  test("make().price_money () should set ", () => {
    let expected = { amount: 42, currency: "CAD" };
    make.price_money(42, "CAD");
    expect(variation.price_money).toEqual(expected);
  });
  test("make().sku () should set ", () => {
    let expected = id;
    make.sku(expected);
    expect(variation.sku).toEqual(expected);
  });
  test("make().stockable () should set ", () => {
    let expected = true;
    make.stockable(expected);
    expect(variation.stockable).toEqual(expected);
  });
  test("make().stockable_conversion () should set ", () => {
    let expected = {
      stockable_item_variation_id: id,
      stockable_quantity: "456.123",
      nonstockable_quantity: "123.456",
    };
    make.stockable_conversion(id, "456.123", "123.456non");
    expect(variation.stockable_conversion).toEqual(expected);
  });
  test("make().team_member_ids () should set ", () => {
    let expected = [id];
    make.team_member_ids(id);
    expect(variation.team_member_ids).toEqual(expected);
  });
  test("make().upc () should set ", () => {
    let expected = id;
    make.upc(expected);
    expect(variation.upc).toEqual(expected);
  });
  test("make().user_data () should set ", () => {
    let expected = id;
    make.user_data(expected);
    expect(variation.user_data).toEqual(expected);
  });

  test("pricing_type should set", () => {
    let expected = "FIXED_PRICING";
    make.pricing_type().fixed_pricing();
    expect(variation.pricing_type).toEqual(expected);
  });

  test("pricing_type should set", () => {
    let expected = "FIXED_PRICING";
    make.pricing_type().fixed();
    expect(variation.pricing_type).toEqual(expected);
  });

  test("pricing_type should set", () => {
    let expected = "VARIABLE_PRICING";
    make.pricing_type().variable_pricing();
    expect(variation.pricing_type).toEqual(expected);
  });

  test("pricing_type should set", () => {
    let expected = "VARIABLE_PRICING";
    make.pricing_type().variable();
    expect(variation.pricing_type).toEqual(expected);
  });

  // test ("make(). () should set ", () => {let expected = "";make. (expected); expect (variation.).toEqual (expected);});
});
