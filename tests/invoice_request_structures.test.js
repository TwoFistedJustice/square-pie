"use strict";
const Invoice_Create = require("../src/lib/invoice_request_create");
const Invoice_Retrieve = require("../src/lib/invoice_request_retrieve");
const Invoice_Delete = require("../src/lib/invoice_request_delete");
const Invoice_Cancel = require("../src/lib/invoice_request_cancel");
const Invoice_Publish = require("../src/lib/invoice_request_publish");
const Invoice_List = require("../src/lib/invoice_request_list");
const Invoice_Search = require("../src/lib/invoice_request_search");
const Invoice_Update = require("../src/lib/stub.invoice_request_update");

const Invoice_Object = require("../src/lib/stub.invoice_object");

const { long_strings, helper_invoice } = require("./helper_objects");

describe("silence test suite", () => {
  test("", () => {
    expect("").toEqual("");
  });
});

/* --------------------------------------------------------*
 *                                                         *
 *                        Invoice_Create
 *                                                         *
 * ------------------------------------------------------- */
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

  test("should have defined help", () => {
    expect(create.help).toBeDefined();
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
      accepted_payment_methods: {
        bank_account: false,
        card: true,
        square_gift_card: false,
      },
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
      accepted_payment_methods: {
        bank_account: false,
        card: true,
        square_gift_card: false,
      },
    };
    let invoice = new Invoice_Object();
    invoice.location_id = "123";
    invoice.order_id = "ABC";
    create.make().invoice(invoice.fardel);
    expect(create.invoice).toMatchObject(expected);
  });
});

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
  // version should throw if not an int

  test("version should throw if not an int", () => {
    expect(() => {
      cancel.version = 95.5;
    }).toThrow();
  });
});

/* --------------------------------------------------------*
 *                                                         *
 *                        Invoice_Publish
 *                                                         *
 * ------------------------------------------------------- */

describe("Invoice_Publish", () => {
  let publish;
  let class_name = "Invoice_Publish";
  let id = "123";
  let endpoint = `/${id}/publish`;
  let id2 = "ABC";
  let endpoint2 = `/${id2}/publish`;
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
    expect(publish.method).toEqual("POST");
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
  // version should throw if not an int

  test("version should throw if not an int", () => {
    expect(() => {
      publish.version = 95.5;
    }).toThrow();
  });
});

/* --------------------------------------------------------*
 *                                                         *
 *                        Invoice_List
 *                                                         *
 * ------------------------------------------------------- */

describe("Invoice_List", () => {
  let list;
  let class_name = "Invoice_List";
  let location_id = "123";
  let other_id = "ABC";
  beforeEach(function () {
    list = new Invoice_List(location_id);
  });

  test("should have display name", () => {
    expect(list._display_name).toBeDefined();
  });

  test("should have the method defined by Square set", () => {
    expect(list.method).toEqual("GET");
  });

  test("display name should be same as class name", () => {
    expect(list._display_name).toEqual(class_name);
  });

  test("should have defined square version", () => {
    expect(list.square_version).toBeDefined();
  });

  // endpoint query parameteres
  test("should set the endpoint", () => {
    expect(list.endpoint).toEqual(`?location_id=${location_id}`);
  });

  test("should throw if location_id is undefined", () => {
    let tosser = new Invoice_List();
    expect(() => {
      tosser.endpoint;
    }).toThrow();
  });

  test("should create new endpoint with new id", () => {
    let newbie = new Invoice_List(other_id);
    let expected = "?location_id=ABC";
    expect(newbie.endpoint).toEqual(expected);
  });

  test("should add limit to endpoint", () => {
    let limit = 50;
    let expected = `?location_id=123&limit=${limit}`;
    list.make().limit(limit);
    expect(list.endpoint).toEqual(expected);
  });

  test("should add cursor to endpoint", () => {
    let cursor = other_id;
    let expected = `?location_id=123&cursor=${cursor}`;
    let parcel = {
      invoices: [{ a: 1 }],
      cursor: cursor,
    };
    list.delivery = parcel;
    expect(list.endpoint).toEqual(expected);
  });

  test("should add new location_Id, cursor, and limit", () => {
    let newbie = new Invoice_List(other_id);
    let limit = 50;
    let cursor = location_id;
    let parcel = {
      invoices: [{ a: 1 }],
      cursor: cursor,
    };
    let expected = `?location_id=${other_id}&limit=${limit}&cursor=${location_id}`;
    newbie.make().limit(limit);
    newbie.delivery = parcel;
    expect(newbie.endpoint).toEqual(expected);
  });

  // delivery
  test("should have _delivery as an array with one member", () => {
    let expected = [{ a: 1 }];
    list.delivery = { invoices: { a: 1 } };
    expect(list.delivery).toEqual(expect.arrayContaining(expected));
  });

  test("Cursor should be set automatically if it's in the response", () => {
    let cursor = "123";
    let parcel = {
      invoices: { a: 1 },
      cursor: cursor,
    };
    list.delivery = parcel;
    expect(list.cursor).toEqual(cursor);
  });

  // limit
  test("limit should throw on a non-integer", () => {
    expect(() => {
      list.limit = 95.5;
    }).toThrow();
  });

  test("limit should throw if it exceeds limit", () => {
    expect(() => {
      list.limit = 201;
    }).toThrow();
  });

  test("limit should not throw if it deceeds limit", () => {
    expect(() => {
      list.limit = 199;
    }).not.toThrow();
  });

  // Make()

  test("make().location_id() should set PRIMARY property", () => {
    list.make().location_id(other_id);
    expect(list.location_id).toEqual(other_id);
  });

  test("make().limit() should set limit property", () => {
    let val = 50;
    list.make().limit(val);
    expect(list.limit).toEqual(val);
  });
});

