const Invoice_Object = require("../src/lib/stub.invoice_object");
// const {
//   long_strings,
//   dateCodes,
// } = require("./helper_objects");
// const {expect} = require ("chai");

let class_name = "Invoice_Object";
let invoice;

describe("Silence test suite", () => {
  test("", () => {});
});

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
  test("version should throw on ", () => {
    expect(() => {
      () => {
        invoice.version = "WRONG";
      };
    }).toThrow();
  });

  test("version should throw NOT on ", () => {
    expect(() => {
      () => {
        invoice.version = "RIGHT";
      };
    }).not.toThrow();
  });

  test("location_id should throw on ", () => {
    expect(() => {
      () => {
        invoice.location_id = "WRONG";
      };
    }).toThrow();
  });

  test("location_id should throw NOT on ", () => {
    expect(() => {
      () => {
        invoice.location_id = "RIGHT";
      };
    }).not.toThrow();
  });

  test("order_id should throw on ", () => {
    expect(() => {
      () => {
        invoice.order_id = "WRONG";
      };
    }).toThrow();
  });

  test("order_id should throw NOT on ", () => {
    expect(() => {
      () => {
        invoice.order_id = "RIGHT";
      };
    }).not.toThrow();
  });

  test("invoice_number should throw on ", () => {
    expect(() => {
      () => {
        invoice.invoice_number = "WRONG";
      };
    }).toThrow();
  });

  test("invoice_number should NOT throw on ", () => {
    expect(() => {
      () => {
        invoice.invoice_number = "RIGHT";
      };
    }).not.toThrow();
  });

  test("title should throw on ", () => {
    expect(() => {
      () => {
        invoice.title = "WRONG";
      };
    }).toThrow();
  });

  test("title should throw NOT on ", () => {
    expect(() => {
      () => {
        invoice.title = "RIGHT";
      };
    }).not.toThrow();
  });

  test("description should throw on ", () => {
    expect(() => {
      () => {
        invoice.description = "WRONG";
      };
    }).toThrow();
  });

  test("description should throw NOT on ", () => {
    expect(() => {
      () => {
        invoice.description = "RIGHT";
      };
    }).not.toThrow();
  });

  test("scheduled_at should throw on ", () => {
    expect(() => {
      () => {
        invoice.scheduled_at = "WRONG";
      };
    }).toThrow();
  });

  test("scheduled_at should NOT throw on ", () => {
    expect(() => {
      () => {
        invoice.scheduled_at = "RIGHT";
      };
    }).not.toThrow();
  });

  test("sale_or_service_date should throw on ", () => {
    expect(() => {
      () => {
        invoice.sale_or_service_date = "WRONG";
      };
    }).toThrow();
  });

  test("sale_or_service_date should NOT throw on ", () => {
    expect(() => {
      () => {
        invoice.sale_or_service_date = "RIGHT";
      };
    }).not.toThrow();
  });

  test("payment_conditions should throw on ", () => {
    expect(() => {
      () => {
        invoice.payment_conditions = "WRONG";
      };
    }).toThrow();
  });

  test("payment_conditions should NOT throw on ", () => {
    expect(() => {
      () => {
        invoice.payment_conditions = "RIGHT";
      };
    }).not.toThrow();
  });
});

/* --------------------------------------------------------*
 *                                                         *
 *                        SETTERS
 *                                                         *
 * ------------------------------------------------------- */
