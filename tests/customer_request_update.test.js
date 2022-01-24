const Customer_Update = require("../src/lib/customer_request_update");

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

  test("should have _display_name", () => {
    expect(update._display_name).toBeDefined();
  });
  test("should have display name", () => {
    expect(update.display_name).toBeDefined();
  });

  test("display_name should be same as class name", () => {
    expect(update.display_name).toEqual(class_name);
  });
  test("_display_name should be same as class name", () => {
    expect(update._display_name).toEqual(class_name);
  });

  test("should have the method defined by Square set", () => {
    expect(update.method).toEqual(method);
  });

  test("should have defined square version", () => {
    expect(update.square_version).toBeDefined();
  });

  test("should have defined square version", () => {
    expect(update._last_verified_square_api_version).toBeDefined();
  });
  test("should have defined help", () => {
    expect(update.help).toBeDefined();
  });
  test("should have defined _help", () => {
    expect(update._help).toBeDefined();
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
});

/* --------------------------------------------------------*
 *                                                         *
 *                        error checking
 *                                                         *
 * ------------------------------------------------------- */

/* --------------------------------------------------------*
 *                                                         *
 *                        body properties
 *                                                         *
 * ------------------------------------------------------- */

describe("Customer Update body properties", () => {
  let update, make, id;
  beforeEach(() => {
    id = "123";
    update = new Customer_Update(id);
    make = update.make();
  });

  test("should set given_name", () => {
    let expected = "Russ";
    make.given_name(expected);
    expect(update.given_name).toEqual(expected);
  });

  test("first_name should set given_name", () => {
    let expected = "Russ";
    make.first_name(expected);
    expect(update.given_name).toEqual(expected);
  });

  test("should set family name", () => {
    let expected = "Bain";
    make.family_name(expected);
    expect(update.family_name).toEqual(expected);
  });

  test("last_name should set family name", () => {
    let expected = "Bain";
    make.last_name(expected);
    expect(update.family_name).toEqual(expected);
  });

  test("should set company_name", () => {
    let expected = "Rectangular";
    make.company_name(expected);
    expect(update.company_name).toEqual(expected);
  });

  test("company should set company_name", () => {
    let expected = "Rectangular";
    make.company(expected);
    expect(update.company_name).toEqual(expected);
  });

  test("should set nickname", () => {
    let expected = "Danger Russ";
    make.nickname(expected);
    expect(update.nickname).toEqual(expected);
  });
  test("should set email_address", () => {
    let email = "russ.a.bain@gmail.com";
    let expected = "russabain@gmail.com";
    make.email_address(email);
    expect(update.email_address).toEqual(expected);
  });
  test("email should set email_address", () => {
    let email = "russ.a.bain@gmail.com";
    let expected = "russabain@gmail.com";
    make.email(email);
    expect(update.email_address).toEqual(expected);
  });

  test("should set address", () => {
    let expected = {};
    make.address(expected);
    expect(update.address).toEqual(expected);
  });
  test("should set phone_number ", () => {
    let expected = "14155551212";
    make.phone_number(expected);
    expect(update.phone_number).toEqual(expected);
  });
  test("phone should set phone_number ", () => {
    let expected = "14155551212";
    make.phone(expected);
    expect(update.phone_number).toEqual(expected);
  });
  test("should set reference_id", () => {
    let expected = "123";
    make.reference_id(expected);
    expect(update.reference_id).toEqual(expected);
  });
  test("should set note", () => {
    let expected = "Je suis en pincer pour Tina Fey! Ohhhh, j'adorrrreeeee!";
    make.note(expected);
    expect(update.note).toEqual(expected);
  });
  test("should set birthday", () => {
    let birthday = new Date("30 october 1980").toISOString();
    make.birthday(birthday);
    expect(update.birthday).toEqual(birthday);
  });
  test("should set version", () => {
    let expected = 27;
    make.version(expected);
    expect(update.version).toEqual(expected);
  });

  test("should set tax_ids", () => {
    let eu_vat = "IE3426675K";
    let expected = { eu_vat };
    make.tax_ids(eu_vat);
    expect(update.tax_ids).toMatchObject(expected);
  });
  test("should set city ", () => {
    let expected = { locality: "San Francisco" };
    make.city("San Francisco");
    expect(update.address).toMatchObject(expected);
  });
  test("should set state", () => {
    let expected = { administrative_district_level_1: "california" };
    make.state("california");
    expect(update.address).toMatchObject(expected);
  });
  test("should set postal code", () => {
    let expected = { postal_code: "94105" };
    make.postal_code("94105");
    expect(update.address).toMatchObject(expected);
  });

  test("make().customer() should replace body", () => {
    let expected = { postal_code: "94105" };
    make.customer(expected);
    expect(update.body).toMatchObject(expected);
  });
});
