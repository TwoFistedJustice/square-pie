"use strict";
const should = require("chai").should();

const sample_objects = require("./data_preparation/sample_catalog_data");

const Catalog_Upsert = require("../src/lib/catalog_request_upsert");
const Catalog_List = require("../src/lib/catalog_request_list");

// tack on .only to this empty test to silence all other tests
describe("Silence Async tests", () => {
  test("Should silence async customer tests", () => {
    expect("a").toEqual("a");
  });
});

describe("Catalog Request Upsert", () => {
  test("Should have a correctly populated batches array when upserting multiple documents", () => {
    const upsert = new Catalog_Upsert();
    upsert.make().body(sample_objects.multiple);
    let received = upsert.body;
    // should have 'batches' property
    expect(Object.prototype.hasOwnProperty.call(received, "batches")).toEqual(
      true
    );
    // should have 'batches[0].objects' property
    expect(
      Object.prototype.hasOwnProperty.call(received.batches[0], "objects")
    ).toEqual(true);
  });

  test("Should have 'object' property when upserting a single document", () => {
    const upsert = new Catalog_Upsert();
    upsert.make().body(sample_objects.single);
    let received = upsert.body;

    expect(Object.prototype.hasOwnProperty.call(received, "object")).toEqual(
      true
    );
  });
});

describe("Catalog Request List", () => {
  test.only("Should fetch the list of Catalog Objects", async () => {
    let list = new Catalog_List();
    await list.makeRequest();
    list.delivery.should.be.an("Array");
  });
});
