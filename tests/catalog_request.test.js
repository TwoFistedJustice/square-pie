"use strict";
const should = require("chai").should();

const sample_objects = require("./data_preparation/sample_catalog_data");

const Catalog_Upsert = require("../src/lib/catalog_request_upsert");
const Catalog_List = require("../src/lib/catalog_request_list");
const Catalog_Retreive = require("../src/lib/catalog_request_retrieve");
const Catalog_Delete = require("../src/lib/catalog_request_delete");

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
  test("Should fetch the list of Catalog Objects", async () => {
    let list = new Catalog_List();
    await list.request();
    list.delivery.should.be.an("Array");
    // console.log(list.delivery);
  });
});

describe("Catalog Request Retrieve", () => {
  const cache = [];
  test.only("Should retrieve a single object", async () => {
    let list = new Catalog_List();
    await list.request();
    let arr = list.delivery;
    // console.log(arr);
    arr.forEach((doohickey) => {
      cache.push(doohickey.id);
    });
    let retrieve = new Catalog_Retreive();
    retrieve.fait().object_ids(cache[0]);
    await retrieve.request();
    expect(retrieve.delivery.objects[0].id).toEqual(cache[0]);
  });
  test("Should retrieve multiple objects", async () => {
    let retrieve = new Catalog_Retreive();
    retrieve.fait().object_ids(cache[0]);
    retrieve.beam(cache[1]);
    await retrieve.request();
    expect(retrieve.delivery.objects[1].id).toEqual(cache[1]);
  });
});

describe("Catalog Request Delete", () => {
  test("Should delete the specified objects", async () => {
    let del = new Catalog_Delete();
    let catList = new Catalog_List();
    let ids = [];

    await catList.request();
    let list = catList.delivery;
    if (list.length >= 1) {
      ids.push(list[0].id);
      ids.push(list[1].id);
    } else {
      throw new Error(
        "Failed in Catalog Delete. Not enough items returned by List."
      );
    }
    del.nix(ids[0]).disintegrate(ids[1]);
    await del.request();
    let deleted = del.delivery;
    console.log(deleted);
    // deleted.deleted_object_ids.should.be.an("Array").that.has.lengthOf(2);
    deleted.deleted_object_ids.should.be.an("Array").that.includes(list[0].id);
    deleted.deleted_object_ids.should.be.an("Array").that.includes(list[1].id);
  });
});

describe("Catalog Request Search Filter", () => {
  // set exact_query should throw on an incorrectly formatted input
  // set exact_query should NOT throw on a correctly formatted input
  //
  // set set_query should throw on an incorrectly formatted input
  // set set_query should NOT throw on a correctly formatted input
  //
  // set prefix_query should throw on an incorrectly formatted input
  // set prefix_query should NOT throw on a correctly formatted input
  //
  // set range_query should throw on an incorrectly formatted input
  // set range_query should NOT throw on a correctly formatted input
  //
  // set text_query should throw on an array longer than 3
  // set text_query should NOT throw on an array with 1 - 3 elements
  //
  // set sorted_attribute_query should throw if 'attribute_name' prop missing from arg
  // set sorted_attribute_query should throw if 'sort_order' contains wrong value
  // set sorted_attribute_query should NOT throw if 'sort_order' contains "ASC"
  //
  // text_query_add should add a new element and remove the last element of query.text_area_keywords array it already has 3
  //
  // text_query_remove should remove the specified word from the query.text_area_keywords array
  //
  // set object_types should fail silently if user attempts to add a value that already exists
});
