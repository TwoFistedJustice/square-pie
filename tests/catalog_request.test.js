"use strict";
const should = require("chai").should();

const sample_objects = require("./data_preparation/sample_catalog_data");

const Catalog_Upsert = require("../src/lib/catalog_request_upsert");
const Catalog_List = require("../src/lib/catalog_request_list");
const Catalog_Retreive = require("../src/lib/catalog_request_retrieve");
const Catalog_Delete = require("../src/lib/catalog_request_delete");
const Catalog_Search_Filter = require("../src/lib/catalog_request_search_objects_filter");
const Catalog_Search_Items = require("../src/lib/catalog_request_search_items");
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
    expect(Object.prototype.hasOwnProperty.call(received, "batches")).toEqual(
      true
    );
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
  });
});

describe("Catalog Request Retrieve", () => {
  const cache = [];
  test("Should retrieve a single object", async () => {
    let list = new Catalog_List();
    await list.request();
    let arr = list.delivery;
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
    deleted.deleted_object_ids.should.be.an("Array").that.includes(list[0].id);
    deleted.deleted_object_ids.should.be.an("Array").that.includes(list[1].id);
  });
});

describe("Catalog Request Search Filter", () => {
  let filter;
  beforeEach(() => {
    filter = new Catalog_Search_Filter();
  });
  test(" set exact_query should NOT throw on a correctly formatted input", async () => {
    let obj = {
      attribute_name: "name",
      attribute_value: "Coffee",
    };

    expect(() => {
      filter.exact_query = obj;
    }).not.toThrow();
  });

  test("set exact_query should throw on an incorrectly formatted input", async () => {
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
    let obj = {
      attribute_name: "name",
      attribute_values: ["Coffee", "Pie"],
    };
    expect(() => {
      filter.set_query = obj;
    }).not.toThrow();
  });

  test("set set_query should throw on an incorrectly formatted input", async () => {
    let obj = {
      attribute_name: "name",
      attribute_values: "Coffee",
    };
    expect(() => {
      filter.set_query = obj;
    }).toThrow();
  });

  test("set prefix_query should NOT throw on a correctly formatted input", async () => {
    let obj = {
      attribute_name: "name",
      attribute_prefix: "vista",
    };
    expect(() => {
      filter.prefix_query = obj;
    }).not.toThrow();
  });

  test("set prefix_query should throw on an incorrectly formatted input", async () => {
    let wrong = {
      attribute_nam: "name",
      attribute_prefix: "vista",
    };
    expect(() => {
      filter.prefix_query = wrong;
    }).toThrow();
  });

  test("set range_query should NOT throw on a correctly formatted input", async () => {
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
    let wrong = {
      attribute_min_value: 450,
      attribute_max_value: 550,
    };
    expect(() => {
      filter.range_query = wrong;
    }).toThrow();
  });

  test("set range_query should throw on an incorrectly formatted input: missing ", async () => {
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
    let arr = ["Coffee", "Tea", "Life Force"];
    expect(() => {
      filter.text_query = arr;
    }).not.toThrow();
  });

  test("set text_query should throw on an array longer than 3", async () => {
    let wrong = ["Zombies", "Vampires", "Goblins", "Karens"];
    expect(() => {
      filter.text_query = wrong;
    }).toThrow();
  });

  test("set sorted_attribute_query should NOT throw if 'sort_order' contains \"ASC\"", async () => {
    let obj = {
      attribute_name: "description",
      sort_order: "ASC",
    };
    expect(() => {
      filter.sorted_attribute_query = obj;
    }).not.toThrow();
  });

  test("set sorted_attribute_query should throw if 'attribute_name' prop missing from arg", async () => {
    let wrong = {
      sort_order: "ASC",
    };
    expect(() => {
      filter.sorted_attribute_query = wrong;
    }).toThrow();
  });

  test("set sorted_attribute_query should throw if 'sort_order' contains wrong value", async () => {
    let wrong = {
      sort_order: "ASV",
    };
    expect(() => {
      filter.sorted_attribute_query = wrong;
    }).toThrow();
  });

  test("text_query_add should add a new element and remove the last element of query.text_area_keywords array it already has 3", async () => {
    let expected = { keywords: ["zero", "one", "three"] };
    filter
      .text_query_add("zero")
      .text_query_add("one")
      .text_query_add("two")
      .text_query_add("three");

    expect(filter.text_query).toMatchObject(expected);
  });

  test("text_query_remove should remove the specified word from the query.text_area_keywords array", async () => {
    // const filter = new Catalog_Search_Filter();
    let expected = { keywords: ["zero", "two"] };
    filter
      .text_query_add("zero")
      .text_query_add("one")
      .text_query_add("two")
      .text_query_remove("one");

    expect(filter.text_query).toMatchObject(expected);
  });

  test("text_query_remove should throw an error if attempting to remove an element from an non-existent keywords array", async () => {
    expect(() => {
      filter.text_query_remove("one");
    }).toThrow();
  });

  test("text_query_remove should throw an error if attempting to remove an element from an empty keywords array", async () => {
    filter.text_query_add("a").text_query_remove("a");
    expect(() => {
      filter.text_query_remove("one");
    }).toThrow();
  });

  test("set object_types should throw if user attempts to add a value that already exists", () => {
    expect(() => {
      filter.make().object_type().category().item().item();
    }).toThrow();
  });
});

