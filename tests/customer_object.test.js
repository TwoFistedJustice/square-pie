const util = require("../src/lib/utilities");
const spy_shazam_integer = jest.spyOn(util, "shazam_integer");

const Customer_Object = require("../src/lib/customer_object");
const {
  long_strings,
  dateCodes,
  sampleCustomers,
} = require("./helper_objects");

let customer, make;
const id = "123";
const class_name = "Customer_Object";

/* --------------------------------------------------------*
 *                                                         *
 *                        common structures
 *                                                         *
 * ------------------------------------------------------- */
describe(`${class_name} basic object class structures`, () => {
  beforeEach(() => {
    customer = new Customer_Object();
    make = customer.make();
  });
  test("should have display name", () => {
    expect(customer.display_name).toBeDefined();
  });
  test("display name should be same as class name", () => {
    expect(customer.display_name).toEqual(class_name);
  });
  test("should have help", () => {
    expect(customer.help).toBeDefined();
  });
  test("should have defined square version", () => {
    expect(customer.square_version).toBeDefined();
  });
  test("should have defined _fardel", () => {
    expect(customer.fardel).toBeDefined();
  });
});
/* --------------------------------------------------------*
 *                                                         *
 *                        Error Checks
 *                                                         *
 * ------------------------------------------------------- */

/* --------------------------------------------------------*
 *                                                         *
 *                        getters/setters
 *                                                         *
 * ------------------------------------------------------- */

describe(`${class_name} getters/setters`, () => {
  beforeEach(() => {
    customer = new Customer_Object();
    make = customer.make();
  });
  test("make().id () should set ", () => {
    let expected = id;
    make.id(expected);
    expect(customer.id).toEqual(expected);
  });
  test("make().given_name () should set ", () => {
    let expected = id;
    make.given_name(expected);
    expect(customer.given_name).toEqual(expected);
  });
  test("make().family_name () should set ", () => {
    let expected = id;
    make.family_name(expected);
    expect(customer.family_name).toEqual(expected);
  });
  test("make().company_name () should set ", () => {
    let expected = id;
    make.company_name(expected);
    expect(customer.company_name).toEqual(expected);
  });
  test("make().nickname () should set ", () => {
    let expected = id;
    make.nickname(expected);
    expect(customer.nickname).toEqual(expected);
  });
  test("make().email_address () should set ", () => {
    let expected = "yopaulwassup@mailinator.com";
    make.email_address(expected);
    expect(customer.email_address).toEqual(expected);
  });
  test("make().phone_number () should set ", () => {
    let expected = "15558675309";
    make.phone_number(expected);
    expect(customer.phone_number).toEqual(expected);
  });
  test("make().address () should set ", () => {
    let expected = id;
    make.address(expected);
    expect(customer.address).toEqual(expected);
  });
  test("make().birthday () should set ", () => {
    let expected = dateCodes.RFC3339;
    make.birthday(expected);
    expect(customer.birthday).toEqual(expected);
  });
  test("make().reference_id () should set ", () => {
    let expected = id;
    make.reference_id(expected);
    expect(customer.reference_id).toEqual(expected);
  });
  test("make().note () should set ", () => {
    let expected = id;
    make.note(expected);
    expect(customer.note).toEqual(expected);
  });
  test("make().version () should set ", () => {
    let expected = 5;
    make.version(expected);
    expect(customer.version).toEqual(expected);
  });

  // test ("make().creation_source () should set ", () => {let expected = id;make.creation_source (expected);expect (customer.creation_source).toEqual (expected);});

  test("make().preferences () should set ", () => {
    let expected = { email_unsubscribed: true };
    make.preferences(true);
    expect(customer.preferences).toEqual(expected);
  });
  test("make().tax_ids () should set ", () => {
    let expected = { eu_vat: id };
    make.tax_ids(id);
    expect(customer.tax_ids).toEqual(expected);
  });
  test("make().first_name () should set ", () => {
    let expected = id;
    make.first_name(expected);
    expect(customer.given_name).toEqual(expected);
  });
  test("make().last_name () should set ", () => {
    let expected = id;
    make.last_name(expected);
    expect(customer.family_name).toEqual(expected);
  });
  test("make().company () should set ", () => {
    let expected = id;
    make.company(expected);
    expect(customer.company_name).toEqual(expected);
  });
  test("make().email () should set ", () => {
    let expected = "yopaulwassup@mailinator.com";
    make.email(expected);
    expect(customer.email_address).toEqual(expected);
  });
  test("make().phone () should set ", () => {
    let expected = "15558675309";
    make.phone(expected);
    expect(customer.phone_number).toEqual(expected);
  });
});

describe("length and type checks", () => {
  beforeEach(() => {
    customer = new Customer_Object();
  });

  test("phone_number should respect length of 11", () => {
    expect(() => {
      customer.make().phone_number(long_strings.len_12);
    }).toThrow();

    expect(() => {
      customer.make().phone_number(long_strings.len_11);
    }).not.toThrow();
  });

  test("tax_ids should respect length of 20", () => {
    expect(() => {
      customer.make().tax_ids(long_strings.len_21);
    }).toThrow();

    expect(() => {
      customer.make().tax_ids(long_strings.len_20);
    }).not.toThrow();
  });

  test("birthday should respect RFC3339", () => {
    expect(() => {
      customer.make().birthday(dateCodes.notRFC3339);
    }).toThrow();

    expect(() => {
      customer.make().birthday(dateCodes.RFC3339);
    }).not.toThrow();
  });

  test("setter should call shazam_integer", () => {
    let class_name = "Customer_Object";
    let klass = customer;
    let test_val = 95;
    let caller = "version";
    klass[caller] = test_val;
    expect(spy_shazam_integer).toHaveBeenCalledWith(
      test_val,
      class_name,
      caller
    );
  });

  test("preferences should respect boolean", () => {
    expect(() => {
      customer.make().preferences();
    }).toThrow();

    expect(() => {
      customer.make().preferences(false);
    }).not.toThrow();
  });
});

