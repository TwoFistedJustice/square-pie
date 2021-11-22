"use strict";
const should = require("chai").should();

const sample_objects = require("./data_preparation/sample_catalog_data");

const Catalog_Upsert = require("../src/lib/catalog_request_upsert");
const Catalog_List = require("../src/lib/catalog_request_list");
const Catalog_Retreive = require("../src/lib/catalog_request_retrieve");
const Catalog_Delete = require("../src/lib/catalog_request_delete");
const Catalog_Search_Filter = require("../src/lib/catalog_request_search_objects_filter");
// const Catalog_Search_Items = require("../src/lib/stub.catalog_request_search_items");
// const {expect} = require ("chai");

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
  test("Should retrieve a single object", async () => {
    let list = new Catalog_List();
    await list.request();
    let arr = list.delivery;
    // console.log(arr);
    arr.forEach((doohickey) => {
      cache.push(doohickey.id);
    });
    let retrieve = new Catalog_Retreive();
    retrieve.make().object_ids(cache[0]);
    await retrieve.request();
    expect(retrieve.delivery.objects[0].id).toEqual(cache[0]);
  });

  test("Should retrieve multiple objects", async () => {
    let retrieve = new Catalog_Retreive();
    retrieve.make().object_ids(cache[0]);
    retrieve.get(cache[1]);
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
    // console.log(deleted);
    // deleted.deleted_object_ids.should.be.an("Array").that.has.lengthOf(2);
    deleted.deleted_object_ids.should.be.an("Array").that.includes(list[0].id);
    deleted.deleted_object_ids.should.be.an("Array").that.includes(list[1].id);
  });
});

