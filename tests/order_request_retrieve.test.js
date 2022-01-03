const Order_Retrieve = require("../src/lib/order_request_retrieve");
const { long_arrays } = require("./helper_objects");

describe("Silence test suite", () => {
  test("", () => {
    expect("a").toEqual("a");
  });
});

/* --------------------------------------------------------*
 *                                                         *
 *                  Order_Retrieve
 *                                                         *
 * ------------------------------------------------------- */

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
    }).toThrowError(/combined_length/);
  });

  test("Order_Retrieve concat arrays should throw and error if you pass a non-array", () => {
    expect(() => {
      retrieve.make().order("0").concat_orders({ id1: "1" });
    }).toThrow();
  });
});
