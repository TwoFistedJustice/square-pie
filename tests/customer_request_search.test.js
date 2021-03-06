const Customer_Search = require("../src/lib/customer_request_search");

let search;
/* --------------------------------------------------------*
 *                                                         *
 *                        Customer_Search
 *                                                         *
 * ------------------------------------------------------- */
describe("Customer_Search", () => {
  let class_name = "Customer_Search";
  let endpoint = "/search"; //copy and paste from Square docs
  let method = "POST"; //http method from Square docs
  beforeEach(function () {
    search = new Customer_Search();
  });

  test("should have _display_name", () => {
    expect(search._display_name).toBeDefined();
  });
  test("should have display_name", () => {
    expect(search.display_name).toBeDefined();
  });

  test("_display_name should be same as class name", () => {
    expect(search._display_name).toEqual(class_name);
  });
  test("display_name should be same as class name", () => {
    expect(search.display_name).toEqual(class_name);
  });

  test("should have the method defined by Square set", () => {
    expect(search.method).toEqual(method);
  });

  test("should have defined _last_verified_square_api_version", () => {
    expect(search._last_verified_square_api_version).toBeDefined();
  });

  test("should have defined square version", () => {
    expect(search.square_version).toBeDefined();
  });

  test("should have defined _help", () => {
    expect(search._help).toBeDefined();
  });

  test("should have defined help", () => {
    expect(search.help).toBeDefined();
  });

  test("should have an endpoint", () => {
    expect(search.endpoint).toEqual(endpoint);
  });

  test("should have _delivery", () => {
    search.delivery = { customers: [{ a: 1 }] };
    expect(search.delivery).toBeDefined();
  });

  test("Delivery should trap return values", () => {
    let expected = { a: 1 };
    search.delivery = { customers: expected };
    expect(search.delivery).toMatchObject(expected);
  });

  test("Delivery should trap errors ", () => {
    let expected = { a: 1 };
    search.delivery = { errors: [expected] };
    expect(search.delivery.errors[0]).toMatchObject(expected);
  });

  // not every request class has these
  test("should have defined _body", () => {
    expect(search.body).toBeDefined();
  });
});

/* --------------------------------------------------------*
 *                                                         *
 *                        query - fuzzy
 *                                                         *
 * ------------------------------------------------------- */
describe("Customer_Search query - fuzzy", () => {
  let expected;

  beforeEach(function () {
    search = new Customer_Search();
  });

  test("Query().exact() should set email_address", () => {
    let val = "there.can.be.only.one@highlander.com";
    expected = {
      query: {
        filter: {
          email_address: {
            exact: val,
          },
        },
        sort: {
          field: "DEFAULT",
          order: "ASC",
        },
      },
    };
    search.query().exact().email(val);
    expect(search.body).toMatchObject(expected);
  });

  test("Query().fuzzy() should set email_address", () => {
    let val = "example.com";
    expected = {
      query: {
        filter: {
          email_address: {
            fuzzy: val,
          },
        },
        sort: {
          field: "DEFAULT",
          order: "ASC",
        },
      },
    };
    search.query().fuzzy().email(val);
    expect(search.body).toMatchObject(expected);
  });

  test("Query().fuzzy() should set phone_number", () => {
    let val = "41555";
    let fn = "phone";
    expected = {
      query: {
        filter: {
          phone_number: {
            fuzzy: val,
          },
        },
        sort: {
          field: "DEFAULT",
          order: "ASC",
        },
      },
    };
    search.query().fuzzy()[fn](val);
    expect(search.body).toMatchObject(expected);
  });

  test("Query().fuzzy() should set reference_id", () => {
    let val = "123";
    let fn = "id";
    expected = {
      query: {
        filter: {
          reference_id: {
            fuzzy: val,
          },
        },
        sort: {
          field: "DEFAULT",
          order: "ASC",
        },
      },
    };
    search.query().fuzzy()[fn](val);
    expect(search.body).toMatchObject(expected);
  });

  test("Query().fuzzy() should set limit", () => {
    let val = 42;
    let fn = "limit";
    expected = {
      query: {
        sort: {
          field: "DEFAULT",
          order: "ASC",
        },
      },
      limit: val,
    };
    search.query().fuzzy()[fn](val);
    expect(search.body).toMatchObject(expected);
  });

  test("Query().fuzzy() should set sort order", () => {
    let val = "DESC";
    expected = {
      query: {
        sort: {
          field: "DEFAULT",
          order: val,
        },
      },
    };
    search.query().fuzzy().sortDown();
    expect(search.body).toMatchObject(expected);
  });

  test("Query().fuzzy() should set sort order", () => {
    let val = "ASC";
    expected = {
      query: {
        sort: {
          field: "DEFAULT",
          order: val,
        },
      },
    };
    search.query().fuzzy().sortDown().sortUp();
    expect(search.body).toMatchObject(expected);
  });

  test("Query().fuzzy() should set sort field", () => {
    let val = "DEFAULT";
    expected = {
      query: {
        sort: {
          field: val,
          order: "ASC",
        },
      },
    };
    search.query().fuzzy().sortByFirstName();
    expect(search.body).toMatchObject(expected);
  });

  test("Query().fuzzy() should set sort field", () => {
    let val = "CREATED_AT";
    expected = {
      query: {
        sort: {
          field: val,
          order: "ASC",
        },
      },
    };
    search.query().fuzzy().sortByDate();
    expect(search.body).toMatchObject(expected);
  });

  test("Query().fuzzy() should set sort field", () => {
    expected = {
      query: {
        sort: {
          field: "CREATED_AT",
          order: "ASC",
        },
      },
    };
    search.query().fuzzy().sortByMostRecent();
    expect(search.body).toMatchObject(expected);
  });
});
