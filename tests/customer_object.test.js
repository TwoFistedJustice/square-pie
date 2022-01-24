const util = require("../src/lib/utilities");
const spy_shazam_integer = jest.spyOn(util, "shazam_integer");

const Customer_Object = require("../src/lib/customer_object");
const {
  long_strings,
  dateCodes,
  sampleCustomers,
} = require("./helper_objects");

describe("length and type checks", () => {
  let customer;
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
  let Customer;
  beforeEach(() => {
    Customer = new Customer_Object();
  });

  test("preferences should set a compliant object", () => {
    let expected = {
      email_unsubscribed: true,
    };
    Customer.make().preferences(true);
    expect(Customer.preferences).toMatchObject(expected);
  });

  test("tax_ids should set a compliant object", () => {
    let expected = {
      eu_vat: long_strings.len_20,
    };
    Customer.make().tax_ids(long_strings.len_20);
    expect(Customer.tax_ids).toMatchObject(expected);
  });
});

describe("Customer_Object should build a compliant Customer Object", () => {
  test("Customer Object should create a compliant customer object", () => {
    let buffy = sampleCustomers.buffy;
    let customer = new Customer_Object();
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
