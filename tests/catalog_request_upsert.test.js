"use strict";
const sample_objects = require("./data_preparation/sample_catalog_data");
const Catalog_Upsert = require("../src/lib/catalog_request_upsert");

describe("Catalog Request Upsert", () => {
  test("Should have a correctly populated batches array when upserting multiple documents", () => {
    const upsert = new Catalog_Upsert();
    upsert.make().body(sample_objects.multiple);
    let received = upsert.body;
    expect(Object.prototype.hasOwnProperty.call(received, "batches")).toEqual(
      true
    );
    expect(
      Object.prototype.hasOwnProperty.call(received.batches[0], "objects")
    ).toEqual(true);
  });
});

/* --------------------------------------------------------*
 *                                                         *
 *               Catalog_Upsert Basic Structures
 *                                                         *
 * ------------------------------------------------------- */
describe("Catalog_Upsert", () => {
  let upsert;
  let class_name = "Catalog_Upsert";
  let endpoint = "/batch-upsert"; //copy and paste from Square docs
  let method = "POST"; //http method from Square docs
  beforeEach(function () {
    upsert = new Catalog_Upsert();
  });

  test("should have display name", () => {
    expect(upsert._display_name).toBeDefined();
  });
  test("should have the method defined by Square set", () => {
    expect(upsert.method).toEqual(method);
  });
  test("display name should be same as class name", () => {
    expect(upsert.display_name).toEqual(class_name);
  });
  test("should have defined square version", () => {
    expect(upsert.square_version).toBeDefined();
  });
  test("should have defined _help", () => {
    expect(upsert.help).toBeDefined();
  });
  test("should have an endpoint", () => {
    expect(upsert.endpoint).toEqual(endpoint);
  });
  test("should have _delivery", () => {
    upsert.delivery = { objects: { a: 1 } };
    expect(upsert.delivery).toBeDefined();
  });

  // not every request class has these
  test("should have defined _body", () => {
    expect(upsert.body).toBeDefined();
  });
  test("should have defined _body.idempotency_key", () => {
    expect(upsert.body.idempotency_key).toBeDefined();
  });
});
