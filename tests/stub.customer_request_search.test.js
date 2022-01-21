const Customer_Search = require("../src/lib/customer_request_search");

// const Customer_Object = require("../src/lib/customer_object");
// const { sampleCustomers } = require("./helper_objects");
// const customers = sampleCustomers;
// const buffy = customers.buffy;
// const mikey = customers.mikey;

/* --------------------------------------------------------*
 *                                                         *
 *                        Customer_Search
 *                                                         *
 * ------------------------------------------------------- */
describe("Customer_Search", () => {
  let search;
  let class_name = "Customer_Search";
  let endpoint = "/search"; //copy and paste from Square docs
  let method = "POST"; //http method from Square docs
  beforeEach(function () {
    search = new Customer_Search();
  });

  test("should have display name", () => {
    expect(search._display_name).toBeDefined();
  });
  test("should have the method defined by Square set", () => {
    expect(search.method).toEqual(method);
  });
  test("display name should be same as class name", () => {
    expect(search.display_name).toEqual(class_name);
  });
  test("should have defined square version", () => {
    expect(search.square_version).toBeDefined();
  });
  test("should have defined _help", () => {
    expect(search.help).toBeDefined();
  });
  test("should have an endpoint", () => {
    expect(search.endpoint).toEqual(endpoint);
  });
  test("should have _delivery", () => {
    search.delivery = { customers: [{ a: 1 }] };
    expect(search.delivery).toBeDefined();
  });

  // not every request class has these
  test("should have defined _body", () => {
    expect(search.body).toBeDefined();
  });
});
