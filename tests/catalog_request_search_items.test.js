"use strict";
const should = require("chai").should();
const Catalog_Search_Items = require("../src/lib/catalog_request_search_items");
const { helper_arrays } = require("./helper_arrays");

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

  test("stock_levels should throw if given duplicate entries", () => {
    expect(() => {
      search.make().stock_levels().low().low();
    }).toThrow();
  });

  test("stock_levels should throw if given duplicate entries", () => {
    expect(() => {
      search.make().stock_levels().low().low();
    }).toThrow();
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

  test('sort_order() should curry over"', () => {
    search.make().sort().down().text("words on a page");
    expect(search.text_filter).toEqual("words on a page");
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

  test("stock_levels() should curry-over", () => {
    let expected = ["LOW"];
    search.make().stock_levels().low().text("words on a page");
    expect(search.text_filter).toEqual("words on a page");
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

  test("set category_array_concat(arr) should concat array", () => {
    let expected = helper_arrays.len_10;
    search.make().concat_categories(expected);
    expect(search.category_ids).toEqual(expected);
  });

  test("set enabled_location_array_concat(arr) should concat array", () => {
    let expected = helper_arrays.len_10;
    search.make().concat_enabled_locations(expected);
    expect(search.enabled_location_ids).toEqual(expected);
  });

  test("set custom_attribute_filter_array_concat(arr) should concat array", () => {
    let expected = helper_arrays.len_10;
    search.make().concat_custom_attribute_filters(expected);
    expect(search.custom_attribute_filters).toEqual(expected);
  });
});

/* --------------------------------------------------------*
 *                                                         *
 *                 make_custom_attribute_filter
 *                                                         *
 * ------------------------------------------------------- */

describe("Catalog_Search_Items make_custom_attribute_filter()", () => {
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
