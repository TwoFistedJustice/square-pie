const Catalog_Item_Variation = require("../src/lib/catalog_object_item_variation");

let variation, make;
let id = "123";
const class_name = "Catalog_Item_Variation";

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
// service_duration

describe("getters/setters", () => {
  beforeEach(() => {
    variation = new Catalog_Item_Variation();
    make = variation.make();
  });

  test("make_location_override().add() should throw if price_money is set along with VARIABLE_PRICING", () => {
    let override = {
      location_id: undefined,
      price_money: { amount: 42, currency: "USD" },
      pricing_type: "VARIABLE_PRICING",
      track_inventory: undefined,
      inventory_alert_type: undefined,
      inventory_alert_threshold: undefined,
    };
    let expected =
      'Catalog_Item_Variation.make_location_override().add() attempted to set price_money to {amount: 42, currency: "USD"} and pricing_type to "VARIABLE_PRICING". This is not allowed.';

    let ride_over = variation.make_location_override();
    ride_over.price_money(42).pricing_type().variable();
    expect(ride_over.view()).toMatchObject(override);
    expect(() => {
      ride_over.add();
    }).toThrowError(expected);
  });

  test("make_location_override().add() should not throw if price_money is set along with FIXED_PRICING", () => {
    let override = {
      location_id: undefined,
      price_money: { amount: 42, currency: "USD" },
      pricing_type: "FIXED_PRICING",
      track_inventory: undefined,
      inventory_alert_type: undefined,
      inventory_alert_threshold: undefined,
    };

    let ride_over = variation.make_location_override();
    ride_over.price_money(42).pricing_type();
    expect(ride_over.view()).toMatchObject(override);
    expect(() => {
      ride_over.add();
    }).not.toThrow();
  });

  test("pricing_type should throw", () => {
    make.price_money(42);
    expect(() => {
      variation.pricing_type = "VARIABLE_PRICING";
    }).toThrowError(/pricing_type/);
  });

  test("make().stockable_conversion.().nonstockable_quantity() should throw ", () => {
    expect(() => {
      make.stockable_conversion().nonstockable_quantity("023.456");
    }).toThrowError(/nonstockable_quantity/);
  });

  test("make().stockable_conversion.().stockable_quantity() should throw ", () => {
    expect(() => {
      make.stockable_conversion().stockable_quantity("023.456");
    }).toThrowError(/stockable_quantity/);
  });
});

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
    let expected = [
      {
        inventory_alert_threshold: 200,
        inventory_alert_type: "LOW_QUANTITY",
        location_id: id,
        price_money: { amount: 42, currency: "EUR" },
        pricing_type: "FIXED_PRICING",
        track_inventory: true,
      },
    ];
    let over = make.location_overrides();
    over.inventory_alert_threshold(200).location_id(id).track_inventory(true);
    over.alert_type().low().price(42, "EUr");
    over.add();
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

  test("make().inventory_alert_type () should curry-over ", () => {
    let expected = "NONE";
    make.inventory_alert_type().out().track_inventory(true);
    expect(variation.track_inventory).toEqual(true);
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

  test("pricing_type should curry-over", () => {
    let pricing = "VARIABLE_PRICING";
    let alert = "LOW_QUANTITY";
    make
      .pricing_type()
      .variable()
      .inventory_alert_type()
      .low()
      .track_inventory(true);
    expect(variation.pricing_type).toEqual(pricing);
    expect(variation.inventory_alert_type).toEqual(alert);
    expect(variation.track_inventory).toEqual(true);
  });

  // test ("make(). () should set ", () => {let expected = "";make. (expected); expect (variation.).toEqual (expected);});
});

/* --------------------------------------------------------*
 *                                                         *
 *                        Location Overrides
 *                                                         *
 * ------------------------------------------------------- */

