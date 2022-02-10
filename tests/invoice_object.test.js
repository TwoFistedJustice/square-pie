const util = require("../src/lib/utilities");
const spy_shazam_integer = jest.spyOn(util, "shazam_integer");
const Invoice_Object = require("../src/lib/invoice_object");
const { long_strings, dateCodes } = require("./helper_objects");

let class_name = "Invoice_Object";
let invoice;

/* --------------------------------------------------------*
 *                                                         *
 *            BASIC OBJECT STRUCTURES
 *                                                         *
 * ------------------------------------------------------- */

describe("basic object class structures", () => {
  beforeEach(function () {
    invoice = new Invoice_Object();
  });
  test("should have display name", () => {
    expect(invoice._display_name).toBeDefined();
  });
  test("display name should be same as class name", () => {
    expect(invoice._display_name).toEqual(class_name);
  });
  test("should have help", () => {
    expect(invoice.help).toBeDefined();
  });
  test("should have defined square version", () => {
    expect(invoice.square_version).toBeDefined();
  });
  test("should have defined _fardel", () => {
    expect(invoice.fardel).toBeDefined();
  });
});

/* --------------------------------------------------------*
 *                                                         *
 *                   ERROR CHECKERS
 *                                                         *
 * ------------------------------------------------------- */

describe("Error checking", () => {
  beforeEach(function () {
    invoice = new Invoice_Object();
  });

  test("setter should call shazam_integer", () => {
    let klass = invoice;
    let test_val = 95;
    let caller = "version";
    klass[caller] = test_val;
    expect(spy_shazam_integer).toHaveBeenCalledWith(
      test_val,
      class_name,
      caller
    );
  });

  test("location_id should throw on string that exceeds length limit ", () => {
    expect(() => {
      invoice.location_id = long_strings.len_256;
    }).toThrow();
  });

  test("location_id should not throw on string that deceeds length limit ", () => {
    expect(() => {
      invoice.location_id = long_strings.len_255;
    }).not.toThrow();
  });

  test("order_id should throw on string that exceeds length limit ", () => {
    expect(() => {
      invoice.order_id = long_strings.len_256;
    }).toThrow();
  });

  test("order_id should not throw on string that deceeds length limit ", () => {
    expect(() => {
      invoice.order_id = long_strings.len_255;
    }).not.toThrow();
  });

  test("invoice_number should throw on string that exceeds length limit ", () => {
    expect(() => {
      invoice.invoice_number = long_strings.len_192;
    }).toThrow();
  });

  test("invoice_number should NOT throw on string that deceeds length limit ", () => {
    expect(() => {
      invoice.invoice_number = long_strings.len_191;
    }).not.toThrow();
  });

  test("title should throw on string that exceeds length limit ", () => {
    expect(() => {
      invoice.title = long_strings.len_256;
    }).toThrow();
  });

  test("title should throw NOT on string that deceeds length limit ", () => {
    expect(() => {
      invoice.title = long_strings.len_255;
    }).not.toThrow();
  });

  test("description should throw on string that exceeds length limit ", () => {
    expect(() => {
      // this string is so long it will bog the suite down and may cause it to crash
      // that's why it's in the test block, so it will get garbage collected sooner
      let { len_65537 } = require("./helper_super_long_strings");
      invoice.description = len_65537;
    }).toThrow();
  });

  test("description should throw NOT on string that deceeds length limit ", () => {
    expect(() => {
      // this string is so long it will bog the suite down and may cause it to crash
      // that's why it's in the test block, so it will get garbage collected sooner
      let { len_65536 } = require("./helper_super_long_strings");
      invoice.description = len_65536;
    }).not.toThrow();
  });

  test("scheduled_at should throw on non RFC33339 time ", () => {
    expect(() => {
      invoice.scheduled_at = dateCodes.notRFC3339;
    }).toThrow();
  });

  test("scheduled_at should NOT throw on RFC33339 time ", () => {
    expect(() => {
      invoice.scheduled_at = dateCodes.RFC3339;
    }).not.toThrow();
  });

  test("sale_or_service_date should throw on non YYYY-MM-DD date ", () => {
    expect(() => {
      invoice.sale_or_service_date = "1945/05/08";
    }).toThrow();
  });

  test("sale_or_service_date should NOT throw on YYYY-MM-DD date ", () => {
    expect(() => {
      invoice.sale_or_service_date = "1945-05-08";
    }).not.toThrow();
  });

  test("payment_conditions should throw on string that exceeds length limit ", () => {
    expect(() => {
      invoice.payment_conditions = long_strings.len_2001;
    }).toThrow();
  });

  test("payment_conditions should NOT throw on string that deceeds length limit ", () => {
    expect(() => {
      invoice.payment_conditions = long_strings.len_2000;
    }).not.toThrow();
  });

  test("custom fields should throw if more than 2 objects are added", () => {
    invoice.custom_fields = { a: 1 };
    invoice.custom_fields = { b: 2 };
    expect(() => {
      invoice.custom_fields = { c: 3 };
    }).toThrow();
  });
});

