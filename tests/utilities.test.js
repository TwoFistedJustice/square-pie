"use strict";
const {
  defineify,
  query_param_add_value,
  query_param_is_present,
  query_param_is_query_string,
  query_param_replace_value,
  query_string_builder,
  query_string_endpoint,
  normalize_email,
  arrayify,
  generate_error_message,
  shazam_is_time_RFC3339,
  shazam_date_human_readable,
  shazam_object_has_property,
  shazam_number_LT,
  shazam_number_LE,
  shazam_number_GT,
  shazam_number_GE,
  shazam_number_between_equals,
} = require("../src/lib/utilities");

const { dateCodes } = require("./helper_objects");

/* --------------------------------------------------------*
 *                                                         *
 *                        defineify
 *                                                         *
 * ------------------------------------------------------- */
describe("defineify", () => {
  test("should add property to object", () => {
    let value = { a: 1 };
    let expected = {
      key: value,
    };
    let patient = {};

    defineify(patient, "key", value);

    expect(patient).toMatchObject(expected);
  });
});

/* --------------------------------------------------------*
 *                                                         *
 *                        arrayify
 *                                                         *
 * ------------------------------------------------------- */
describe("arrayify", () => {
  test("arrayify should set an array on an arrayless property", () => {
    let obj = {
      prop: undefined,
    };
    let expected = {
      prop: [],
    };
    arrayify(obj, "prop");
    expect(obj).toMatchObject(expected);
  });

  test("arrayify should not modify a property with an existing array", () => {
    let obj = {
      prop: ["zero"],
    };
    let expected = {
      prop: ["zero"],
    };
    arrayify(obj, "prop");
    expect(obj).toMatchObject(expected);
  });

  test("arrayify should throw correct error message", () => {
    let not_an_enumerable_object = 2;
    let expected = "describe.test Cannot create property 'test' on number '2'";
    expect(() => {
      arrayify(not_an_enumerable_object, "test", "describe");
    }).toThrowError(expected);
  });

  test("arrayify should set caller arg to property name arg if caller is not included", () => {
    let not_an_enumerable_object = 2;
    let expected = "test.caller Cannot create property 'caller' on number '2'";
    expect(() => {
      arrayify(not_an_enumerable_object, "caller", "test");
    }).toThrowError(expected);
  });
});
/* --------------------------------------------------------*
 *                                                         *
 *                        generate_error_message
 *                                                         *
 * ------------------------------------------------------- */
describe("generate_error_message", () => {
  test("generate_error_message should generate the correct string", () => {
    let key = "some_key";
    let expected_type = "number";
    let received = true;
    let expected = `${key}\n expected type: ${expected_type}\n received type: boolean\nvalue received: ${received} `;

    expect(generate_error_message(key, expected_type, received)).toEqual(
      expected
    );
  });
});

describe("shazam_33339 date code verification utility", () => {
  test("should throw when fed a non-RFC3339 date code", () => {
    expect(() => {
      shazam_is_time_RFC3339(
        dateCodes.notRFC3339,
        "utilities test suite",
        "should throw"
      );
    }).toThrow();
  });

  test("should NOT throw when fed an RFC3339 date code", () => {
    expect(() => {
      shazam_is_time_RFC3339(
        dateCodes.RFC3339,
        "utilities test suite",
        "should NOT throw"
      );
    }).not.toThrow();
  });

  test("should return true when fed an RFC3339 date code", () => {
    expect(
      shazam_is_time_RFC3339(
        dateCodes.RFC3339,
        "utilities test suite",
        "should return true"
      )
    ).toEqual(true);
  });
});

/* --------------------------------------------------------*
 *                                                         *
 *                        normalize_email
 *                                                         *
 * ------------------------------------------------------- */