describe("Object form compliance", () => {
  beforeEach(() => {
    customer = new Customer_Object();
  });

  test("preferences should set a compliant object", () => {
    let expected = {
      email_unsubscribed: true,
    };
    customer.make().preferences(true);
    expect(customer.preferences).toMatchObject(expected);
  });

  test("tax_ids should set a compliant object", () => {
    let expected = {
      eu_vat: long_strings.len_20,
    };
    customer.make().tax_ids(long_strings.len_20);
    expect(customer.tax_ids).toMatchObject(expected);
  });
});

describe("Customer_Object should build a compliant Customer Object", () => {
  test("Customer Object should create a compliant customer object", () => {
    let buffy = sampleCustomers.buffy;
    // let customer = new Customer_Object();
    customer
      .make()
      .first_name(buffy.given_name)
      .last_name(buffy.family_name)
      .email(buffy.email_address)
      .address(buffy.address)
      .phone(buffy.phone_number)
      .reference_id(buffy.reference_id)
      .note(buffy.note)
      .preferences(false);

    expect(customer.fardel).toMatchObject(buffy);
  });
});

/* --------------------------------------------------------*
 *                                                         *
 *                 #enum_creation_source()
 *                                                         *
 * ------------------------------------------------------- */

describe("#enum_creation_source()", () => {
  beforeEach(() => {
    customer = new Customer_Object();
    make = customer.make();
  });
  test("OTHER #enum_creation_source should set", () => {
    make.creation_source().other();
    expect(customer.creation_source).toEqual("OTHER");
  });
  test("APPOINTMENTS #enum_creation_source should set", () => {
    make.creation_source().appointments();
    expect(customer.creation_source).toEqual("APPOINTMENTS");
  });
  test("COUPON #enum_creation_source should set", () => {
    make.creation_source().coupon();
    expect(customer.creation_source).toEqual("COUPON");
  });
  test("DELETION_RECOVERY #enum_creation_source should set", () => {
    make.creation_source().deletion_recovery();
    expect(customer.creation_source).toEqual("DELETION_RECOVERY");
  });
  test("DIRECTORY #enum_creation_source should set", () => {
    make.creation_source().directory();
    expect(customer.creation_source).toEqual("DIRECTORY");
  });
  test("EGIFTING #enum_creation_source should set", () => {
    make.creation_source().egifting();
    expect(customer.creation_source).toEqual("EGIFTING");
  });
  test("EMAIL_COLLECTION #enum_creation_source should set", () => {
    make.creation_source().email_collection();
    expect(customer.creation_source).toEqual("EMAIL_COLLECTION");
  });
  test("FEEDBACK #enum_creation_source should set", () => {
    make.creation_source().feedback();
    expect(customer.creation_source).toEqual("FEEDBACK");
  });
  test("IMPORT #enum_creation_source should set", () => {
    make.creation_source().import();
    expect(customer.creation_source).toEqual("IMPORT");
  });
  test("INVOICES #enum_creation_source should set", () => {
    make.creation_source().invoices();
    expect(customer.creation_source).toEqual("INVOICES");
  });
  test("LOYALTY #enum_creation_source should set", () => {
    make.creation_source().loyalty();
    expect(customer.creation_source).toEqual("LOYALTY");
  });
  test("MARKETING #enum_creation_source should set", () => {
    make.creation_source().marketing();
    expect(customer.creation_source).toEqual("MARKETING");
  });
  test("MERGE #enum_creation_source should set", () => {
    make.creation_source().merge();
    expect(customer.creation_source).toEqual("MERGE");
  });
  test("ONLINE_STORE #enum_creation_source should set", () => {
    make.creation_source().online_store();
    expect(customer.creation_source).toEqual("ONLINE_STORE");
  });
  test("INSTANT_PROFILE #enum_creation_source should set", () => {
    make.creation_source().instant_profile();
    expect(customer.creation_source).toEqual("INSTANT_PROFILE");
  });
  test("TERMINAL #enum_creation_source should set", () => {
    make.creation_source().terminal();
    expect(customer.creation_source).toEqual("TERMINAL");
  });
  test("THIRD_PARTY #enum_creation_source should set", () => {
    make.creation_source().third_party();
    expect(customer.creation_source).toEqual("THIRD_PARTY");
  });
  test("THIRD_PARTY_IMPORT #enum_creation_source should set", () => {
    make.creation_source().third_party_import();
    expect(customer.creation_source).toEqual("THIRD_PARTY_IMPORT");
  });
  test("UNMERGE_RECOVERY #enum_creation_source should set", () => {
    make.creation_source().unmerge_recovery();
    expect(customer.creation_source).toEqual("UNMERGE_RECOVERY");
  });
  test("appt alias #enum_creation_source should set", () => {
    make.creation_source().appt();
    expect(customer.creation_source).toEqual("APPOINTMENTS");
  });
  test("unmerge #enum_creation_source should set", () => {
    make.creation_source().unmerge();
    expect(customer.creation_source).toEqual("UNMERGE_RECOVERY");
  });
  test("undelete #enum_creation_source should set", () => {
    make.creation_source().undelete();
    expect(customer.creation_source).toEqual("DELETION_RECOVERY");
  });
});
