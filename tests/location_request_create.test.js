"use strict";
const Location_Create = require("../src/lib/location_request_create");
let create, make;
const class_name = "Location_Create";
const method = "POST"; //http method from Square docs
let endpoint = ""; //copy and paste from Square docs
/* --------------------------------------------------------*
 *                                                         *
 *                        common structures
 *                                                         *
 * ------------------------------------------------------- */
describe(`${class_name} basic request class structures`, () => {
  beforeEach(function () {
    create = new Location_Create();
  });
  test("should have display name", () => {
    expect(create._display_name).toBeDefined();
  });
  test("should have the http method defined by Square", () => {
    expect(create.method).toEqual(method);
  });
  test("display name should be same as class name", () => {
    expect(create.display_name).toEqual(class_name);
  });
  test("should have defined square version", () => {
    expect(create.square_version).toBeDefined();
  });
  test("should have defined _help", () => {
    expect(create.help).toBeDefined();
  });
  test("should have an endpoint", () => {
    expect(create.endpoint).toEqual(endpoint);
  });
  test("should have _delivery", () => {
    create.delivery = { location: { a: 1 } };
    expect(create.delivery).toBeDefined();
  });
  test("delivery should set ", () => {
    let expected = { a: 1 };
    create.delivery = { location: expected };
    expect(create.delivery).toMatchObject(expected);
  });

  // not every request class has these
  test("should have defined _body", () => {
    expect(create.body).toBeDefined();
  });
});

/* --------------------------------------------------------*
 *                                                         *
 *                        getters/setters
 *                                                         *
 * ------------------------------------------------------- */

describe(`${class_name} getters/setters`, () => {
  beforeEach(() => {
    create = new Location_Create();
    make = create.make();
  });
  test("make().location () should set ", () => {
    let expected = { a: 1 };
    make.location(expected);
    expect(create.location).toEqual(expected);
  });
});
