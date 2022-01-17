// test modifier - prop on the class
const Order_Line_Item = require("../src/lib/order_line_item");
const should = require("chai").should();
// const { long_strings } = require("./helper_objects");
const { uid_length } = require("../src/lib/pie_defaults");

const tax_discount_uid = "someId";

describe("should silence test suite", () => {
  test("", () => {});
});
describe("#enum_item_type()", () => {
  test("make().item_type().item_type() should set item_type to ITEM", () => {
    let line = new Order_Line_Item();
    line.make().item_type().item();
    expect(line.item_type).toEqual("ITEM");
  });
  test("make().item_type().customer() should set item_type to CUSTOM_AMOUNT", () => {
    let line = new Order_Line_Item();
    line.make().item_type().custom();
    expect(line.item_type).toEqual("CUSTOM_AMOUNT");
  });

  test("make().item_type().gift() should set item_type to GIFT_CARD", () => {
    let line = new Order_Line_Item();
    line.make().item_type().gift();
    expect(line.item_type).toEqual("GIFT_CARD");
  });
});

describe("build_applied_tax() and  build_applied_discount() should return a compliant object", () => {
  // the Money object is on the response body

  test("check the uid is length equal to pie defaults uid_length", () => {
    let line = new Order_Line_Item();
    let obj = line.build_applied_tax(tax_discount_uid);
    expect(obj.tax_uid).toEqual(tax_discount_uid);
    expect(obj.uid.length).toEqual(uid_length);
  });
  test("discount_uid should be set correctly", () => {
    let line = new Order_Line_Item();
    let obj = line.build_applied_discount(tax_discount_uid);
    expect(obj.discount_uid).toEqual(tax_discount_uid);
    expect(obj.uid.length).toEqual(uid_length);
  });
});

describe("add_applied_tax() and add_applied_discount() should add a compliant object to fardel and return the object to the coder", () => {
  test("add_applied_tax", () => {
    let line = new Order_Line_Item();
    line.add_applied_tax(tax_discount_uid);
    let arr = line.applied_taxes;
    let received = arr[0].tax_uid;
    expect(received).toEqual(tax_discount_uid);
  });

  test("add_applied_discount", () => {
    let line = new Order_Line_Item();
    line.add_applied_discount(tax_discount_uid);
    let received = line.applied_discounts[0]["discount_uid"];
    expect(received).toEqual(tax_discount_uid);
  });
});

describe("make_modifier should build a compliant object", () => {
  test("make_modifier() should build a compliant object at this._modifier", () => {
    let line = new Order_Line_Item();
    let id = "someID";
    let price = {
      amount: 2100,
      currency: "EUR",
    };
    let name = "fred";
    let ver = 2345;
    line
      .make_modifier()
      .catalog_object_id(id)
      .price(2100, "EUR")
      .catalog_version(ver)
      .name(name);
    let mod = line.modifier;
    // add the modifier object to the modifiers array
    line.modifiers = mod;
    let pushed = line.modifiers[0];

    expect(mod.uid.length).toEqual(10);
    expect(mod.catalog_object_id).toEqual(id);
    expect(mod.base_price_money).toMatchObject(price);
    expect(mod.catalog_version).toEqual(ver);
    expect(mod.name).toEqual(name);
    expect(pushed.catalog_object_id).toEqual(id);
  });
});

describe("quantity unit", () => {
  test("precision and catalog_version should throw or not", () => {
    let line = new Order_Line_Item();
    let notAnInt = 5.1;
    let tooHigh = 6;
    let tooLow = -1;
    let top = 5;
    let bottom = 0;
    let make = line.make().quantity_unit();
    expect(() => {
      make.catalog_version(notAnInt);
    }).toThrow();

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

    let line = new Order_Line_Item();
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
