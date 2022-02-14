"use strict";
const Location_Retrieve = require("../src/lib/location_request_retrieve");
let retrieve;
const id = "123";
const class_name = "Location_Retrieve";
const method = "GET"; //http method from Square docs
let endpoint = `/${id}`; //copy and paste from Square docs
/* --------------------------------------------------------*
 *                                                         *
 *                        common structures
 *                                                         *
 * ------------------------------------------------------- */
describe(`${class_name} basic request class structures`, () => {
  beforeEach(function () {
    retrieve = new Location_Retrieve(id);
  });
  test("should have display name", () => {
    expect(retrieve._display_name).toBeDefined();
  });
  test("should have the http method defined by Square", () => {
    expect(retrieve.method).toEqual(method);
  });
  test("display name should be same as class name", () => {
    expect(retrieve.display_name).toEqual(class_name);
  });
  test("should have defined square version", () => {
    expect(retrieve.square_version).toBeDefined();
  });
  test("should have defined _help", () => {
    expect(retrieve.help).toBeDefined();
  });
  test("should have an endpoint", () => {
    expect(retrieve.endpoint).toEqual(endpoint);
  });
  test("should have _delivery", () => {
    retrieve.delivery = { location: { a: 1 } };
    expect(retrieve.delivery).toBeDefined();
  });

  test("delivery should set", () => {
    let expected = { a: 1 };
    retrieve.delivery = { location: expected };
    expect(retrieve.delivery).toMatchObject(expected);
  });
});
