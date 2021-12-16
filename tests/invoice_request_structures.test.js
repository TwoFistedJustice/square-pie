"use strict";
const Invoice_Create = require("../src/lib/invoice_request_create");
const { long_strings } = require("./helper_objects");

describe("silence test suite", () => {
  test("", () => {
    expect("").toEqual("");
  });
});

describe("Invoice_Create", () => {
  let create;
  beforeEach(function () {
    create = new Invoice_Create();
  });

  test("should have display name", () => {
    expect(create._display_name).toBeDefined();
  });
  test("should have defined square version", () => {
    expect(create.square_version).toBeDefined();
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

  test("should set invoice to object passed", () => {
    let expected = { a: 1 };
    create.invoice = expected;
    expect(create.invoice).toEqual(expected);
  });

  test("make.invoice should set invoice to object passed", () => {
    let expected = { a: 1 };
    create.make().invoice(expected);
    expect(create.invoice).toMatchObject(expected);
  });
});
