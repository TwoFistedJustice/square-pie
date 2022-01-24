"use strict";
const Order_Retrieve = require("../src/lib/order_request_retrieve");
const { long_arrays } = require("./helper_objects");

let retrieve, make;
const id = "123";
const class_name = "Order_Retrieve";
const method = "POST"; //http method from Square docs
let endpoint = "/batch-retrieve"; //copy and paste from Square docs
/* --------------------------------------------------------*
 *                                                         *
 *                        common structures
 *                                                         *
 * ------------------------------------------------------- */
describe(`${class_name} basic request class structures`, () => {
  beforeEach(function () {
    retrieve = new Order_Retrieve();
  });
  test("should have display name", () => {
    expect(retrieve._display_name).toBeDefined();
  });
  test("should have the method defined by Square set", () => {
    expect(retrieve.method).toEqual(method);
  });
  test("display name should be same as class name", () => {
    expect(retrieve.display_name).toEqual(class_name);
  });
  test("should have defined square version", () => {
    expect(retrieve.square_version).toBeDefined();
  });
  test("should have defined _help", () => {
    expect(retrieve.help).toBeDefined();
  });
  test("should have an endpoint", () => {
    expect(retrieve.endpoint).toEqual(endpoint);
  });
  test("should have _delivery", () => {
    retrieve.delivery = { orders: { a: 1 } };
    expect(retrieve.delivery).toBeDefined();
    expect(retrieve.delivery).toMatchObject({ a: 1 });
  });

  // not every request class has these
  test("should have defined _body", () => {
    expect(retrieve.body).toBeDefined();
  });
});

/* --------------------------------------------------------*
 *                                                         *
 *                        Error Checks
 *                                                         *
 * ------------------------------------------------------- */
// describe (`${class_name} error checks`, () => {
//   beforeEach (() => {
//     retrieve = new ();
//     make = retrieve.make ();
//   });
//   test ("", () => {
//     expect (() => {
//     }).toThrow ();
//   });
// });

/* --------------------------------------------------------*
 *                                                         *
 *                        getters/setters
 *                                                         *
 * ------------------------------------------------------- */

describe(`${class_name} getters/setters`, () => {
  beforeEach(() => {
    retrieve = new Order_Retrieve();
    make = retrieve.make();
  });
  test("make().location_id () should set ", () => {
    let expected = id;
    make.location_id(id);
    expect(retrieve.location_id).toEqual(expected);
  });
  test("make().location () should set ", () => {
    let expected = id;
    make.location(id);
    expect(retrieve.location_id).toEqual(expected);
  });
  test("make().order_ids () should set ", () => {
    let expected = [id];
    make.order_ids(id);
    expect(retrieve.order_ids).toMatchObject(expected);
  });
  test("make().order () should set ", () => {
    let expected = [id];
    make.order(id);
    expect(retrieve.order_ids).toMatchObject(expected);
  });
});

/* --------------------------------------------------------*
 *                                                         *
 *                  Order_Retrieve
 *                                                         *
 * ------------------------------------------------------- */

describe("Order_Retrieve", () => {
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
    retrieve
      .make()
      .order(val1)
      .order(val2)
      .order_ids(val3)
      .concat_orders(moreIds);
    expect(retrieve.order_ids).toMatchObject(expected);
  });

  test("Order_Retrieve should concat an array to the empty orders array and be able to take more", () => {
    let val1 = "ABCD";
    let val2 = "EFGH";
    let val3 = "JKelemenoP";
    let expected = ["QRST", "UVW", "XYZ", val1, val2, val3];
    let moreIds = ["QRST", "UVW", "XYZ"];
    retrieve
      .make()
      .concat_orders(moreIds)
      .order(val1)
      .order(val2)
      .order_ids(val3);
    expect(retrieve.order_ids).toMatchObject(expected);
  });

  test("Order_Retrieve should not allow more than 100 IDs", () => {
    expect(() => {
      retrieve.make().order("0").concat_orders(long_arrays.len_100);
    }).toThrowError(/combined_length/);
  });

  test("Order_Retrieve concat arrays should throw and error if you pass a non-array", () => {
    expect(() => {
      retrieve.make().order("0").concat_orders({ id1: "1" });
    }).toThrow();
  });
});
