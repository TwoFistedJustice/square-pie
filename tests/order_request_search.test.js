const Order_Search = require("../src/lib/order_request_search");

const { dateCodes } = require("./helper_objects");
const { helper_arrays } = require("./helper_arrays");
/* --------------------------------------------------------*
 *                                                         *
 *                        Order_Search
 *                                                         *
 * ------------------------------------------------------- */

describe("Order_Search", () => {
  let search;
  let id = "someId";
  let method = "POST"; //http method from Square docs

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
  test("should have the method defined by Square", () => {
    expect(search.method).toEqual(method);
  });

  test("Delivery should set order_entry object if return_entries is set to true", () => {
    let response_body = {
      order_entries: [{ a: 1 }],
      orders: [{ b: 2 }],
      cursor: "123",
    };
    search.make().return_entries(true);
    search.delivery = response_body;
    expect(search.delivery).toMatchObject(response_body.order_entries);
  });

  test("Delivery should set order objects if return_entries is not set to true ", () => {
    let response_body = {
      order_entries: [{ a: 1 }],
      orders: [{ b: 2 }],
      cursor: "123",
    };
    search.make().return_entries = false;
    search.delivery = response_body;
    expect(search.delivery).toMatchObject(response_body.orders);
  });

  test("Delivery should set order objects if return_entries is undefined ", () => {
    let response_body = {
      order_entries: [{ a: 1 }],
      orders: [{ b: 2 }],
      cursor: "123",
    };
    search.delivery = response_body;
    expect(search.delivery).toMatchObject(response_body.orders);
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

  /*Order_Search Error Checking */

  test("Order_Search should throw if location_ids exceed limit of 10", () => {
    // this throws from the single ID setter
    let make = search.make();
    make.concat_locations(helper_arrays.len_10);
    expect(() => {
      make.location("11");
    }).toThrowError(/location_ids/);
  });

  test("Order_Search should throw if location_ids exceed limit of 10", () => {
    // this throws from the array setter
    let make = search.make();
    make.location("11");
    expect(() => {
      make.concat_locations(helper_arrays.len_10);
    }).toThrowError(/combined_length/);
  });
});

/* --------------------------------------------------------*
 *                                                         *
 *                        Order_Search Query
 *                                                         *
 * ------------------------------------------------------- */
describe("Order_Search Query - yes it's so special it get's its own separate set of tests!", () => {
  let search, expected_filter, expected_sort, query;
  const date = dateCodes.RFC3339;
  const date_set = {
    start_at: date,
    end_at: date,
  };

  // let array10 = [1,2,3,4,5,6,7,8,9,10];
  // let array11 = [1,2,3,4,5,6,7,8,9,10,11];
  beforeEach(function () {
    search = new Order_Search("someId");
    query = search.make_query();
    expected_filter = {
      customer_filter: undefined,
      date_time_filter: undefined,
      fulfillment_filter: undefined,
      source_filter: undefined,
      state_filter: undefined,
    };

    expected_sort = {
      sort_field: "CREATED_AT",
      sort_order: "ASC",
    };
  });

  test("customer_filter should add to the array", () => {
    expected_filter.customer_filter = {
      customer_ids: ["1"],
    };
    let query = search.make_query();
    query.customer_filter("1");
    expect(search.query.filter).toMatchObject(expected_filter);
  });

  test("customer_filter should multiple add to the array with curry", () => {
    expected_filter.customer_filter = {
      customer_ids: ["1", "2", "3"], // max 10 XXX
    };
    let query = search.make_query();
    query.customer_filter("1").customer_filter("2").customer_filter("3");
    expect(search.query.filter).toMatchObject(expected_filter);
  });

  test("customer_filter should respect length limit of 10", () => {
    let query = search.make_query();
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
    expected_filter.source_filter = {
      source_name: ["1"],
    };
    let query = search.make_query();
    query.source_filter("1");
    expect(search.query.filter).toMatchObject(expected_filter);
  });

  test("source_filter should multiple add to the array with curry", () => {
    expected_filter.source_filter = {
      source_name: ["1", "2", "3"],
    };
    let query = search.make_query();
    query.source_filter("1").source_filter("2").source_filter("3");
    expect(search.query.filter).toMatchObject(expected_filter);
  });

  test("source_filter should respect length limit of 10", () => {
    let query = search.make_query();
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

  test('fulfillment_filter- fulfillment_types - should set "PICKUP" ', () => {
    expected_filter.fulfillment_filter = { fulfillment_types: ["PICKUP"] };
    let query = search.make_query();
    query.fulfillment_filter().fulfillment_types().pickup();
    expect(search.query.filter).toMatchObject(expected_filter);
  });

  test('fulfillment_filter- fulfillment_types - should set "SHIPMENT"', () => {
    expected_filter.fulfillment_filter = { fulfillment_types: ["SHIPMENT"] };
    let query = search.make_query();
    query.fulfillment_filter().fulfillment_types().shipment();
    expect(search.query.filter).toMatchObject(expected_filter);
  });

  test("fulfillment_filter- fulfillment_types - check that currying works", () => {
    expected_filter.fulfillment_filter = {
      fulfillment_types: ["SHIPMENT", "PICKUP"],
    };
    let query = search.make_query();
    query.fulfillment_filter().fulfillment_types().shipment().pickup();
    expect(search.query.filter).toMatchObject(expected_filter);
  });

  test('fulfillment_filter- fulfillment_states - "PROPOSED"', () => {
    expected_filter.fulfillment_filter = {
      fulfillment_states: ["PROPOSED"],
    };
    query.fulfillment_filter().fulfillment_states().proposed();
    expect(search.query.filter).toMatchObject(expected_filter);
  });

  test('fulfillment_filter- fulfillment_states -"RESERVED"', () => {
    expected_filter.fulfillment_filter = {
      fulfillment_states: ["RESERVED"],
    };
    query.fulfillment_filter().fulfillment_states().reserved();
    expect(search.query.filter).toMatchObject(expected_filter);
  });

  test('fulfillment_filter- fulfillment_states -"PREPARED"', () => {
    expected_filter.fulfillment_filter = {
      fulfillment_states: ["PREPARED"],
    };
    query.fulfillment_filter().fulfillment_states().prepared();
    expect(search.query.filter).toMatchObject(expected_filter);
  });
  test('fulfillment_filter- fulfillment_states -"COMPLETED"', () => {
    expected_filter.fulfillment_filter = {
      fulfillment_states: ["COMPLETED"],
    };
    query.fulfillment_filter().fulfillment_states().completed();
    expect(search.query.filter).toMatchObject(expected_filter);
  });
  test('fulfillment_filter- fulfillment_states -"CANCELED"', () => {
    expected_filter.fulfillment_filter = {
      fulfillment_states: ["CANCELED"],
    };
    query.fulfillment_filter().fulfillment_states().canceled();
    expect(search.query.filter).toMatchObject(expected_filter);
  });
  test('fulfillment_filter- fulfillment_states -"FAILED"', () => {
    expected_filter.fulfillment_filter = {
      fulfillment_states: ["FAILED"],
    };
    query.fulfillment_filter().fulfillment_states().failed();
    expect(search.query.filter).toMatchObject(expected_filter);
  });

  test("fulfillment_filter- fulfillment_states - currying should works", () => {
    expected_filter.fulfillment_filter = {
      fulfillment_states: ["FAILED", "CANCELED", "COMPLETED"],
    };
    query
      .fulfillment_filter()
      .fulfillment_states()
      .failed()
      .canceled()
      .completed();
    expect(search.query.filter).toMatchObject(expected_filter);
  });

  // state_filter

  test('state_filter should set "OPEN" ', () => {
    expected_filter.state_filter = {
      states: ["OPEN"],
    };
    query.state_filter().state().open();
    expect(search.query.filter).toMatchObject(expected_filter);
  });

  test('state_filter should set "COMPLETED"', () => {
    expected_filter.state_filter = {
      states: ["COMPLETED"],
    };
    query.state_filter().state().completed();
    expect(search.query.filter).toMatchObject(expected_filter);
  });
  test('state_filter should set "CANCELED"', () => {
    expected_filter.state_filter = {
      states: ["CANCELED"],
    };
    query.state_filter().state().canceled();
    expect(search.query.filter).toMatchObject(expected_filter);
  });
  test('state_filter should set "DRAFT" ', () => {
    expected_filter.state_filter = {
      states: ["DRAFT"],
    };
    query.state_filter().state().draft();
    expect(search.query.filter).toMatchObject(expected_filter);
  });

  test("fulfillment_filter- fulfillment_states - currying should works", () => {
    expected_filter.state_filter = {
      states: ["OPEN", "CANCELED", "COMPLETED"],
    };
    query.state_filter().state().open().canceled().completed();
    expect(search.query.filter).toMatchObject(expected_filter);
  });

  /* --------------------------------------------------------*
   *                                                         *
   *                        QUERY SORT
   *                                                         *
   * ------------------------------------------------------- */

  test("sort should have default values", () => {
    expect(search.query.sort).toMatchObject(expected_sort);
  });

  test('sort.sort_order should set sort order to "ASC"', () => {
    expected_sort.sort_order = "ASC";
    query.sort_order().ascending();
    expect(search.query.sort).toMatchObject(expected_sort);
  });

  test('sort.sort_order should set sort order to "ASC"', () => {
    expected_sort.sort_order = "ASC";
    query.sort_order().up();
    expect(search.query.sort).toMatchObject(expected_sort);
  });

  test('sort.sort_order should set sort order to "ASC"', () => {
    expected_sort.sort_order = "ASC";
    query.sort_order().oldest_first();
    expect(search.query.sort).toMatchObject(expected_sort);
  });

  test('sort.sort_order should set sort order to "DESC"', () => {
    expected_sort.sort_order = "DESC";
    query.sort_order().descending();
    expect(search.query.sort).toMatchObject(expected_sort);
  });

  test('sort.sort_order should set sort order to "DESC"', () => {
    expected_sort.sort_order = "DESC";
    query.sort_order().down();
    expect(search.query.sort).toMatchObject(expected_sort);
  });

  test('sort.sort_order should set sort order to "DESC"', () => {
    expected_sort.sort_order = "DESC";
    query.sort_order().newest_first();
    expect(search.query.sort).toMatchObject(expected_sort);
  });

  test('sort.sort_field should set sort_field to "CREATED_AT" ', () => {
    expected_sort.sort_field = "CREATED_AT";
    query.sort_field().created_at();
    expect(search.query.sort).toMatchObject(expected_sort);
  });

  test('sort.sort_field should set sort_field to "CREATED_AT" ', () => {
    expected_sort.sort_field = "CREATED_AT";
    query.sort_field().created();
    expect(search.query.sort).toMatchObject(expected_sort);
  });

  test('sort.sort_field should set sort_field to "UPDATED_AT" ', () => {
    expected_sort.sort_field = "UPDATED_AT";
    query.sort_field().updated_at();
    expect(search.query.sort).toMatchObject(expected_sort);
  });

  test('sort.sort_field should set sort_field to "UPDATED_AT" ', () => {
    expected_sort.sort_field = "UPDATED_AT";
    query.sort_field().updated();
    expect(search.query.sort).toMatchObject(expected_sort);
  });

  test('sort.sort_field should set sort_field to "CLOSED_AT" ', () => {
    expected_sort.sort_field = "CLOSED_AT";
    query.sort_field().closed();
    expect(search.query.sort).toMatchObject(expected_sort);
  });

  test('sort.sort_field should set sort_field to "CLOSED_AT" ', () => {
    expected_sort.sort_field = "CLOSED_AT";
    query.sort_field().closed_at();
    expect(search.query.sort).toMatchObject(expected_sort);
  });

  test("sort.sort_field and sort_order should work on same object ", () => {
    expected_sort.sort_order = "DESC";
    expected_sort.sort_field = "CLOSED_AT";
    query.sort_field().closed_at();
    query.sort_order().down();
    expect(search.query.sort).toMatchObject(expected_sort);
  });

  /* --------------------------------------------------------*
   *                                                         *
   *                        date_time_filter
   *                                                         *
   * ------------------------------------------------------- */
  //date_time_filter close_at
  test("date_time_filter close_at", () => {
    expected_filter.date_time_filter = { close_at: date_set };
    expected_sort.sort_field = "CLOSED_AT";
    query.date_time_filter().close_at(date, date);

    expect(search.query.filter).toMatchObject(expected_filter);
    expect(search.query.sort).toMatchObject(expected_sort);
  });

  test("date_time_filter created_at", () => {
    expected_filter.date_time_filter = { created_at: date_set };
    expected_sort.sort_field = "CREATED_AT";
    query.date_time_filter().created_at(date, date);

    expect(search.query.filter).toMatchObject(expected_filter);
    expect(search.query.sort).toMatchObject(expected_sort);
  });

  test("date_time_filter updated_at", () => {
    expected_filter.date_time_filter = { updated_at: date_set };
    expected_sort.sort_field = "UPDATED_AT";
    query.date_time_filter().updated_at(date, date);

    expect(search.query.filter).toMatchObject(expected_filter);
    expect(search.query.sort).toMatchObject(expected_sort);
  });
});