/* --------------------------------------------------------*
 *                                                         *
 *                        Invoice_Search
 *                                                         *
 * ------------------------------------------------------- */

describe("Invoice_Search", () => {
  let search;
  let id = "123";
  let other_id = "ABC";
  let class_name = "Invoice_Search";
  beforeEach(function () {
    search = new Invoice_Search();
  });

  // basic structure

  test("should have display name", () => {
    expect(search._display_name).toBeDefined();
  });

  test("should have help", () => {
    expect(search.help).toBeDefined();
  });

  test("should have the method defined by Square set", () => {
    expect(search.method).toEqual("POST");
  });

  test("display name should be same as class name", () => {
    expect(search._display_name).toEqual(class_name);
  });

  test("should have defined square version", () => {
    expect(search.square_version).toBeDefined();
  });
  test("should have an endpoint", () => {
    expect(search.endpoint).toEqual("/search");
  });
  test("should have defined _body", () => {
    expect(search.body).toBeDefined();
  });

  // delivery
  test("should have _delivery as an array with one member", () => {
    let expected = [{ a: 1 }];
    search.delivery = { invoices: { a: 1 } };
    expect(search.delivery).toEqual(expect.arrayContaining(expected));
  });

  test("Cursor should be set automatically if it's in the response", () => {
    let cursor = "123";
    let parcel = {
      invoices: { a: 1 },
      cursor: cursor,
    };
    search.delivery = parcel;
    expect(search.cursor).toEqual(cursor);
  });

  // limit
  test("limit should throw on a non-integer", () => {
    expect(() => {
      search.limit = 95.5;
    }).toThrow();
  });

  test("limit should throw if it exceeds limit", () => {
    expect(() => {
      search.limit = 201;
    }).toThrow();
  });

  test("limit should not throw if it deceeds limit", () => {
    expect(() => {
      search.limit = 199;
    }).not.toThrow();
  });

  // Make()

  test("make().query() should set PRIMARY property", () => {
    let expected = { a: 1 };
    search.make().query(expected);
    expect(search.query).toMatchObject(expected);
  });

  test("make().limit() should set limit property", () => {
    let val = 50;
    search.make().limit(val);
    expect(search.limit).toEqual(val);
  });

  // Query

  test("should push constructor arg to location_ids array", () => {
    let soych = new Invoice_Search(id);
    let expected = [id];
    expect(soych.location_ids).toEqual(expect.arrayContaining(expected));
  });

  test("should set  location_ids to undefined when not constructor argument is given", () => {
    expect(search.location_ids).toEqual([]);
  });

  test("make().location_id should push to location_ids array", () => {
    search.make().location_id(id).location_id(other_id);
    let expected = [id, other_id];
    expect(search.location_ids).toEqual(expect.arrayContaining(expected));
  });

  test("make().customer_id should push to customer_ids array", () => {
    search.make().customer_id(id).customer_id(other_id);
    let expected = [id, other_id];
    expect(search.customer_ids).toEqual(expect.arrayContaining(expected));
  });

  test("build_query().location_id should push to location_ids array", () => {
    search.build_query().location_id(id).location_id(other_id);
    let expected = [id, other_id];
    expect(search.location_ids).toEqual(expect.arrayContaining(expected));
  });

  test("build_query().customer_id should push to customer_ids array", () => {
    search.build_query().customer_id(id).customer_id(other_id);
    let expected = [id, other_id];
    expect(search.customer_ids).toEqual(expect.arrayContaining(expected));
  });

  // query sort

  test("should have default query sort value", () => {
    let sort = {
      field: "INVOICE_SORT_DATE",
      order: "ASC",
    };
    expect(search.sort).toMatchObject(sort);
  });

  test("make().sort().descending() should set sort order", () => {
    let sort = {
      field: "INVOICE_SORT_DATE",
      order: "DESC",
    };
    search.make().sort().descending();
    expect(search.sort).toMatchObject(sort);
  });

  test("make().sort().down() should set sort order", () => {
    let sort = {
      field: "INVOICE_SORT_DATE",
      order: "DESC",
    };
    search.make().sort().down();
    expect(search.sort).toMatchObject(sort);
  });

  test("make().sort().newest_first() should set sort order", () => {
    let sort = {
      field: "INVOICE_SORT_DATE",
      order: "DESC",
    };
    search.make().sort().newest_first();
    expect(search.sort).toMatchObject(sort);
  });

  test("build_query().sort().ascending() should set sort order - check one method", () => {
    let sort = {
      field: "INVOICE_SORT_DATE",
      order: "ASC",
    };
    search.make().sort().descending();
    search.build_query().sort().ascending();
    expect(search.sort).toMatchObject(sort);
  });

  test("make().sort().up() should set sort order", () => {
    let sort = {
      field: "INVOICE_SORT_DATE",
      order: "ASC",
    };
    search.make().sort().descending();
    search.make().sort().up();
    expect(search.sort).toMatchObject(sort);
  });

  test("make().sort().oldest_first() should set sort order", () => {
    let sort = {
      field: "INVOICE_SORT_DATE",
      order: "ASC",
    };
    search.make().sort().descending();
    search.make().sort().oldest_first();
    expect(search.sort).toMatchObject(sort);
  });

  // filter array - add whole arrays
  test("should be able to add an array of ids to an existing location_ids array using make()", () => {
    let id_array = ["doreymefaso", "latte"];
    let expected = [id, other_id, "doreymefaso", "latte"];
    search.make().location_id(id).location_id(other_id);
    search.make().add_location_ids_array(id_array);
    expect(search.location_ids).toEqual(expected);
  });

  test("should be able to add an array of ids to an existing location_ids array using build_query()", () => {
    let id_array = ["doreymefaso", "latte"];
    let expected = [id, other_id, "doreymefaso", "latte"];
    search.make().location_id(id).location_id(other_id);
    search.build_query().add_location_ids_array(id_array);
    expect(search.location_ids).toEqual(expected);
  });

  test("should be able to add an array of ids to an existing customer_ids array using make()", () => {
    let id_array = ["doreymefaso", "latte"];
    let expected = [id, other_id, "doreymefaso", "latte"];
    search.make().customer_id(id).customer_id(other_id);
    search.make().add_customer_ids_array(id_array);
    expect(search.customer_ids).toEqual(expected);
  });

  test("should be able to add an array of ids to an existing location_ids array using build_query()", () => {
    let id_array = ["doreymefaso", "latte"];
    let expected = [id, other_id, "doreymefaso", "latte"];
    search.make().customer_id(id).customer_id(other_id);
    search.build_query().add_customer_ids_array(id_array);
    expect(search.customer_ids).toEqual(expected);
  });
});

