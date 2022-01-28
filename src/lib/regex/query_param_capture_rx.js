/** @function query_param_capture captures the entire query param set specified. Use with
 * RegExp.prototype.exec()
 * @param {string} param - the name of the query parameter you want to capture
 * @returns {RegExp} Returns the pattern including named group "param" to find the
 * parameter set within a query parameter string
 * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
 * */
const query_param_capture_regex = function (param) {
  return new RegExp(
    "(?<param>" + // the name of the capture group
      param +
      "={1}" + // exactly one equals sign
      "(" +
      "([a-zA-Z0-9_]+,){0,}" + // zero or more blocks of comma separated alpha-numerics
      "[a-zA-Z0-9_]{1}" + // followed by one block of alpha-numerics
      "){0,}" + // zero or more times
      "(" +
      "[0-9]{1,}" + // a block of one or more numbers
      "){0,}" + //occurring zero or more times
      ")"
  );
};

module.exports = query_param_capture_regex;