/* --------------------------------------------------------*
 *                                                         *
 *                        SETTERS
 *                                                         *
 * ------------------------------------------------------- */
describe("object setters", () => {
  let id;
  beforeEach(function () {
    invoice = new Invoice_Object();
    id = "123";
  });
  test("version", () => {
    let expected = 3;
    invoice.version = expected;
    expect(invoice.version).toEqual(expected);
  });
  test("location_id", () => {
    let expected = id;
    invoice.location_id = expected;
    expect(invoice.location_id).toEqual(expected);
  });
  test("order_id", () => {
    let expected = id;
    invoice.order_id = expected;
    expect(invoice.order_id).toEqual(expected);
  });
  test("primary_recipient", () => {
    let expected = { customer_id: id };
    invoice.primary_recipient = id;
    expect(invoice.primary_recipient).toEqual(expected);
  });
  test("payment_requests", () => {
    let obj = { a: 1 };
    let expected = [obj];
    invoice.payment_requests = obj;
    expect(invoice.payment_requests).toEqual(expected);
  });
  test("delivery_method", () => {
    let expected = "EMAIL";
    invoice.delivery_method = expected;
    expect(invoice.delivery_method).toEqual(expected);
  });
  test("invoice_number", () => {
    let expected = id;
    invoice.invoice_number = expected;
    expect(invoice.invoice_number).toEqual(expected);
  });
  test("title", () => {
    let expected = id;
    invoice.title = expected;
    expect(invoice.title).toEqual(expected);
  });
  test("description", () => {
    let expected = id;
    invoice.description = expected;
    expect(invoice.description).toEqual(expected);
  });
  test("scheduled_at", () => {
    let expected = dateCodes.RFC3339;
    invoice.scheduled_at = expected;
    expect(invoice.scheduled_at).toEqual(expected);
  });
  test("accepted_payment_methods", () => {
    let expected = {
      bank_account: false,
      card: false,
      square_gift_card: true,
    };
    invoice.accepted_payment_methods = expected;
    expect(invoice.accepted_payment_methods).toMatchObject(expected);
  });
  test("custom_fields", () => {
    let obj = { a: 1 };
    let expected = [obj];
    invoice.custom_fields = obj;
    expect(invoice.custom_fields).toEqual(expected);
  });
  test("sale_or_service_date", () => {
    let expected = "1945-05-08";
    invoice.sale_or_service_date = expected;
    expect(invoice.sale_or_service_date).toEqual(expected);
  });
  test("payment_conditions", () => {
    let expected = id;
    invoice.payment_conditions = expected;
    expect(invoice.payment_conditions).toEqual(expected);
  });
  test("conditions_de_paiement should get payment_conditions", () => {
    let expected = id;
    invoice.payment_conditions = expected;
    expect(invoice.conditions_de_paiement).toEqual(expected);
  });
});

/* --------------------------------------------------------*
 *                                                         *
 *                        MAKE()
 *                                                         *
 * ------------------------------------------------------- */

