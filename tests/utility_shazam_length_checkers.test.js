"use strict";
const {
  shazam_max_length,
  shazam_min_length,
  shazam_max_length_array,
  shazam_min_length_array,
} = require("../src/lib/utilities");
let len_251 =
  "wjbpqdondbymouzijvbfdhdjoiexjmjbpwulnmqlkzfjdaxkunvhjbzhinbjvqsgohfyuskhtagkzojejdozejzieuxjqtmoryeibghutklanmzogrcntgnjdnkswqeexzqdmqdjhtsagwnbdewdzxlvicsuymeoeohkaxtsgimihnzedsmlcpplgouweaehzeqklhzunofwmuxzalgukbmbrvadqxjvsjbprhrrdagiugztoiwhwfoapia";
let first20 = "12345678901234567890";
let last20 = "09876543210987654321";
let long_string = first20 + len_251 + last20;

let name = "describe";
let caller = "test";
/* --------------------------------------------------------*
 *                                                         *
 *                          shazam_max_length,
 *                                                         *
 * ------------------------------------------------------- */

describe("shazam_max_length", () => {
  let str = "max";
  test("shazam_max_length should return true", () => {
    let max = 4;

    expect(shazam_max_length(max, str, name, caller)).toEqual(true);
  });

  test("shazam_max_length should throw correct message", () => {
    let max = 2;
    let len = str.length;
    let expected = `${name}.${caller} -length ${len} surpasses maximum character limit of ${max}.\nReceived: ${str}`;
    expect(() => {
      shazam_max_length(max, str, name, caller);
    }).toThrowError(expected);
  });

  test("shazam_max_length should throw correct message with only first and last 20 chars of really long string", () => {
    let max = 2;
    let len = long_string.length;
    let truncated = first20 + "..." + last20;
    let expected = `${name}.${caller} -length ${len} surpasses maximum character limit of ${max}.\nReceived: ${truncated}`;
    expect(() => {
      shazam_max_length(max, long_string, name, caller);
    }).toThrowError(expected);
  });
});

/* --------------------------------------------------------*
 *                                                         *
 *                          shazam_min_length,
 *                                                         *
 * ------------------------------------------------------- */
describe("shazam_min_length", () => {
  let str = "min";
  test("shazam_min_length should return true", () => {
    let min = 2;

    expect(shazam_min_length(min, str, name, caller)).toEqual(true);
  });

  test("shazam_min_length should throw correct message", () => {
    let min = 4;
    let expected = `${name}.${caller} - failed to meet minimum character count of ${min}.\n${str}`;
    expect(() => {
      shazam_min_length(min, str, name, caller);
    }).toThrowError(expected);
  });
});

/* --------------------------------------------------------*
 *                                                         *
 *                        shazam_max_length_array
 *                                                         *
 * ------------------------------------------------------- */
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
/* --------------------------------------------------------*
 *                                                         *
 *                        shazam_min_length_array
 *                                                         *
 * ------------------------------------------------------- */
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
