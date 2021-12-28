const Order_Calculate = require("../src/lib/order_request_calculate");

const { long_strings } = require("./helper_objects");
describe("Silence test suite", () => {
  test("", () => {
    expect("a").toEqual("a");
  });
});
/* --------------------------------------------------------*
 *                                                         *
 *                        Order_Calculate
 *                                                         *
 * ------------------------------------------------------- */
describe("Order_Calculate", () => {
  let calc;
  beforeEach(function () {
    calc = new Order_Calculate();
  });
  test("should have display name", () => {
    expect(calc._display_name).toBeDefined();
  });
  test("should have defined square version", () => {
    expect(calc.square_version).toBeDefined();
  });
  test("should have defined _body", () => {
    expect(calc.body).toBeDefined();
  });
  test("should have defined _body.idempotency_key", () => {
    expect(calc.body.idempotency_key).toBeDefined();
  });
  test("idempotency should respect length 192", () => {
    expect(() => {
      calc.idempotency_key = long_strings.len_193;
    }).toThrow();
  });
  test("make().idempotency_key() should set property", () => {
    calc.make().idempotency_key("123");
    expect(calc.idempotency_key).toEqual("123");
  });
  test("Order_Calculate order should set property", () => {
    let expected = { a: 1 };
    calc.order = expected;
    expect(calc.order).toMatchObject(expected);
  });

  test("make().order() should set property", () => {
    let expected = { a: 1 };
    calc.make().order(expected);
    expect(calc.order).toMatchObject(expected);
  });
  test("should have an endpoint", () => {
    expect(calc.endpoint).toEqual("calculate");
  });
});
