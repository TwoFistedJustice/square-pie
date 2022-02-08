"use strict";
const Order_Tax = require("../src/lib/order_object_tax");

let tax, make;
const id = "123";
const class_name = "Order_Tax";

/* --------------------------------------------------------*
 *                                                         *
 *                        common structures
 *                                                         *
 * ------------------------------------------------------- */
describe(`${class_name} basic object class structures`, () => {
  beforeEach(() => {
    tax = new Order_Tax();
    make = tax.make();
  });
  test("should have display name", () => {
    expect(tax.display_name).toBeDefined();
  });
  test("display name should be same as class name", () => {
    expect(tax.display_name).toEqual(class_name);
  });
  test("should have help", () => {
    expect(tax.help).toBeDefined();
  });
  test("should have defined square version", () => {
    expect(tax.square_version).toBeDefined();
  });
  test("should have defined _fardel", () => {
    expect(tax.fardel).toBeDefined();
  });
});

/* --------------------------------------------------------*
 *                                                         *
 *                        getters/setters
 *                                                         *
 * ------------------------------------------------------- */

describe(`${class_name} getters/setters`, () => {
  beforeEach(() => {
    tax = new Order_Tax();
    make = tax.make();
  });
  test("make().uid() should set ", () => {
    let expected = id;
    make.uid(expected);
    expect(tax.uid).toEqual(expected);
  });
  test("make().name() should set ", () => {
    let expected = id;
    make.name(expected);
    expect(tax.name).toEqual(expected);
  });
  test("make().catalog_object_id() should set ", () => {
    let expected = id;
    make.catalog_object_id(expected);
    expect(tax.catalog_object_id).toEqual(expected);
  });
  test("make().catalog_version() should set ", () => {
    let expected = 4;
    make.catalog_version(expected);
    expect(tax.catalog_version).toEqual(expected);
  });
  test("make().percentage() should set ", () => {
    let expected = "4.24";
    make.percentage(expected);
    expect(tax.percentage).toEqual(expected);
  });
  test("make().applied_money() should set ", () => {
    let expected = {
      amount: 4200,
      currency: "EUR",
    };
    make.applied_money(4200, "eur");
    expect(tax.applied_money).toEqual(expected);
  });

  test("make().scope() should set ", () => {
    let expected = "OTHER_TAX_SCOPE";
    make.scope().other_tax_scope();
    expect(tax.scope).toEqual(expected);
  });

  test("make().scope() should set ", () => {
    let expected = "OTHER_TAX_SCOPE";
    make.scope().other();
    expect(tax.scope).toEqual(expected);
  });

  test("make().scope() should set ", () => {
    let expected = "LINE_ITEM";
    make.scope().line_item();
    expect(tax.scope).toEqual(expected);
  });
  test("make().scope() should set ", () => {
    let expected = "LINE_ITEM";
    make.scope().line();
    expect(tax.scope).toEqual(expected);
  });

  test("make().scope() should set ", () => {
    let expected = "ORDER";
    make.scope().order();
    expect(tax.scope).toEqual(expected);
  });

  test("make().scope() should curry with other methods ", () => {
    let expected = "ORDER";
    let expected_money = {
      amount: 4200,
      currency: "EUR",
    };
    make.scope().order().applied_money(4200, "eur");
    expect(tax.scope).toEqual(expected);
    expect(tax.applied_money).toEqual(expected_money);
  });
});
