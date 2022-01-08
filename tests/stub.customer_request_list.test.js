const Customer_List = require("../src/lib/customer_request_list");

describe("Silence test suite", () => {
  test("", () => {
    expect("a").toEqual("a");
  });
});
/* --------------------------------------------------------*
 *                                                         *
 *                        Customer_List
 *                                                         *
 * ------------------------------------------------------- */
describe("Customer_List", () => {
  let list;
  let class_name = "Customer_List";
  let endpoint = ""; //copy and paste from Square docs
  let method = "get"; //http method from Square docs
  beforeEach(function () {
    list = new Customer_List();
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

  test("should have _delivery", () => {
    list.delivery = { someProp: { a: 1 } };
    expect(list.delivery).toBeDefined();
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

describe.only("customer list query params", () => {
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

  test("limit", () => {
    let expected = "?limit=5";
    make.limit(5);
    expect(list.endpoint).toEqual(expected);
  });

  test("sort_field", () => {
    let expected = "?sort_field=CREATED_AT";
    make.sort_field().created_at();
    expect(list.endpoint).toEqual(expected);
  });

  test("sort_field", () => {
    let expected = "?sort_field=DEFAULT";
    make.sort_field().default();
    expect(list.endpoint).toEqual(expected);
  });

  test("sort_order", () => {
    let expected = "?sort_order=ASC";
    make.sort_order().asc();
    expect(list.endpoint).toEqual(expected);
  });

  test("sort_order", () => {
    let expected = "?sort_order=DESC";
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
