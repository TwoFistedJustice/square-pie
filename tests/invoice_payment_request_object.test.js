const util = require("../src/lib/utilities");
const spy_shazam_boolean = jest.spyOn(util, "shazam_boolean");
const spy_shazam_integer = jest.spyOn(util, "shazam_integer");
// const spy_shazam_date_human_readable = jest.spyOn(util, "shazam_date_human_readable");
// const spy_shazam_number_between_equals = jest.spyOn(util, "shazam_number_between_equals");
// const spy_shazam_max_length = jest.spyOn(util, "shazam_max_length");

const Invoice_Payment_Request_Object = require("../src/lib/invoice_payment_request_object");
const { long_strings, dateCodes } = require("./helper_objects");
// const {expect} = require ("chai");

let request_for_payment;
let make;
let class_name = "Invoice_Payment_Request_Object";

describe("Silence test suite", () => {
  test("", () => {});
});

describe("basic object class structures", () => {
  beforeEach(function () {
    request_for_payment = new Invoice_Payment_Request_Object();
  });
  test("should have display name", () => {
    expect(request_for_payment.display_name).toBeDefined();
  });
  test("display name should be same as class name", () => {
    expect(request_for_payment.display_name).toEqual(class_name);
  });
  test("should have help", () => {
    expect(request_for_payment.help).toBeDefined();
  });
  test("should have defined square version", () => {
    expect(request_for_payment.square_version).toBeDefined();
  });
  test("should have defined _fardel", () => {
    expect(request_for_payment.fardel).toBeDefined();
  });
});

/* --------------------------------------------------------*
 *                                                         *
 *                        error checking
 *                                                         *
 * ------------------------------------------------------- */

describe("error checking", () => {
  let message = " I like you.";
  let days = 30;
  beforeEach(function () {
    request_for_payment = new Invoice_Payment_Request_Object();
    make = request_for_payment.make();
  });

  test('request_or_payment.tipping_enabled should throw when tipping is enable and request_type = "BALANCE"', () => {
    request_for_payment.tipping_enabled = true;
    request_for_payment.request_type = "BALANCE";
    expect(() => {
      request_for_payment.fardel;
    }).toThrow();
  });

  test('request_or_payment.tipping_enabled should throw when tipping is enable and request_type = "INSTALLMENT"', () => {
    request_for_payment.tipping_enabled = true;
    request_for_payment.request_type = "INSTALLMENT";
    expect(() => {
      request_for_payment.fardel;
    }).toThrow();
  });

  test('request_or_payment.tipping_enabled should throw when percentage_requested is specified and request_type = "BALANCE"', () => {
    request_for_payment.percentage_requested = 30;
    request_for_payment.request_type = "BALANCE";
    expect(() => {
      request_for_payment.fardel;
    }).toThrow();
  });

  test("request_or_payment.tipping_enabled should throw when percentage_requested is specified and fixed_amount_requested_money is specified  ", () => {
    request_for_payment.percentage_requested = 30;
    request_for_payment.fixed_amount_requested_money = {
      amount: 4200,
      currency: "EUR",
    };
    expect(() => {
      request_for_payment.fardel;
    }).toThrow();
  });

  test("setter should call shazam_boolean", () => {
    let klass = request_for_payment;
    let test_val = true;
    let caller = "tipping_enabled";
    klass[caller] = test_val;
    expect(spy_shazam_boolean).toHaveBeenCalledWith(
      test_val,
      class_name,
      caller
    );
  });

  test("request_or_payment.due_date should throw on wrong date format", () => {
    let wrong = dateCodes.RFC3339;
    expect(() => {
      request_for_payment.due_date(wrong);
    }).toThrow();
  });

  test("#build_reminder should throw on a message that exceeds limit", () => {
    expect(() => {
      make.reminder(long_strings.len_1001, days);
    }).toThrow();
  });

  test("#build_reminder should NOT throw on a message that deceeds limit", () => {
    expect(() => {
      make.reminder(long_strings.len_1000, days);
    }).not.toThrow();
  });

  test("#build_reminder should  call shazam_integer on whoa_nelly argument", () => {
    let test_val = 95;
    let caller = "#build_reminder";
    make.reminder(message, 0, test_val);
    expect(spy_shazam_integer).toHaveBeenCalledWith(
      test_val,
      class_name,
      caller
    );
  });

  test("#build_reminder should  call shazam_integer on days argument", () => {
    let test_val = 95;
    let caller = "#build_reminder";
    make.reminder(message, test_val);
    expect(spy_shazam_integer).toHaveBeenCalledWith(
      test_val,
      class_name,
      caller
    );
  });

  // test("#build_reminder should throw on a non integer days argument", () => {
  //   expect(() => {
  //     make.reminder(message, 15.5);
  //   }).toThrow();
  // });

  // test("#build_reminder should throw on a non integer whoa_nelly argument ", () => {
  //   expect(() => {
  //     make.reminder(message, 0, 15.5);
  //   }).toThrow();
  // });

  test("#build_reminder should throw on an above range days argument", () => {
    expect(() => {
      make.reminder(message, 366);
    }).toThrow();
  });

  test("#build_reminder should throw on an below range days argument", () => {
    expect(() => {
      make.reminder(message, -366);
    }).toThrow();
  });

  test("#build_reminder should throw on an above range whoa_nelly argument", () => {
    expect(() => {
      make.reminder(message, 0, 32768);
    }).toThrow();
  });

  test("#build_reminder should throw on an below range whoa_nelly argument", () => {
    expect(() => {
      make.reminder(message, 0, -32768);
    }).toThrow();
  });
});

/* --------------------------------------------------------*
 *                                                         *
 *                        setters
 *                                                         *
 * ------------------------------------------------------- */
