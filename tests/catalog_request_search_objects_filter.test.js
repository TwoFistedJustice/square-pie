"use strict";
const Catalog_Search_Filter = require("../src/lib/catalog_request_search_objects_filter");
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

  // not every request class has these
  test("should have defined _body", () => {
    expect(filter.body).toBeDefined();
  });
});

/* --------------------------------------------------------*
 *                                                         *
 *                        Error Checks
 *                                                         *
 * ------------------------------------------------------- */
// describe (`${class_name} error checks`, () => {
//   beforeEach (() => {
//     myVar = new Catalog_Search_Filter();
//     make = myVar.make ();
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
  test("make().sorted_attribute_query () should set ", () => {
    let expected = {
      attribute_name: "name",
      initial_attribute_value: "blueberry",
      sort_order: "ASC",
    };
    make.sorted_attribute_query("name", "blueberry");
    expect(filter.sorted_attribute_query).toEqual(expected);
  });
  test("make().object_type () should set ", () => {
    let expected = "";
    make.object_type(expected);
    expect(filter.object_type).toEqual(expected);
  });
  test("make().text_query () should set ", () => {
    let val1 = "muffin";
    let val2 = "cookie";
    let val3 = "asparagus";
    let expected = [val1, val2, val3];
    make.text_query(val1).text_query(val2).text_query(val3);
    expect(filter.text_query).toEqual(expected);
  });
  test("make().concat_text_query () should set ", () => {
    let val1 = "muffin";
    let val2 = "cookie";
    let val3 = "asparagus";
    let expected = [val1, val2, val3];
    make.text_query(val1).concat_text_query([val2, val3]);
    expect(filter.text_query).toEqual(expected);
  });

  test("make().text_query_add () should set ", () => {
    let expected = "";
    make.text_query_add(expected);
    expect(filter.text_query_add).toEqual(expected);
  });
  test("make().text_query_remove () should remove a word ", () => {
    let val1 = "muffin";
    let val2 = "cookie";
    let val3 = "asparagus";
    let expected = [val1, val3];
    make.text_query(val1).text_query(val2).text_query(val3);
    make.text_query_remove(val2);
    expect(filter.text_query).toEqual(expected);
  });
  test("make().limit () should set ", () => {
    let expected = 5;
    make.limit(expected);
    expect(filter.limit).toEqual(expected);
  });
});

describe("Catalog Request Search Filter", () => {
  let filter;
  beforeEach(() => {
    filter = new Catalog_Search_Filter();
  });
  test(" set exact_query should NOT throw on a correctly formatted input", () => {
    let obj = {
      attribute_name: "name",
      attribute_value: "Coffee",
    };

    expect(() => {
      filter.exact_query = obj;
    }).not.toThrow();
  });

  test("set exact_query should throw on an incorrectly formatted input", () => {
    let wrongProp = {
      wrong_property_name: "this is a wrong property name",
      attribute_value: "This is supposed to fail anyway",
    };
    let wrongType = {
      attribute_name: "both should hold a string - oops",
      attribute_value: 86,
    };
    expect(() => {
      filter.exact_query = wrongProp;
    }).toThrow();

    expect(() => {
      filter.exact_query = wrongType;
    }).toThrow();
  });

  test("set set_query should NOT throw on a correctly formatted input", () => {
    let obj = {
      attribute_name: "name",
      attribute_values: ["Coffee", "Pie"],
    };
    expect(() => {
      filter.set_query = obj;
    }).not.toThrow();
  });

  test("set set_query should throw on an incorrectly formatted input", () => {
    let obj = {
      attribute_name: "name",
      attribute_values: "Coffee",
    };
    expect(() => {
      filter.set_query = obj;
    }).toThrow();
  });

  test("set prefix_query should NOT throw on a correctly formatted input", () => {
    let obj = {
      attribute_name: "name",
      attribute_prefix: "vista",
    };
    expect(() => {
      filter.prefix_query = obj;
    }).not.toThrow();
  });

  test("set prefix_query should throw on an incorrectly formatted input", () => {
    let wrong = {
      attribute_nam: "name",
      attribute_prefix: "vista",
    };
    expect(() => {
      filter.prefix_query = wrong;
    }).toThrow();
  });

  test("set range_query should NOT throw on a correctly formatted input", () => {
    let obj = {
      attribute_name: "amount",
      attribute_min_value: 450,
      attribute_max_value: 550,
    };
    expect(() => {
      filter.range_query = obj;
    }).not.toThrow();
  });

  test("set range_query should throw on an incorrectly formatted input: missing attribute_name", () => {
    let wrong = {
      attribute_min_value: 450,
      attribute_max_value: 550,
    };
    expect(() => {
      filter.range_query = wrong;
    }).toThrow();
  });

  test("set range_query should throw on an incorrectly formatted input: missing ", () => {
    let wrong = {
      attribute_name: ["amount"],
      attribute_min_value: 450,
      attribute_max_value: 550,
    };
    expect(() => {
      filter.range_query = wrong;
    }).toThrow();
  });

  test("set text_query should NOT throw on an array with 1 - 3 elements", () => {
    let arr = ["Coffee", "Tea", "Life Force"];
    expect(() => {
      filter.text_query = arr;
    }).not.toThrow();
  });

  test("set text_query should throw on an array longer than 3", () => {
    let wrong = ["Zombies", "Vampires", "Goblins", "Karens"];
    expect(() => {
      filter.text_query = wrong;
    }).toThrow();
  });

  test("set sorted_attribute_query should NOT throw if 'sort_order' contains \"ASC\"", () => {
    let obj = {
      attribute_name: "description",
      sort_order: "ASC",
    };
    expect(() => {
      filter.sorted_attribute_query = obj;
    }).not.toThrow();
  });

  test("set sorted_attribute_query should throw if 'attribute_name' prop missing from arg", () => {
    let wrong = {
      sort_order: "ASC",
    };
    expect(() => {
      filter.sorted_attribute_query = wrong;
    }).toThrow();
  });

  test("set sorted_attribute_query should throw if 'sort_order' contains wrong value", () => {
    let wrong = {
      sort_order: "ASV",
    };
    expect(() => {
      filter.sorted_attribute_query = wrong;
    }).toThrow();
  });

  test("text_query_add should add a new element and remove the last element of query.text_area_keywords array it already has 3", () => {
    let expected = { keywords: ["zero", "one", "three"] };
    filter
      .text_query_add("zero")
      .text_query_add("one")
      .text_query_add("two")
      .text_query_add("three");

    expect(filter.text_query).toMatchObject(expected);
  });

  test("text_query_remove should remove the specified word from the query.text_area_keywords array", () => {
    // const filter = new Catalog_Search_Filter();
    let expected = { keywords: ["zero", "two"] };
    filter
      .text_query_add("zero")
      .text_query_add("one")
      .text_query_add("two")
      .text_query_remove("one");

    expect(filter.text_query).toMatchObject(expected);
  });

  test("text_query_remove should throw an error if attempting to remove an element from an non-existent keywords array", () => {
    expect(() => {
      filter.text_query_remove("one");
    }).toThrow();
  });

  test("text_query_remove should throw an error if attempting to remove an element from an empty keywords array", () => {
    filter.text_query_add("a").text_query_remove("a");
    expect(() => {
      filter.text_query_remove("one");
    }).toThrow();
  });

  test("set object_types should throw if user attempts to add a value that already exists", () => {
    expect(() => {
      filter.make().object_type().category().item().item();
    }).toThrow();
  });
});