describe("normalize_email utility", () => {
  test("should not reject a yahoo -whatev address", () => {
    expect(() => {
      normalize_email("foo-bar@yahoo.com", "test", "yahoo address");
    }).not.toThrow();
  });

  test("should throw if missing @", () => {
    expect(() => {
      normalize_email("buffyscoobies.org", "test", "missing @");
    }).toThrow();
  });

  test("should throw if missing .whatever", () => {
    expect(() => {
      normalize_email("buffy@scoobiesorg", "test", "missing dot");
    }).toThrow();
  });

  test("should not throw if fed valid email", () => {
    expect(() => {
      normalize_email("buffy@scoobies.org", "test", "missing @");
    }).not.toThrow();
  });

  test("should return a normalized email", () => {
    let email = "buFFy@scoobies.org";
    let received = normalize_email(email, "test", "return value");
    let expected = "buffy@scoobies.org";
    expect(received).toEqual(expected);
  });
});
/* --------------------------------------------------------*
 *                                                         *
 *              query_param_replace_value
 *                                                         *
 * ------------------------------------------------------- */

describe("query_param_add_value", () => {
  test("should add value if only one exists alreday", () => {
    let query_string = "?status=OPEN";
    let param = "status";
    let value_to_add = "PAID";
    let expected = `${query_string},${value_to_add}`;
    expect(query_param_add_value(query_string, param, value_to_add)).toEqual(
      expected
    );
  });

  test("should add param if more than one value already exists", () => {
    let query_string = "?status=OPEN,DRAFT";
    let param = "status";
    let replacment_value = "PAID";
    let expected = `?status=${replacment_value},DRAFT`;
    expect(
      query_param_replace_value(query_string, param, replacment_value)
    ).toEqual(expected);
  });

  test("should replace value when more than one param exists", () => {
    let query_string = "?status=OPEN,DRAFT&type=ITEM,TAX,MODIFIER&version=3";
    let param = "version";
    let replacement_value = 42;
    let expected = `?status=OPEN,DRAFT&type=ITEM,TAX,MODIFIER&version=${replacement_value}`;
    expect(
      query_param_replace_value(query_string, param, replacement_value)
    ).toEqual(expected);
  });

  test("should replace value when more than one param exists", () => {
    let query_string = "?status=OPEN,DRAFT&version=3&type=ITEM,TAX,MODIFIER";
    let param = "version";
    let replacement_value = 42;
    let expected = `?status=OPEN,DRAFT&version=${replacement_value}&type=ITEM,TAX,MODIFIER`;
    expect(
      query_param_replace_value(query_string, param, replacement_value)
    ).toEqual(expected);
  });
});

/* --------------------------------------------------------*
 *                                                         *
 *                   query_param_add_value
 *                                                         *
 * ------------------------------------------------------- */

describe("query_param_add_value", () => {
  test("should replace value if only one exists alreday", () => {
    let query_string = "?status=OPEN";
    let param = "status";
    let value_to_add = "PAID";
    let expected = `?status=OPEN,${value_to_add}`;
    expect(query_param_add_value(query_string, param, value_to_add)).toEqual(
      expected
    );
  });

  test("should replace first param if more than one value already exists", () => {
    let query_string = "?status=OPEN,DRAFT";
    let param = "status";
    let value_to_add = "PAID";
    let expected = `${query_string},${value_to_add}`;
    expect(query_param_add_value(query_string, param, value_to_add)).toEqual(
      expected
    );
  });

  test("should add value to first param when more than one param exist", () => {
    let query_string = "?status=OPEN,DRAFT&type=ITEM,TAX,MODIFIER&version=3";
    let param = "status";
    let value_to_add = "PAID";
    let expected = `?status=OPEN,DRAFT,${value_to_add}&type=ITEM,TAX,MODIFIER&version=3`;
    expect(query_param_add_value(query_string, param, value_to_add)).toEqual(
      expected
    );
  });

  test('should add value to second param when more than one param exist"', () => {
    let query_string = "?status=OPEN,DRAFT&type=ITEM,TAX,MODIFIER&version=3";
    let param = "type";
    let value_to_add = "IMAGE";
    let expected = `?status=OPEN,DRAFT&type=ITEM,TAX,MODIFIER,${value_to_add}&version=3`;
    expect(query_param_add_value(query_string, param, value_to_add)).toEqual(
      expected
    );
  });

  test('should add value to second param when an existing value contains an underscore"', () => {
    let query_string =
      "?status=OPEN,DRAFT&type=ITEM,TAX,MODIFIER_LIST&version=3";
    let param = "type";
    let value_to_add = "IMAGE";
    let expected = `?status=OPEN,DRAFT&type=ITEM,TAX,MODIFIER_LIST,${value_to_add}&version=3`;
    expect(query_param_add_value(query_string, param, value_to_add)).toEqual(
      expected
    );
  });
});