/* --------------------------------------------------------*
 *                                                         *
 *                Invoice_Update
 *                                                         *
 * ------------------------------------------------------- */
describe("Invoice_Update", () => {
  let update, pie_invoice_object, square_invoice;
  let class_name = "Invoice_Update";
  beforeEach(function () {
    // clone the helper invoice to a new object
    square_invoice = Object.assign({}, helper_invoice);

    update = new Invoice_Update(square_invoice);
    pie_invoice_object = new Invoice_Object();
    pie_invoice_object.version = square_invoice.version;
    pie_invoice_object.title = "fahrfigWHAT?";
  });

  // basic structure

  test("should have display name", () => {
    expect(update._display_name).toBeDefined();
  });

  test("should have the method defined by Square set", () => {
    expect(update.method).toEqual("PUT");
  });

  test("display name should be same as class name", () => {
    expect(update._display_name).toEqual(class_name);
  });

  test("should have defined square version", () => {
    expect(update.square_version).toBeDefined();
  });
  test("should have defined _body", () => {
    expect(update.body).toBeDefined();
  });

  test("should have defined _body.idempotency_key", () => {
    expect(update.body.idempotency_key).toBeDefined();
  });

  test("nanoid should generate a idempotency key less than the limit", () => {
    let pass = update.idempotency_key.length <= 128;
    expect(pass).toEqual(true);
  });

  test("idempotency should respect length 128", () => {
    expect(() => {
      update.idempotency_key = long_strings.len_129;
    }).toThrow();
  });

  test("should have an endpoint", () => {
    expect(update.endpoint).toEqual(`/${square_invoice.id}`);
  });

  // Make()

  test("make().idempotency_key() should set the property", () => {
    update.make().idempotency_key("123");
    expect(update.idempotency_key).toEqual("123");
  });

  test("make().invoice() should set PRIMARY property", () => {
    let expected = pie_invoice_object;
    update.make().invoice(expected);
    expect(update.invoice).toMatchObject(expected);
  });

  test("make().fields_to_clear should add to array", () => {
    let expected = ["title"];
    update.make().fields_to_clear("title");

    expect(update.fields_to_clear).toEqual(expected);
  });
});

