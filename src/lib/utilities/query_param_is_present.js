const { query_param_regex } = require("./regular_expression_patterns");

/** @function query_param_is_present - checks for presence of the parameter, returns true if it finds it and false otherwise.
 * @param {string} query_string - the query string to search
 * @param {string} param - the 'key' or parameter to search for
 * @return {boolean} Returns true if the parameter is present, and false if it is not present.
 * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
 * @example:
 * let query_string = "?status=DRAFT,OPEN&version=3";
 * let param = "version";
 * query_param_add_value(query_string, param) => true
 * @ignore
 * */

const query_param_is_present = function (query_string, param) {
  let pattern = query_param_regex.query_param_is_present(param);
  return pattern.test(query_string);
};

module.exports = query_param_is_present;
