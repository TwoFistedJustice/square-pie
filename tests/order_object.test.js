"use strict";
const Order_Object = require("../src/lib/order_object");
const { long_strings } = require("./helper_objects");

let order, make;
const id = "123";
const class_name = "Order_Object";

/* --------------------------------------------------------*
 *                                                         *
 *                        common structures
 *                                                         *
 * ------------------------------------------------------- */
describe(`${class_name} basic object class structures`, () => {
  beforeEach(() => {
    order = new Order_Object();
    make = order.make();
  });
  test("should have display name", () => {
    expect(order.display_name).toBeDefined();
  });
  test("display name should be same as class name", () => {
    expect(order.display_name).toEqual(class_name);
  });
  test("should have help", () => {
    expect(order.help).toBeDefined();
  });
  test("should have defined square version", () => {
    expect(order.square_version).toBeDefined();
  });
  test("should have defined _fardel", () => {
    expect(order.fardel).toBeDefined();
  });
});

/* --------------------------------------------------------*
 *                                                         *
 *                        getters/setters
 *                                                         *
 * ------------------------------------------------------- */

describe(`${class_name} getters/setters`, () => {
  beforeEach(() => {
    order = new Order_Object();
    make = order.make();
  });
  test("make().version () should set ", () => {
    let expected = 3;
    make.version(3);
    expect(order.version).toEqual(expected);
  });
  test("make().id () should set ", () => {
    let expected = id;
    make.id(id);
    expect(order.id).toEqual(expected);
  });
  test("make().location_id () should set ", () => {
    let expected = id;
    make.location_id(id);
    expect(order.location_id).toEqual(expected);
  });
  test("make().reference_id () should set ", () => {
    let expected = id;
    make.reference_id(id);
    expect(order.reference_id).toEqual(expected);
  });
  test("make().customer_id () should set ", () => {
    let expected = id;
    make.customer_id(id);
    expect(order.customer_id).toEqual(expected);
  });
  test("make().ticket_name () should set ", () => {
    let expected = id;
    make.ticket_name(id);
    expect(order.ticket_name).toEqual(expected);
  });
  test("make().state () should set ", () => {
    let expected = "OPEN";
    make.state().open();
    expect(order.state).toEqual(expected);
  });
  test("make().state () should set ", () => {
    let expected = "COMPLETED";
    make.state().completed();
    expect(order.state).toEqual(expected);
  });
  test("make().state () should set ", () => {
    let expected = "CANCELED";
    make.state().canceled();
    expect(order.state).toEqual(expected);
  });
  test("make().state () should set ", () => {
    let expected = "DRAFT";
    make.state().draft();
    expect(order.state).toEqual(expected);
  });

  test("make().source () should set ", () => {
    let expected = "";
    make.source(expected);
    expect(order.source).toEqual(expected);
  });
  test("make().pricing_options () should set ", () => {
    let expected = {
      auto_apply_discounts: true,
      auto_apply_taxes: false,
    };
    make.pricing_options(true, false);
    expect(order.pricing_options).toEqual(expected);
  });
  test("make().service_charges () should set ", () => {
    let expected = [{ a: 1 }];
    make.service_charges({ a: 1 });
    expect(order.service_charges).toEqual(expected);
  });
  test("make().discounts () should set ", () => {
    let expected = [{ a: 1 }];
    make.discounts({ a: 1 });
    expect(order.discounts).toEqual(expected);
  });
  test("make().taxes () should set ", () => {
    let expected = [{ a: 1 }];
    make.taxes({ a: 1 });
    expect(order.taxes).toEqual(expected);
  });
  test("make().fulfillments () should set ", () => {
    let expected = [{ a: 1 }];
    make.fulfillments({ a: 1 });
    expect(order.fulfillments).toEqual(expected);
  });
  test("make().line_items () should set ", () => {
    let expected = [{ a: 1 }];
    make.line_items({ a: 1 });
    expect(order.line_items).toMatchObject(expected);
  });
});

/* --------------------------------------------------------*
 *                                                         *
 *                        service charges
 *                                                         *
 * ------------------------------------------------------- */