/* --------------------------------------------------------*
 *                                                         *
 *                  query_param_is_present
 *                                                         *
 * ------------------------------------------------------- */
describe("query_param_is_present", () => {
  test("should return true if only one param exists with a single value", () => {
    let query_string = "?status=OPEN";
    let param = "status";
    let expected = true;
    expect(query_param_is_present(query_string, param)).toEqual(expected);
  });

  test("should return true if only one param exists with a multiple values", () => {
    let query_string = "?status=OPEN,DRAFT,PAID";
    let param = "status";
    let expected = true;
    expect(query_param_is_present(query_string, param)).toEqual(expected);
  });

  test("should return true if multiple params exists with a multiple values", () => {
    let query_string = "?status=OPEN,DRAFT&type=ITEM,TAX,MODIFIER&version=3";
    let param = "type";
    let expected = true;
    expect(query_param_is_present(query_string, param)).toEqual(expected);
  });

  test("should return false if multiple params exists with a multiple values but sought param not present", () => {
    let query_string = "?status=OPEN,DRAFT&type=ITEM,TAX,MODIFIER&version=3";
    let param = "glarkenfargen";
    let expected = false;
    expect(query_param_is_present(query_string, param)).toEqual(expected);
  });

  test("should return false if query string is an empty string", () => {
    let query_string = "";
    let param = "glarkenfargen";
    let expected = false;
    expect(query_param_is_present(query_string, param)).toEqual(expected);
  });
});

/* --------------------------------------------------------*
 *                                                         *
 *                        query_param_is_query_string
 *                                                         *
 * ------------------------------------------------------- */
describe("query_param_is_query_string", () => {
  test("query_param_is_query_string should return true", () => {
    let expected = true;
    let test_string = "?glarken_fargen=nugen_schatzen";
    expect(query_param_is_query_string(test_string)).toEqual(expected);
  });

  test("query_param_is_query_string should return false on a question", () => {
    let expected = false;
    let test_string = "How many glarekens can a nugen-schatzen fargen?";
    expect(query_param_is_query_string(test_string)).toEqual(expected);
  });

  test("query_param_is_query_string should return false if question mark is not first character", () => {
    let expected = false;
    let test_string = "a?glarken_fargen&nugen_schatzen";
    expect(query_param_is_query_string(test_string)).toEqual(expected);
  });

  test("query_param_is_query_string should return false if no equals sign in present", () => {
    let expected = false;
    let test_string = "?glarken_fargen&nugen_schatzen";
    expect(query_param_is_query_string(test_string)).toEqual(expected);
  });
});

/* --------------------------------------------------------*
 *                                                         *
 *               endpoint string query builder
 *                                                         *
 * ------------------------------------------------------- */