describe("Location Overrides", () => {
  // https://developer.squareup.com/reference/square_2022-01-20/objects/ItemVariationLocationOverrides
  beforeEach(() => {
    variation = new Catalog_Item_Variation();
    make = variation.make();
  });

  test("make_location_override().() should set value on key", () => {
    let expected = {
      location_id: id, // id
      price_money: undefined, // money // arch money // fixed pricing only
      pricing_type: undefined, // enum fixed or variable  // use #enum_pricing_type() {
      track_inventory: undefined, //bool
      inventory_alert_type: undefined, // none or low // #enum_inventory_alert_type() {
      inventory_alert_threshold: undefined, // int
    };

    let ride_over = variation.make_location_override();
    ride_over.location_id(id);
    expect(ride_over.view()).toMatchObject(expected);
  });

  test("make_location_override().price_money() should set value on key and automatically set pricing type", () => {
    let expected = {
      location_id: undefined,
      price_money: { amount: 42, currency: "USD" },
      pricing_type: "FIXED_PRICING",
      track_inventory: undefined,
      inventory_alert_type: undefined,
      inventory_alert_threshold: undefined,
    };

    let ride_over = variation.make_location_override();
    ride_over.price_money(42);
    expect(ride_over.view()).toMatchObject(expected);
  });

  test('make_location_override().pricing_type().fixed_pricing() should set "FIXED_PRICING" on key', () => {
    let expected = {
      location_id: undefined,
      price_money: undefined,
      pricing_type: "FIXED_PRICING",
      track_inventory: undefined,
      inventory_alert_type: undefined,
      inventory_alert_threshold: undefined,
    };
    let ride_over = variation.make_location_override();
    ride_over.pricing_type().fixed_pricing();
    expect(ride_over.view()).toMatchObject(expected);
  });

  test('make_location_override().pricing_type().fixed() should set "FIXED_PRICING" on key', () => {
    let expected = {
      location_id: undefined,
      price_money: undefined,
      pricing_type: "FIXED_PRICING",
      track_inventory: undefined,
      inventory_alert_type: undefined,
      inventory_alert_threshold: undefined,
    };
    let ride_over = variation.make_location_override();
    ride_over.pricing_type().fixed();
    expect(ride_over.view()).toMatchObject(expected);
  });

  test('make_location_override().pricing_type().variable_pricing() should set "VARIABLE_PRICING" on key', () => {
    let expected = {
      location_id: undefined,
      price_money: undefined,
      pricing_type: "VARIABLE_PRICING",
      track_inventory: undefined,
      inventory_alert_type: undefined,
      inventory_alert_threshold: undefined,
    };
    let ride_over = variation.make_location_override();
    ride_over.pricing_type().variable_pricing();
    expect(ride_over.view()).toMatchObject(expected);
  });

  test('make_location_override().pricing_type().variable() should set "VARIABLE_PRICING" on key', () => {
    let expected = {
      location_id: undefined,
      price_money: undefined,
      pricing_type: "VARIABLE_PRICING",
      track_inventory: undefined,
      inventory_alert_type: undefined,
      inventory_alert_threshold: undefined,
    };
    let ride_over = variation.make_location_override();
    ride_over.pricing_type().variable();
    expect(ride_over.view()).toMatchObject(expected);
  });

  test("make_location_override().pricing_type() should curry-over", () => {
    let expected = {
      location_id: undefined,
      price_money: undefined,
      pricing_type: "VARIABLE_PRICING",
      track_inventory: true,
      inventory_alert_type: undefined,
      inventory_alert_threshold: undefined,
    };
    let ride_over = variation.make_location_override();
    ride_over.pricing_type().variable().track_inventory(true);
    expect(ride_over.view()).toMatchObject(expected);
  });

  test("make_location_override().track_inventory() should set value on key", () => {
    let expected = {
      location_id: undefined,
      price_money: undefined,
      pricing_type: undefined,
      track_inventory: true,
      inventory_alert_type: undefined,
      inventory_alert_threshold: undefined,
    };

    let ride_over = variation.make_location_override();
    ride_over.track_inventory(true);
    expect(ride_over.view()).toMatchObject(expected);
  });

  test('make_location_override().inventory_alert_type().none() should set "NONE" on key', () => {
    let expected = {
      location_id: undefined,
      price_money: undefined,
      pricing_type: undefined,
      track_inventory: undefined,
      inventory_alert_type: "NONE",
      inventory_alert_threshold: undefined,
    };

    let ride_over = variation.make_location_override();
    ride_over.inventory_alert_type().none();
    expect(ride_over.view()).toMatchObject(expected);
  });

  test('make_location_override().inventory_alert_type().out() should set "NONE" on key', () => {
    let expected = {
      location_id: undefined,
      price_money: undefined,
      pricing_type: undefined,
      track_inventory: undefined,
      inventory_alert_type: "NONE",
      inventory_alert_threshold: undefined,
    };

    let ride_over = variation.make_location_override();
    ride_over.inventory_alert_type().out();
    expect(ride_over.view()).toMatchObject(expected);
  });

  test('make_location_override().inventory_alert_type().low_quantity() should set "LOW_QUANTITY" on key', () => {
    let expected = {
      location_id: undefined,
      price_money: undefined,
      pricing_type: undefined,
      track_inventory: undefined,
      inventory_alert_type: "LOW_QUANTITY",
      inventory_alert_threshold: undefined,
    };

    let ride_over = variation.make_location_override();
    ride_over.inventory_alert_type().low_quantity();
    expect(ride_over.view()).toMatchObject(expected);
  });

  test('make_location_override().inventory_alert_type().low() should set "LOW_QUANTITY" on key', () => {
    let expected = {
      location_id: undefined,
      price_money: undefined,
      pricing_type: undefined,
      track_inventory: undefined,
      inventory_alert_type: "LOW_QUANTITY",
      inventory_alert_threshold: undefined,
    };

    let ride_over = variation.make_location_override();
    ride_over.inventory_alert_type().low();
    expect(ride_over.view()).toMatchObject(expected);
  });

  test("make_location_override().inventory_alert_threshold() should set value on key", () => {
    let expected = {
      location_id: undefined,
      price_money: undefined,
      pricing_type: undefined,
      track_inventory: undefined,
      inventory_alert_type: undefined,
      inventory_alert_threshold: 5,
    };

    let ride_over = variation.make_location_override();
    ride_over.inventory_alert_threshold(5);
    expect(ride_over.view()).toMatchObject(expected);
  });

  test("make_location_override()._alert_threshold() alias should set value on key", () => {
    let expected = {
      location_id: undefined,
      price_money: undefined,
      pricing_type: undefined,
      track_inventory: undefined,
      inventory_alert_type: undefined,
      inventory_alert_threshold: 5,
    };

    let ride_over = variation.make_location_override();
    ride_over.alert_threshold(5);
    expect(ride_over.view()).toMatchObject(expected);
  });

  test("make_location_override() chaining should set values on key ", () => {
    let override = {
      location_id: id,
      price_money: { amount: 42, currency: "USD" },
      pricing_type: "FIXED_PRICING",
      track_inventory: true,
      inventory_alert_type: "NONE",
      inventory_alert_threshold: 0,
    };

    let expected = override;
    let ride_over = variation.make_location_override();
    ride_over
      .location_id(id)
      .price_money(42)
      .track_inventory(true)
      .inventory_alert_type()
      .none()
      .inventory_alert_threshold(0);
    expect(ride_over.view()).toMatchObject(expected);
  });

  test("make_location_override().add() add one object to array", () => {
    let override = {
      location_id: id,
      price_money: { amount: 42, currency: "USD" },
      pricing_type: "FIXED_PRICING",
      track_inventory: true,
      inventory_alert_type: "NONE",
      inventory_alert_threshold: 0,
    };

    let expected = [override];
    let ride_over = variation.make_location_override();
    ride_over
      .location_id(id)
      .price_money(42)
      .track_inventory(true)
      .inventory_alert_type()
      .none()
      .inventory_alert_threshold(0)
      .add();
    expect(variation.location_overrides).toMatchObject(expected);
  });

  test("make_location_override().add() should add a cloned object to the array", () => {
    let override = {
      location_id: id,
      price_money: { amount: 42, currency: "USD" },
      pricing_type: "FIXED_PRICING",
      track_inventory: true,
      inventory_alert_type: "NONE",
      inventory_alert_threshold: 0,
    };
    let expected = [override];
    let ride_over = variation.make_location_override();
    ride_over
      .location_id(id)
      .price_money(42)
      .track_inventory(true)
      .inventory_alert_type()
      .none()
      .inventory_alert_threshold(0)
      .add();
    expect(variation.location_overrides).toMatchObject(expected);
    expect(variation.location_overrides[0] === ride_over.view()).toEqual(false);
  });

  test("make_location_override().add() add multiple different objects to array", () => {
    let override = {
      location_id: id,
      price_money: { amount: 42, currency: "USD" },
      pricing_type: "FIXED_PRICING",
      track_inventory: true,
      inventory_alert_type: "NONE",
      inventory_alert_threshold: 0,
    };

    let expected = [override, override];
    let ride_over = variation.make_location_override();
    let over_ride = variation.make_location_override();
    ride_over
      .location_id(id)
      .price_money(42)
      .track_inventory(true)
      .inventory_alert_type()
      .none()
      .inventory_alert_threshold(0)
      .add();
    over_ride
      .location_id(id)
      .price_money(42)
      .track_inventory(true)
      .inventory_alert_type()
      .none()
      .inventory_alert_threshold(0)
      .add();
    expect(variation.location_overrides).toMatchObject(expected);
    expect(variation.location_overrides[0]).toEqual(
      variation.location_overrides[0]
    );
    expect(
      variation.location_overrides[0] === variation.location_overrides[1]
    ).toEqual(false);
  });
});