describe("Catalog_Search_Cross_Reference", () => {
  const Catalog_Search_Cross_Reference = require("../src/lib/catalog_request_search_objects_cross_reference");
  let xref;
  let id1 = "HXUTLPOIUE3FZGSK4NBZGMZD";
  let id2 = "RJREZRB5H4RVFUMXB3R5V73Z";
  beforeEach(() => {
    xref = new Catalog_Search_Cross_Reference();
  });

  test(" variations method correctly modifies body", () => {
    let expected = {
      cursor: undefined,
      include_related_objects: undefined,
      begin_time: undefined,
      object_types: undefined,
      query: undefined,
      item_variations_for_item_option_values_query: [],
    };
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
    xref.items();
    xref.taxes();
    expect(xref.body).toMatchObject(expected);
  });

  test("addId method adds ids", () => {
    let expected = [id1, id2];
    xref.addId(id1).addId(id2);
    expect(xref.ids).toMatchObject(expected);
  });

  test("clearIds clears the ids", () => {
    let expected = [];
    xref.addId(id1).addId(id2).clearIds();
    expect(xref.ids).toMatchObject(expected);
  });
});

describe("Catalog_Search_Items", () => {
  let search;
  beforeEach(() => {
    search = new Catalog_Search_Items();
  });

  test("sort_order should throw on wrong value", () => {
    expect(() => {
      search.sort_order = "ASCENDING";
    }).toThrow();
  });

  test("sort_order should not throw on correct value", () => {
    expect(() => {
      search.sort_order = "ASC";
    }).not.toThrow();
  });

  test("product_type should throw on wrong value", () => {
    expect(() => {
      search.product_types = "GIFT_CARD";
    }).toThrow();
  });

  test("product_type should not throw on correct value", () => {
    expect(() => {
      search.product_types = "REGULAR";
    }).not.toThrow();
  });

  test("product_type creates an array", () => {});

  test("stock_levels should throw on wrong value", () => {
    expect(() => {
      search.stock_levels = "UP";
    }).toThrow();
  });

  test("stock_levels should not throw on correct value", () => {
    expect(() => {
      search.stock_levels = "OUT";
    }).not.toThrow();
  });

  test.only("stock_levels should throw if given duplicate entries", () => {
    expect(() => {
      search.make().stock_levels().low().low();
    }).toThrow();
  });

  test("stock_levels creates an array", () => {
    search.stock_levels = "LOW";
    search.stock_levels.should.be.an("array");
  });

  test("category_ids creates an array", () => {
    search.category_ids = "some id";
    search.category_ids.should.be.an("array");
  });

  test("enabled_location_ids creates an array", () => {
    search.enabled_location_ids = "some id";
    search.enabled_location_ids.should.be.an("array");
  });

  test("custom_attribute_filters creates an array", () => {
    search.custom_attribute_filters = { a: 1 };
    search.custom_attribute_filters.should.be.an("array");
  });

  test("custom_attribute_filters should throw on attempt to add 11th element", () => {
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
    search.make().sort().up();
    expect(search.sort_order).toEqual("ASC");
  });
  test('sort().down() should set sort_order to "DESC"', () => {
    search.make().sort().down();
    expect(search.sort_order).toEqual("DESC");
  });
  test("make().text() should set text_filter", () => {
    search.make().text("words on a page");
    expect(search.text_filter).toEqual("words on a page");
  });
  test('regular() should set product_types to "REGULAR"', () => {
    search.make().product_types().regular();
    expect(search.product_types).toEqual("REGULAR");
  });
  test('appt() should set product_types to "APPOINTMENTS_SERVICE"', () => {
    search.make().product().appt();
    expect(search.product_types).toEqual("APPOINTMENTS_SERVICE");
  });
  test('stock_levels().low(); should set stock_levels to ["LOW"]', () => {
    let expected = ["LOW"];
    search.make().stock_levels().low();
    expect(search.stock_levels).toMatchObject(expected);
  });
  test('.stock().out() should set stock_levels to ["OUT"]', () => {
    let expected = ["OUT"];
    search.make().stock().out();
    expect(search.stock_levels).toMatchObject(expected);
  });
  test('.stock().any() should set stock_levels to ["LOW", "OUT"]', () => {
    let expected = ["LOW", "OUT"];
    search.make().stock().any();
    expect(search.stock_levels).toMatchObject(expected);
  });

  test("make().category() should add to the category_ids array", () => {
    let expected = ["id1", "id2", "id3"];
    search.make().category("id1").category("id2").category("id3");
    expect(search.category_ids).toMatchObject(expected);
  });
  test("make().location() should add to the enabled_location_ids array", () => {
    let expected = ["id1", "id2", "id3"];
    search.make().location("id1").location("id2").location("id3");
    expect(search.enabled_location_ids).toMatchObject(expected);
  });
  test("make().custom() should add to the custom_attribute_filters array", () => {
    let expected = [{ a: 1 }, { b: 2 }, { c: 3 }];
    search.make().custom({ a: 1 }).custom({ b: 2 }).custom({ c: 3 });
    expect(search.custom_attribute_filters).toMatchObject(expected);
  });
});

