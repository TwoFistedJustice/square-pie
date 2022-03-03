const { query_param_regex } = require("./regular_expression_patterns");

/** @function query_param_replace_value - replaces a value to an entire existing query parameter when only one value exists.
 * @param {string} query_string - the query string to modify
 * @param {string} param - the 'key'
 * @param {string} value - the 'value' to insert
 * @return {string} Returns a new query string with the new value replacing the old value
 * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
 * @example:
 * let query_string = "?status=DRAFT,OPEN&version=3";
 * let param = "version";
 * let value = "4"
 * query_param_add_value(query_string, param, value) => "?status=DRAFT,OPEN,CANCELED&version=4"
 * @ignore
 * */

const query_param_replace_value = function (query_string, param, value) {
  let pattern = query_param_regex.query_single_value_capture(param);
  // find the sub string
  let capture = pattern.exec(query_string);
  // return the sub string
  let captured_string = capture.groups.value_to_replace;
  // add the new value to the query_string
  let surrogate = param + "=" + value;
  let modified_query_string = query_string.replace(captured_string, surrogate);
  // send it on back
  return modified_query_string;
};

module.exports = query_param_replace_value;
