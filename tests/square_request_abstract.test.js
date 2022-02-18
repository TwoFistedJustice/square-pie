const Square_Request = require("../src/lib/square_request_abstract");

describe("Square_Request", () => {
  let square;
  let class_name = "Square_Request";
  let endpoint = ""; //copy and paste from Square docs
  let method = ""; //http method from Square docs
  beforeEach(function () {
    square = new Square_Request();
  });

  test("should have display name", () => {
    expect(square._display_name).toBeDefined();
  });
  test("should have the method defined by Square set", () => {
    expect(square.method).toEqual(method);
  });
  test("display name should be same as class name", () => {
    expect(square.display_name).toEqual(class_name);
  });
  test("should have defined square version", () => {
    expect(square.square_version).toBeDefined();
  });
  test("should have defined _help", () => {
    expect(square.help).toBeDefined();
  });
  test("should have an endpoint", () => {
    expect(square.endpoint).toEqual(endpoint);
  });
  test("should have _delivery", () => {
    square.delivery = { someProp: { a: 1 } };
    expect(square.delivery).toBeDefined();
  });

  // test("should have defined _secret", () => {
  //   expect(Object.prototype.hasOwnProperty.call(square, "_secret")).toEqual(
  //     true
  //   );
  // });
  test("should not return secret name", () => {
    expect(square.secretName).not.toBeDefined();
  });
  test("Body should set", () => {
    let expected = { a: 1 };
    square.body = expected;
    expect(square.body).toMatchObject(expected);
  });
  test("Method setter should set method", () => {
    let expected = "brownies";
    square.method = expected;
    expect(square.method).toEqual(expected);
  });
  test("secret should be private", () => {
    expect(square.secretName).not.toBeDefined();
  });

  test("baseUrl should be defined", () => {
    expect(square.baseUrl).toBeDefined();
  });

  test("url should be defined", () => {
    expect(square.url).toBeDefined();
  });

  test("cache_ids should cache ids...", () => {
    let response_data = [
      {
        id: "LJJFXHRVMV16B",
        name: "Default Test Account",
        address: {
          address_line_1: "1600 Pennsylvania Ave NW",
          locality: "Washington",
          administrative_district_level_1: "DC",
          postal_code: "20500",
          country: "US",
        },
        timezone: "UTC",
        capabilities: ["CREDIT_CARD_PROCESSING", "AUTOMATIC_TRANSFERS"],
        status: "ACTIVE",
        created_at: "2021-05-09T20:27:48.454Z",
        merchant_id: "ML1Q8YWR7FBD0",
        country: "US",
        language_code: "en-US",
        currency: "USD",
        business_name: "Default Test Account",
        type: "PHYSICAL",
        business_hours: {},
        mcc: "7299",
      },
      {
        id: "LM1T0KY3GM24D",
        name: "coffee land",
        address: {
          address_line_1: "401 Richmond St W",
          locality: "Toronto",
          administrative_district_level_1: "ON",
          postal_code: "M5V3A8",
          country: "US",
        },
        timezone: "UTC",
        capabilities: ["CREDIT_CARD_PROCESSING", "AUTOMATIC_TRANSFERS"],
        status: "INACTIVE",
        created_at: "2022-02-16T20:09:42.808Z",
        merchant_id: "ML1Q8YWR7FBD0",
        country: "US",
        language_code: "en-US",
        currency: "USD",
        phone_number: "+1 416-597-8822",
        business_name: "Default Test Account",
        type: "PHYSICAL",
        business_hours: {},
        mcc: "7299",
      },
      {
        id: "L2X92PW79TPBX",
        name: "soccer land",
        address: {
          address_line_1: "865 Valencia St",
          locality: "San Francisco",
          administrative_district_level_1: "CA",
          postal_code: "94110",
          country: "US",
        },
        timezone: "UTC",
        capabilities: ["CREDIT_CARD_PROCESSING", "AUTOMATIC_TRANSFERS"],
        status: "ACTIVE",
        created_at: "2022-02-16T20:49:39.468Z",
        merchant_id: "ML1Q8YWR7FBD0",
        country: "US",
        language_code: "es-US",
        currency: "USD",
        phone_number: "+1 555-867-5309",
        business_name: "Default Test Account",
        type: "MOBILE",
        business_hours: {},
        mcc: "7299",
      },
    ];
    let expected = ["LJJFXHRVMV16B", "LM1T0KY3GM24D", "L2X92PW79TPBX"];

    square.delivery = response_data;
    square.cache_ids();

    expect(square.id_array).toMatchObject(expected);
  });

  test("cache_ids should cache ids from an array of ids...", () => {
    let response_data = ["LJJFXHRVMV16B", "LM1T0KY3GM24D", "L2X92PW79TPBX"];

    let expected = ["LJJFXHRVMV16B", "LM1T0KY3GM24D", "L2X92PW79TPBX"];

    square.delivery = response_data;
    square.cache_ids();

    expect(square.id_array).toMatchObject(expected);
  });
});
