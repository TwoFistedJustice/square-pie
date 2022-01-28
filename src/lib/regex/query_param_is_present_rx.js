const query_param_is_present_regex = function (param) {
  return new RegExp(param + "={1}");
};

module.exports = query_param_is_present_regex;
