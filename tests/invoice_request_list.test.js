const util = require("../src/lib/utilities");
const spy_shazam_integer = jest.spyOn(util, "shazam_is_integer");
const spy_shazam_number_LE = jest.spyOn(util, "shazam_number_LE");
const Invoice_List = require("../src/lib/invoice_request_list");

/* --------------------------------------------------------*
 *                                                         *
 *                        Invoice_List
 *                                                         *
 * ------------------------------------------------------- */

describe("Invoice_List", () => {
  let list;
  let class_name = "Invoice_List";
  let method = "GET"; //http method from Square docs
  let location_id = "123";
  let other_id = "ABC";

  beforeEach(function () {
    list = new Invoice_List(location_id);
  });

  test("should have display name", () => {
    expect(list._display_name).toBeDefined();
  });

  test("should have the method defined by Square set", () => {
    expect(list.method).toEqual(method);
  });

  test("display name should be same as class name", () => {
    expect(list._display_name).toEqual(class_name);
  });

  test("should have defined square version", () => {
    expect(list.square_version).toBeDefined();
  });

  test("should have defined _help", () => {
    expect(list.help).toBeDefined();
  });
  // endpoint query parameteres
  test("should set the endpoint", () => {
    expect(list.endpoint).toEqual(`?location_id=${location_id}`);
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
    let expected = `?location_id=${location_id}&cursor=${cursor}`;
    let parcel = {
      invoices: { a: 1 },
      cursor: cursor,
    };
    list.delivery = parcel;
    expect(list.endpoint).toEqual(expected);
  });

  // limit mocks

  test("limit setter should call shazam_is_integer", () => {
    let klass = list;
    let test_val = 95;
    let caller = "limit";
    klass[caller] = test_val;
    expect(spy_shazam_integer).toHaveBeenCalledWith(
      test_val,
      class_name,
      caller
    );
  });

  test("limit setter should call shazam_number_LE", () => {
    let klass = list;
    let test_val = 95;
    let caller = "limit";
    let limit_val = klass.configuration.maximums[caller];
    klass[caller] = test_val;
    expect(spy_shazam_number_LE).toHaveBeenCalledWith(
      test_val,
      limit_val,
      class_name,
      caller
    );
  });

  // Make()

  test("make().location_id() should re-set query param", () => {
    let expected = `?location_id=${other_id}`;
    list.make().location_id(other_id);
    expect(list.endpoint).toEqual(expected);
  });

  test("make().limit() should set limit property", () => {
    let val = 50;
    let expected = `?location_id=${location_id}&limit=${val}`;
    list.make().limit(val);
    expect(list.endpoint).toEqual(expected);
  });
});
