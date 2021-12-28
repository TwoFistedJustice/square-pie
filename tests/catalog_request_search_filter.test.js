"use strict";
const Catalog_Search_Filter = require("../src/lib/catalog_request_search_objects_filter");

// tack on .only to this empty test to silence all other tests
describe("silence test suite", () => {
  test("", () => {
    expect("a").toEqual("a");
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
