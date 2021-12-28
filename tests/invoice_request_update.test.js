const Invoice_Update = require("../src/lib/invoice_request_update");

const { long_strings, helper_invoice } = require("./helper_objects");
const Invoice_Object = require("../src/lib/invoice_object");

describe("silence test suite", () => {
  test("", () => {
    expect("").toEqual("");
  });
});

/* --------------------------------------------------------*
 *                                                         *
 *                Invoice_Update Basic Structures
 *                                                         *
 * ------------------------------------------------------- */
describe("Invoice_Update basic structures", () => {
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
