// const should = require("chai").should();
const Order_Create = require("../src/lib/order_request_create");
const Order_Calculate = require("../src/lib/order_request_calculate");
const Order_Retrieve = require("../src/lib/order_request_retrieve");
const Order_Object = require("../src/lib/order_object");
const Order_Update = require("../src/lib/order_request_update");
const Order_Clone = require("../src/lib/order_request_clone");
const Order_Pay = require("../src/lib/order_request_pay");
const Order_Search = require("../src/lib/stub.order_request_search");
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

describe("Order_Search", () => {
  let search;
  let id = "someId";
  beforeEach(function () {
    search = new Order_Search();
  });

  test("Order_Search should have display name", () => {
    expect(search._display_name).toBeDefined();
  });
  test("Order_Search should have defined square version", () => {
    expect(search.square_version).toBeDefined();
  });
  test("Order_Search should have an endpoint", () => {
    expect(search.endpoint).toEqual("search");
  });

  test("Order_Search location_ids should be an array", () => {
    expect(Array.isArray(search.location_ids)).toEqual(true);
  });

  test("Order_Search location_ids setter should add to array", () => {
    search.location_ids = id;
    expect(search.location_ids[0]).toEqual(id);
  });

  test("Order_Search make().location_ids() should add to array", () => {
    search.make().location_ids(id);
    expect(search.location_ids[0]).toEqual(id);
  });

  test("Order_Search _body getter should throw if location_ids does not have at least one entry", () => {
    expect(() => {
      search.body;
    }).toThrow();
  });

  test("Order_Search limit setter should throw if non-integer", () => {
    expect(() => {
      search.limit(2.3);
    }).toThrow();
  });

  test("Order_Search limit setter should set value", () => {
    search.limit = 300;
    expect(search.limit).toEqual(300);
  });

  test("Order_Search make().limit() should set value", () => {
    search.make().limit(300);
    expect(search.limit).toEqual(300);
  });

  test("Order_Search return_entries setter should throw if non-boolean", () => {
    expect(() => {
      search.return_entries = "will throw";
    }).toThrow();
  });

  test("Order_Search return_entries setter should set boolean value", () => {
    search.return_entries = true;
    expect(search.return_entries).toEqual(true);
  });

  test("Order_Search make().return_entries() should set value", () => {
    search.make().return_entries(true);
    expect(search.return_entries).toEqual(true);
  });

  test("Order_Search query setter should set value", () => {
    let expected = { a: 1 };
    search.query = expected;
    expect(search.query).toMatchObject(expected);
  });

  test("Order_Search make().query() should set value", () => {
    let expected = { a: 1 };
    search.make().query(expected);
    expect(search.query).toMatchObject(expected);
  });
  // should add an id passed as an argument to constructor to the location_ids array
  // should replace the location_ids array with an array of ids passed as an argument to constructor
});
describe("Order_Search Query - yes it's so special it get's its own separate set of tests!", () => {
  let search;
  // let array10 = [1,2,3,4,5,6,7,8,9,10];
  // let array11 = [1,2,3,4,5,6,7,8,9,10,11];
  beforeEach(function () {
    search = new Order_Search("someId");
  });

  test("customer_filter should add to the array", () => {
    let expected = {
      filter: {
        customer_filter: {
          customer_ids: ["1"], // max 10 XXX
        },
        date_time_filter: undefined,
        fulfillment_filter: undefined,
        source_filter: undefined,
        state_filter: undefined,
      },
      sort: undefined,
    };
    let query = search.build_query();
    query.customer_filter("1");
    expect(search.query).toMatchObject(expected);
  });

  test("customer_filter should multiple add to the array with curry", () => {
    let expected = {
      filter: {
        customer_filter: {
          customer_ids: ["1", "2", "3"], // max 10 XXX
        },
        date_time_filter: undefined,
        fulfillment_filter: undefined,
        source_filter: undefined,
        state_filter: undefined,
      },
      sort: undefined,
    };
    let query = search.build_query();
    query.customer_filter("1").customer_filter("2").customer_filter("3");
    expect(search.query).toMatchObject(expected);
  });

  test("customer_filter should respect length limit of 10", () => {
    let query = search.build_query();
    expect(() => {
      query
        .customer_filter("1")
        .customer_filter("2")
        .customer_filter("3")
        .customer_filter("4")
        .customer_filter("5")
        .customer_filter("6")
        .customer_filter("7")
        .customer_filter("8")
        .customer_filter("9")
        .customer_filter("10")
        .customer_filter("11");
    }).toThrow();
  });

  test("source_filter should add to the array", () => {
    let expected = {
      filter: {
        customer_filter: undefined,
        date_time_filter: undefined,
        fulfillment_filter: undefined,
        source_filter: {
          source_name: ["1"],
        },
        state_filter: undefined,
      },
      sort: undefined,
    };
    let query = search.build_query();
    query.source_filter("1");
    expect(search.query).toMatchObject(expected);
  });

  test("source_filter should multiple add to the array with curry", () => {
    let expected = {
      filter: {
        customer_filter: undefined,
        date_time_filter: undefined,
        fulfillment_filter: undefined,
        source_filter: {
          source_name: ["1", "2", "3"], // max 10 XXX
        },
        state_filter: undefined,
      },
      sort: undefined,
    };
    let query = search.build_query();
    query.source_filter("1").source_filter("2").source_filter("3");
    expect(search.query).toMatchObject(expected);
  });

  test("source_filter should respect length limit of 10", () => {
    let query = search.build_query();
    expect(() => {
      query
        .source_filter("1")
        .source_filter("2")
        .source_filter("3")
        .source_filter("4")
        .source_filter("5")
        .source_filter("6")
        .source_filter("7")
        .source_filter("8")
        .source_filter("9")
        .source_filter("10")
        .source_filter("11");
    }).toThrow();
  });

  //source_filter - same tests as customer

  //date_time_filter close_at
  //date_time_filter created_at
  //date_time_filter updated_at
  //date_time_filter  all three

  //fulfillment_filter- fulfillment_states - check each value individually
  //fulfillment_filter- fulfillment_states - check that currying works

  //fulfillment_filter- fulfillment_types - check each value individually
  //fulfillment_filter- fulfillment_types - check that currying works

  // state_filter
});
