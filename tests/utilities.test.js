"use strict";
const {
  // define,
  // setter_chain_generator_config,
  // setter_chain_generator_separate_arrays,
  // shazam_maxLength,
  normalize_email,
  arrayify,
  arche_money,
  generate_error_message,
  shazam_RFC3339,
  shazam_integer,
  shazam_boolean,
} = require("../src/lib/utilities/aaa_index");

const add_to_endpoint_query_string = require("../src/lib/utilities/endpoint_query_string_builder");

const { dateCodes } = require("./helper_objects");
// const {expect} = require ("chai");

// const should = require("chai").should();
// const { long_strings } = require("./helper_objects");

describe("Silence test suite", () => {
  test("", () => {});
});

describe("define", () => {
  test("", () => {});
});

describe("maxLength", () => {
  test("", () => {});
});

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

  test("arrayify should return true on success", () => {
    let obj = {
      prop: undefined,
    };
    let bool = arrayify(obj, "prop");
    expect(bool).toEqual(true);
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

  describe("money_helper", () => {
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
      shazam_RFC3339(
        dateCodes.notRFC3339,
        "utilities test suite",
        "should throw"
      );
    }).toThrow();
  });

  test("should NOT throw when fed an RFC3339 date code", () => {
    expect(() => {
      shazam_RFC3339(
        dateCodes.RFC3339,
        "utilities test suite",
        "should NOT throw"
      );
    }).not.toThrow();
  });

  test("should return true when fed an RFC3339 date code", () => {
    expect(
      shazam_RFC3339(
        dateCodes.RFC3339,
        "utilities test suite",
        "should return true"
      )
    ).toEqual(true);
  });
});

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

describe.only("endpoint string query builder", () => {
  test("is_empty", () => {
    let testStr = "";
    let key = "type";
    let value = "ITEM";
    let expected = "?type=ITEM";
    // calls it_is_empty(key, value)
    expect(add_to_endpoint_query_string(testStr, key, value)).toEqual(expected);
  });

  test("it_has_key_but_not_ampersand(testStr, value)", () => {
    let testStr = "?pets=DOGS";
    let key = "pets";
    let value = "CATS";
    let expected = "?pets=DOGS,CATS";
    expect(add_to_endpoint_query_string(testStr, key, value)).toEqual(expected);
  });

  test("it_has_other_keys_but_not_this_key(testStr, key, value)", () => {
    let testStr = "?beer=pilsner,stout&cookies=vegan%20chocolate%20chip";
    let key = "guitars";
    let value = "hamer";
    let expected =
      "?beer=pilsner,stout&cookies=vegan%20chocolate%20chip&guitars=hamer";
    expect(add_to_endpoint_query_string(testStr, key, value)).toEqual(expected);
  });

  test("it_has_key_and_ampersand(testStr, key, value) should add a new value to the key", () => {
    let testStr = "?type=ITEM,ITEM_VARIATION&cake=chocolate";
    let key = "type";
    let value = "CATEGORY";
    let expected = `?cake=chocolate&type=ITEM,ITEM_VARIATION,${value}`;
    expect(add_to_endpoint_query_string(testStr, key, value)).toEqual(expected);
  });

  test("it_has_key_and_ampersand(expected, key, value) should throw if key:value already exists", () => {
    let key = "type";
    let value = "CATEGORY";
    let testStr = `?type=ITEM,ITEM_VARIATION,${value}&cake=chocolate`;
    expect(() => {
      add_to_endpoint_query_string(testStr, key, value);
    }).toThrow();
  });
});