describe("service charges", () => {
  beforeEach(() => {
    order = new Order_Object();
    make = order.make();
  });
  test('build_service_charge_amount return a compliant "amount_money" object when given two args', () => {
    let expected = {
      amount_money: {
        amount: 42,
        currency: "AUD",
      },
    };
    let received = order.build_service_charge_amount("42", "AUD");
    expect(received).toMatchObject(expected);
  });

  test('build_service_charge_applied should build a compliant "applied_money" object when given two args', () => {
    let expected = {
      applied_money: {
        amount: 46,
        currency: "AUD",
      },
    };

    let received = order.build_service_charge_applied(46, "AUD");
    expect(received).toMatchObject(expected);
  });

  test('add_service_charge_amount return a compliant "amount_money" object and add it to the array on fardel.', () => {
    let expected = {
      amount_money: {
        amount: 42,
        currency: "AUD",
      },
    };
    let arr = [expected];
    let received = order.add_service_charge_amount("42", "AUD");

    expect(received).toMatchObject(expected);
    expect(order.service_charges).toMatchObject(arr);
  });

  test('add_service_charge_applied return a compliant "amount_money" object and add it to the array on fardel.', () => {
    let expected = {
      applied_money: {
        amount: 42,
        currency: "AUD",
      },
    };
    let arr = [expected];
    let received = order.add_service_charge_applied("42", "AUD");

    expect(received).toMatchObject(expected);
    expect(order.service_charges).toMatchObject(arr);
  });
});

/* --------------------------------------------------------*
 *                                                         *
 *                        Error checkers
 *                                                         *
 * ------------------------------------------------------- */

describe("Error checkers", () => {
  beforeEach(() => {
    order = new Order_Object();
    make = order.make();
  });
  test("customer_id should respect limit 191", () => {
    expect(() => {
      order.make().customer_id(long_strings.len_192);
    }).toThrow();
    expect(() => {
      order.make().customer_id(long_strings.len_191);
    }).not.toThrow();
  });

  test("ticket_name should respect limit 30", () => {
    expect(() => {
      order.make().ticket_name(long_strings.len_31);
    }).toThrow();
    expect(() => {
      order.make().ticket_name(long_strings.len_30);
    }).not.toThrow();
  });

  test("pricing_options respect argument type", () => {
    expect(() => {
      order.make().pricing_options("yes", "no");
    }).toThrow();
    expect(() => {
      order.make().pricing_options(true, false);
    }).not.toThrow();
  });

  test("pricing_options should respect property names", () => {
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
      order.pricing_options = wrong1;
    }).toThrow();

    expect(() => {
      order.pricing_options = wrong2;
    }).toThrow();

    expect(() => {
      order.pricing_options = right;
    }).not.toThrow();
  });
});

/* --------------------------------------------------------*
 *                                                         *
 *                        Testing array properties
 *                                                         *
 * ------------------------------------------------------- */
describe("Testing array properties", () => {
  beforeEach(() => {
    order = new Order_Object();
    make = order.make();
  });
  test("fulfillments should be an array with an object", () => {
    let expected = [{ thing: 1 }, { thing: 2 }];

    order.make().fulfillments({ thing: 1 }).fulfillments({ thing: 2 });
    expect(order.fulfillments).toMatchObject(expected);
  });

  test("service_charges should be an array with an object", () => {
    let expected = [{ thing: 1 }, { thing: 2 }];

    order.make().service_charges({ thing: 1 }).service_charges({ thing: 2 });
    expect(order.service_charges).toMatchObject(expected);
  });

  test(" discounts should be an array with an object", () => {
    let expected = [{ thing: 1 }, { thing: 2 }];

    order.make().discounts({ thing: 1 }).discounts({ thing: 2 });
    expect(order.discounts).toMatchObject(expected);
  });

  test("taxes should be an array with an object", () => {
    let expected = [{ thing: 1 }, { thing: 2 }];

    make.taxes({ thing: 1 }).taxes({ thing: 2 });
    expect(order.taxes).toMatchObject(expected);
  });

  test("line_items should be an array with an object", () => {
    let expected = [{ thing: 1 }, { thing: 2 }];

    order.make().line_items({ thing: 1 }).line_items({ thing: 2 });
    expect(order.line_items).toMatchObject(expected);
  });
});