describe("Catalog Request Search Filter", () => {
  test(" set exact_query should NOT throw on a correctly formatted input", async () => {
    const filter = new Catalog_Search_Filter();
    let obj = {
      attribute_name: "name",
      attribute_value: "Coffee",
    };

    expect(() => {
      filter.exact_query = obj;
    }).not.toThrow();
  });

  test("set exact_query should throw on an incorrectly formatted input", async () => {
    const filter = new Catalog_Search_Filter();
    let wrongProp = {
      wrong_property_name: "this is a wrong property name",
      attribute_value: "This is supposed to fail anyway",
    };
    let wrongType = {
      attribute_name: "both should hold a string - oops",
      attribute_value: 86,
    };
    expect(() => {
      filter.exact_query = wrongProp;
    }).toThrow();

    expect(() => {
      filter.exact_query = wrongType;
    }).toThrow();
  });

  test("set set_query should NOT throw on a correctly formatted input", async () => {
    const filter = new Catalog_Search_Filter();
    let obj = {
      attribute_name: "name",
      attribute_values: ["Coffee", "Pie"],
    };
    expect(() => {
      filter.set_query = obj;
    }).not.toThrow();
  });

  test("set set_query should throw on an incorrectly formatted input", async () => {
    const filter = new Catalog_Search_Filter();
    let obj = {
      attribute_name: "name",
      attribute_values: "Coffee",
    };
    expect(() => {
      filter.set_query = obj;
    }).toThrow();
  });

  test("set prefix_query should NOT throw on a correctly formatted input", async () => {
    const filter = new Catalog_Search_Filter();
    let obj = {
      attribute_name: "name",
      attribute_prefix: "vista",
    };
    expect(() => {
      filter.prefix_query = obj;
    }).not.toThrow();
  });

  test("set prefix_query should throw on an incorrectly formatted input", async () => {
    const filter = new Catalog_Search_Filter();
    let wrong = {
      attribute_nam: "name",
      attribute_prefix: "vista",
    };
    expect(() => {
      filter.prefix_query = wrong;
    }).toThrow();
  });

  test("set range_query should NOT throw on a correctly formatted input", async () => {
    const filter = new Catalog_Search_Filter();
    let obj = {
      attribute_name: "amount",
      attribute_min_value: 450,
      attribute_max_value: 550,
    };
    expect(() => {
      filter.range_query = obj;
    }).not.toThrow();
  });

  test("set range_query should throw on an incorrectly formatted input: missing attribute_name", async () => {
    const filter = new Catalog_Search_Filter();
    let wrong = {
      attribute_min_value: 450,
      attribute_max_value: 550,
    };
    expect(() => {
      filter.range_query = wrong;
    }).toThrow();
  });

  test("set range_query should throw on an incorrectly formatted input: missing ", async () => {
    const filter = new Catalog_Search_Filter();
    let wrong = {
      attribute_name: ["amount"],
      attribute_min_value: 450,
      attribute_max_value: 550,
    };
    expect(() => {
      filter.range_query = wrong;
    }).toThrow();
  });

  test("set text_query should NOT throw on an array with 1 - 3 elements", async () => {
    const filter = new Catalog_Search_Filter();
    let arr = ["Coffee", "Tea", "Life Force"];
    expect(() => {
      filter.text_query = arr;
    }).not.toThrow();
  });

  test("set text_query should throw on an array longer than 3", async () => {
    const filter = new Catalog_Search_Filter();
    let wrong = ["Zombies", "Vampires", "Goblins", "Karens"];
    expect(() => {
      filter.text_query = wrong;
    }).toThrow();
  });

  test("set sorted_attribute_query should NOT throw if 'sort_order' contains \"ASC\"", async () => {
    const filter = new Catalog_Search_Filter();
    let obj = {
      attribute_name: "description",
      sort_order: "ASC",
    };
    expect(() => {
      filter.sorted_attribute_query = obj;
    }).not.toThrow();
  });

  test("set sorted_attribute_query should throw if 'attribute_name' prop missing from arg", async () => {
    const filter = new Catalog_Search_Filter();
    let wrong = {
      sort_order: "ASC",
    };
    expect(() => {
      filter.sorted_attribute_query = wrong;
    }).toThrow();
  });

  test("set sorted_attribute_query should throw if 'sort_order' contains wrong value", async () => {
    const filter = new Catalog_Search_Filter();
    let wrong = {
      sort_order: "ASV",
    };
    expect(() => {
      filter.sorted_attribute_query = wrong;
    }).toThrow();
  });

  test("text_query_add should add a new element and remove the last element of query.text_area_keywords array it already has 3", async () => {
    const filter = new Catalog_Search_Filter();
    let expected = { keywords: ["zero", "one", "three"] };
    filter
      .text_query_add("zero")
      .text_query_add("one")
      .text_query_add("two")
      .text_query_add("three");

    expect(filter.text_query).toMatchObject(expected);
  });

  test("text_query_remove should remove the specified word from the query.text_area_keywords array", async () => {
    const filter = new Catalog_Search_Filter();
    let expected = { keywords: ["zero", "two"] };
    filter
      .text_query_add("zero")
      .text_query_add("one")
      .text_query_add("two")
      .text_query_remove("one");

    expect(filter.text_query).toMatchObject(expected);
  });

  test("text_query_remove should throw an error if attempting to remove an element from an non-existent keywords array", async () => {
    const filter = new Catalog_Search_Filter();

    expect(() => {
      filter.text_query_remove("one");
    }).toThrow();
  });

  test("text_query_remove should throw an error if attempting to remove an element from an empty keywords array", async () => {
    const filter = new Catalog_Search_Filter();
    filter.text_query_add("a").text_query_remove("a");

    expect(() => {
      filter.text_query_remove("one");
    }).toThrow();
  });

  test("set object_types should fail silently if user attempts to add a value that already exists", async () => {
    const filter = new Catalog_Search_Filter();
    let expected = ["ITEM", "CATEGORY", "ITEM_VARIATION"];
    filter
      .make()
      .add_object_type("ITEM")
      .add_object_type("ITEM")
      .add_object_type("CATEGORY")
      .add_object_type("ITEM_VARIATION");
    // console.log(filter.text_query);
    expect(filter.object_types).toEqual(expected);
  });
});

