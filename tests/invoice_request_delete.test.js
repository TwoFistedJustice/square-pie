const Invoice_Delete = require("../src/lib/invoice_request_delete");

/* --------------------------------------------------------*
 *                                                         *
 *                        Invoice_Delete
 *                                                         *
 * ------------------------------------------------------- */

describe("Invoice_Delete", () => {
  let del;
  let class_name = "Invoice_Delete";
  let id = "123";
  let endpoint = `/${id}`;
  let method = "DELETE"; //http method from Square docs
  beforeEach(function () {
    del = new Invoice_Delete(id);
  });

  test("should have display name", () => {
    expect(del._display_name).toBeDefined();
  });

  test("display name should be same as class name", () => {
    expect(del.display_name).toEqual(class_name);
  });

  test("should have the method defined by Square set", () => {
    expect(del.method).toEqual(method);
  });

  test("display name should be same as class name", () => {
    expect(del._display_name).toEqual(class_name);
  });

  test("should have defined square version", () => {
    expect(del.square_version).toBeDefined();
  });

  test("should have defined _help", () => {
    expect(del.help).toBeDefined();
  });

  test("should have its own separate .delivery that doesn't pick a property", () => {
    let parcel = { a: 1 };
    del.delivery = parcel;
    expect(del.delivery).toMatchObject(parcel);
  });

  test("should have an endpoint", () => {
    expect(del.endpoint).toEqual(endpoint);
  });

  // Make()
  test("make().version() should set the query parameter", () => {
    let expected = `/${id}?version=3`;
    del.make().version(3);
    expect(del.endpoint).toEqual(expected);
  });

  test("make().version() should replace the query parameter", () => {
    let expected = `/${id}?version=3`;
    del.make().version(2).version(3);
    expect(del.endpoint).toEqual(expected);
  });
});