/* --------------------------------------------------------*
 *                                                         *
 *             Invoice_Update - Getters/Setters
 *                                                         *
 * ------------------------------------------------------- */
describe("Invoice_Update - Getters/Setters", () => {
  let update, pie_invoice_object, fardel, square_invoice;
  beforeEach(function () {
    // clone the helper invoice to a new object
    square_invoice = Object.assign({}, helper_invoice);

    update = new Invoice_Update(square_invoice);
    pie_invoice_object = new Invoice_Object();
    pie_invoice_object.version = square_invoice.version;
    pie_invoice_object.title = "fahrfigWHAT?";
    fardel = pie_invoice_object.fardel;
  });

  test("delivery getter/setter", () => {
    let expected = square_invoice;
    update.delivery = { invoice: square_invoice };
    expect(update.delivery).toMatchObject(expected);
  });

  test("invoice getter/setter", () => {
    update.invoice = fardel;
    expect(update.invoice).toMatchObject(fardel);
  });

  test("invoice getter/setter", () => {
    let expected = ["title"];
    update.fields_to_clear = "title";
    expect(update.fields_to_clear).toEqual(expected);
  });

  test("idempotency_key getter/setter", () => {
    let expected = "123";
    update.idempotency_key = expected;
    expect(update.idempotency_key).toEqual(expected);
  });

  test("is_published", () => {
    expect(update.is_published).toEqual(true);
  });

  test("is_updatable", () => {
    expect(update.is_updatable).toEqual(true);
  });
});

/* --------------------------------------------------------*
 *                                                         *
 *             Invoice_Update - Validation
 *                                                         *
 * ------------------------------------------------------- */

