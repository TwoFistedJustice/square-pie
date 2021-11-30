const Customer_Object = require("../src/lib/stub.customer_object");
const { long_strings, dateCodes } = require("./helper_objects");

describe("Silence test suite", () => {
  test("", () => {});
});

describe("length and type checks", () => {
  let Customer;
  beforeEach(() => {
    Customer = new Customer_Object();
  });

  test("phone_number should respect length of 11", () => {
    expect(() => {
      Customer.make().phone_number(long_strings.len_12);
    }).toThrow();

    expect(() => {
      Customer.make().phone_number(long_strings.len_11);
    }).not.toThrow();
  });

  test("tax_ids should respect length of 20", () => {
    expect(() => {
      Customer.make().tax_ids(long_strings.len_21);
    }).toThrow();

    expect(() => {
      Customer.make().tax_ids(long_strings.len_20);
    }).not.toThrow();
  });

  test("birthday should respect RFC3339", () => {
    expect(() => {
      Customer.make().birthday(dateCodes.notRFC3339);
    }).toThrow();

    expect(() => {
      Customer.make().birthday(dateCodes.RFC3339);
    }).not.toThrow();
  });

  test("version should respect integer", () => {
    expect(() => {
      Customer.make().version("106.7");
    }).toThrow();

    expect(() => {
      Customer.make().version("10");
    }).not.toThrow();
  });

  test("preferences should respect boolean", () => {
    expect(() => {
      Customer.make().preferences();
    }).toThrow();

    expect(() => {
      Customer.make().preferences(false);
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