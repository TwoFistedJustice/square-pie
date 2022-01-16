"use strict";
const {
  arche_time_start_end,
  // define,
  defineify,
  query_param_add_value,
  query_param_is_present,
  query_param_is_query_string,
  query_param_replace_value,
  query_string_builder,
  query_string_endpoint,
  // setter_chain_generator_config,
  // setter_chain_generator_separate_arrays,
  // shazam_max_length,
  normalize_email,
  arrayify,
  arche_money,
  is_integer,
  generate_error_message,
  shazam_time_RFC3339,
  shazam_date_human_readable,
  shazam_integer,
  shazam_boolean,
  shazam_object_has_property,
  shazam_is_array,
  shazam_max_length_array,
  shazam_min_length_array,
  shazam_number_LT,
  shazam_number_LE,
  shazam_number_GT,
  shazam_number_GE,
  shazam_number_between_equals,
} = require("../src/lib/utilities");

const { dateCodes } = require("./helper_objects");
// const {expect} = require ("chai");

// const should = require("chai").should();
// const { long_strings } = require("./helper_objects");

describe("Silence test suite", () => {
  test("", () => {});
});

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

describe("maxLength", () => {
  test("", () => {});
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

  test("arrayify should set caller arg to property name arg if caller is not included", () => {
    let not_an_enumerable_object = 2;
    let expected = "test.caller was unable to create a new array at caller";
    expect(() => {
      arrayify(not_an_enumerable_object, "caller", "test");
    }).toThrowError(
      "test.caller Cannot create property 'caller' on number '2'"
    );
  });
});
/* --------------------------------------------------------*
 *                                                         *
 *                        arche_money
 *                                                         *
 * ------------------------------------------------------- */

describe("arche_money", () => {
  test("arche_money utility should throw when fed a non-coercible to number amount", () => {
    let amt = "CAD";
    let currency = "CAD";

    expect(() => {
      arche_money(amt, currency);
    }).toThrow();
  });

  test("arche_money utility should  throw when fed a non-ISO 4217 compliant currency", () => {
    let amt = "2195";
    let currency = "CD";

    expect(() => {
      arche_money(amt, currency);
    }).toThrow();
  });

  test('arche_money utility should return a compliant object with "USD" when not fed a currency argument', () => {
    let amt = "2195";
    let expected = {
      amount: 2195,
      currency: "USD",
    };

    let received = arche_money(amt);

    expect(received).toMatchObject(expected);
  });

  test('arche_money utility should return a compliant object with "CAD"', () => {
    let amt = "2195";
    let currency = "CAD";
    let expected = {
      amount: 2195,
      currency: "CAD",
    };

    let received = arche_money(amt, currency);

    expect(received).toMatchObject(expected);
  });

  test('arche_money utility should return a compliant object with "CAD"', () => {
    let amt = "2195";
    let currency = "CAD";
    let expected = {
      amount: 2195,
      currency: "CAD",
    };

    let received = arche_money(amt, currency);

    expect(received).toMatchObject(expected);
  });

  test('arche_money utility currency argument should be case-insensitive"', () => {
    let amt = "2195";
    let currency = "Cad";
    let expected = {
      amount: 2195,
      currency: "CAD",
    };

    let received = arche_money(amt, currency);

    expect(received).toMatchObject(expected);
  });

  test('arche_money utility should trim white space off of currency"', () => {
    let amt = "2195";
    let currency = " CAD ";
    let expected = {
      amount: 2195,
      currency: "CAD",
    };

    let received = arche_money(amt, currency);

    expect(received).toMatchObject(expected);
  });
});

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
      shazam_time_RFC3339(
        dateCodes.notRFC3339,
        "utilities test suite",
        "should throw"
      );
    }).toThrow();
  });

  test("should NOT throw when fed an RFC3339 date code", () => {
    expect(() => {
      shazam_time_RFC3339(
        dateCodes.RFC3339,
        "utilities test suite",
        "should NOT throw"
      );
    }).not.toThrow();
  });

  test("should return true when fed an RFC3339 date code", () => {
    expect(
      shazam_time_RFC3339(
        dateCodes.RFC3339,
        "utilities test suite",
        "should return true"
      )
    ).toEqual(true);
  });
});

/* --------------------------------------------------------*
 *                                                         *
 *                        shazam_integer
 *                                                         *
 * ------------------------------------------------------- */