describe("object setters", () => {
  let str = "123";
  beforeEach(function () {
    request_for_payment = new Invoice_Payment_Request_Object();
  });
  test("request_or_payment.uid setter should set property", () => {
    let expected = str;
    request_for_payment.uid = str;
    expect(request_for_payment.uid).toEqual(expected);
  });
  test("request_or_payment.request_type setter should set property", () => {
    let expected = "DEPOSIT";
    request_for_payment.request_type = expected;
    expect(request_for_payment.request_type).toEqual(expected);
  });
  test("request_or_payment.due_date setter should set property", () => {
    let expected = "1918-11-11";
    request_for_payment.due_date = expected;
    expect(request_for_payment.due_date).toEqual(expected);
  });
  test("request_or_payment.fixed_amount_requested_money setter should set property", () => {
    let expected = { amount: 4200, currency: "EUR" };
    request_for_payment.fixed_amount_requested_money = expected;
    expect(request_for_payment.fixed_amount_requested_money).toEqual(expected);
  });

  test("request_or_payment.percentage_requested setter should set property", () => {
    let expected = 30;
    request_for_payment.percentage_requested = expected;
    expect(request_for_payment.percentage_requested).toEqual(expected);
  });
  test("request_or_payment.tipping_enabled setter should set property", () => {
    let expected = true;
    request_for_payment.tipping_enabled = expected;
    expect(request_for_payment.tipping_enabled).toEqual(expected);
  });
  test("request_or_payment.automatic_payment_source setter should set property", () => {
    let expected = "CARD_ON_FILE";
    request_for_payment.automatic_payment_source = expected;
    expect(request_for_payment.automatic_payment_source).toEqual(expected);
  });
  test("request_or_payment.card_id setter should set property", () => {
    let expected = str;
    request_for_payment.card_id = expected;
    expect(request_for_payment.card_id).toEqual(expected);
  });
  test("request_or_payment.reminder setter should set property", () => {
    let reminder = {
      message: "I like you. But I also need to get paid.",
      days: -30,
    };
    let expected = [reminder];
    request_for_payment.reminder = reminder;
    expect(request_for_payment.reminder).toEqual(expected);
  });
});

describe("object make methods", () => {
  let make;
  let str = "123";
  beforeEach(function () {
    request_for_payment = new Invoice_Payment_Request_Object();
    make = request_for_payment.make();
  });

  test("make().uid() setter should set property", () => {
    let expected = str;
    make.uid(str);
    expect(request_for_payment.uid).toEqual(expected);
  });
  test("make().request_type().deposit setter should set property", () => {
    let expected = "DEPOSIT";
    make.request_type().deposit();
    expect(request_for_payment.request_type).toEqual(expected);
  });
  test("make().request_type().balance setter should set property", () => {
    let expected = "BALANCE";
    make.request_type().balance();
    expect(request_for_payment.request_type).toEqual(expected);
  });
  test("make().request_type().installment setter should set property", () => {
    let expected = "INSTALLMENT";
    make.request_type().installment();
    expect(request_for_payment.request_type).toEqual(expected);
  });

  test("make().request_type() should curry-over", () => {
    let expected = "INSTALLMENT";
    make.request_type().installment().uid("str");
    expect(request_for_payment.uid).toEqual("str");
    expect(request_for_payment.request_type).toEqual(expected);
  });

  test("make().due_date() setter should set property", () => {
    let expected = "1918-11-11";
    make.due_date(expected);
    expect(request_for_payment.due_date).toEqual(expected);
  });
  test("make().fixed_amount_requested_money() setter should set property", () => {
    let expected = { amount: 4200, currency: "EUR" };
    make.fixed_amount_requested_money(4200, "EUR");
    expect(request_for_payment.fixed_amount_requested_money).toEqual(expected);
  });

  test("make().percentage_requested() setter should set property", () => {
    let expected = 30;
    make.percentage_requested(expected);
    expect(request_for_payment.percentage_requested).toEqual(expected);
  });
  test("make().tipping_enabled() setter should set property", () => {
    let expected = true;
    make.tipping_enabled(expected);
    expect(request_for_payment.tipping_enabled).toEqual(expected);
  });
  test("make().automatic_payment_source().card setter should set property", () => {
    let expected = "CARD_ON_FILE";
    make.automatic_payment_source().card();
    expect(request_for_payment.automatic_payment_source).toEqual(expected);
  });

  test("make().automatic_payment_source().none setter should set property", () => {
    let expected = "NONE";
    make.automatic_payment_source().none();
    expect(request_for_payment.automatic_payment_source).toEqual(expected);
  });

  test("make().automatic_payment_source().bank setter should set property", () => {
    let expected = "BANK_ON_FILE";
    make.automatic_payment_source().bank();
    expect(request_for_payment.automatic_payment_source).toEqual(expected);
  });

  test("make().automatic_payment_source()should curry-over", () => {
    let expected = "BANK_ON_FILE";
    make.automatic_payment_source().bank().tipping_enabled(true);
    expect(request_for_payment.automatic_payment_source).toEqual(expected);
    expect(request_for_payment.tipping_enabled).toEqual(true);
  });

  test("make().card_id() setter should set property", () => {
    let expected = str;
    make.card_id(expected);
    expect(request_for_payment.card_id).toEqual(expected);
  });
  test("make().reminder() setter should set property", () => {
    let message = "I like you. But I also need to get paid.";
    let days = -30;
    let reminder = {
      message: message,
      relative_scheduled_days: days,
    };
    let expected = [reminder];
    make.reminder(message, days);
    expect(request_for_payment.reminder).toEqual(expected);
  });
});
