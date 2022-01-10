const Customer_Update = require("../src/lib/customer_request_update");

// const Customer_Object = require("../src/lib/customer_object");
// const { sampleCustomers } = require("./helper_objects");
// const customers = sampleCustomers;
// const buffy = customers.buffy;
// const mikey = customers.mikey;

describe("Silence test suite", () => {
  test("", () => {
    expect("a").toEqual("a");
  });
});

/* --------------------------------------------------------*
 *                                                         *
 *                        Customer_Update
 *                                                         *
 * ------------------------------------------------------- */

describe("Customer_Update", () => {
  let update;
  let arg = "123";
  let class_name = "Customer_Update";
  let endpoint = `/${arg}`;
  let method = "PUT"; //http method from Square docs
  beforeEach(function () {
    update = new Customer_Update(arg);
  });

  test("should have display name", () => {
    expect(update._display_name).toBeDefined();
  });
  test("should have the method defined by Square set", () => {
    expect(update.method).toEqual(method);
  });
  test("display name should be same as class name", () => {
    expect(update.display_name).toEqual(class_name);
  });
  test("should have defined square version", () => {
    expect(update.square_version).toBeDefined();
  });
  test("should have defined _help", () => {
    expect(update.help).toBeDefined();
  });
  test("should have an endpoint", () => {
    expect(update.endpoint).toEqual(endpoint);
  });
  test("should have _delivery", () => {
    update.delivery = { customer: { a: 1 } };
    expect(update.delivery).toBeDefined();
  });

  // not every request class has these
  test("should have defined _body", () => {
    expect(update.body).toBeDefined();
  });

  test("body setter should should update body props", () => {
    let expected = {
      given_name: "Liz",
      family_name: "Lemon",
      company_name: undefined,
      nickname: undefined,
      email_address: undefined,
      address: {
        address_line_1: "30 Rockerfeller Plaza",
      },
      phone_number: undefined,
      reference_id: undefined,
      note: "I have a thing for Tina Fey",
      birthday: undefined,
      version: undefined,
    };
    let sparse_update = {
      given_name: "Liz",
      family_name: "Lemon",
      address: {
        address_line_1: "30 Rockerfeller Plaza",
      },
      note: "I have a thing for Tina Fey",
    };
    update.body = sparse_update;

    expect(update.body).toMatchObject(expected);
  });

  // test ("should have defined _body.idempotency_key", () => {
  //   expect (myVar.body.idempotency_key).toBeDefined ();
  // });
  // test ("nanoid should generate a idempotency key less than the limit", () => {
  //   let pass = myVar.idempotency_key.length <= 128;
  //   expect (pass).toEqual (true);
  // });
  // test ("idempotency should respect length 192", () => {
  //   expect (() => {
  //     myVar.idempotency_key = long_strings.len_193;
  //   }).toThrow ();
  // });
});
