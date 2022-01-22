const Customer_Retrieve = require("../src/lib/customer_request_retrieve");

// const Customer_Object = require("../src/lib/customer_object");
// const { sampleCustomers } = require("./helper_objects");
// const customers = sampleCustomers;
// const buffy = customers.buffy;
// const mikey = customers.mikey;

/* --------------------------------------------------------*
 *                                                         *
 *                        Customer_Retrieve
 *                                                         *
 * ------------------------------------------------------- */
describe("Customer_Retrieve", () => {
  let retrieve;
  let class_name = "Customer_Retrieve";
  let endpoint = "/123"; //copy and paste from Square docs
  let method = "GET"; //http method from Square docs
  let id = "123";
  beforeEach(function () {
    retrieve = new Customer_Retrieve(id);
  });

  test("should have display name", () => {
    expect(retrieve._display_name).toBeDefined();
  });
  test("should have the method defined by Square set", () => {
    expect(retrieve.method).toEqual(method);
  });
  test("display name should be same as class name", () => {
    expect(retrieve.display_name).toEqual(class_name);
  });
  test("should have defined square version", () => {
    expect(retrieve.square_version).toBeDefined();
  });
  test("should have defined _help", () => {
    expect(retrieve.help).toBeDefined();
  });
  test("should have an endpoint", () => {
    expect(retrieve.endpoint).toEqual(endpoint);
  });
  test("should have _delivery", () => {
    retrieve.delivery = { customer: { a: 1 } };
    expect(retrieve.delivery).toBeDefined();
  });
});
