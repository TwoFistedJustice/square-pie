const { isRFC3339 } = require("validator");

/** @function arche_time_start_end
 * @param {time} start - the earlier time - an RFC3339 compliant date code
 * @param {time} end - the later time - an RFC3339 compliant date code
 * @param {string} display_name is the name of the class making the function call
 * @param {string} caller  is the name of the method making the function call
 * @throws {error} Throws an error if either time argument is not in RFC3339 format.
 * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
 * {@link https://developer.squareup.com/reference/square/objects/SearchOrdersDateTimeFilter | Square Docs}
 *  @example
 *
 *
 *  arche_time_start_end("someTime", "someOtherTime", className, methodName)
 *  =>
 *  {
 *   start_at:" someTime",
 *   end_at: "someOtherTime"
 * }
 *
 * */

const arche_time_start_end = function (
  start,
  end,
  display_name = "unspecified class",
  caller = "- unspecified class setter"
) {
  if (!isRFC3339(start)) {
    let message =
      display_name +
      "." +
      caller +
      " expects start time to be in RFC3339 format. Received " +
      start.toString();
    throw new Error(message);
  } else if (!isRFC3339(end)) {
    let message =
      display_name +
      "." +
      caller +
      " expects end time to be in RFC3339 format. Received " +
      end.toString();
    throw new Error(message);
  }

  return {
    start_at: start,
    end_at: end,
  };
};

module.exports = arche_time_start_end;
