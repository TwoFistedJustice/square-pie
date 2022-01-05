"use strict";

const Catalog_List = require("../src/lib/catalog_request_list");

// tack on .only to this empty test to silence all other tests
describe.only("silence test suite", () => {
  test("", () => {
    expect("a").toEqual("a");
  });
});

describe("Catalog Request List", () => {
  let list;
  beforeEach(() => {
    list = new Catalog_List();
  });

  test("#enum_types should set types property", () => {
    let expected = "TAX,MODIFIER_LIST,DISCOUNT";
    list.make().types().tax().modifier_list().discount();
    expect(list.types).toEqual(expected);
  });

  test("default endpoint should be returned in absence of query_params", () => {
    let expected = "/list";
    expect(list.endpoint).toEqual(expected);
  });

  test("endpoint should be tailored to presence of query_params.types", () => {
    let expected = "/list?types=ITEM,CATEGORY";
    list.make().types().item().category();
    expect(list.endpoint).toEqual(expected);
  });

  test("endpoint should be tailored to presence of query_params.types and query_params.catalog_version", () => {
    let expected = "/list?types=ITEM,CATEGORY&catalog_version=42";
    list.make().types().item().category();
    list.make().catalog_version(42);
    expect(list.endpoint).toEqual(expected);
  });

  test("endpoint should be tailored to presence of query_params.catalog_version", () => {
    let expected = "/list?catalog_version=42";
    list.make().catalog_version(42);
    expect(list.endpoint).toEqual(expected);
  });

  test("make().version() should set version query param", () => {
    let expected = "/list?catalog_version=3";
    list.make().version(3);
    expect(list.endpoint).toEqual(expected);
  });

  test("make() should work with both version and type", () => {
    let expected = "/list?catalog_version=3&types=TAX,CATEGORY";
    list.make().catalog_version(3).types().tax().category();
    expect(list.endpoint).toEqual(expected);
  });

  test("make().[value]() should set type enums", () => {
    let expected =
      "/list?types=ITEM,ITEM_VARIATION,CATEGORY,DISCOUNT,TAX,MODIFIER,MODIFIER_LIST,IMAGE";
    list
      .make()
      .types()
      .item()
      .item_variation()
      .category()
      .discount()
      .tax()
      .modifier()
      .modifier_list()
      .image();
    expect(list.endpoint).toEqual(expected);
  });

  test.only("make() should work with both version and type enums", () => {
    let expected = "/list?types=TAX,CATEGORY&catalog_version=3";
    list.make().tax().category().version(3);
    expect(list.endpoint).notw.toEqual(expected);
  });
});
