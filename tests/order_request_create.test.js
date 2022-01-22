const Order_Create = require("../src/lib/order_request_create");
const { long_strings } = require("./helper_objects");

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
  let class_name = "Order_Create";
  let endpoint = ""; //copy and paste from Square docs
  let method = "POST"; //http method from Square docs
  beforeEach(function () {
    create = new Order_Create();
  });

  test("should have display name", () => {
    expect(create._display_name).toBeDefined();
  });
  test("should have the method defined by Square set", () => {
    expect(create.method).toEqual(method);
  });
  test("display name should be same as class name", () => {
    expect(create.display_name).toEqual(class_name);
  });
  test("should have defined square version", () => {
    expect(create.square_version).toBeDefined();
  });
  test("should have defined _help", () => {
    expect(create.help).toBeDefined();
  });
  test("should have an endpoint", () => {
    expect(create.endpoint).toEqual(endpoint);
  });
  test("should have _delivery", () => {
    create.delivery = { order: { a: 1 } };
    expect(create.delivery).toBeDefined();
  });

  // not every request class has these
  test("should have defined _body", () => {
    expect(create.body).toBeDefined();
  });

  test("body should conform to specs", () => {
    let obj = { a: 1 };
    let expected = {
      idempotency_key: "123",
      order: obj,
    };
    create.make().idempotency_key("123").order(obj);
    expect(create.body).toMatchObject(expected);
  });

  test("should have defined _body.idempotency_key", () => {
    expect(create.body.idempotency_key).toBeDefined();
  });
  test("idempotency should respect length 192", () => {
    expect(() => {
      create.idempotency_key = long_strings.len_193;
    }).toThrow();
  });
});
