// build_applied_tax() should return a compliant object
// build_applied_discount() should return a compliant object

// add_applied_tax() should add a compliant object to fardel and return the object to the coder
// add_applied_discount() should add a compliant object to fardel and return the object to the coder

const Order_Line_Item = require("../src/lib/stub.order_line_item");
const should = require("chai").should();
// const { long_strings } = require("./helper_objects");

describe("build_modifier", () => {
  test("build_modifier() should build a compliant object at this._modifier", () => {
    let line = new Order_Line_Item();
    let id = "someID";
    let price = {
      amount: 2100,
      currency: "EUR",
    };
    let name = "fred";
    let ver = 2345;
    line
      .build_modifier()
      .catalog_object_id(id)
      .price(2100, "EUR")
      .catalog_version(ver)
      .name(name);
    let mod = line.modifier;

    expect(mod.uid.length).toEqual(10);
    expect(mod.catalog_object_id).toEqual(id);
    expect(mod.base_price_money).toMatchObject(price);
    expect(mod.catalog_version).toEqual(ver);
    expect(mod.name).toEqual(name);
  });
});
