"use strict";
const { arche_time_start_end, arche_money } = require("../src/lib/utilities");
const { dateCodes } = require("./helper_objects");
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

/* --------------------------------------------------------*
 *                                                         *
 *                        arche_time_start_end
 *                                                         *
 * ------------------------------------------------------- */
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
