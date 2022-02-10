const util = require("../src/lib/utilities");
const spy_integer = jest.spyOn(util, "shazam_is_integer");
const Invoice_Cancel = require("../src/lib/invoice_request_cancel");

/* --------------------------------------------------------*
 *                                                         *
 *                        Invoice_Cancel
 *                                                         *
 * ------------------------------------------------------- */
describe("Invoice_Cancel", () => {
  let cancel;
  let class_name = "Invoice_Cancel";
  let id = "123";
  let endpoint = `/${id}/cancel`;
  let id2 = "ABC";
  let endpoint2 = `/${id2}/cancel`;
  let method = "POST"; //http method from Square docs
  beforeEach(function () {
    cancel = new Invoice_Cancel(id);
  });

  test("should have display name", () => {
    expect(cancel._display_name).toBeDefined();
  });

  test("should have the method defined by Square set", () => {
    expect(cancel.method).toEqual("POST");
  });

  test("display name should be same as class name", () => {
    expect(cancel._display_name).toEqual(class_name);
  });

  test("should have defined square version", () => {
    expect(cancel.square_version).toBeDefined();
  });
  test("should have the method defined by Square", () => {
    expect(cancel.method).toEqual(method);
  });
  test("should have defined _body", () => {
    expect(cancel.body).toBeDefined();
  });

  test("should have _delivery", () => {
    let expected = { a: 1 };
    cancel.delivery = { invoice: { a: 1 } };
    expect(cancel.delivery).toMatchObject(expected);
  });

  test("should have an endpoint", () => {
    expect(cancel.endpoint).toEqual(endpoint);
  });

  // Make()
  test("make().id() should set the endpoint property", () => {
    cancel.make().id(id2);
    expect(cancel.id).toEqual(endpoint2);
    expect(cancel.endpoint).toEqual(endpoint2);
  });

  test("make().version() should set version property", () => {
    let expected = 1;
    cancel.make().version(expected);
    expect(cancel.version).toEqual(expected);
  });

  test("setter should call shazam_is_integer", () => {
    let test_val = 95;
    let caller = "version";
    cancel[caller] = test_val;
    expect(spy_integer).toHaveBeenCalledWith(test_val, class_name, caller);
  });
});
