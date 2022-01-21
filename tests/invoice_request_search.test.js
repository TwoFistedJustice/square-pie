const Invoice_Search = require("../src/lib/invoice_request_search");

/* --------------------------------------------------------*
 *                                                         *
 *                        Invoice_Search
 *                                                         *
 * ------------------------------------------------------- */

describe("Invoice_Search", () => {
  let search;
  let id = "123";
  let other_id = "ABC";
  let class_name = "Invoice_Search";
  let method = "POST"; //http method from Square docs
  beforeEach(function () {
    search = new Invoice_Search();
  });

  // basic structure

  test("should have display name", () => {
    expect(search._display_name).toBeDefined();
  });

  test("should have help", () => {
    expect(search.help).toBeDefined();
  });

  test("should have the method defined by Square set", () => {
    expect(search.method).toEqual(method);
  });

  test("display name should be same as class name", () => {
    expect(search._display_name).toEqual(class_name);
  });

  test("should have defined square version", () => {
    expect(search.square_version).toBeDefined();
  });
  test("should have an endpoint", () => {
    expect(search.endpoint).toEqual("/search");
  });
  test("should have defined _body", () => {
    expect(search.body).toBeDefined();
  });

  // delivery
  test("should have _delivery as an array with one member", () => {
    let expected = [{ a: 1 }];
    search.delivery = { invoices: { a: 1 } };
    expect(search.delivery).toEqual(expect.arrayContaining(expected));
  });

  test("Cursor should be set automatically if it's in the response", () => {
    let cursor = "123";
    let parcel = {
      invoices: { a: 1 },
      cursor: cursor,
    };
    search.delivery = parcel;
    expect(search.cursor).toEqual(cursor);
  });

  // limit
  test("limit should throw on a non-integer", () => {
    expect(() => {
      search.limit = 95.5;
    }).toThrow();
  });

  test("limit should throw if it exceeds limit", () => {
    expect(() => {
      search.limit = 201;
    }).toThrow();
  });

  test("limit should not throw if it deceeds limit", () => {
    expect(() => {
      search.limit = 199;
    }).not.toThrow();
  });

  // Make()

  test("make().query() should set PRIMARY property", () => {
    let expected = { a: 1 };
    search.make().query(expected);
    expect(search.query).toMatchObject(expected);
  });

  test("make().limit() should set limit property", () => {
    let val = 50;
    search.make().limit(val);
    expect(search.limit).toEqual(val);
  });

  // Query

  test("should push constructor arg to location_ids array", () => {
    let soych = new Invoice_Search(id);
    let expected = [id];
    expect(soych.location_ids).toEqual(expect.arrayContaining(expected));
  });

  test("should set  location_ids to undefined when not constructor argument is given", () => {
    expect(search.location_ids).toEqual([]);
  });

  test("make().location_id should push to location_ids array", () => {
    search.make().location_id(id).location_id(other_id);
    let expected = [id, other_id];
    expect(search.location_ids).toEqual(expect.arrayContaining(expected));
  });

  test("make().customer_id should push to customer_ids array", () => {
    search.make().customer_id(id).customer_id(other_id);
    let expected = [id, other_id];
    expect(search.customer_ids).toEqual(expect.arrayContaining(expected));
  });

  test("build_query().location_id should push to location_ids array", () => {
    search.build_query().location_id(id).location_id(other_id);
    let expected = [id, other_id];
    expect(search.location_ids).toEqual(expect.arrayContaining(expected));
  });

  test("build_query().customer_id should push to customer_ids array", () => {
    search.build_query().customer_id(id).customer_id(other_id);
    let expected = [id, other_id];
    expect(search.customer_ids).toEqual(expect.arrayContaining(expected));
  });

  // query sort

  test("should have default query sort value", () => {
    let sort = {
      field: "INVOICE_SORT_DATE",
      order: "ASC",
    };
    expect(search.sort).toMatchObject(sort);
  });

  test("make().sort().descending() should set sort order", () => {
    let sort = {
      field: "INVOICE_SORT_DATE",
      order: "DESC",
    };
    search.make().sort().descending();
    expect(search.sort).toMatchObject(sort);
  });

  test("make().sort().down() should set sort order", () => {
    let sort = {
      field: "INVOICE_SORT_DATE",
      order: "DESC",
    };
    search.make().sort().down();
    expect(search.sort).toMatchObject(sort);
  });

  test("make().sort().newest_first() should set sort order", () => {
    let sort = {
      field: "INVOICE_SORT_DATE",
      order: "DESC",
    };
    search.make().sort().newest_first();
    expect(search.sort).toMatchObject(sort);
  });

  test("build_query().sort().ascending() should set sort order - check one method", () => {
    let sort = {
      field: "INVOICE_SORT_DATE",
      order: "ASC",
    };
    search.make().sort().descending();
    search.build_query().sort().ascending();
    expect(search.sort).toMatchObject(sort);
  });

  test("make().sort().up() should set sort order", () => {
    let sort = {
      field: "INVOICE_SORT_DATE",
      order: "ASC",
    };
    search.make().sort().descending();
    search.make().sort().up();
    expect(search.sort).toMatchObject(sort);
  });

  test("make().sort().oldest_first() should set sort order", () => {
    let sort = {
      field: "INVOICE_SORT_DATE",
      order: "ASC",
    };
    search.make().sort().descending();
    search.make().sort().oldest_first();
    expect(search.sort).toMatchObject(sort);
  });

  // filter array - add whole arrays
  test("should be able to add an array of ids to an existing location_ids array using make()", () => {
    let id_array = ["doreymefaso", "latte"];
    let expected = [id, other_id, "doreymefaso", "latte"];
    search.make().location_id(id).location_id(other_id);
    search.make().add_location_ids_array(id_array);
    expect(search.location_ids).toEqual(expected);
  });

  test("should be able to add an array of ids to an existing location_ids array using build_query()", () => {
    let id_array = ["doreymefaso", "latte"];
    let expected = [id, other_id, "doreymefaso", "latte"];
    search.make().location_id(id).location_id(other_id);
    search.build_query().add_location_ids_array(id_array);
    expect(search.location_ids).toEqual(expected);
  });

  test("should be able to add an array of ids to an existing customer_ids array using make()", () => {
    let id_array = ["doreymefaso", "latte"];
    let expected = [id, other_id, "doreymefaso", "latte"];
    search.make().customer_id(id).customer_id(other_id);
    search.make().add_customer_ids_array(id_array);
    expect(search.customer_ids).toEqual(expected);
  });

  test("should be able to add an array of ids to an existing location_ids array using build_query()", () => {
    let id_array = ["doreymefaso", "latte"];
    let expected = [id, other_id, "doreymefaso", "latte"];
    search.make().customer_id(id).customer_id(other_id);
    search.build_query().add_customer_ids_array(id_array);
    expect(search.customer_ids).toEqual(expected);
  });
});
