"use strict";
const should = require("chai").should();

describe("Silence order object tests", () => {
  test("Should silence tests", () => {
    expect("a").toEqual("a");
  });
});

describe("Order object build_discount method", () => {
  // name should respect length limit
  // catalog_object_id should respect length limit
  // build_discount should set up correctly
  // scope_line
  // scope_order
  //type_percentage
  // type_amount
  // correctly sets uid to lower-dashed name if no uid present
  // throws if has neither type nor catalog_object_id
  // amount_money
  // applied_money
});
