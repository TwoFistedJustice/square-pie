const util = require("../src/lib/utilities");
const spy_integer = jest.spyOn(util, "shazam_integer");

const Order_Line_Item = require("../src/lib/order_line_item");
const { uid_length } = require("../src/lib/pie_defaults");
const tax_discount_uid = "someId";
const id = "123";
const class_name = "Order_Line_Item";

let line, make;

/* --------------------------------------------------------*
 *                                                         *
 *                        common structures
 *                                                         *
 * ------------------------------------------------------- */
describe("basic object class structures", () => {
  beforeEach(() => {
    line = new Order_Line_Item();
    make = line.make();
  });
  test("should have display name", () => {
    expect(line.display_name).toBeDefined();
  });
  test("display name should be same as class name", () => {
    expect(line.display_name).toEqual(class_name);
  });
  test("should have help", () => {
    expect(line.help).toBeDefined();
  });
  test("should have defined square version", () => {
    expect(line.square_version).toBeDefined();
  });
  test("should have defined _fardel", () => {
    expect(line.fardel).toBeDefined();
  });
});

/* --------------------------------------------------------*
 *                                                         *
 *                        Error Checking
 *                                                         *
 * ------------------------------------------------------- */
// uid length
// set catalog_version
// modifier setter should check for that a least one property is present and no wrong properties are present

/* --------------------------------------------------------*
 *                                                         *
 *                        getters/setters
 *                                                         *
 * ------------------------------------------------------- */

describe("getters/setters", () => {
  beforeEach(() => {
    line = new Order_Line_Item();
    make = line.make();
  });
  test("make().uid () should set ", () => {
    let expected = id;
    make.uid(id);
    expect(line.uid).toEqual(expected);
  });
  test("make().quantity () should set ", () => {
    let expected = 12;
    make.quantity(12);
    expect(line.quantity).toEqual(expected);
  });
  test("make().name () should set ", () => {
    let expected = "pencils";
    make.name("pencils");
    expect(line.name).toEqual(expected);
  });
  test("make().note () should set ", () => {
    let expected = "Gosh darn that Tina Fey for being so gosh darned pretty!";
    make.note("Gosh darn that Tina Fey for being so gosh darned pretty!");
    expect(line.note).toEqual(expected);
  });
  test("make().variation_name () should set ", () => {
    let expected = "TGS";
    make.variation_name("TGS");
    expect(line.variation_name).toEqual(expected);
  });
  test("make().catalog_object_id () should set ", () => {
    let expected = id;
    make.catalog_object_id(id);
    expect(line.catalog_object_id).toEqual(expected);
  });
  test("make().catalog_version () should set ", () => {
    let expected = 75;
    make.catalog_version(75);
    expect(line.catalog_version).toEqual(expected);
  });
  test("make().item_type () should set ", () => {
    let expected = "ITEM";
    make.item_type().item();
    expect(line.item_type).toEqual(expected);
  });
  test("make().item_type () should set ", () => {
    let expected = "CUSTOM_AMOUNT";
    make.item_type().custom();
    expect(line.item_type).toEqual(expected);
  });
  test("make().item_type () should set ", () => {
    let expected = "GIFT_CARD";
    make.item_type().gift();
    expect(line.item_type).toEqual(expected);
  });
  test("make().base_price_money () should set ", () => {
    let expected = { amount: 42, currency: "USD" };
    make.base_price_money(42, "USD");
    expect(line.base_price_money).toEqual(expected);
  });
  test("make().applied_discounts () should set ", () => {
    let expected = id;
    make.applied_discounts(id);
    expect(line.applied_discounts[0].discount_uid).toEqual(expected);
  });
  test("make().applied_taxes () should set ", () => {
    let expected = id;
    make.applied_taxes(id);
    expect(line.applied_taxes[0].tax_uid).toEqual(expected);
  });

  test("make().pricing_blocklists () should set ", () => {
    let expected = {
      blocked_discounts: [
        {
          discount_catalog_object_id: id,
          discount_uid: id,
          uid: id,
        },
      ],
      blocked_taxes: [
        {
          tax_catalog_object_id: id,
          tax_uid: id,
          uid: id,
        },
      ],
    };
    make.pricing_blocklists({ build: "me" });
    expect(line.pricing_blocklists).toMatchObject(expected);
  });
  test("make().quantity_unit () should set ", () => {
    let arch_measure = { build: "me" };
    let expected = {
      catalog_object_id: id,
      catalog_version: 4,
      measurement_unit: arch_measure,
      precision: 1,
    };
    make.quantity_unit({ build: "this is actualy already built..." });
    expect(line.quantity_unit).toEqual(expected);
  });

  test("set quanity_unit should pass object", () => {
    let arch_measure = { a: 1 };
    let obj = {
      catalog_object_id: id,
      catalog_version: 4,
      measurement_unit: arch_measure,
      precision: 1,
    };
    let expected = {
      catalog_object_id: id,
      catalog_version: 4,
      measurement_unit: arch_measure,
      precision: 1,
    };
    line.quantity_unit = obj;
    expect(line.quantity_unit).toMatchObject(expected);
  });
});

