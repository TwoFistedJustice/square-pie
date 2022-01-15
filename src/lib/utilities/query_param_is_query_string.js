const { query_param_regex } = require("./regular_expression_patterns");
const query_param_is_query_string = function (query_string) {
  return query_param_regex.start.test(query_string) &&
    query_param_regex.continuation.test(query_string)
    ? true
    : false;
};

module.exports = query_param_is_query_string;
