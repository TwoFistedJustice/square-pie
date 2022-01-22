"use strict";
const Customer_Retrieve_Update_Delete_Super = require("../src/lib/customer_request_abstract_R_U_D_super");
let supes;
const id = "123";
const class_name = "Customer_Retrieve_Update_Delete_Super";
let endpoint = "/123"; //copy and paste from Square docs
/* --------------------------------------------------------*
 *                                                         *
 *                        common structures
 *                                                         *
 * ------------------------------------------------------- */
describe(`${class_name} basic request class structures`, () => {
  beforeEach(function () {
    supes = new Customer_Retrieve_Update_Delete_Super(id);
  });
  test("should have display name", () => {
    expect(supes._display_name).toBeDefined();
  });

  test("display name should be same as class name", () => {
    expect(supes.display_name).toEqual(class_name);
  });
  test("should have defined square version", () => {
    expect(supes.square_version).toBeDefined();
  });
  test("should have defined _help", () => {
    expect(supes.help).toBeDefined();
  });
  test("should have an endpoint", () => {
    expect(supes.endpoint).toEqual(endpoint);
  });
  test("should have _delivery", () => {
    supes.delivery = { customer: { a: 1 } };
    expect(supes.delivery).toBeDefined();
  });
});

/* --------------------------------------------------------*
 *                                                         *
 *                        Error Checks
 *                                                         *
 * ------------------------------------------------------- */
// describe (`${class_name} error checks`, () => {
//   beforeEach (() => {
//     supes = new Customer_Retrieve_Update_Delete_Super(id);
//     make = supes.make ();
//   });
//   test ("", () => {
//     expect (() => {
//     }).toThrow ();
//   });
// });

/* --------------------------------------------------------*
 *                                                         *
 *                        getters/setters
 *                                                         *
 * ------------------------------------------------------- */

describe(`${class_name} getters/setters`, () => {
  beforeEach(() => {
    supes = new Customer_Retrieve_Update_Delete_Super(id);
  });
  test("set id should set endpoint", () => {
    let expected = "/ABC";
    supes.id = "ABC";
    expect(supes.endpoint).toEqual(expected);
    expect(supes.id).toEqual(expected);
  });

  test("append_query_param should set endpoint correctly", () => {
    let expected = "/123?version=11";
    supes.append_query_param("version", 11);
    expect(supes.endpoint).toEqual(expected);
  });

  test("append_query_param should re-set endpoint correctly", () => {
    let expected = "/123?version=12";
    supes.append_query_param("version", 11);
    supes.append_query_param("version", 12);
    expect(supes.endpoint).toEqual(expected);
  });

  test("append_query_param should add multiple query params", () => {
    let expected = "/123?version=12&poof=silentbutdeadly&hewhosmeltit=dealtit";
    supes.append_query_param("version", 11);
    supes.append_query_param("version", 12);
    supes.append_query_param("poof", "silentbutdeadly");
    supes.append_query_param("hewhosmeltit", "dealtit");
    expect(supes.endpoint).toEqual(expected);
  });
});
