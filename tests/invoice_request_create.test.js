"use strict";
const Invoice_Create = require("../src/lib/invoice_request_create");
const { long_strings } = require("./helper_objects");
const Invoice_Object = require("../src/lib/invoice_object");

/* --------------------------------------------------------*
 *                                                         *
 *                        Invoice_Create
 *                                                         *
 * ------------------------------------------------------- */
describe("Invoice_Create", () => {
  let create;
  let method = "POST"; //http method from Square docs
  beforeEach(function () {
    create = new Invoice_Create();
  });

  test("should have display name", () => {
    expect(create._display_name).toBeDefined();
  });
  test("should have defined square version", () => {
    expect(create.square_version).toBeDefined();
  });

  test("should have defined help", () => {
    expect(create.help).toBeDefined();
  });
  test("should have the method defined by Square", () => {
    expect(create.method).toEqual(method);
  });

  test("should have defined _body", () => {
    expect(create.body).toBeDefined();
  });
  test("should have defined _body.idempotency_key", () => {
    expect(create.body.idempotency_key).toBeDefined();
  });
  test("nanoid should generate a idempotency key less than the limit", () => {
    let pass = create.idempotency_key.length <= 128;
    expect(pass).toEqual(true);
  });

  test("Create should throw if order_id is not specified on the invoice", () => {
    let invoice = new Invoice_Object();
    invoice.location_id = "123";
    expect(() => {
      create.invoice = invoice.fardel;
    }).toThrow();
  });

  test("Create should NOT throw if order_id IS specified on the invoice", () => {
    let invoice = new Invoice_Object();
    invoice.location_id = "123";
    invoice.order_id = "ABC";
    expect(() => {
      create.invoice = invoice.fardel;
    }).not.toThrow();
  });

  test("idempotency should respect length 128", () => {
    expect(() => {
      create.idempotency_key = long_strings.len_129;
    }).toThrow();
  });
  test("make().idempotency_key() should set property", () => {
    create.make().idempotency_key(long_strings.len_128);
    expect(create.idempotency_key).toEqual(long_strings.len_128);
  });
  test("should have the endpoint required by Square", () => {
    expect(create.endpoint).toEqual("");
  });

  test("should set invoice property to invoice object", () => {
    let expected = {
      location_id: "123",
      order_id: "ABC",
    };
    let invoice = new Invoice_Object();
    invoice.location_id = "123";
    invoice.order_id = "ABC";
    create.invoice = invoice.fardel;
    expect(create.invoice).toMatchObject(expected);
  });

  test("make.invoice should set invoice to object passed", () => {
    let expected = {
      location_id: "123",
      order_id: "ABC",
    };
    let invoice = new Invoice_Object();
    invoice.location_id = "123";
    invoice.order_id = "ABC";
    create.make().invoice(invoice.fardel);
    expect(create.invoice).toMatchObject(expected);
  });
});
