const Customer_Create = require("../src/lib/customer_request_create");
const { sampleCustomers } = require("./helper_objects");
const customers = sampleCustomers;
const buffy = customers.buffy;
// const mikey = customers.mikey;

/* --------------------------------------------------------*
 *                                                         *
 *                        Customer_Create
 *                                                         *
 * ------------------------------------------------------- */
describe("Customer_Create", () => {
  let create;
  let class_name = "Customer_Create";
  let method = "POST"; //http method from Square docs
  beforeEach(function () {
    create = new Customer_Create(buffy);
  });

  test("should have display name", () => {
    expect(create._display_name).toBeDefined();
  });
  test("should have the method defined by Square set", () => {
    expect(create.method).toEqual(method);
  });
  test("display name should be same as class name", () => {
    expect(create.display_name).toEqual(class_name);
  });
  test("should have defined square version", () => {
    expect(create.square_version).toBeDefined();
  });
  test("should have defined _help", () => {
    expect(create.help).toBeDefined();
  });
  test("should have _delivery", () => {
    create.delivery = { customer: { a: 1 } };
    expect(create.delivery).toBeDefined();
  });

  // not every request class has these
  test("should have defined _body", () => {
    expect(create.body).toBeDefined();
  });
  test("should have defined _body.idempotency_key", () => {
    expect(create.body.idempotency_key).toBeDefined();
  });
  test("should have defined idempotency_key", () => {
    expect(create.idempotency_key).toBeDefined();
  });
});
