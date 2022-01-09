const Customer_Update = require("../src/lib/customer_request_update");

// const Customer_Object = require("../src/lib/customer_object");
// const { sampleCustomers } = require("./helper_objects");
// const customers = sampleCustomers;
// const buffy = customers.buffy;
// const mikey = customers.mikey;

describe("Silence test suite", () => {
  test("", () => {
    expect("a").toEqual("a");
  });
});

/* --------------------------------------------------------*
 *                                                         *
 *                        Customer_Update
 *                                                         *
 * ------------------------------------------------------- */

describe("Customer_Update", () => {
  let myVar;
  let arg = "123";
  let class_name = "Customer_Update";
  let endpoint = `/${arg}`;
  let method = "PUT"; //http method from Square docs
  beforeEach(function () {
    myVar = new Customer_Update(arg);
  });

  test("should have display name", () => {
    expect(myVar._display_name).toBeDefined();
  });
  test("should have the method defined by Square set", () => {
    expect(myVar.method).toEqual(method);
  });
  test("display name should be same as class name", () => {
    expect(myVar.display_name).toEqual(class_name);
  });
  test("should have defined square version", () => {
    expect(myVar.square_version).toBeDefined();
  });
  test("should have defined _help", () => {
    expect(myVar.help).toBeDefined();
  });
  test("should have an endpoint", () => {
    expect(myVar.endpoint).toEqual(endpoint);
  });
  test("should have _delivery", () => {
    myVar.delivery = { customer: { a: 1 } };
    expect(myVar.delivery).toBeDefined();
  });

  // not every request class has these
  test("should have defined _body", () => {
    expect(myVar.body).toBeDefined();
  });
  // test ("should have defined _body.idempotency_key", () => {
  //   expect (myVar.body.idempotency_key).toBeDefined ();
  // });
  // test ("nanoid should generate a idempotency key less than the limit", () => {
  //   let pass = myVar.idempotency_key.length <= 128;
  //   expect (pass).toEqual (true);
  // });
  // test ("idempotency should respect length 192", () => {
  //   expect (() => {
  //     myVar.idempotency_key = long_strings.len_193;
  //   }).toThrow ();
  // });
});