describe("Invoice_Update - Validation", () => {
  let update, pie_invoice_object, make, square_invoice;

  beforeEach(function () {
    // clone the helper invoice to a new object
    square_invoice = Object.assign({}, helper_invoice);
    update = new Invoice_Update(square_invoice);

    pie_invoice_object = new Invoice_Object();
    pie_invoice_object.version = square_invoice.version;
    pie_invoice_object.title = "fahrfigWHAT?";
    make = pie_invoice_object.make();
  });

  test("fields_to_clear should throw on order_id", () => {
    let throw_on = "order_id";
    expect(() => {
      update.fields_to_clear = throw_on;
    }).toThrow();
  });

  test("fields_to_clear should throw on location_id", () => {
    let throw_on = "location_id";
    expect(() => {
      update.fields_to_clear = throw_on;
    }).toThrow();
  });

  test("validate should throw if status is PAID", () => {
    square_invoice.status = "PAID";
    let update = new Invoice_Update(square_invoice);
    expect(() => {
      update.invoice = pie_invoice_object.fardel;
    }).toThrow();
  });
  test("validate should throw if status is REFUNDED", () => {
    square_invoice.status = "REFUNDED";
    let update = new Invoice_Update(square_invoice);
    expect(() => {
      update.invoice = pie_invoice_object.fardel;
    }).toThrow();
  });
  test("validate should throw if status is CANCELED", () => {
    square_invoice.status = "CANCELED";
    let update = new Invoice_Update(square_invoice);
    expect(() => {
      update.invoice = pie_invoice_object.fardel;
    }).toThrow();
  });
  test("validate should throw if status is FAILED", () => {
    square_invoice.status = "FAILED";
    let update = new Invoice_Update(square_invoice);
    expect(() => {
      update.invoice = pie_invoice_object.fardel;
    }).toThrow();
  });
  test("validate should throw if status is PAYMENT_PENDING", () => {
    square_invoice.status = "PAYMENT_PENDING";
    let update = new Invoice_Update(square_invoice);
    expect(() => {
      update.invoice = pie_invoice_object.fardel;
    }).toThrow();
  });

  test("validate should throw if trying to update order_id", () => {
    pie_invoice_object.order_id = "123";
    let update = new Invoice_Update(square_invoice);
    expect(() => {
      update.invoice = pie_invoice_object.fardel;
    }).toThrow();
  });
  test("validate should throw if trying to update location_id", () => {
    let update = new Invoice_Update(square_invoice);
    pie_invoice_object.location_id = "123";
    expect(() => {
      update.invoice = pie_invoice_object.fardel;
    }).toThrow();
  });

  test("validate should throw if trying to update primary_recipient and status is UNPAID", () => {
    square_invoice.status = "UNPAID";
    let update = new Invoice_Update(square_invoice);
    make.primary_recipient("123");
    expect(() => {
      update.invoice = pie_invoice_object.fardel;
    }).toThrow();
  });
  test("validate should throw if trying to update primary_recipient and status is SCHEDULED", () => {
    square_invoice.status = "SCHEDULED";
    let update = new Invoice_Update(square_invoice);
    make.primary_recipient("123");
    expect(() => {
      update.invoice = pie_invoice_object.fardel;
    }).toThrow();
  });
  test("validate should throw if trying to update primary_recipient and status is PARTIALLY_PAID", () => {
    square_invoice.status = "PARTIALLY_PAID";
    let update = new Invoice_Update(square_invoice);
    make.primary_recipient("123");
    expect(() => {
      update.invoice = pie_invoice_object.fardel;
    }).toThrow();
  });
  test("validate should throw if trying to update primary_recipient and status is PARTIALLY_REFUNDED", () => {
    square_invoice.status = "PARTIALLY_REFUNDED";
    let update = new Invoice_Update(square_invoice);
    make.primary_recipient("123");
    expect(() => {
      update.invoice = pie_invoice_object.fardel;
    }).toThrow();
  });

  // version validation
  test("validate should throw if versions do not match", () => {
    let update = new Invoice_Update(square_invoice);
    pie_invoice_object.make().version(square_invoice.version + 1);
    expect(() => {
      update.invoice = pie_invoice_object.fardel;
    }).toThrow();
  });
  test("validate should  NOT throw if versions match", () => {
    let update = new Invoice_Update(square_invoice);
    pie_invoice_object.make().version(square_invoice.version);
    expect(() => {
      update.invoice = pie_invoice_object.fardel;
    }).not.toThrow();
  });

  test('validate should throw when invoice is published and fields_to_clear includes "primary_recipient" and no other updates are present (no sparse invoice object is added)', () => {
    square_invoice.status = "PARTIALLY_PAID";
    let update = new Invoice_Update(square_invoice);
    update.make().fields_to_clear("primary_recipient");
    expect(() => {
      update.body;
    }).toThrow();
  });

  test("validate() should return true if passed a valid update as an argument", () => {
    let update = new Invoice_Update(square_invoice);
    expect(update.validate(pie_invoice_object.fardel)).toEqual(true);
  });

  test("validate() should return false if passed an invalid update as an argument", () => {
    let update = new Invoice_Update(square_invoice);
    pie_invoice_object.version = square_invoice.version + 1;
    expect(update.validate(pie_invoice_object.fardel)).toEqual(false);
  });

  test("reason: a status of PAYMENT_PENDING, PAID, REFUNDED, CANCELED, or FAILED", () => {
    square_invoice.status = "PAID";
    let thing = new Invoice_Update(square_invoice);
    let base_reason = "Update disallowed for the following reason(s):\n- ";
    let expected =
      base_reason +
      "Invoices cannot be updated which have a status of PAYMENT_PENDING, PAID, REFUNDED, CANCELED, or FAILED";
    expect(thing.reason).toEqual(expected);
  });

  test("reason: invoice is published and has primary_recipient ", () => {
    make.primary_recipient("123");
    square_invoice.status = "UNPAID";
    let base_reason = "Update disallowed for the following reason(s):\n- ";
    let expected =
      base_reason +
      "It is not allowed to update primary_recipient on a published invoice.";
    update.validate(pie_invoice_object.fardel);
    expect(update.reason).toEqual(expected);
  });

  test("reason: versions not equal ", () => {
    pie_invoice_object.version = square_invoice.version + 1;
    let base_reason = "Update disallowed for the following reason(s):\n- ";
    let expected =
      base_reason +
      "Versions do not match. Expected: " +
      square_invoice.version +
      " Received: " +
      pie_invoice_object.version;
    update.validate(pie_invoice_object.fardel);
    expect(update.reason).toEqual(expected);
  });

  test("reason: update includes order_id ", () => {
    make.order_id("123");
    let base_reason = "Update disallowed for the following reason(s):\n- ";
    let expected = base_reason + "It is not allowed to update order_id.";
    update.validate(pie_invoice_object.fardel);
    expect(update.reason).toEqual(expected);
  });
  test("reason:   // update includes location_id\n ", () => {
    make.location_id("123");
    let base_reason = "Update disallowed for the following reason(s):\n- ";
    let expected = base_reason + "It is not allowed to update location_id.";
    update.validate(pie_invoice_object.fardel);
    expect(update.reason).toEqual(expected);
  });

  test("reason: invoice is published and field_to_clear contains primary_recipient ", () => {
    square_invoice.status = "UNPAID";
    update.fields_to_clear = "primary_recipient";
    let base_reason = "Update disallowed for the following reason(s):\n- ";
    let expected =
      base_reason +
      "It is not allowed to clear primary_recipient on a published invoice.";
    update.validate();
    expect(update.reason).toEqual(expected);
  });

  test("#can_clear_primary_recipient() should return true if invoice is published and field_to_clear does not contain primary_recipient ", () => {
    expect(update.validate()).toEqual(true);
  });

  //#is_invoice_published()
  test("#is_invoice_published() should set true when status is UNPAID", () => {
    helper_invoice.status = "UNPAID";
    let update = new Invoice_Update(helper_invoice);
    expect(update.is_published).toEqual(true);
  });
  test("#is_invoice_published() should set true when status is SCHEDULED", () => {
    helper_invoice.status = "SCHEDULED";
    let update = new Invoice_Update(helper_invoice);
    expect(update.is_published).toEqual(true);
  });
  test("#is_invoice_published() should set true when status is PARTIALLY_PAID", () => {
    helper_invoice.status = "PARTIALLY_PAID";
    let update = new Invoice_Update(helper_invoice);
    expect(update.is_published).toEqual(true);
  });
  test("#is_invoice_published() should set true when status is PARTIALLY_REFUNDED", () => {
    helper_invoice.status = "PARTIALLY_REFUNDED";
    let update = new Invoice_Update(helper_invoice);
    expect(update.is_published).toEqual(true);
  });
  test("#is_invoice_published() should set false when status is DRAFT", () => {
    helper_invoice.status = "DRAFT";
    let update = new Invoice_Update(helper_invoice);
    expect(update.is_published).toEqual(false);
  });

  // is_updatable
  test("#is_updatable() should set false when status is PAID", () => {
    helper_invoice.status = "PAID";
    let update = new Invoice_Update(helper_invoice);
    expect(update.is_updatable).toEqual(false);
  });
  test("#is_updatable() should set false when status is REFUNDED", () => {
    helper_invoice.status = "REFUNDED";
    let update = new Invoice_Update(helper_invoice);
    expect(update.is_updatable).toEqual(false);
  });
  test("#is_updatable() should set false when status is CANCELED", () => {
    helper_invoice.status = "CANCELED";
    let update = new Invoice_Update(helper_invoice);
    expect(update.is_updatable).toEqual(false);
  });
  test("#is_updatable() should set false when status is FAILED", () => {
    helper_invoice.status = "FAILED";
    let update = new Invoice_Update(helper_invoice);
    expect(update.is_updatable).toEqual(false);
  });
  test("#is_updatable() should set false when status is PAYMENT_PENDING", () => {
    helper_invoice.status = "PAYMENT_PENDING";
    let update = new Invoice_Update(helper_invoice);
    expect(update.is_updatable).toEqual(false);
  });
  test("#is_updatable() should set true when status is DRAFT", () => {
    helper_invoice.status = "";
    let update = new Invoice_Update(helper_invoice);
    expect(update.is_updatable).toEqual(true);
  });
});
