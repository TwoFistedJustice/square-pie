const regular_expression_patterns = {
  query_param_regex: {
    start: /\?+/, // presence of "?"
    continuation: /=+/, // presence of "="
    version: /version=\d+/, // find 'version=' followed by one or more digit class characters
    /** @function query_param_capture captures the entire query param set specified. Use with
     * RegExp.prototype.exec()
     * @param {string} param - the name of the query parameter you want to capture
     * @returns {RegExp} Returns the pattern including named group "param" to find the
     * parameter set within a query parameter string
     * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
     * */
    query_param_capture: function (param) {
      return new RegExp(
        "(?<param>" + // the name of the capture group
          param +
          "={1}" + // exactly one equals sign
          "(" +
          "([a-zA-Z0-9]+,){0,}" + // zero or more blocks of comma separated alpha-numerics
          "[a-zA-Z0-9]{1}" + // followed by one block of alpha-numerics
          "){0,}" + // zero or more times
          "(" +
          "[0-9]{1,}" + // a block of one or more numbers
          "){0,}" + //occurring zero or more times
          ")"
      );
    },
    query_single_value_capture: function (param) {
      return new RegExp(
        param +
          "={1}" + // exactly one eauals sign
          "(?<value_to_replace>" + // the name of the capture group
          "[a-zA-Z0-9]{1,})" // consisting of one or more blocks of alpha-numerics
      );
    },
    query_param_is_present: function (param) {
      return new RegExp(param + "={1}");
    },
  },
};
module.exports = regular_expression_patterns;
