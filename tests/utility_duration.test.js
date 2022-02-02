const {
  duration_months_days,
  duration_days_hours_minutes,
  duration_hours_minutes,
} = require("../src/lib/utilities/index");

describe("RFC3339 duration constructors", () => {
  /* --------------------------------------------------------*
   *                                                         *
   *                        months_days
   *                                                         *
   * ------------------------------------------------------- */

  test("months_days", () => {
    let expected = "P3M10D";
    let value = duration_months_days(3, 10);
    expect(value).toEqual(expected);
  });

  test("months_days should leave out months if set to zero", () => {
    let expected = "P10D";
    let value = duration_months_days(0, 10);
    expect(value).toEqual(expected);
  });

  test("months_days should leave out days if set to zero", () => {
    let expected = "P5M";
    let value = duration_months_days(5, 0);
    expect(value).toEqual(expected);
  });

  test("months_days should leave out days if omitted", () => {
    let expected = "P5M";
    let value = duration_months_days(5);
    expect(value).toEqual(expected);
  });

  /* --------------------------------------------------------*
   *                                                         *
   *                        days_hours_minutes
   *                                                         *
   * ------------------------------------------------------- */

  test("days_hours_minutes", () => {
    let expected = "P3DT10H30M";
    let value = duration_days_hours_minutes(3, 10, 30);
    expect(value).toEqual(expected);
  });

  /* --------------------------------------------------------*
   *                                                         *
   *                        hours_minutes
   *                                                         *
   * ------------------------------------------------------- */

  test("hours_minutes", () => {
    let expected = "PT3H10M";
    let value = duration_hours_minutes(3, 10);
    expect(value).toEqual(expected);
  });
});