describe("object make methods", () => {
  let make, id;
  beforeEach(function () {
    invoice = new Invoice_Object();
    make = invoice.make();
    id = "123";
  });

  test("make().version() should set property", () => {
    let expected = 3;
    make.version(expected);
    expect(invoice.version).toEqual(expected);
  });
  test("make().location_id() should set property", () => {
    let expected = id;
    make.location_id(expected);
    expect(invoice.location_id).toEqual(expected);
  });
  test("make().order_id() should set property", () => {
    let expected = id;
    make.order_id(expected);
    expect(invoice.order_id).toEqual(expected);
  });
  test("make().primary_recipient() should set property", () => {
    let expected = { customer_id: id };
    make.primary_recipient(id);
    expect(invoice.primary_recipient).toEqual(expected);
  });
  test("make().payment_requests() should set property", () => {
    let obj = { a: 1 };
    let expected = [obj];
    make.payment_requests(obj);
    expect(invoice.payment_requests).toEqual(expected);
  });
  test("make().delivery_method().email(0 should set property", () => {
    let expected = "EMAIL";
    make.delivery_method().email();
    expect(invoice.delivery_method).toEqual(expected);
  });

  test("make().delivery_method().share_manually should set property", () => {
    let expected = "SHARE_MANUALLY";
    make.delivery_method().share_manually();
    expect(invoice.delivery_method).toEqual(expected);
  });

  test("make().delivery_method().manually should set property", () => {
    let expected = "SHARE_MANUALLY";
    make.delivery_method().manually();
    expect(invoice.delivery_method).toEqual(expected);
  });

  test("make().delivery_method() should curry-over", () => {
    let expected = "EMAIL";
    let recipient = { customer_id: id };
    make.delivery_method().email().primary_recipient(id);
    expect(invoice.delivery_method).toEqual(expected);
    expect(invoice.primary_recipient).toEqual(recipient);
  });

  test("make().invoice_number() should set property", () => {
    let expected = id;
    make.invoice_number(expected);
    expect(invoice.invoice_number).toEqual(expected);
  });
  test("make().title() should set property", () => {
    let expected = id;
    make.title(expected);
    expect(invoice.title).toEqual(expected);
  });
  test("make().description() should set property", () => {
    let expected = id;
    make.description(expected);
    expect(invoice.description).toEqual(expected);
  });
  test("make().scheduled_at() should set property", () => {
    let expected = dateCodes.RFC3339;
    make.scheduled_at(expected);
    expect(invoice.scheduled_at).toEqual(expected);
  });
  test("make().accepted_payment_methods() should set property", () => {
    let expected = {
      bank_account: false,
      card: false,
      square_gift_card: true,
    };
    make.accepted_payment_methods().bank_account().no();
    make.accepted_payment_methods().card().no();
    make.accepted_payment_methods().square_gift_card().yes();
    expect(invoice.accepted_payment_methods).toEqual(expected);
  });

  test("make().accepted_payment_methods() should curry-over", () => {
    let expected = {
      bank_account: false,
      card: false,
      square_gift_card: true,
    };
    let time = dateCodes.RFC3339;
    // it's ugly, but it works.
    make
      .accepted_payment_methods()
      .square_gift_card()
      .yes()
      .scheduled_at(time)
      .accepted_payment_methods()
      .card()
      .no()
      .accepted_payment_methods()
      .bank_account()
      .no();
    expect(invoice.accepted_payment_methods).toEqual(expected);
    expect(invoice.scheduled_at).toEqual(time);
  });

  test("make().custom_fields() should set property - with below()", () => {
    let expected = [
      {
        label: "fred",
        placement: "BELOW_LINE_ITEMS",
        value: "flintone",
      },
    ];
    make.custom_fields().label("fred").value("flintone").below().add();
    expect(invoice.custom_fields).toEqual(expected);
  });

  test("make().custom_fields() should set property- reset above", () => {
    let expected = [
      {
        label: "fred",
        placement: "ABOVE_LINE_ITEMS",
        value: "flintone",
      },
    ];
    make.custom_fields().label("fred").value("flintone").below().above().add();
    expect(invoice.custom_fields).toEqual(expected);
  });

  test("make().sale_or_service_date() should set property", () => {
    let expected = "1945-05-08";
    make.sale_or_service_date(expected);
    expect(invoice.sale_or_service_date).toEqual(expected);
  });
  test("make().payment_conditions() should set property", () => {
    let expected = id;
    make.payment_conditions(expected);
    expect(invoice.payment_conditions).toEqual(expected);
  });
});