/* --------------------------------------------------------*
 *                                                         *
 *                        make_modifier()
 *                                                         *
 * ------------------------------------------------------- */
describe("make_modifier()", () => {
  beforeEach(() => {
    line = new Order_Line_Item();
  });
  test("make().modifier() build and should push one object to the array ", () => {
    let obj1 = {
      uid: id,
      catalog_object_id: id,
      catalog_version: 4,
      name: id,
      base_price_money: {
        amount: 428,
        currency: "CAD",
      },
    };
    let expected = [obj1];
    let mod = line.make_modifier();

    mod
      .uid(id)
      .catalog_object_id(id)
      .catalog_version(4)
      .name(id)
      .price(428, "cad")
      .add();
    expect(line.modifiers).toEqual(expected);
  });

  test("make().modifier() build and should push multiple unique objects to the array ", () => {
    let obj1 = {
      uid: id,
      catalog_object_id: id,
      catalog_version: 4,
      name: id,
      base_price_money: {
        amount: 428,
        currency: "CAD",
      },
    };

    let obj2 = {
      uid: "DEF",
      catalog_object_id: "ABC",
      catalog_version: 42,
      name: undefined,
      base_price_money: {
        amount: 597,
        currency: "EUR",
      },
    };
    let expected = [obj1, obj2];

    let mod1 = line.make_modifier();
    let mod2 = line.make_modifier();

    mod1
      .uid(id)
      .catalog_object_id(id)
      .catalog_version(4)
      .name(id)
      .price(428, "cad")
      .add();
    mod2
      .uid("DEF")
      .catalog_object_id("ABC")
      .catalog_version(42)
      .price(597, "eur")
      .add();

    expect(line.modifiers).toEqual(expected);
  });

  test("make().modifier().view should get modifier under construction ", () => {
    let obj1 = {
      uid: id,
      catalog_object_id: id,
      catalog_version: 4,
      name: undefined,
      base_price_money: {
        amount: 428,
        currency: "CAD",
      },
    };
    let expected = obj1;
    let mod = line.make_modifier();

    mod.uid(id).catalog_object_id(id).catalog_version(4).price(428, "cad");
    expect(mod.view()).toEqual(expected);
  });

  test("make().modifier().get_uid() should get uid of modifier under construction ", () => {
    let expected = id;
    let mod = line.make_modifier();
    mod.uid(id).catalog_object_id(id).catalog_version(4).price(428, "cad");
    expect(mod.get_uid()).toEqual(expected);
  });

  test("make().modifier() should automatically set uid of modifier under construction with nanoid ", () => {
    let pattern = util.regular_expression_patterns.id_patterns.uid;
    let mod = line.make_modifier();
    mod.catalog_object_id(id).catalog_version(4).price(428, "cad");
    let uid = mod.get_uid();
    expect(pattern.test(uid)).toEqual(true);
  });
});

