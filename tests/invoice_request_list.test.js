const Invoice_List = require("../src/lib/invoice_request_list");
describe("silence test suite", () => {
  test("", () => {
    expect("").toEqual("");
  });
});

/* --------------------------------------------------------*
 *                                                         *
 *                        Invoice_List
 *                                                         *
 * ------------------------------------------------------- */

describe("Invoice_List", () => {
  let list;
  let class_name = "Invoice_List";
  let location_id = "123";
  let other_id = "ABC";
  beforeEach(function () {
    list = new Invoice_List(location_id);
  });

  test("should have display name", () => {
    expect(list._display_name).toBeDefined();
  });

  test("should have the method defined by Square set", () => {
    expect(list.method).toEqual("GET");
  });

  test("display name should be same as class name", () => {
    expect(list._display_name).toEqual(class_name);
  });

  test("should have defined square version", () => {
    expect(list.square_version).toBeDefined();
  });

  // endpoint query parameteres
  test("should set the endpoint", () => {
    expect(list.endpoint).toEqual(`?location_id=${location_id}`);
  });

  test("should throw if location_id is undefined", () => {
    let tosser = new Invoice_List();
    expect(() => {
      tosser.endpoint;
    }).toThrow();
  });

  test("should create new endpoint with new id", () => {
    let newbie = new Invoice_List(other_id);
    let expected = "?location_id=ABC";
    expect(newbie.endpoint).toEqual(expected);
  });

  test("should add limit to endpoint", () => {
    let limit = 50;
    let expected = `?location_id=123&limit=${limit}`;
    list.make().limit(limit);
    expect(list.endpoint).toEqual(expected);
  });

  test("should add cursor to endpoint", () => {
    let cursor = other_id;
    let expected = `?location_id=123&cursor=${cursor}`;
    let parcel = {
      invoices: [{ a: 1 }],
      cursor: cursor,
    };
    list.delivery = parcel;
    expect(list.endpoint).toEqual(expected);
  });

  test("should add new location_Id, cursor, and limit", () => {
    let newbie = new Invoice_List(other_id);
    let limit = 50;
    let cursor = location_id;
    let parcel = {
      invoices: [{ a: 1 }],
      cursor: cursor,
    };
    let expected = `?location_id=${other_id}&limit=${limit}&cursor=${location_id}`;
    newbie.make().limit(limit);
    newbie.delivery = parcel;
    expect(newbie.endpoint).toEqual(expected);
  });

  // delivery
  test("should have _delivery as an array with one member", () => {
    let expected = [{ a: 1 }];
    list.delivery = { invoices: { a: 1 } };
    expect(list.delivery).toEqual(expect.arrayContaining(expected));
  });

  test("Cursor should be set automatically if it's in the response", () => {
    let cursor = "123";
    let parcel = {
      invoices: { a: 1 },
      cursor: cursor,
    };
    list.delivery = parcel;
    expect(list.cursor).toEqual(cursor);
  });

  // limit
  test("limit should throw on a non-integer", () => {
    expect(() => {
      list.limit = 95.5;
    }).toThrow();
  });

  test("limit should throw if it exceeds limit", () => {
    expect(() => {
      list.limit = 201;
    }).toThrow();
  });

  test("limit should not throw if it deceeds limit", () => {
    expect(() => {
      list.limit = 199;
    }).not.toThrow();
  });

  // Make()

  test("make().location_id() should set PRIMARY property", () => {
    list.make().location_id(other_id);
    expect(list.location_id).toEqual(other_id);
  });

  test("make().limit() should set limit property", () => {
    let val = 50;
    list.make().limit(val);
    expect(list.limit).toEqual(val);
  });
});
