"use strict";
const Catalog_Search_Filter = require("../src/lib/catalog_request_search_objects_filter");
const { helper_arrays } = require("./helper_arrays");
let filter, make;
const class_name = "Catalog_Search_Filter";
const method = "POST"; //http method from Square docs
let endpoint = "/search"; //copy and paste from Square docs
/* --------------------------------------------------------*
 *                                                         *
 *                        common structures
 *                                                         *
 * ------------------------------------------------------- */
describe(`${class_name} basic request class structures`, () => {
  beforeEach(function () {
    filter = new Catalog_Search_Filter();
  });
  test("should have display name", () => {
    expect(filter._display_name).toBeDefined();
  });
  test("should have the method defined by Square set", () => {
    expect(filter.method).toEqual(method);
  });
  test("display name should be same as class name", () => {
    expect(filter.display_name).toEqual(class_name);
  });
  test("should have defined square version", () => {
    expect(filter.square_version).toBeDefined();
  });
  test("should have defined _help", () => {
    expect(filter.help).toBeDefined();
  });
  test("should have an endpoint", () => {
    expect(filter.endpoint).toEqual(endpoint);
  });
  test("should have _delivery", () => {
    filter.delivery = { someProp: { a: 1 } };
    expect(filter.delivery).toBeDefined();
  });

  test("should have defined _body", () => {
    expect(filter.body).toBeDefined();
  });
});

/* --------------------------------------------------------*
 *                                                         *
 *                        Error Checks
 *                                                         *
 * ------------------------------------------------------- */

/* --------------------------------------------------------*
 *                                                         *
 *                        getters/setters
 *                                                         *
 * ------------------------------------------------------- */

describe(`${class_name} getters/setters`, () => {
  beforeEach(() => {
    filter = new Catalog_Search_Filter();
    make = filter.make();
  });
  test("make().include_related_objects () should set ", () => {
    let expected = true;
    make.include_related_objects(true);
    expect(filter.include_related_objects).toEqual(expected);
  });
  test("make().begin_time () should set ", () => {
    let expected = "2016-09-04T23:59:33.123Z";
    make.begin_time(expected);
    expect(filter.begin_time).toEqual(expected);
  });
  test("make().exact_query () should set ", () => {
    let expected = {
      attribute_name: "type",
      attribute_value: "ITEM",
    };
    make.exact_query("type", "ITEM");
    expect(filter.exact_query).toEqual(expected);
  });
  test("make().prefix_query () should set ", () => {
    let expected = {
      attribute_name: "type",
      attribute_prefix: "ITEM",
    };
    make.prefix_query("type", "ITEM");
    expect(filter.prefix_query).toEqual(expected);
  });
  test("make().range_query () should set ", () => {
    let expected = {
      attribute_name: "amount",
      attribute_min_value: 5,
      attribute_max_value: 30,
    };
    make.range_query("amount", 5, 30);
    expect(filter.range_query).toEqual(expected);
  });

  test("make().limit () should set ", () => {
    let expected = 5;
    make.limit(expected);
    expect(filter.limit).toEqual(expected);
  });
});

