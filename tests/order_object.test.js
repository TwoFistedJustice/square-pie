"use strict";
const should = require("chai").should();

describe("Silence order object tests", () => {
  test("Should silence tests", () => {
    expect("a").toEqual("a");
  });
});

describe("Order object build_discount method", () => {
  const Order_Object = require("../src/lib/stub.order_object");

  test.only("pricing_options setter should throw if object not correctly formatted", () => {
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

  // DONE pricing_options setter should throw if object not correctly formatted
  // pricing_options setter should throw if object doesn't have two booleans
  // pricing_options setter should NOT throw if object is correctly formatted

  // build_state methods should set state property as expected - there are four of them

  //build_service_charge_amount should correctly build an 'amount_money' object when given two args
  //build_service_charge_amount should automatically set "USD" when given just amount

  //build_service_charge_applied should correctly build an 'amount_money' object when given two args
  //build_service_charge_applied should automatically set "USD" when given just amount

  // build_discount should do all the things - like 9 things minimum - have fun
  // build_discount.name should respect length limit

  //build_discount.percentage should throw if fed an arg that can't convert to a number
  //build_discount.percentage should NOT throw if fed a compatible string
  //build_discount.percentage should NOT throw if fed a number

  // pricing should correctly format the output
});
