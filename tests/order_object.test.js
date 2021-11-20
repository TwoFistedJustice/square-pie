"use strict";
const Order_Object = require("../src/lib/stub.order_object");
const should = require("chai").should();
const { long_strings } = require("./helper_objects");

describe("Silence order object tests", () => {
  test("Should silence tests", () => {
    expect("a").toEqual("a");
  });
});

describe("Error checkers", () => {
  test("customer_id should respect limit 191", () => {
    let o = new Order_Object();
    expect(() => {
      o.make().customer_id(long_strings.len_192);
    }).toThrow();
    expect(() => {
      o.make().customer_id(long_strings.len_191);
    }).not.toThrow();
  });

  test("ticket_name should respect limit 30", () => {
    let o = new Order_Object();
    expect(() => {
      o.make().ticket_name(long_strings.len_31);
    }).toThrow();
    expect(() => {
      o.make().ticket_name(long_strings.len_30);
    }).not.toThrow();
  });

  test("pricing_options respect argument type", () => {
    let o = new Order_Object();
    expect(() => {
      o.make().pricing_options("yes", "no");
    }).toThrow();
    expect(() => {
      o.make().pricing_options(true, false);
    }).not.toThrow();
  });

  test("pricing_options should respect property names", () => {
    let o = new Order_Object();
    let wrong1 = {
      auto_apply_discount: true,
      auto_apply_taxes: true,
    };
    let wrong2 = {
      auto_apply_discounts: true,
      auto_apply_tax: true,
    };
    let right = {
      auto_apply_discounts: true,
      auto_apply_taxes: true,
    };

    expect(() => {
      o.pricing_options = wrong1;
    }).toThrow();

    expect(() => {
      o.pricing_options = wrong2;
    }).toThrow();

    expect(() => {
      o.pricing_options = right;
    }).not.toThrow();
  });
});

describe("Testing array properties", () => {
  test("fulfillments should be an array with an object", () => {
    let o = new Order_Object();
    let expected = [{ thing: 1 }, { thing: 2 }];

    o.make().fulfillments({ thing: 1 }).fulfillments({ thing: 2 });
    expect(o.fulfillments).toMatchObject(expected);
  });

  test("service_charges should be an array with an object", () => {
    let o = new Order_Object();
    let expected = [{ thing: 1 }, { thing: 2 }];

    o.make().service_charges({ thing: 1 }).service_charges({ thing: 2 });
    expect(o.service_charges).toMatchObject(expected);
  });

  test(" discounts should be an array with an object", () => {
    let o = new Order_Object();
    let expected = [{ thing: 1 }, { thing: 2 }];

    o.make().discounts({ thing: 1 }).discounts({ thing: 2 });
    expect(o.discounts).toMatchObject(expected);
  });

  test("taxes should be an array with an object", () => {
    let o = new Order_Object();
    let expected = [{ thing: 1 }, { thing: 2 }];

    o.make().taxes({ thing: 1 }).taxes({ thing: 2 });
    expect(o.taxes).toMatchObject(expected);
  });

  test("line_items should be an array with an object", () => {
    let o = new Order_Object();
    let expected = [{ thing: 1 }, { thing: 2 }];

    o.make().line_items({ thing: 1 }).line_items({ thing: 2 });
    expect(o.line_items).toMatchObject(expected);
  });
});
