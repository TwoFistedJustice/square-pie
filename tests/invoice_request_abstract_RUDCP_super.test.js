"use strict";
const Invoice_RUDCnP = require("../src/lib/invoice_request_abstract_RUDCP_super");
let supes, make;
const id = "123";
const class_name = "Invoice_RUDCnP";
let endpoint = "/123"; //copy and paste from Square docs
/* --------------------------------------------------------*
 *                                                         *
 *                        common structures
 *                                                         *
 * ------------------------------------------------------- */
describe(`${class_name} basic request class structures`, () => {
  beforeEach(function () {
    supes = new Invoice_RUDCnP(id);
  });
  test("should have display name", () => {
    expect(supes._display_name).toBeDefined();
  });
  test("display name should be same as class name", () => {
    expect(supes.display_name).toEqual(class_name);
  });
  //   test ("should have defined _help", () => {
  //   expect (supes.help).toBeDefined ();
  // });
  test("should have an endpoint", () => {
    expect(supes.endpoint).toEqual(endpoint);
  });

  // test ("should have _delivery", () => {
  //   supes.delivery = {someProp: {a: 1}}
  //   expect (supes.delivery).toBeDefined ();
  // });
  //
});

/* --------------------------------------------------------*
 *                                                         *
 *                        Error Checks
 *                                                         *
 * ------------------------------------------------------- */

/* --------------------------------------------------------*
 *                                                         *
 *                        getters/setters
 *                                                         *
 * ------------------------------------------------------- */

describe(`${class_name} getters/setters`, () => {
  beforeEach(() => {
    supes = new Invoice_RUDCnP(id);
    make = supes.make();
  });

  test("id getter should return endpoint", () => {
    expect(supes.id).toEqual(endpoint);
  });

  test("id setter should set endpoint", () => {
    supes.id = "ABC";
    expect(supes.endpoint).toEqual("/ABC");
  });

  test("make(). () should set ", () => {
    let expected = "/ABC";
    make.id("ABC");
    expect(supes.endpoint).toEqual(expected);
  });
});