/* --------------------------------------------------------*
 *                                                         *
 *                        #enum_item_type()
 *                                                         *
 * ------------------------------------------------------- */
describe("#enum_item_type()", () => {
  beforeEach(() => {
    line = new Order_Line_Item();
  });
  test("make().item_type().item_type() should set item_type to ITEM", () => {
    line.make().item_type().item();
    expect(line.item_type).toEqual("ITEM");
  });
  test("make().item_type().customer() should set item_type to CUSTOM_AMOUNT", () => {
    line.make().item_type().custom();
    expect(line.item_type).toEqual("CUSTOM_AMOUNT");
  });

  test("make().item_type().gift() should set item_type to GIFT_CARD", () => {
    line.make().item_type().gift();
    expect(line.item_type).toEqual("GIFT_CARD");
  });
});

describe("build_applied_tax() and  build_applied_discount() should return a compliant object", () => {
  // the Money object is on the response body
  beforeEach(() => {
    line = new Order_Line_Item();
  });

  test("check the uid is length equal to pie defaults uid_length", () => {
    let obj = line.build_applied_tax(tax_discount_uid);
    expect(obj.tax_uid).toEqual(tax_discount_uid);
    expect(obj.uid.length).toEqual(uid_length);
  });
  test("discount_uid should be set correctly", () => {
    let obj = line.build_applied_discount(tax_discount_uid);
    expect(obj.discount_uid).toEqual(tax_discount_uid);
    expect(obj.uid.length).toEqual(uid_length);
  });
});

describe("add_applied_tax() and add_applied_discount() should add a compliant object to fardel and return the object to the coder", () => {
  beforeEach(() => {
    line = new Order_Line_Item();
  });

  test("add_applied_tax", () => {
    line.add_applied_tax(tax_discount_uid);
    let arr = line.applied_taxes;
    let received = arr[0].tax_uid;
    expect(received).toEqual(tax_discount_uid);
  });

  test("add_applied_discount", () => {
    line.add_applied_discount(tax_discount_uid);
    let received = line.applied_discounts[0]["discount_uid"];
    expect(received).toEqual(tax_discount_uid);
  });
});

/* --------------------------------------------------------*
 *                                                         *
 *                        jest mocks
 *                                                         *
 * ------------------------------------------------------- */

describe("jest mocks", () => {
  beforeEach(() => {
    line = new Order_Line_Item();
  });

  test("catalog_version setter should call shazam_integer", () => {
    let test_val = 5;
    let caller = "catalog_version";
    line[caller] = test_val;
    expect(spy_integer).toHaveBeenCalledWith(test_val, class_name, caller);
  });
});

/* --------------------------------------------------------*
 *                                                         *
 *                 quantity unit
 *                                                         *
 * ------------------------------------------------------- */
describe("quantity unit", () => {
  beforeEach(() => {
    line = new Order_Line_Item();
  });

  test("precision should throw or not", () => {
    let notAnInt = 5.1;
    let tooHigh = 6;
    let tooLow = -1;
    let top = 5;
    let bottom = 0;
    let make = line.make().quantity_unit();

    expect(() => {
      make.precision(notAnInt);
    }).toThrow();

    expect(() => {
      make.precision(tooLow);
    }).toThrow();

    expect(() => {
      make.precision(tooHigh);
    }).toThrow();

    expect(() => {
      make.precision(top);
    }).not.toThrow();

    expect(() => {
      make.precision(bottom);
    }).not.toThrow();
  });

  test("quantity_unit should store a compliant object", () => {
    let id = "someid";
    let ver = 3;
    let precise = 4;
    let unit = {
      foo: "bar",
    };

    let expected = {
      catalog_object_id: id,
      catalog_version: ver,
      measurement_unit: unit,
      precision: precise,
    };
    line
      .make()
      .quantity_unit()
      .catalog_object_id(id)
      .catalog_version(ver)
      .measurement_unit(unit)
      .precision(precise);

    expect(line.quantity_unit).toMatchObject(expected);
  });
});
