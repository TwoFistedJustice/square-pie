const id_temporary_regex = require("./id_temporary_rx");
const is_facebook_regex = require("./is_facebook_url_rx");
const number_quantity_regex = require("./number_quantity_rx");
const query_param_capture_regex = require("./query_param_capture_rx");
const query_param_continue_regex = require("./query_param_continue_rx");
const query_param_capture_single_value_regex = require("./query_param_capture_single_value_rx");
const query_param_is_present_regex = require("./query_param_is_present_rx");
const query_param_start_regex = require("./query_param_start_rx");
const query_param_version_regex = require("./query_param_version_rx");
const uid_regex = require("./uid_rx");

module.exports = {
  id_temporary_regex,
  is_facebook_regex,
  number_quantity_regex,
  query_param_capture_regex,
  query_param_capture_single_value_regex,
  query_param_is_present_regex,
  query_param_continue_regex,
  query_param_start_regex,
  query_param_version_regex,
  uid_regex,
};
