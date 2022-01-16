const Customer_Delete = require("../src/lib/customer_request_delete");

describe("Silence test suite", () => {
  test("", () => {
    expect("a").toEqual("a");
  });
});

/* --------------------------------------------------------*
 *                                                         *
 *                        Customer_Delete
 *                                                         *
 * ------------------------------------------------------- */

// todo test query param version as second argument
// todo test query param version as make()

describe("Customer_Delete", () => {
  let del;
  let class_name = "Customer_Delete";
  let endpoint = "/123?version=5"; //copy and paste from Square docs
  let method = "DELETE"; //http method from Square docs
  beforeEach(function () {
    del = new Customer_Delete("123", 5);
  });

  test("should have display name", () => {
    expect(del._display_name).toBeDefined();
  });
  test("should have the method defined by Square set", () => {
    expect(del.method).toEqual(method);
  });
  test("display name should be same as class name", () => {
    expect(del.display_name).toEqual(class_name);
  });
  test("should have defined square version", () => {
    expect(del.square_version).toBeDefined();
  });
  test("should have defined _help", () => {
    expect(del.help).toBeDefined();
  });
  test("should have _delivery", () => {
    del.delivery = {};
    expect(del.delivery).toBeDefined();
  });
  test("should have an endpoint", () => {
    expect(del.endpoint).toEqual(endpoint);
  });
  // MAKE

  test("make().version() should create query param when none is provided to constructor", () => {
    let del_icious = new Customer_Delete("ABC");
    let expected = "/ABC?version=6";
    del_icious.make().version(6);
    expect(del_icious.endpoint).toEqual(expected);
  });

  test("make().version() should replace query param when one is provided to constructor", () => {
    let expected = "/123?version=19";
    del.make().version(19);
    expect(del.endpoint).toEqual(expected);
  });
});
