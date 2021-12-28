const Order_Update = require("../src/lib/order_request_update");

const { long_strings } = require("./helper_objects");
const Order_Object = require("../src/lib/order_object");
describe("Silence test suite", () => {
  test("", () => {
    expect("a").toEqual("a");
  });
});

/* --------------------------------------------------------*
 *                                                         *
 *                        Order_Update
 *                                                         *
 * ------------------------------------------------------- */

describe("Order_Update", () => {
  let update;
  let order_id = "some_order_Id";
  beforeEach(() => {
    update = new Order_Update(order_id);
  });

  test("Order_Update should have correct display name", () => {
    expect(update.display_name).toEqual("Order_Update");
  });

  test("Order_Update constructor should set endpoint properly ", () => {
    expect(update.endpoint).toEqual("/some_order_Id");
  });

  test("Order_Update should be able to change the id endpoint", () => {
    let id = "another_id";
    update.make().order_id(id);
    expect(update.endpoint).toEqual("/another_id");
  });

  test("Order_Update should set array and value and fields to clear", () => {
    let expected = ["discounts", "line_items"];
    update.make().fields_to_clear("discounts").fields_to_clear("line_items");
    expect(update.fields_to_clear).toMatchObject(expected);
  });

  test("Order_Update should have a sparse order object at order", () => {
    let order = new Order_Object();
    order.make().state().completed();
    let expected = { state: "COMPLETED" };
    update.make().order(order.fardel);
    expect(update.order).toMatchObject(expected);
  });

  test("Order_Update should throw if no id is set when endpoint is gotten", () => {
    let bad_update = new Order_Update();
    expect(() => {
      bad_update.endpoint;
    }).toThrow();
  });

  test("Order_Update should have a square_version property", () => {
    expect(update.square_version).toBeDefined();
  });

  test("Order_Update should have _body property", () => {
    expect(update.body).toBeDefined();
  });

  test("Order_Update idempotency_key should respect length limit", () => {
    expect(() => {
      update.make().idempotency_key(long_strings.len_193);
    }).toThrow();
  });
});
