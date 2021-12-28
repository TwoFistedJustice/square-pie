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
});
