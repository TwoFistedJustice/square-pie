const Order_Clone = require("../src/lib/order_request_clone");

const { long_strings } = require("./helper_objects");
/* --------------------------------------------------------*
 *                                                         *
 *                        Order_Clone
 *                                                         *
 * ------------------------------------------------------- */
describe("Order_Clone", () => {
  let bobafett;
  let method = "POST"; //http method from Square docs

  beforeEach(() => {
    bobafett = new Order_Clone();
  });

  test('Order_Clone should have a display name "Order_Clone"', () => {
    expect(bobafett._display_name).toEqual("Order_Clone");
  });

  test("Order_Clone should have a _body property", () => {
    expect(bobafett.body).toBeDefined();
  });
  test("should have the method defined by Square", () => {
    expect(bobafett.method).toEqual(method);
  });
  test("Order_Clone should set and retrieve an order version", () => {
    let ver = 12;
    bobafett.make().version(ver);
    expect(bobafett.version).toEqual(ver);
  });

  test("Order_Clone should have a Square Version key: value", () => {
    expect(bobafett.square_version).toBeDefined();
  });
  test("Order_Clone should set id from constructor", () => {
    const joeyfett = new Order_Clone("Joey");
    expect(joeyfett.order_id).toEqual("Joey");
  });

  test("Order_Clone make() should set new id", () => {
    bobafett.make().order_id("cousin mikey");
    expect(bobafett.order_id).toEqual("cousin mikey");
  });

  test("Order_Clone should set new id using setter", () => {
    bobafett.order_id = "cousin mikey";
    expect(bobafett.order_id).toEqual("cousin mikey");
  });

  test("Order_Clone make() id alias should set new id ", () => {
    bobafett.make().id("cousin mikey");
    expect(bobafett.order_id).toEqual("cousin mikey");
  });

  test("Order_Clone should  respect idempotency key length restriction 192", () => {
    expect(() => {
      bobafett.idempotency_key(long_strings.len_193);
    }).toThrow();
  });

  test("Order_Clone should set idempotency key ", () => {
    let key = "There will be no disintigrations!";
    bobafett.make().idempotency_key(key);
    expect(bobafett.idempotency_key).toEqual(key);
  });
});
