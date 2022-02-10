"use strict";
const util = require("../src/lib/utilities");
const spy_shazam_integer = jest.spyOn(util, "shazam_is_integer");

const Catalog_Search_Objects_Super = require("../src/lib/catalog_request_abstract_search_objects_super");
const { dateCodes } = require("./helper_objects");
let supes;
const id = "123";
const class_name = "Catalog_Search_Objects_Super";
const method = "POST"; //http method from Square docs
let endpoint = "/search"; //copy and paste from Square docs
/* --------------------------------------------------------*
 *                                                         *
 *                        common structures
 *                                                         *
 * ------------------------------------------------------- */
describe(`${class_name} basic request class structures`, () => {
  beforeEach(function () {
    supes = new Catalog_Search_Objects_Super();
  });
  test("should have display name", () => {
    expect(supes._display_name).toBeDefined();
  });
  test("should have the method defined by Square set", () => {
    expect(supes.method).toEqual(method);
  });
  test("display name should be same as class name", () => {
    expect(supes.display_name).toEqual(class_name);
  });
  test("should have defined square version", () => {
    expect(supes.square_version).toBeDefined();
  });
  test("should have defined _help", () => {
    expect(supes.help).toBeDefined();
  });
  test("should have an endpoint", () => {
    expect(supes.endpoint).toEqual(endpoint);
  });

  // not every request class has these
  test("should have defined _body", () => {
    expect(supes.body).toBeDefined();
  });

  test("should have query", () => {
    expect(supes.query).toMatchObject({});
  });

  test("query_reset() should restore empty object", () => {
    supes.query.a = 1;
    supes.query_reset();
    expect(supes.query).toMatchObject({});
  });

  test("should have query", () => {
    supes.query_remove();
    expect(supes.query).not.toBeDefined();
  });
});

/* --------------------------------------------------------*
 *                                                         *
 *                        Error Checks
 *                                                         *
 * ------------------------------------------------------- */
describe(`${class_name} error checks`, () => {
  beforeEach(() => {
    supes = new Catalog_Search_Objects_Super();
  });
  test("setter should call shazam_is_integer", () => {
    let klass = supes;
    let test_val = 95;
    let caller = "limit";
    klass[caller] = test_val;
    expect(spy_shazam_integer).toHaveBeenCalledWith(
      test_val,
      class_name,
      caller
    );
  });

  test("object_types should prevent duplicates", () => {
    let expected = 'array already contains "ITEM"';
    supes.object_types = "ITEM";
    expect(() => {
      supes.object_types = "ITEM";
    }).toThrowError(expected);
  });
});

/* --------------------------------------------------------*
 *                                                         *
 *                        getters/setters
 *                                                         *
 * ------------------------------------------------------- */

describe(`${class_name} getters/setters`, () => {
  beforeEach(() => {
    supes = new Catalog_Search_Objects_Super();
  });
  test("cursor should set ", () => {
    let expected = id;
    supes.cursor = expected;
    expect(supes.cursor).toEqual(expected);
  });
  test("include_related_objects should set ", () => {
    let expected = true;
    supes.include_related_objects = expected;
    expect(supes.include_related_objects).toEqual(expected);
  });
  test("begin_time should set ", () => {
    let expected = dateCodes.RFC3339;
    supes.begin_time = expected;
    expect(supes.begin_time).toEqual(expected);
  });
  test("object_types should set ", () => {
    let expected = ["ITEM"];
    supes.object_types = "ITEM";
    expect(supes.object_types).toMatchObject(expected);
  });
  test("limit should set ", () => {
    let expected = 4;
    supes.limit = expected;
    expect(supes.limit).toEqual(expected);
  });
});