describe("Catalog Request Search Filter", () => {
  beforeEach(() => {
    filter = new Catalog_Search_Filter();
    make = filter.make();
  });

  /* --------------------------------------------------------*
   *                                                         *
   *                        exact_query
   *                                                         *
   * ------------------------------------------------------- */

  test(" set exact_query should NOT throw on a correctly formatted input", () => {
    let expected = {
      exact_query: {
        attribute_name: "name",
        attribute_value: "Coffee",
      },
    };

    make.exact_query("name", "Coffee");
    expect(filter.query).toMatchObject(expected);
  });

  /* --------------------------------------------------------*
   *                                                         *
   *                prefix_query
   *                                                         *
   * ------------------------------------------------------- */
  test("set prefix_query should NOT throw on a correctly formatted input", () => {
    let expected = {
      prefix_query: {
        attribute_name: "name",
        attribute_prefix: "vista",
      },
    };
    make.prefix_query("name", "vista");
    expect(filter.query).toMatchObject(expected);
  });

  /* --------------------------------------------------------*
   *                                                         *
   *                        range_query
   *                                                         *
   * ------------------------------------------------------- */

  test("make()range_query() ", () => {
    let expected = {
      range_query: {
        attribute_name: "amount",
        attribute_min_value: 450,
        attribute_max_value: 550,
      },
    };

    make.range_query("amount", 450, 550);
    expect(filter.query).toMatchObject(expected);
  });

  test("set range_query should throw on if min is not an integer", () => {
    expect(() => {
      make.range_query("amount", 35.5, 36);
    }).toThrowError(/range_query/);
  });

  test("set range_query should throw on if max is not an integer", () => {
    expect(() => {
      make.range_query("amount", 35, 35.5);
    }).toThrowError(/range_query/);
  });

  /* --------------------------------------------------------*
   *                                                         *
   *                        set_query
   *                                                         *
   * ------------------------------------------------------- */

  test("set set_query() should set ", () => {
    let expected = {
      attribute_name: "name",
      attribute_values: ["coffee"],
    };

    filter.set_query = expected;
    expect(filter.set_query).toMatchObject(expected);
  });

  test("make().set_query() should initialize with an empty array ", () => {
    let expected = {
      set_query: {
        attribute_name: undefined,
        attribute_values: [],
      },
    };

    make.set_query();
    expect(filter.query).toMatchObject(expected);
  });

  test("make().set_query() should add single values to the array ", () => {
    let expected = {
      set_query: {
        attribute_name: "name",
        attribute_values: ["coffee"],
      },
    };

    make.set_query().name("name").value("coffee");
    expect(filter.query).toMatchObject(expected);
  });

  test("make().set_query() should add single values to the array ", () => {
    let expected = {
      set_query: {
        attribute_name: "name",
        attribute_values: ["coffee", "pie"],
      },
    };

    make.set_query().name("name").value("coffee").value("pie");
    expect(filter.query).toMatchObject(expected);
  });

  test("make().set_query() should concat arrays ", () => {
    let expected = {
      set_query: {
        attribute_name: "name",
        attribute_values: ["coffee", "pie", "tea", "cake"],
      },
    };

    make
      .set_query()
      .name("name")
      .value("coffee")
      .value("pie")
      .concat_values(["tea", "cake"]);
    expect(filter.query).toMatchObject(expected);
  });

  test("make().set_query() should allow array equal to limit ", () => {
    make.set_query().name("name").value("coffee");
    expect(() => {
      make.set_query().concat_values(helper_arrays.len_249);
    }).not.toThrow();
  });

  test("make().set_query() should throw if array exceeds limit ", () => {
    make.set_query().name("name").value("coffee").value("pie");
    expect(() => {
      make.set_query().concat_values(helper_arrays.len_249);
    }).toThrowError(/set_query holds an array with a maximum/);
  });

  /* --------------------------------------------------------*
   *                                                         *
   *                        text_query
   *                                                         *
   * ------------------------------------------------------- */

  test("make().text_query() should add single values to the array ", () => {
    let expected = {
      text_query: {
        keywords: ["coffee", "pie"],
      },
    };

    make.text_query("coffee").text_query("pie");
    expect(filter.query).toMatchObject(expected);
  });

  test("make().text_query() and make().text_query_concat() should work together ", () => {
    let expected = {
      text_query: {
        keywords: ["coffee", "pie", "cake"],
      },
    };
    make.text_query("coffee").text_query_concat(["pie", "cake"]);
    expect(filter.query).toMatchObject(expected);
    expect(filter.text_query).toMatchObject(expected.text_query);
  });

  test("concat_text_query should NOT throw on an array with 3 elements", () => {
    let arr = ["Coffee", "Tea", "Life Force"];
    expect(() => {
      make.text_query_concat(arr);
    }).not.toThrow();
  });

  test("concat_text_query  should throw on an array longer than 3", () => {
    let wrong = ["Zombies", "Vampires", "Goblins", "Karens"];
    expect(() => {
      make.text_query_concat(wrong);
    }).toThrowError(/text_query can hold a maximum of/);
  });

  test("concat_text_query  should throw on an array longer than 3", () => {
    let wrong = ["Zombies", "Vampires", "Goblins", "Karens"];
    expect(() => {
      make.text_query_concat(wrong);
    }).toThrowError(/text_query can hold a maximum of/);
  });

  test("make().text_query() and make().text_query_concat() should throw if concatenated length exceeds limit ", () => {
    expect(() => {
      make.text_query("coffee").text_query_concat(["pie", "cake", "vampires"]);
    }).toThrowError(/text_query can hold a maximum of/);
  });

  test("make().text_query() should throw if length exceeds limit ", () => {
    expect(() => {
      make
        .text_query("coffee")
        .text_query("pie")
        .text_query("cake")
        .text_query("vampires");
    }).toThrowError(/text_query can hold a maximum of/);
  });

  test("text_query_remove should remove a word", () => {
    let expected = {
      text_query: {
        keywords: ["Coffee", "Life Force"],
      },
    };
    let arr = ["Coffee", "Tea", "Life Force"];
    make.text_query_concat(arr);
    make.text_query_remove("Tea");
    expect(filter.query).toMatchObject(expected);
  });

  test("text_query_remove should throw on an empty array", () => {
    expect(() => {
      make.text_query_remove("Tea");
    }).toThrowError(/not found in text_query.keywords/);
  });

  test("text_query_remove should throw if word not found in array", () => {
    make.text_query("coffee").text_query("tea");
    expect(() => {
      make.text_query_remove("Tea");
    }).toThrowError(/not found in text_query.keywords/);
  });

  /* --------------------------------------------------------*
   *                                                         *
   *                        object_types
   *                                                         *
   * ------------------------------------------------------- */

  test("make().object_types() should push one value", () => {
    let expected = ["ITEM"];
    make.object_type().item();
    expect(filter.object_types).toMatchObject(expected);
  });

  test("make().object_types() should curry-over", () => {
    let expected = ["ITEM", "CATEGORY"];
    make.object_type().item().type().category();
    expect(filter.object_types).toMatchObject(expected);
  });

  test("set object_types should throw if user attempts to add a value that already exists", () => {
    expect(() => {
      filter.make().object_type().category().type().item().type().item();
    }).toThrowError(/object_types array already contains/);
  });

  test("make().object_types_concat() should set", () => {
    let expected = ["ITEM", "CATEGORY"];
    make.concat_object_types(expected);
    expect(filter.object_types).toMatchObject(expected);
  });

  /* --------------------------------------------------------*
   *                                                         *
   *                        sorted_attribute_query
   *                                                         *
   * ------------------------------------------------------- */

  test("set sorted_attribute_query", () => {
    let expected = {
      attribute_name: "type",
      initial_attribute_value: undefined,
      sort_order: "ASC",
    };

    filter.sorted_attribute_query = expected;
    expect(filter.sorted_attribute_query).toMatchObject(expected);
  });

  test("make_sorted_attribute_query", () => {
    let expected = {
      sorted_attribute_query: {
        attribute_name: "type",
        initial_attribute_value: undefined,
        sort_order: "ASC",
      },
    };

    make.sorted_attribute_query().attribute_name("type");
    expect(filter.query).toMatchObject(expected);
  });

  test("make_sorted_attribute_query", () => {
    let expected = {
      sorted_attribute_query: {
        attribute_name: undefined,
        initial_attribute_value: "ITEM",
        sort_order: "ASC",
      },
    };

    make.sorted_attribute_query().initial_attribute_value("ITEM");
    expect(filter.query).toMatchObject(expected);
  });

  test("make_sorted_attribute_query", () => {
    let expected = {
      sorted_attribute_query: {
        attribute_name: "type",
        initial_attribute_value: undefined,
        sort_order: "ASC",
      },
    };

    make.sorted_attribute_query().key("type");
    expect(filter.query).toMatchObject(expected);
  });

  test("make_sorted_attribute_query", () => {
    let expected = {
      sorted_attribute_query: {
        attribute_name: "type",
        initial_attribute_value: undefined,
        sort_order: "ASC",
      },
    };

    make.sorted_attribute_query().name("type");
    expect(filter.query).toMatchObject(expected);
  });

  test("make_sorted_attribute_query", () => {
    let expected = {
      sorted_attribute_query: {
        attribute_name: undefined,
        initial_attribute_value: "ITEM",
        sort_order: "ASC",
      },
    };

    make.sorted_attribute_query().value("ITEM");
    expect(filter.query).toMatchObject(expected);
    expect(filter.sorted_attribute_query).toMatchObject(
      expected.sorted_attribute_query
    );
  });

  test("make_sorted_attribute_query", () => {
    let expected = {
      sorted_attribute_query: {
        attribute_name: undefined,
        initial_attribute_value: undefined,
        sort_order: "DESC",
      },
    };
    make.sorted_attribute_query().sort_order().descending();
    expect(filter.query).toMatchObject(expected);
  });

  test("make_sorted_attribute_query", () => {
    let expected = {
      sorted_attribute_query: {
        attribute_name: undefined,
        initial_attribute_value: undefined,
        sort_order: "DESC",
      },
    };
    make.sorted_attribute_query().sort().down();
    expect(filter.query).toMatchObject(expected);
  });

  test("make_sorted_attribute_query", () => {
    let expected = {
      sorted_attribute_query: {
        attribute_name: "type",
        initial_attribute_value: "ITEM",
        sort_order: "DESC",
      },
    };
    make.sorted_attribute_query().sort().down().key("type").value("ITEM");
    expect(filter.query).toMatchObject(expected);
  });

  test("make_sorted_attribute_query should curry-over", () => {
    let expected = {
      sorted_attribute_query: {
        attribute_name: undefined,
        initial_attribute_value: "ITEM",
        sort_order: "DESC",
      },
    };
    make
      .sorted_attribute_query()
      .sort_order()
      .descending()
      .initial_attribute_value("ITEM");
    expect(filter.query).toMatchObject(expected);
  });
});