describe("Catalog_Search_Cross_Reference", () => {
  const Catalog_Search_Cross_Reference = require("../src/lib/catalog_request_search_objects_cross_reference");
  let id1 = "HXUTLPOIUE3FZGSK4NBZGMZD";
  let id2 = "RJREZRB5H4RVFUMXB3R5V73Z";
  // test("", () => {});

  test(" variations method correctly modifies body", () => {
    let expected = {
      cursor: undefined,
      include_related_objects: undefined,
      begin_time: undefined,
      object_types: undefined,
      query: undefined,
      item_variations_for_item_option_values_query: [],
    };
    let xref = new Catalog_Search_Cross_Reference();
    xref.items();
    xref.variations();
    expect(xref.body).toMatchObject(expected);
  });

  test("items method correctly modifies  body", () => {
    let expected = {
      cursor: undefined,
      include_related_objects: undefined,
      begin_time: undefined,
      object_types: undefined,
      query: undefined,
      items_for_item_options_query: [],
    };
    let xref = new Catalog_Search_Cross_Reference();
    xref.variations();
    xref.items();
    expect(xref.body).toMatchObject(expected);
  });

  test("modifiers method correctly modifies  body", () => {
    let expected = {
      cursor: undefined,
      include_related_objects: undefined,
      begin_time: undefined,
      object_types: undefined,
      query: undefined,
      items_for_modifier_list_query: [],
    };
    let xref = new Catalog_Search_Cross_Reference();
    xref.items();
    xref.modifiers();
    expect(xref.body).toMatchObject(expected);
  });

  test("taxes correctly modifies  body", () => {
    let expected = {
      cursor: undefined,
      include_related_objects: undefined,
      begin_time: undefined,
      object_types: undefined,
      query: undefined,
      items_for_tax_query: [],
    };
    let xref = new Catalog_Search_Cross_Reference();
    xref.items();
    xref.taxes();
    expect(xref.body).toMatchObject(expected);
  });

  test("addId method adds ids", () => {
    let expected = [id1, id2];
    let xref = new Catalog_Search_Cross_Reference();
    xref.addId(id1).addId(id2);
    expect(xref.ids).toMatchObject(expected);
  });

  test("clearIds clears the ids", () => {
    let expected = [];
    let xref = new Catalog_Search_Cross_Reference();
    xref.addId(id1).addId(id2).clearIds();
    expect(xref.ids).toMatchObject(expected);
  });
});

