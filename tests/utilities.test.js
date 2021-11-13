"use strict";
const {
  // define,
  // setter_chain_generator_config,
  // setter_chain_generator_separate_arrays,
  // maxLength,
  arrayify,
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

describe.only("arrayify", () => {
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
});
