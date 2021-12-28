const Order_Create = require("../src/lib/order_request_create");
const { long_strings } = require("./helper_objects");
describe("Silence test suite", () => {
  test("", () => {
    expect("a").toEqual("a");
  });
});

// describe("Order Create Body formatting", () => {
//   test("Create Order  should have properly formatted request.body", () => {
//     let create = new Order_Create();
//     let order = new Order_Object();
//     let uuid = create.idempotency_key;
//     order.build_discount().type_amount().uid("Pieville USA").add();
//     create.body = order.fardel;
//     let body = create.body;
//
//     let expected = {
//       idempotency_key: uuid,
//       order: {
//         discounts: [
//           {
//             type: "FIXED_AMOUNT",
//             uid: "Pieville USA",
//           },
//         ],
//       },
//     };
//
//     Object.prototype.hasOwnProperty.call(body, "idempotency_key").should.be
//       .true;
//     Object.prototype.hasOwnProperty.call(body, "order").should.be.true;
//     expect(create.body).toMatchObject(expected);
//   });
// });

/* --------------------------------------------------------*
 *                                                         *
 *                        Order_Create
 *                                                         *
 * ------------------------------------------------------- */

describe("Order_Create", () => {
  let create;
  beforeEach(function () {
    create = new Order_Create();
  });

  test("Order_Create should have display name", () => {
    expect(create._display_name).toBeDefined();
  });
  test("Order_Create should have defined square version", () => {
    expect(create.square_version).toBeDefined();
  });
  test("Order_Create should have defined _body", () => {
    expect(create.body).toBeDefined();
  });
  test("Order_Create should have defined _body.idempotency_key", () => {
    expect(create.body.idempotency_key).toBeDefined();
  });
  test("Order_Create idempotency should respect length 192", () => {
    expect(() => {
      create.idempotency_key = long_strings.len_193;
    }).toThrow();
  });
  test("Order_Create make().idempotency_key() should set property", () => {
    create.make().idempotency_key("123");
    expect(create.idempotency_key).toEqual("123");
  });
  test("Order_Create should have an endpoint", () => {
    expect(create.endpoint).toEqual("");
  });
  test("Order_Create order should set property", () => {
    let expected = { a: 1 };
    create.order = expected;
    expect(create.order).toMatchObject(expected);
  });

  test("Order_Create make().order() should set property", () => {
    let expected = { a: 1 };
    create.make().order(expected);
    expect(create.order).toMatchObject(expected);
  });
});