describe.only("Catalog_Search_Items make_custom_attribute_filter()", () => {
  let search;
  let make;
  beforeEach(() => {
    search = new Catalog_Search_Items();
    make = search.make_custom_attribute_filter();
  });

  test("#init_filter() should create base object", () => {
    let expected = {
      custom_attribute_definition_id: undefined,
      key: undefined,
      string_filter: undefined,
      number_filter: undefined,
      selection_uids_filter: [],
      bool_filter: undefined,
    };
    expect(search.attribute_filter).toMatchObject(expected);
  });

  test("make_custom_attribute_filter() should make a compliant object", () => {
    let id = "someid";
    let key = "someKey";
    let string_filter = "some text I want to find";
    let min = 1;
    let max = 5;

    let expected = {
      custom_attribute_definition_id: id,
      key: key,
      string_filter: string_filter,
      number_filter: { min, max },
      selection_uids_filter: [key, id],
      bool_filter: true,
    };

    make
      .custom_attribute_definition_id(id)
      .key(key)
      .string_filter(string_filter)
      .number_filter(min, max)
      .selection_uids_filter(key)
      .selection_uids_filter(id)
      .bool_filter(true);
    expect(search.attribute_filter).toMatchObject(expected);
  });

  test("make_custom_attribute_filter() error checking", () => {
    expect(() => {
      make.bool_filter(50);
    }).toThrow();
  });

  test("number_filter should correctly set min and max regardless of order", () => {
    let expected = {
      min: 5,
      max: 100,
    };
    make.number_filter(expected.max, expected.min);
    expect(search.attribute_filter.number_filter).toMatchObject(expected);
  });

  test("number_filter should set one number to zero when fed only one argument. ", () => {
    let expected = {
      min: 0,
      max: 100,
    };
    make.number_filter(expected.max);
    expect(search.attribute_filter.number_filter).toMatchObject(expected);
  });

  test("number_filter should set number to same when fed duplicates ", () => {
    let expected = {
      min: 100,
      max: 100,
    };
    make.number_filter(expected.min, expected.min);
    expect(search.attribute_filter.number_filter).toMatchObject(expected);
  });
});
