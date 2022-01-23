const Order_Pay = require("../src/lib/order_request_pay");

const { long_strings } = require("./helper_objects");
const { helper_arrays } = require("./helper_arrays");
/* --------------------------------------------------------*
 *                                                         *
 *                        Order_Pay
 *                                                         *
 * ------------------------------------------------------- */
describe("Order_Pay", () => {
  let pay;
  let id = "some_order";
  let method = "POST"; //http method from Square docs

  beforeEach(() => {
    pay = new Order_Pay(id);
  });

  test("Order_Pay should set endpoint", () => {
    expect(pay.endpoint).toEqual(`/${id}/pay`);
  });

  test('Order_Pay should have a display name "Order_Pay"', () => {
    expect(pay._display_name).toEqual("Order_Pay");
  });
  test("should have the method defined by Square", () => {
    expect(pay.method).toEqual(method);
  });

  test("Order_Pay should have a _body property", () => {
    expect(pay.body).toBeDefined();
  });

  test("make().payment_ids() should push to the payment_ids array", () => {
    let expected = ["one", "two", "three"];
    pay.make().payment_ids("one").payment_ids("two").payment_ids("three");
    expect(pay.payment_ids).toMatchObject(expected);
  });

  test("make.pay() should push to the payment_ids array", () => {
    let expected = ["one", "two", "three"];
    pay.make().pay("one").pay("two").pay("three");
    expect(pay.payment_ids).toMatchObject(expected);
  });

  test("Order_Pay should set and retrieve an order version", () => {
    let ver = 12;
    pay.make().order_version(ver);
    expect(pay.order_version).toEqual(ver);
  });

  test("Order_Pay should have a Square Version key: value", () => {
    expect(pay.square_version).toBeDefined();
  });

  test("Order_Pay should set id from constructor", () => {
    let charge = new Order_Pay(id);
    expect(charge.order_id).toEqual(id);
  });

  test("Order_Pay make() should set new id", () => {
    pay.make().order_id("cousin mikey");
    expect(pay.order_id).toEqual("cousin mikey");
  });

  test("Order_Pay make() should set new id", () => {
    pay.make().order("cousin mikey");
    expect(pay.order_id).toEqual("cousin mikey");
  });

  test("Order_Pay should set new id using setter", () => {
    pay.order_id = "cousin mikey";
    expect(pay.order_id).toEqual("cousin mikey");
  });

  test("Order_Pay should  respect idempotency key length restriction 192", () => {
    expect(() => {
      pay.idempotency_key(long_strings.len_193);
    }).toThrow();
  });

  test("Order_Pay should set idempotency key ", () => {
    let key = "There will be no disintegrations!";
    pay.make().idempotency_key(key);
    expect(pay.idempotency_key).toEqual(key);
  });

  test("Order_Pay should concatenate an array of ids", () => {
    let expected = ["A", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
    let make = pay.make();
    make.payment_ids("A");
    make.concat_payments(helper_arrays.len_10);
    expect(pay.payment_ids).toEqual(expected);
  });
});
