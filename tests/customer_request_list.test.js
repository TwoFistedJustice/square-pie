const Customer_List = require("../src/lib/customer_request_list");

/* --------------------------------------------------------*
 *                                                         *
 *                        Customer_List
 *                                                         *
 * ------------------------------------------------------- */
describe("Customer_List", () => {
  let list;
  let class_name = "Customer_List";
  let endpoint = ""; //copy and paste from Square docs
  let method = "GET"; //http method from Square docs
  beforeEach(function () {
    list = new Customer_List();
  });

  test("should have the method defined by Square set", () => {
    expect(list.method).toEqual(method);
  });

  test("should have display_name", () => {
    expect(list.display_name).toBeDefined();
  });

  test("should have _display_name", () => {
    expect(list._display_name).toBeDefined();
  });

  test("display name should be same as class name", () => {
    expect(list._display_name).toEqual(class_name);
  });
  test("display name should be same as class name", () => {
    expect(list.display_name).toEqual(class_name);
  });
  test("should have defined square version", () => {
    expect(list._last_verified_square_api_version).toBeDefined();
  });
  test("should have defined square version", () => {
    expect(list.square_version).toBeDefined();
  });

  test("should have defined _help", () => {
    expect(list._help).toBeDefined();
  });
  test("should have defined _help", () => {
    expect(list.help).toBeDefined();
  });

  test("should have _delivery", () => {
    list.delivery = { customers: { a: 1 } };
    expect(list.delivery).toBeDefined();
  });

  test("Delivery should trap return values", () => {
    let expected = { a: 1 };
    list.delivery = { customers: expected };
    expect(list.delivery).toMatchObject(expected);
  });

  test("Delivery should trap errors ", () => {
    let expected = { a: 1 };
    list.delivery = { errors: [expected] };
    expect(list.delivery.errors[0]).toMatchObject(expected);
  });

  test("should have an endpoint", () => {
    expect(list.endpoint).toEqual(endpoint);
  });
});

/* --------------------------------------------------------*
 *                                                         *
 *                        query params
 *                                                         *
 * ------------------------------------------------------- */

describe("customer list query params", () => {
  let list, make;

  beforeEach(function () {
    list = new Customer_List();
    make = list.make();
  });

  test("cursor", () => {
    let expected = "?cursor=123";
    let response = {
      customers: [],
      cursor: "123",
    };
    list.delivery = response;
    expect(list.endpoint).toEqual(expected);
  });

  test("limit  should set value", () => {
    let expected = "?limit=5";
    make.limit(5);
    expect(list.endpoint).toEqual(expected);
  });

  test("limit  should replace value", () => {
    let expected = "?limit=5";
    make.limit(4);
    make.limit(5);
    expect(list.endpoint).toEqual(expected);
  });

  test("sort_field should set value", () => {
    let expected = "?sort_field=CREATED_AT";
    make.sort_field().created_at();
    expect(list.endpoint).toEqual(expected);
  });

  test("sort_field should set value to default", () => {
    let expected = "?sort_field=DEFAULT";
    make.sort_field().default();
    expect(list.endpoint).toEqual(expected);
  });

  test("sort_field should replace value", () => {
    let expected = "?sort_field=CREATED_AT";
    make.sort_field().default();
    make.sort_field().created_at();
    expect(list.endpoint).toEqual(expected);
  });

  test("sort_order should set ASC", () => {
    let expected = "?sort_order=ASC";
    make.sort_order().asc();
    expect(list.endpoint).toEqual(expected);
  });

  test("sort_order should set DESC", () => {
    let expected = "?sort_order=DESC";
    make.sort_order().desc();
    expect(list.endpoint).toEqual(expected);
  });

  test("sort_order should replace value", () => {
    let expected = "?sort_order=DESC";
    make.sort_order().asc();
    make.sort_order().desc();
    expect(list.endpoint).toEqual(expected);
  });

  test("combined", () => {
    let expected = "?limit=3&sort_order=DESC&sort_field=DEFAULT&cursor=123";
    let response = {
      customers: [],
      cursor: "123",
    };
    make.limit(3).sort_order().desc();
    make.sort_field().default();
    list.delivery = response;
    expect(list.endpoint).toEqual(expected);
  });
});