describe("Catalog_Search_Items", () => {
  const Catalog_Search_Items = require("../src/lib/catalog_request_search_items");
  test("sort_order should throw on wrong value", () => {
    const search = new Catalog_Search_Items();
    expect(() => {
      search.sort_order = "ASCENDING";
    }).toThrow();
  });

  test("sort_order should not throw on correct value", () => {
    const search = new Catalog_Search_Items();
    expect(() => {
      search.sort_order = "ASC";
    }).not.toThrow();
  });

  test("product_type should throw on wrong value", () => {
    const search = new Catalog_Search_Items();
    expect(() => {
      search.product_types = "GIFT_CARD";
    }).toThrow();
  });

  test("product_type should not throw on correct value", () => {
    const search = new Catalog_Search_Items();
    expect(() => {
      search.product_types = "REGULAR";
    }).not.toThrow();
  });

  test("product_type creates an array", () => {});

  test("stock_levels should throw on wrong value", () => {
    const search = new Catalog_Search_Items();
    expect(() => {
      search.stock_levels = "UP";
    }).toThrow();
  });

  test("stock_levels should not throw on correct value", () => {
    const search = new Catalog_Search_Items();
    expect(() => {
      search.stock_levels = "OUT";
    }).not.toThrow();
  });

  test("stock_levels creates an array", () => {
    const search = new Catalog_Search_Items();
    search.stock_levels = "LOW";
    search.stock_levels.should.be.an("array");
  });

  test("category_ids creates an array", () => {
    const search = new Catalog_Search_Items();
    search.category_ids = "some id";
    search.category_ids.should.be.an("array");
  });

  test("enabled_location_ids creates an array", () => {
    const search = new Catalog_Search_Items();
    search.enabled_location_ids = "some id";
    search.enabled_location_ids.should.be.an("array");
  });

  test("custom_attribute_filters creates an array", () => {
    const search = new Catalog_Search_Items();
    search.custom_attribute_filters = { a: 1 };
    search.custom_attribute_filters.should.be.an("array");
  });

  test("custom_attribute_filters should throw on attempt to add 11th element", () => {
    const search = new Catalog_Search_Items();
    let a = { a: 1 };
    let make = search.make();
    make
      .custom_attribute_filters(a)
      .custom_attribute_filters(a)
      .custom_attribute_filters(a)
      .custom_attribute_filters(a)
      .custom_attribute_filters(a)
      .custom_attribute_filters(a)
      .custom_attribute_filters(a)
      .custom_attribute_filters(a)
      .custom_attribute_filters(a)
      .custom_attribute_filters(a);
    expect(() => {
      make.custom_attribute_filters(a);
    }).toThrow();
  });

  test('sort().up() should set sort_order to "ASC"', () => {
    let search = new Catalog_Search_Items();
    search.make().sort().up();
    expect(search.sort_order).toEqual("ASC");
  });
  test('sort().down() should set sort_order to "DESC"', () => {
    let search = new Catalog_Search_Items();
    search.make().sort().down();
    expect(search.sort_order).toEqual("DESC");
  });
  test("make().text() should set text_filter", () => {
    let search = new Catalog_Search_Items();
    search.make().text("words on a page");
    expect(search.text_filter).toEqual("words on a page");
  });
  test('regular() should set product_types to "REGULAR"', () => {
    let search = new Catalog_Search_Items();
    search.make().product_types().regular();
    expect(search.product_types).toEqual("REGULAR");
  });
  test('appt() should set product_types to "APPOINTMENTS_SERVICE"', () => {
    let search = new Catalog_Search_Items();
    search.make().product().appt();
    expect(search.product_types).toEqual("APPOINTMENTS_SERVICE");
  });
  test('stock_levels().low(); should set stock_levels to ["LOW"]', () => {
    let expected = ["LOW"];
    let search = new Catalog_Search_Items();
    search.make().stock_levels().low();
    expect(search.stock_levels).toMatchObject(expected);
  });
  test('.stock().out() should set stock_levels to ["OUT"]', () => {
    let expected = ["OUT"];
    let search = new Catalog_Search_Items();
    search.make().stock().out();
    expect(search.stock_levels).toMatchObject(expected);
  });
  test('.stock().any() should set stock_levels to ["LOW", "OUT"]', () => {
    let expected = ["LOW", "OUT"];
    let search = new Catalog_Search_Items();
    search.make().stock().any();
    expect(search.stock_levels).toMatchObject(expected);
  });

  test("make().category() should add to the category_ids array", () => {
    let expected = ["id1", "id2", "id3"];
    let search = new Catalog_Search_Items();
    search.make().category("id1").category("id2").category("id3");
    expect(search.category_ids).toMatchObject(expected);
  });
  test("make().location() should add to the enabled_location_ids array", () => {
    let expected = ["id1", "id2", "id3"];
    let search = new Catalog_Search_Items();
    search.make().location("id1").location("id2").location("id3");
    expect(search.enabled_location_ids).toMatchObject(expected);
  });
  test("make().custom() should add to the custom_attribute_filters array", () => {
    let expected = [{ a: 1 }, { b: 2 }, { c: 3 }];
    let search = new Catalog_Search_Items();
    search.make().custom({ a: 1 }).custom({ b: 2 }).custom({ c: 3 });
    expect(search.custom_attribute_filters).toMatchObject(expected);
  });
});
