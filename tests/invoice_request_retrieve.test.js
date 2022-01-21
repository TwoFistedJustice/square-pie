const Invoice_Retrieve = require("../src/lib/invoice_request_retrieve");

/* --------------------------------------------------------*
 *                                                         *
 *                        Invoice_Retrieve
 *                                                         *
 * ------------------------------------------------------- */
describe("Invoice_Retrieve", () => {
  let retrieve;
  let id = "123";
  let class_name = "Invoice_Retrieve";
  beforeEach(function () {
    retrieve = new Invoice_Retrieve(id);
  });

  test("should have the method defined by Square set", () => {
    expect(retrieve.method).toEqual("GET");
  });

  test("display name should be same as class name", () => {
    expect(retrieve._display_name).toEqual(class_name);
  });
  test("should have defined square version", () => {
    expect(retrieve.square_version).toBeDefined();
  });

  test("should have _delivery", () => {
    let expected = { a: 1 };
    retrieve.delivery = { invoice: expected };
    expect(retrieve.delivery).toBeDefined();
    expect(retrieve.delivery).toMatchObject(expected);
  });

  test("should have an endpoint", () => {
    expect(retrieve.endpoint).toEqual(`/${id}`);
  });

  // Make()
  test("make().id() should set the endpoint property", () => {
    retrieve.make().id(id);
    expect(retrieve.endpoint).toEqual(`/${id}`);
  });
});
