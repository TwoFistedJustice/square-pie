"use strict";
const Order_Object = require("../src/lib/stub.order_object");
const should = require("chai").should();

describe("Silence order object tests", () => {
  test("Should silence tests", () => {
    expect("a").toEqual("a");
  });
});

// DONE pricing_options setter should throw if object not correctly formatted
describe("Order object build_discount method", () => {
  test("pricing_options setter should throw if object not correctly formatted", () => {
    let expected = [
      {
        auto_apply_discounts: true,
        auto_apply_taxes: false,
      },
    ];
    let order = new Order_Object();
    order.pricing(true, false);
    expect(order.pricing_options).toMatchObject(expected);
  });

  // pricing_options setter should throw if object doesn't have two booleans
  test("pricing_options setter should throw if object doesn't have two booleans", () => {
    let order = new Order_Object();
    expect(() => {
      order.pricing("beavers", 42);
    }).toThrow();
  });

  // pricing_options setter should NOT throw if object is correctly formatted
  //todo
  // this will always pass because it is not a complete test- you left out the part that checks
  // whether or not it throws an error
  // https://jestjs.io/docs/expect
  test("pricing_options setter should NOT throw if object is correctly formatted", () => {
    let order = new Order_Object();
    expect(() => {
      order.pricing(false, true);
    });
  });

  // build_state methods should set state property as expected - there are four of them
  // todo
  //  this will never pass because you are checking the return value of the arrow function which
  //  the arrow function will return 'undefined' because you are correctly setting a static value
  test('build_state open should equal "Open"', () => {
    let order = new Order_Object();

    expect(() => {
      order.build_state().open();
    }).toEqual("OPEN");
  });

  // todo
  //  I corrected this one so you have a model to follow
  //  since we are checking a static value and not a THROW
  //  call the build methods outside of expect
  //  call the class GETTER inside of expect
  test.only('build_state canceled should equal "CANCELED"', () => {
    let order = new Order_Object();
    order.build_state().canceled();

    expect(order.state).toEqual("CANCELED");
  });

  test('build_state completed should equal "COMPLETED"', () => {
    let order = new Order_Object();
    expect(() => {
      order.build_state().completed();
    }).toEqual("COMPLETED");
  });

  test('build_state draft should equal "DRAFT"', () => {
    let order = new Order_Object();
    expect(() => {
      order.build_state().draft();
    }).toEqual("DRAFT");
  });

  //build_service_charge_amount should correctly build an 'amount_money' object when given two args
  //build_service_charge_amount should automatically set "USD" when given just amount

  //build_service_charge_applied should correctly build an 'amount_money' object when given two args
  //build_service_charge_applied should automatically set "USD" when given just amount

  // build_discount should do all the things - like 9 things minimum - have fun
  // build_discount.name should respect length limit

  //build_discount.percentage should throw if fed a string arg that can't convert to a number
  test("build_discount.percentage should throw if fed a string arg that can't convert to a number", () => {
    let order = new Order_Object();
    expect(() => {
      order.build_discount().percentage("Holy wrong kind of string Batman!");
    }).toThrow();
  });

  //build_discount.percentage should throw if fed anything other than a string or number
  test("build_discount.percentage should throw if fed anything other than a string or number", () => {
    let order = new Order_Object();
    expect(() => {
      order.build_discount().percentage({ a: 1 });
    }).toThrow();
  });
  //build_discount.percentage should NOT throw if fed a compatible string
  test("build_discount.percentage should NOT throw if fed a compatible string", () => {
    let order = new Order_Object();
    expect(() => {
      order.build_discount().percentage("7.25");
    }).not.toThrow();
  });
  //build_discount.percentage should NOT throw if fed a number
  test("build_discount.percentage should NOT throw if fed a number", () => {
    let order = new Order_Object();
    expect(() => {
      order.build_discount().percentage(7.25);
    }).not.toThrow();
  });

  // pricing should correctly format the output
});
