"use strict";
const { is_integer } = require("../src/lib/utilities");

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