describe("endpoint string query builder", () => {
  test("is_empty", () => {
    let testStr = "";
    let key = "type";
    let value = "ITEM";
    let expected = "?type=ITEM";
    // calls it_is_empty(key, value)
    expect(query_string_builder(testStr, key, value)).toEqual(expected);
  });

  test("it_has_key_but_not_ampersand(testStr, value)", () => {
    let testStr = "?pets=DOGS";
    let key = "pets";
    let value = "CATS";
    let expected = "?pets=DOGS,CATS";
    expect(query_string_builder(testStr, key, value)).toEqual(expected);
  });

  test("it_has_other_keys_but_not_this_key(testStr, key, value)", () => {
    let testStr = "?beer=pilsner,stout&cookies=vegan%20chocolate%20chip";
    let key = "guitars";
    let value = "hamer";
    let expected =
      "?beer=pilsner,stout&cookies=vegan%20chocolate%20chip&guitars=hamer";
    expect(query_string_builder(testStr, key, value)).toEqual(expected);
  });

  test("it_has_key_and_ampersand(testStr, key, value) should add a new value to the key", () => {
    let testStr = "?type=ITEM,ITEM_VARIATION&cake=chocolate";
    let key = "type";
    let value = "CATEGORY";
    let expected = `?cake=chocolate&type=ITEM,ITEM_VARIATION,${value}`;
    expect(query_string_builder(testStr, key, value)).toEqual(expected);
  });

  test("it_has_key_and_ampersand(expected, key, value) should throw if key:value already exists", () => {
    let key = "type";
    let value = "CATEGORY";
    let testStr = `?type=ITEM,ITEM_VARIATION,${value}&cake=chocolate`;
    expect(() => {
      query_string_builder(testStr, key, value);
    }).toThrow();
  });
});

/* --------------------------------------------------------*
 *                                                         *
 *                        query_string_endpoint
 *                                                         *
 * ------------------------------------------------------- */
describe("query_string_endpoint", () => {
  let val1 = "VAL1";
  let val2 = "VAL2";
  let val3 = "VAL3";

  test("query_string_endpoint should  ", () => {
    let query_params = {
      otherProp: undefined,
      types: undefined,
    };
    let expected = {
      otherProp: undefined,
      types: "VAL1",
    };

    query_params.types = query_string_endpoint(query_params.types, val1);

    expect(query_params).toMatchObject(expected);
  });

  test("query_string_endpoint should  ", () => {
    let query_params = {
      otherProp: undefined,
      types: "VAL1",
    };
    let expected = {
      otherProp: undefined,
      types: "VAL1,VAL2",
    };
    query_params.types = query_string_endpoint(query_params.types, val2);
    expect(query_params).toMatchObject(expected);
  });
  test("query_string_endpoint should  ", () => {
    let query_params = {
      otherProp: undefined,
      types: "VAL1,VAL2",
    };
    let expected = {
      otherProp: undefined,
      types: "VAL1,VAL2,VAL3",
    };
    query_params.types = query_string_endpoint(query_params.types, val3);
    expect(query_params).toMatchObject(expected);
  });
});
/* --------------------------------------------------------*
 *                                                         *
 *                        shazam_object_has_property
 *                                                         *
 * ------------------------------------------------------- */
describe("shazam_object_has_property", () => {
  let obj = {
    attribute_name: "jolly",
  };

  test("shazam_object_has_property should return true", () => {
    let obj = {
      attribute_name: "jolly",
    };
    let received = shazam_object_has_property(
      obj,
      "attribute_name",
      "desceribe",
      "test"
    );
    let expected = true;
    expect(received).toEqual(expected);
  });

  test("shazam_object_has_property should throw descriptive error", () => {
    let property_name = "wrong";
    let expected =
      "The object provided to unspecified class.unspecified method must have the property: " +
      property_name;
    expect(() => {
      shazam_object_has_property(obj, property_name);
    }).toThrowError(expected);
  });
});
/* --------------------------------------------------------*
 *                                                         *
 *                        shazam_number_LT
 *                                                         *
 * ------------------------------------------------------- */

describe("shazam_number_LT", () => {
  let limit = 5;

  test("shazam_number_LT should return true if under limit", () => {
    expect(shazam_number_LT(4, limit)).toEqual(true);
  });

  test("shazam_number_LT should throw if at limit", () => {
    expect(() => {
      shazam_number_LT(5, limit);
    }).toThrow();
  });

  test("shazam_number_LT should throw if over limit", () => {
    expect(() => {
      shazam_number_LT(6, limit);
    }).toThrow();
  });
});

