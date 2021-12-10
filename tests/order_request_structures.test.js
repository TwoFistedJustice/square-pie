// const should = require("chai").should();
const Order_Create = require("../src/lib/order_request_create");
const Order_Calculate = require("../src/lib/order_request_calculate");
const Order_Retrieve = require("../src/lib/order_request_retrieve");
const Order_Object = require("../src/lib/order_object");
const Order_Update = require("../src/lib/order_request_update");
const Order_Clone = require("../src/lib/order_request_clone");
const Order_Pay = require("../src/lib/order_request_pay");
const { long_arrays, long_strings } = require("./helper_objects");
describe("Silence order request async tests", () => {
  test("Should silence tests", () => {
    expect("a").toEqual("a");
  });
});

describe("Order Request Body formatting", () => {
  test("Create Order  should have properly formatted request.body", () => {
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

describe("Order_Retrieve", () => {
  let retrieve;
  beforeEach(() => {
    retrieve = new Order_Retrieve();
  });
  test("Should display name", () => {
    expect(retrieve.display_name).toEqual("Order_Retrieve");
  });

  test("Order_Retrieve should have properly formatted request.body", () => {
    let val1 = "ABCD";
    let val2 = "EFGH";
    let val3 = "JKelemenoP";
    let location = "12345";
    let expected = {
      location_id: location,
      order_ids: [val1, val2, val3],
    };
    retrieve
      .make()
      .location_id(location)
      .order(val1)
      .order(val2)
      .order_ids(val3);
    expect(retrieve.body).toMatchObject(expected);
  });

  test("Order_Retrieve should concat an array to the orders array that alreayd has values", () => {
    let val1 = "ABCD";
    let val2 = "EFGH";
    let val3 = "JKelemenoP";
    let expected = [val1, val2, val3, "QRST", "UVW", "XYZ"];
    let moreIds = ["QRST", "UVW", "XYZ"];
    retrieve.make().order(val1).order(val2).order_ids(val3);
    retrieve.add_array_of_orders(moreIds);
    expect(retrieve.order_ids).toMatchObject(expected);
  });

  test("Order_Retrieve should concat an array to the empty orders array and be able to take more", () => {
    let val1 = "ABCD";
    let val2 = "EFGH";
    let val3 = "JKelemenoP";
    let expected = ["QRST", "UVW", "XYZ", val1, val2, val3];
    let moreIds = ["QRST", "UVW", "XYZ"];
    retrieve
      .add_array_of_orders(moreIds)
      .make()
      .order(val1)
      .order(val2)
      .order_ids(val3);
    expect(retrieve.order_ids).toMatchObject(expected);
  });

  test("Order_Retrieve should not allow more than 100 IDs", () => {
    expect(() => {
      retrieve.make().order("0").concat_orders(long_arrays.len_100);
      console.log(retrieve.order_ids);
    }).toThrow();
  });

  test("Order_Retrieve concat arrays should throw and error if you pass a non-array", () => {
    expect(() => {
      retrieve.make().order("0").concat_orders({ id1: "1" });
    }).toThrow();
  });
});

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

describe("Order_Clone", () => {
  let bobafett;
  beforeEach(() => {
    bobafett = new Order_Clone();
  });

  test('Order_Clone should have a display name "Order_Clone"', () => {
    expect(bobafett._display_name).toEqual("Order_Clone");
  });

  test("Order_Clone should have a _body property", () => {
    expect(bobafett.body).toBeDefined();
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

describe("Order_Pay", () => {
  let pay;
  let id = "some_order";
  beforeEach(() => {
    pay = new Order_Pay(id);
  });

  test("Order_Pay should set endpoint", () => {
    expect(pay.endpoint).toEqual(`/${id}/pay`);
  });

  test('Order_Pay should have a display name "Order_Pay"', () => {
    expect(pay._display_name).toEqual("Order_Pay");
  });

  test("Order_Pay should have a _body property", () => {
    expect(pay.body).toBeDefined();
  });

  test("Order_Pay should push to the payment_ids array", () => {
    let expected = ["one", "two", "three"];
    pay.make().payment_ids("one").payment_ids("two").payment_ids("three");
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

  test("Order_Pay should set new id using setter", () => {
    pay.order_id = "cousin mikey";
    expect(pay.order_id).toEqual("cousin mikey");
  });

  test("Order_Clone should  respect idempotency key length restriction 192", () => {
    expect(() => {
      pay.idempotency_key(long_strings.len_193);
    }).toThrow();
  });

  test("Order_Clone should set idempotency key ", () => {
    let key = "There will be no disintegrations!";
    pay.make().idempotency_key(key);
    expect(pay.idempotency_key).toEqual(key);
  });
});

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
