"use strict";
const {
  // define,
  // setter_chain_generator_config,
  // setter_chain_generator_separate_arrays,
  // maxLength,
  arrayify,
  money_helper,
  generate_error_message,
} = require("../src/lib/utilities");
// const should = require("chai").should();
// const { long_strings } = require("./helper_objects");

describe("should silence tests by tacking .only to describe", () => {});

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
    test("money_helper utility should throw when fed a non-coercible to number amount", () => {
      let amt = "CAD";
      let currency = "CAD";

      expect(() => {
        money_helper(amt, currency);
      }).toThrow();
    });

    test("money_helper utility should  throw when fed a non-ISO 4217 compliant currency", () => {
      let amt = "2195";
      let currency = "CD";

      expect(() => {
        money_helper(amt, currency);
      }).toThrow();
    });

    test('money_helper utility should return a compliant object with "USD" when not fed a currency argument', () => {
      let amt = "2195";
      let expected = {
        amount: 2195,
        currency: "USD",
      };

      let received = money_helper(amt);

      expect(received).toMatchObject(expected);
    });

    test('money_helper utility should return a compliant object with "CAD"', () => {
      let amt = "2195";
      let currency = "CAD";
      let expected = {
        amount: 2195,
        currency: "CAD",
      };

      let received = money_helper(amt, currency);

      expect(received).toMatchObject(expected);
    });
  });
});

describe.only("generate_error_message", () => {
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
