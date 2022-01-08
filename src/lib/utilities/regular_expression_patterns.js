const regular_expression_patterns = {
  query_param_regex: {
    start: /\?+/, // presence of "?"
    continuation: /=+/, // presence of "="
    version: /version=\d+/, // find 'version=' followed by one or more digit class characters
  },
};
module.exports = regular_expression_patterns;
