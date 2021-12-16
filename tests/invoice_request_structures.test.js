"use strict";
const Invoice_Create = require("../src/lib/invoice_request_create");
const Invoice_Retrieve = require("../src/lib/stub.invoice_request_retrieve");
const Invoice_Delete = require("../src/lib/stub.invoice_request_delete");

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

describe("Invoice_Delete", () => {
  let del;
  let class_name = "Invoice_Delete";
  let id = "123";
  let endpoint = `/${id}`;
  let id2 = "ABC";
  let endpoint2 = `/${id2}`;
  beforeEach(function () {
    del = new Invoice_Delete(id);
  });

  test("should have display name", () => {
    expect(del._display_name).toBeDefined();
  });

  test("should have the method defined by Square set", () => {
    expect(del.method).toEqual("DELETE");
  });

  test("display name should be same as class name", () => {
    expect(del._display_name).toEqual(class_name);
  });

  test("should have defined square version", () => {
    expect(del.square_version).toBeDefined();
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
  test("make().id() should set the property", () => {
    del.make().id(id2);
    expect(del.id).toEqual(endpoint2);
  });
});