/* --------------------------------------------------------*
 *                                                         *
 *                        shazam_number_GT
 *                                                         *
 * ------------------------------------------------------- */

describe("shazam_number_GT", () => {
  let limit = 5;

  test("shazam_number_GT should return true if over limit", () => {
    expect(shazam_number_GT(6, limit)).toEqual(true);
  });

  test("shazam_number_GT should throw if at limit", () => {
    expect(() => {
      shazam_number_GT(5, limit);
    }).toThrow();
  });

  test("shazam_number_GT should throw if under limit", () => {
    expect(() => {
      shazam_number_GT(4, limit);
    }).toThrow();
  });
});

/* --------------------------------------------------------*
 *                                                         *
 *                        shazam_number_LE
 *                                                         *
 * ------------------------------------------------------- */

describe("shazam_number_LE", () => {
  let limit = 5;

  test("shazam_number_LE should return true if under limit", () => {
    expect(shazam_number_LE(4, limit)).toEqual(true);
  });

  test("shazam_number_LE should return true if at limit", () => {
    expect(shazam_number_LE(5, limit)).toEqual(true);
  });

  test("shazam_number_LE should throw if over limit", () => {
    expect(() => {
      shazam_number_LE(6, limit);
    }).toThrow();
  });
});

/* --------------------------------------------------------*
 *                                                         *
 *                        shazam_number_GE
 *                                                         *
 * ------------------------------------------------------- */

describe("shazam_number_GE", () => {
  let limit = 5;

  test("shazam_number_GE should return true if over limit", () => {
    expect(shazam_number_GE(6, limit)).toEqual(true);
  });

  test("shazam_number_GE should return true if at limit", () => {
    expect(shazam_number_GE(5, limit)).toEqual(true);
  });

  test("shazam_number_GE should throw if at or under limit", () => {
    expect(() => {
      shazam_number_GE(4, limit);
    }).toThrow();
  });
});

/* --------------------------------------------------------*
 *                                                         *
 *                        shazam_date_human_readable
 *                                                         *
 * ------------------------------------------------------- */

describe("shazam_date_human_readable", () => {
  test("shazam_date_human_readable should throw with wrong delimiter", () => {
    expect(() => {
      shazam_date_human_readable("1945/08/02");
    }).toThrow();
  });

  test("shazam_date_human_readable should throw with RFC3339 compliant date", () => {
    expect(() => {
      shazam_date_human_readable(dateCodes.RFC3339);
    }).toThrow();
  });

  test("shazam_date_human_readable should not throw with dash delimiter", () => {
    expect(() => {
      shazam_date_human_readable("1945-08-02");
    }).not.toThrow();
  });

  test("shazam_date_human_readable should return true with correct format", () => {
    expect(shazam_date_human_readable("1945-08-02")).toEqual(true);
  });
});

/* --------------------------------------------------------*
 *                                                         *
 *                        shazam_number_between_equals
 *                                                         *
 * ------------------------------------------------------- */

describe("shazam_number_between_equals", () => {
  let patient = 10;

  test("shazam_number_between_equals should throw when upper is less than lower ", () => {
    expect(() => {
      shazam_number_between_equals(35, 4, patient);
    }).toThrow();
  });

  test("shazam_number_between_equals should throw when patient is less than lower ", () => {
    expect(() => {
      shazam_number_between_equals(11, 12, patient);
    }).toThrow();
  });

  test("shazam_number_between_equals should throw when patient is greater than upper ", () => {
    expect(() => {
      shazam_number_between_equals(8, 9, patient);
    }).toThrow();
  });

  test("shazam_number_between_equals should return true when patient is between upper and lower", () => {
    expect(shazam_number_between_equals(-9, 11, patient)).toEqual(true);
  });

  test("shazam_number_between_equals should return true when patient is equal to lower", () => {
    expect(shazam_number_between_equals(10, 11, patient)).toEqual(true);
  });
  test("shazam_number_between_equals should return true when patient is equal to upper", () => {
    expect(shazam_number_between_equals(9, 10, patient)).toEqual(true);
  });
});
