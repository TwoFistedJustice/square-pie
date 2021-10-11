const should = require("chai").should();
const Order_Create = require("../src/lib/order_request_create");
const Order_Object = require("../src/lib/stub.order_object");

describe("Silence order request tests", () => {
  test("Should silence tests", () => {
    expect("a").toEqual("a");
  });
});

// todo: We need to set up a spy or a mock or both to call the request method but not actually
//  phone home. Just check that the request body is conformant.

describe("Order Request Body formatting", () => {
  test("Create Order request should have properly formatted request.body", () => {
    // todo add an order object and test that it is properly attached
    let create = new Order_Create();
    let order = new Order_Object();
    let uuid = create.idempotency_key;
    order.build_discount().type_amount().uid("Pieville USA").add();
    create.body = order.fardel;
    let body = create.body;

    let expected = {
      idempotency_key: uuid,
      order: {
        discounts: [
          {
            type: "FIXED_AMOUNT",
            uid: "Pieville USA",
          },
        ],
      },
    };

    Object.prototype.hasOwnProperty.call(body, "idempotency_key").should.be
      .true;
    Object.prototype.hasOwnProperty.call(body, "order").should.be.true;
    expect(create.body).toMatchObject(expected);
  });
});