describe("object setters", () => {
  beforeEach(function () {
    invoice = new Invoice_Object();
  });
  test("version", () => {
    let expected = "";
    invoice.version = expected;
    expect(invoice.version).toEqual(expected);
  });
  test("location_id", () => {
    let expected = "";
    invoice.location_id = expected;
    expect(invoice.location_id).toEqual(expected);
  });
  test("order_id", () => {
    let expected = "";
    invoice.order_id = expected;
    expect(invoice.order_id).toEqual(expected);
  });
  test("primary_recipient", () => {
    let expected = "";
    invoice.primary_recipient = expected;
    expect(invoice.primary_recipient).toEqual(expected);
  });
  test("payment_requests", () => {
    let expected = "";
    invoice.payment_requests = expected;
    expect(invoice.payment_requests).toEqual(expected);
  });
  test("delivery_method", () => {
    let expected = "";
    invoice.delivery_method = expected;
    expect(invoice.delivery_method).toEqual(expected);
  });
  test("invoice_number", () => {
    let expected = "";
    invoice.invoice_number = expected;
    expect(invoice.invoice_number).toEqual(expected);
  });
  test("title", () => {
    let expected = "";
    invoice.title = expected;
    expect(invoice.title).toEqual(expected);
  });
  test("description", () => {
    let expected = "";
    invoice.description = expected;
    expect(invoice.description).toEqual(expected);
  });
  test("scheduled_at", () => {
    let expected = "";
    invoice.scheduled_at = expected;
    expect(invoice.scheduled_at).toEqual(expected);
  });
  test("accepted_payment_methods", () => {
    let expected = "";
    invoice.accepted_payment_methods = expected;
    expect(invoice.accepted_payment_methods).toEqual(expected);
  });
  test("custom_fields", () => {
    let expected = "";
    invoice.custom_fields = expected;
    expect(invoice.custom_fields).toEqual(expected);
  });
  test("sale_or_service_date", () => {
    let expected = "";
    invoice.sale_or_service_date = expected;
    expect(invoice.sale_or_service_date).toEqual(expected);
  });
  test("payment_conditions", () => {
    let expected = "";
    invoice.payment_conditions = expected;
    expect(invoice.payment_conditions).toEqual(expected);
  });
});

/* --------------------------------------------------------*
 *                                                         *
 *                        MAKE()
 *                                                         *
 * ------------------------------------------------------- */

describe("object make methods", () => {
  let make;
  beforeEach(function () {
    make = invoice.make();
    invoice = new Invoice_Object();
  });

  test("make().version() should set property", () => {
    let expected = "XXX";
    make.version(expected);
    expect(invoice.version).toEqual(expected);
  });
  test("make().location_id() should set property", () => {
    let expected = "XXX";
    make.location_id(expected);
    expect(invoice.location_id).toEqual(expected);
  });
  test("make().order_id() should set property", () => {
    let expected = "XXX";
    make.order_id(expected);
    expect(invoice.order_id).toEqual(expected);
  });
  test("make().primary_recipient() should set property", () => {
    let expected = "XXX";
    make.primary_recipient(expected);
    expect(invoice.primary_recipient).toEqual(expected);
  });
  test("make().payment_requests() should set property", () => {
    let expected = "XXX";
    make.payment_requests(expected);
    expect(invoice.payment_requests).toEqual(expected);
  });
  test("make().delivery_method() should set property", () => {
    let expected = "XXX";
    make.delivery_method(expected);
    expect(invoice.delivery_method).toEqual(expected);
  });
  test("make().invoice_number() should set property", () => {
    let expected = "XXX";
    make.invoice_number(expected);
    expect(invoice.invoice_number).toEqual(expected);
  });
  test("make().title() should set property", () => {
    let expected = "XXX";
    make.title(expected);
    expect(invoice.title).toEqual(expected);
  });
  test("make().description() should set property", () => {
    let expected = "XXX";
    make.description(expected);
    expect(invoice.description).toEqual(expected);
  });
  test("make().scheduled_at() should set property", () => {
    let expected = "XXX";
    make.scheduled_at(expected);
    expect(invoice.scheduled_at).toEqual(expected);
  });
  test("make().accepted_payment_methods() should set property", () => {
    let expected = "XXX";
    make.accepted_payment_methods(expected);
    expect(invoice.accepted_payment_methods).toEqual(expected);
  });
  test("make().custom_fields() should set property", () => {
    let expected = "XXX";
    make.custom_fields(expected);
    expect(invoice.custom_fields).toEqual(expected);
  });
  test("make().sale_or_service_date() should set property", () => {
    let expected = "XXX";
    make.sale_or_service_date(expected);
    expect(invoice.sale_or_service_date).toEqual(expected);
  });
  test("make().payment_conditions() should set property", () => {
    let expected = "XXX";
    make.payment_conditions(expected);
    expect(invoice.payment_conditions).toEqual(expected);
  });
});
