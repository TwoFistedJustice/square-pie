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
});
