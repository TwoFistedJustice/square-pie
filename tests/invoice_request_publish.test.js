const util = require("../src/lib/utilities");
const spy_integer = jest.spyOn(util, "shazam_integer");

const Invoice_Publish = require("../src/lib/invoice_request_publish");

const { long_strings } = require("./helper_objects");
// const index = require ("../src/lib/utilities/index.js");

const class_name = "Invoice_Publish";
const id = "123";
let publish;
/* --------------------------------------------------------*
 *                                                         *
 *                        Invoice_Publish
 *                                                         *
 * ------------------------------------------------------- */

describe("Invoice_Publish", () => {
  let endpoint = `/${id}/publish`;
  let id2 = "ABC";
  let endpoint2 = `/${id2}/publish`;
  let method = "POST"; //http method from Square docs
  beforeEach(function () {
    publish = new Invoice_Publish(id);
  });

  test("should have defined _body.idempotency_key", () => {
    expect(publish.body.idempotency_key).toBeDefined();
  });

  test("nanoid should generate a idempotency key less than the limit", () => {
    let pass = publish.idempotency_key.length <= 128;
    expect(pass).toEqual(true);
  });

  test("idempotency should respect length 128", () => {
    expect(() => {
      publish.idempotency_key = long_strings.len_129;
    }).toThrow();
  });

  test("should have display name", () => {
    expect(publish._display_name).toBeDefined();
  });

  test("should have the method defined by Square set", () => {
    expect(publish.method).toEqual(method);
  });

  test("display name should be same as class name", () => {
    expect(publish._display_name).toEqual(class_name);
  });

  test("should have defined square version", () => {
    expect(publish.square_version).toBeDefined();
  });
  test("should have defined _body", () => {
    expect(publish.body).toBeDefined();
  });

  test("should have _delivery", () => {
    let expected = { a: 1 };
    publish.delivery = { invoice: { a: 1 } };
    expect(publish.delivery).toMatchObject(expected);
  });

  test("should have an endpoint", () => {
    expect(publish.endpoint).toEqual(endpoint);
  });

  // Make()
  test("make().id() should set the endpoint property", () => {
    publish.make().id(id2);
    expect(publish.id).toEqual(endpoint2);
    expect(publish.endpoint).toEqual(endpoint2);
  });

  test("make().version() should set version property", () => {
    let expected = 1;
    publish.make().version(expected);
    expect(publish.version).toEqual(expected);
  });
});

/* --------------------------------------------------------*
 *                                                         *
 *                        jest mocks
 *                                                         *
 * ------------------------------------------------------- */

describe("jest mocks", () => {
  beforeEach(function () {
    publish = new Invoice_Publish(id);
  });
  test("shazam_integer", () => {
    let test_val = 95;
    let caller = "version";
    publish.make()[caller](test_val);
    expect(spy_integer).toHaveBeenCalledWith(test_val, class_name, caller);
  });
});
