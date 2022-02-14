"use strict";
const Location_Update = require("../src/lib/location_request_update");
let update, make;
const id = "123";
const class_name = "Location_Update";
const method = "PUT"; //http method from Square docs
let endpoint = `/${id}`; //copy and paste from Square docs
/* --------------------------------------------------------*
 *                                                         *
 *                        common structures
 *                                                         *
 * ------------------------------------------------------- */
describe(`${class_name} basic request class structures`, () => {
  beforeEach(function () {
    update = new Location_Update(id);
  });
  test("should have display name", () => {
    expect(update._display_name).toBeDefined();
  });
  test("should have the http method defined by Square", () => {
    expect(update.method).toEqual(method);
  });
  test("display name should be same as class name", () => {
    expect(update.display_name).toEqual(class_name);
  });
  test("should have defined square version", () => {
    expect(update.square_version).toBeDefined();
  });
  test("should have defined _help", () => {
    expect(update.help).toBeDefined();
  });
  test("should have an endpoint", () => {
    expect(update.endpoint).toEqual(endpoint);
  });

  test("should have _delivery", () => {
    let expected = { a: 1 };
    update.delivery = { location: expected };
    expect(update.delivery).toMatchObject(expected);
  });
  test("should have defined _body", () => {
    expect(update.body).toBeDefined();
  });
});

/* --------------------------------------------------------*
 *                                                         *
 *                        getters/setters
 *                                                         *
 * ------------------------------------------------------- */

describe(`${class_name} getters/setters`, () => {
  beforeEach(() => {
    update = new Location_Update(id);
    make = update.make();
  });
  test("make().location () should set ", () => {
    let expected = { a: 1 };
    make.location(expected);
    expect(update.location).toEqual(expected);
  });
});
