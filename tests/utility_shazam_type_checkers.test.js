"use strict";
const {
  shazam_integer,
  shazam_boolean,
  shazam_is_array,
} = require("../src/lib/utilities");
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

  test("should throw correct error message on a number that is not an integer", () => {
    let expected =
      "describe.test expects an integer or a string that can be coerced to an integer. Received: 95.5";
    expect(() => {
      shazam_integer("95.5", "describe", "test");
      // }).toThrowError (expected);
    }).toThrowError(new TypeError(expected));
  });

  test("should throw correct error message on a string that does not coercible to a number", () => {
    let expected =
      "describe.test expects an integer or a string that can be coerced to an integer. Received: ABC";
    expect(() => {
      shazam_integer("ABC", "describe", "test");
    }).toThrowError(new TypeError(expected));
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

  test("should throw when the correct message a non-boolean", () => {
    let expected = `describe.test expects a boolean. Received: true\nMake sure you didn't pass a string that looks like a boolean.`;
    expect(() => {
      shazam_boolean("true", "describe", "test");
    }).toThrowError(expected);
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
 *                        shazam_is_array
 *                                                         *
 * ------------------------------------------------------- */
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
