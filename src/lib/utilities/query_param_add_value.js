const { query_param_regex } = require("./regular_expression_patterns");

/** @function query_param_add_value - adds a value to an existing query parameter
 * @param {string} query_string - the query string to modify
 * @param {string} param - the 'key'
 * @param {string} value - the 'value'
 * @return {string} Returns a new query string with the value added to the parameter set
 * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
 * @example:
 * let query_string = "?status=DRAFT,OPEN&version=3";
 * let param = "status";
 * let value = "CANCELED"
 * query_param_add_value(query_string, param, value) => "?status=DRAFT,OPEN,CANCELED&version=3"
 *
 * */

const query_param_add_value = function (query_string, param, value) {
  let pattern = query_param_regex.query_param_capture(param);
  // find the sub string
  let capture = pattern.exec(query_string);
  // return the sub string
  let captured_string = capture.groups.param;
  // add the new value to the query_string
  let modified_query_string = query_string.replace(
    captured_string,
    captured_string + "," + value
  );
  // send it on back
  return modified_query_string;
};

module.exports = query_param_add_value;