describe("shazam_integer integer verification utility", () => {
  test("should throw on a non-integer string", () => {
    expect(() => {
      shazam_integer("95.5", "utilities test suite", "should throw");
    }).toThrow();

    expect(() => {
      shazam_integer(95.5, "utilities test suite", "should throw");
    }).toThrow();
  });

  test("should accept an integer string", () => {
    expect(() => {
      shazam_integer("42", "utilities test suite", "should NOT throw");
    }).not.toThrow();

    expect(
      shazam_integer("42", "utilities test suite", "should return true")
    ).toEqual(true);
  });

  test("should accept an integer number", () => {
    let num = 42;
    expect(() => {
      shazam_integer(num, "utilities test suite", "should NOT throw");
    }).not.toThrow();

    expect(
      shazam_integer(num, "utilities test suite", "should return true")
    ).toEqual(true);
  });
});
/* --------------------------------------------------------*
 *                                                         *
 *               shazam_boolean
 *                                                         *
 * ------------------------------------------------------- */

describe("shazam_boolean boolean verification utility", () => {
  test("should throw when fed a non-boolean", () => {
    expect(() => {
      shazam_boolean("true", "utilities test suite", "should throw");
    }).toThrow();
  });

  test("should throw when fed a 1 or a 0", () => {
    expect(() => {
      shazam_boolean(1, "utilities test suite", "should throw");
    }).toThrow();

    expect(() => {
      shazam_boolean(0, "utilities test suite", "should throw");
    }).toThrow();
  });

  test("should NOT throw when fed a boolean", () => {
    expect(() => {
      shazam_boolean(true, "utilities test suite", "should NOT throw");
    }).not.toThrow();
  });

  test("should return true when fed a boolean", () => {
    expect(
      shazam_boolean(false, "utilities test suite", "should return true")
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

describe("shazam_is_array", () => {
  let emptyArray = [];
  let goodArray = [1, 2, 3];
  let notAnArray = "1,2,3";

  test("shazam_is_array to return true when given an array with at least one member", () => {
    expect(shazam_is_array(goodArray)).toEqual(true);
  });

  test("should throw error message when given an empty array", () => {
    let expected =
      "class.method expects an array with at least 1 member but received: empty array : ";
    expect(() => {
      shazam_is_array(emptyArray, "class", "method");
    }).toThrowError(expected);
  });

  test("should throw error message on a non-array", () => {
    let expected =
      "unspecified class.unspecified method expects an array with at least 1 member but received: string : 1,2,3";
    expect(() => {
      shazam_is_array(notAnArray);
    }).toThrowError(expected);
  });
});

describe("shazam_max_length_array", () => {
  let arr = ["a", "b"];
  test("shazam_max_length_array should throw if an array meets or exceeds limit", () => {
    expect(() => {
      shazam_max_length_array(2, arr);
    }).toThrow();
  });

  test("shazam_max_length_array should return true if an array deceeds limit", () => {
    let received = shazam_max_length_array(3, arr);
    expect(received).toEqual(true);
  });
});

describe("shazam_min_length_array", () => {
  let arr = ["a", "b"];
  test("shazam_min_length_array should throw if an array deceeds limit", () => {
    expect(() => {
      shazam_min_length_array(3, arr);
    }).toThrow();
  });

  test("shazam_min_length_array should return true if an array does not deceed limit", () => {
    let received = shazam_min_length_array(2, arr);
    expect(received).toEqual(true);
  });
});

describe("arche_time_start_end", () => {
  test("arche_time_start_end should throw if start not RFC3339", () => {
    expect(() => {
      arche_time_start_end(dateCodes.notRFC3339, dateCodes.RFC3339);
    }).toThrow();
  });

  test("arche_time_start_end should throw if end not RFC3339", () => {
    expect(() => {
      arche_time_start_end(dateCodes.RFC3339, dateCodes.notRFC3339);
    }).toThrow();
  });

  test("arche_time_start_end should return a date time filter object", () => {
    let expected = {
      start_at: dateCodes.RFC3339,
      end_at: dateCodes.RFC3339,
    };
    expect(
      arche_time_start_end(dateCodes.RFC3339, dateCodes.RFC3339)
    ).toMatchObject(expected);
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

/* --------------------------------------------------------*
 *                                                         *
 *                        is_integer
 *                                                         *
 * ------------------------------------------------------- */

describe("is_integer", () => {
  test("should return false on a non-integer string", () => {
    expect(is_integer("95.5")).toEqual(false);
  });

  test("should return false on a non-integer number ", () => {
    expect(is_integer(95.5)).toEqual(false);
  });

  test("should return false on no argument", () => {
    expect(is_integer()).toEqual(false);
  });

  test("should return false on an express undefined ", () => {
    expect(is_integer(undefined)).toEqual(false);
  });

  test("should return true on an integer string", () => {
    expect(is_integer("42")).toEqual(true);
  });

  test("should return true on an integer number", () => {
    expect(is_integer(42)).toEqual(true);
  });
});