/* --------------------------------------------------------*
 *                                                         *
 *                        stockable_conversion
 *                                                         *
 * ------------------------------------------------------- */

describe("stockable_conversion", () => {
  beforeEach(() => {
    variation = new Catalog_Item_Variation();
    make = variation.make();
  });

  test("stockable_conversion should set", () => {
    let expected = { a: 1 };
    variation.stockable_conversion = expected;
    expect(variation.stockable_conversion).toMatchObject(expected);
  });

  test("make().stockable_conversion.().stockable_item_variation_id() should set", () => {
    let expected = {
      stockable_item_variation_id: id,
      nonstockable_quantity: undefined,
      stockable_quantity: undefined,
    };
    make.stockable_conversion().stockable_item_variation_id(id);

    expect(variation.stockable_conversion).toMatchObject(expected);
  });

  test("make().stockable_conversion.().nonstockable_quantity() should set", () => {
    let expected = {
      stockable_item_variation_id: undefined,
      nonstockable_quantity: "123.456",
      stockable_quantity: undefined,
    };
    make.stockable_conversion().nonstockable_quantity("123.456");

    expect(variation.stockable_conversion).toMatchObject(expected);
  });

  test("make().stockable_conversion.().stockable_quantity() should set", () => {
    let expected = {
      stockable_item_variation_id: undefined,
      nonstockable_quantity: undefined,
      stockable_quantity: "234.567",
    };
    make.stockable_conversion().stockable_quantity("234.567");

    expect(variation.stockable_conversion).toMatchObject(expected);
  });

  test("make().stockable_conversion.() methods should work same when done on separate lines ", () => {
    let expected = {
      stockable_item_variation_id: id,
      nonstockable_quantity: "123.456",
      stockable_quantity: "234.567",
    };
    make.stockable_conversion().stockable_item_variation_id(id);
    make.stockable_conversion().nonstockable_quantity("123.456");
    make.stockable_conversion().stockable_quantity("234.567");

    expect(variation.stockable_conversion).toMatchObject(expected);
  });

  test("make().stockable_conversion.() methods should chain ", () => {
    let expected = {
      stockable_item_variation_id: id,
      nonstockable_quantity: "123.456",
      stockable_quantity: "234.567",
    };
    make
      .stockable_conversion()
      .stockable_item_variation_id(id)
      .nonstockable_quantity("123.456")
      .stockable_quantity("234.567");

    expect(variation.stockable_conversion).toMatchObject(expected);
  });

  test("make().stockable_conversion.id() alias should set ", () => {
    let expected = {
      stockable_item_variation_id: id,
      nonstockable_quantity: "123.456",
      stockable_quantity: "234.567",
    };
    make
      .stockable_conversion()
      .id(id)
      .nonstockable_quantity("123.456")
      .stockable_quantity("234.567");

    expect(variation.stockable_conversion).toMatchObject(expected);
  });
});
