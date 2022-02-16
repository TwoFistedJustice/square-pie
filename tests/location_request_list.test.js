"use strict";
const Location_List = require("../src/lib/location_request_list");
let list;
const class_name = "Location_List";
const method = "GET"; //http method from Square docs
let endpoint = ""; //copy and paste from Square docs
/* --------------------------------------------------------*
 *                                                         *
 *                        common structures
 *                                                         *
 * ------------------------------------------------------- */
describe(`${class_name} basic request class structures`, () => {
  beforeEach(function () {
    list = new Location_List();
  });
  test("should have display name", () => {
    expect(list._display_name).toBeDefined();
  });
  test("should have the http method defined by Square", () => {
    expect(list.method).toEqual(method);
  });
  test("display name should be same as class name", () => {
    expect(list.display_name).toEqual(class_name);
  });
  test("should have defined square version", () => {
    expect(list.square_version).toBeDefined();
  });
  test("should have defined _help", () => {
    expect(list.help).toBeDefined();
  });
  test("should have an endpoint", () => {
    expect(list.endpoint).toEqual(endpoint);
  });
  test("should have _delivery", () => {
    list.delivery = { locations: { a: 1 } };
    expect(list.delivery).toBeDefined();
  });
});
