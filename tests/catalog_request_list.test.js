"use strict";

const Catalog_List = require("../src/lib/catalog_request_list");

describe("Catalog_List basics", () => {
  let list;
  let class_name = "Catalog_List";
  let endpoint = "/list"; //copy and paste from Square docs
  let method = "GET"; //http method from Square docs
  beforeEach(function () {
    list = new Catalog_List();
  });

  test("should have display name", () => {
    expect(list._display_name).toBeDefined();
  });
  test("should have the method defined by Square set", () => {
    expect(list.method).toEqual(method);
  });
  test("display name should be same as class name", () => {
    expect(list.display_name).toEqual(class_name);
  });
  test("should have defined square version", () => {
    expect(list.square_version).toBeDefined();
  });
  test("should have defined _help", () => {
    expect(list.help).toBeDefined();
  });
  test("should have an endpoint", () => {
    expect(list.endpoint).toEqual(endpoint);
  });
  test("should have _delivery", () => {
    let expected = { a: 1 };
    list.delivery = { objects: expected };
    expect(list.delivery).toMatchObject(expected);
  });

  test("Delivery should trap errors ", () => {
    let expected = { a: 1 };
    list.delivery = { errors: [expected] };
    expect(list.delivery.errors[0]).toMatchObject(expected);
  });
});

/* --------------------------------------------------------*
 *                                                         *
 *                        query params
 *                                                         *
 * ------------------------------------------------------- */
describe("Catalog Request List query params", () => {
  let list;
  beforeEach(() => {
    list = new Catalog_List();
  });

  test("#enum_types should set types property", () => {
    let expected = "/list?types=TAX,MODIFIER_LIST,DISCOUNT";
    list.make().types().tax().modifier_list().discount();
    expect(list.endpoint).toEqual(expected);
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

  test("make().version() should set and replace version query param", () => {
    let expected = "/list?catalog_version=4";
    list.make().version(3).version(4);
    expect(list.endpoint).toEqual(expected);
  });

  test("make().item() should set item type in query param", () => {
    let expected = "/list?types=ITEM";
    list.make().item();
    expect(list.endpoint).toEqual(expected);
  });

  test("make().item_variation() should set type in query param", () => {
    let expected = "/list?types=ITEM_VARIATION";
    list.make().item_variation();
    expect(list.endpoint).toEqual(expected);
  });

  test("make().discount() should set type in query param", () => {
    let expected = "/list?types=DISCOUNT";
    list.make().discount();
    expect(list.endpoint).toEqual(expected);
  });

  test("make().modifier() should set type in query param", () => {
    let expected = "/list?types=MODIFIER";
    list.make().modifier();
    expect(list.endpoint).toEqual(expected);
  });

  test("make().modifier_list() should set type in query param", () => {
    let expected = "/list?types=MODIFIER_LIST";
    list.make().modifier_list();
    expect(list.endpoint).toEqual(expected);
  });

  test("make().image() should set type in query param", () => {
    let expected = "/list?types=IMAGE";
    list.make().image();
    expect(list.endpoint).toEqual(expected);
  });

  test("make() should work with both version and type", () => {
    let expected = "/list?catalog_version=3&types=TAX,CATEGORY";
    list.make().catalog_version(3).types().tax().category();
    expect(list.endpoint).toEqual(expected);
  });

  test("make().[value]() should set query params when all chained together", () => {
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

  test("make() should work with both version and type enums", () => {
    let expected = "/list?types=TAX,CATEGORY&catalog_version=3";
    list.make().tax().category().version(3);
    expect(list.endpoint).toEqual(expected);
  });

  test("should set cursor in query string", () => {
    let expected = "/list?types=TAX,CATEGORY&catalog_version=3&cursor=123";
    let parcel = { objects: [{ a: 1 }], cursor: "123" };
    list.make().tax().category().version(3);
    list.delivery = parcel;
    expect(list.endpoint).toEqual(expected);
  });
});
