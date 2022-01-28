const query_param_capture_single_value_regex = function (param) {
  return new RegExp(
    "(?<value_to_replace>" + // the name of the capture group
      param +
      "={1}" + // exactly one equals sign
      "[a-zA-Z0-9]{1,})" // consisting of one or more blocks of alpha-numerics
  );
};

module.exports = query_param_capture_single_value_regex;
