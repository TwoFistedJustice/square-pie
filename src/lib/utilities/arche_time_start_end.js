const { isRFC3339 } = require("validator");

/**
 * @function arche_time_start_end
 * @param {time} start - the earlier time - an RFC3339 compliant date code
 * @param {time} end - the later time - an RFC3339 compliant date code
 * @param {string} display_name is the name of the class making the function call
 * @param {string} caller  is the name of the method making the function call
 * @throws {error} Throws an error if either time argument is not in RFC3339 format.
 *  @example
 *  arche_time_start_end("someTime", "someOtherTime", className, methodName)
 *  =>
 *  {
 *   start_at:" someTime",
 *   end_at: "someOtherTime"
 * }
 * @ignore
 * */

/**
 * {@link https://developer.squareup.com/reference/square/objects/SearchOrdersDateTimeFilter | Link To Square Docs}<br>
 * arche_time_start_end builds a compliant Square API Date Time Filter.
 * @typedef {function} arche_time_start_end
 * @public
 * @function
 * @param {time} start - the earlier time - an RFC3339 compliant date code
 * @param {time} end - the later time - an RFC3339 compliant date code
 * @throws {error} Throws an error if either time argument is not in RFC3339 format.
 * @return {time_range} Returns a Square TimeRange object
 * @example
 *  make_query().date_time_filter().created_at("2019-10-12T07:13:15.52Z", "2019-10-12T07:13:45.52Z" ) =>
 *  {
 *    end_at: "2019-10-12T07:13:15.52Z",
 *    start_at: "2019-10-12T07:13:45.52Z"
 *  }
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
