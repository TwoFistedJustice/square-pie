const arrayify = require("./arrayify");
const arche_money = require("./arche_money");
const arche_time_start_end = require("./arche_time_start_end");
const array_prevent_duplicate_strings = require("./array_prevent_duplicate_strings");
const normalize_email = require("./normalize_email");
const clone_object = require("./object_clone");
const define = require("./define");
const defineify = require("./defineify");
const duration_months_days = require("./duration_months_days");
const duration_hours_minutes = require("./duration_hours_minutes");
const duration_days_hours_minutes = require("./duration_days_hours_minutes");
const is_integer = require("./is_integer");
const generate_error_message = require("./generate_error_message");
const object_does_not_have_property = require("./object_does_not_have_property");
const object_has_property = require("./object_has_property");
const query_param_add_value = require("./query_param_add_value");
const query_param_is_present = require("./query_param_is_present");
const query_param_is_query_string = require("./query_param_is_query_string");
const query_param_replace_value = require("./query_param_replace_value");
const query_string_builder = require("./query_string_builder");
const query_string_endpoint = require("./query_string_endpoint");
const {
  setter_chain_generator_config,
  setter_chain_generator_separate_arrays,
} = require("./setter_chain_generators");
const regular_expression_patterns = require("./regular_expression_patterns");
const shazam_date_human_readable = require("./shazam_date_human_readable");
const shazam_exact_length = require("./shazam_exact_length");
const shazam_is_array = require("./shazam_is_array");
const shazam_is_boolean = require("./shazam_is_boolean");
const shazam_is_coords = require("./shazam_is_coords");
const shazam_is_url = require("./shazam_is_url");
const shazam_is_url_facebook = require("./shazam_is_url_facebook");
const shazam_is_integer = require("./shazam_is_integer");
const shazam_is_time_RFC3339 = require("./shazam_is_time_RFC3339");
const shazam_object_has_property = require("./shazam_object_has_property");
const shazam_max_length = require("./shazam_max_length");
const shazam_min_length = require("./shazam_min_length");
const shazam_max_length_array = require("./shazam_max_length_array");
const shazam_min_length_array = require("./shazam_min_length_array");
const shazam_number_LT = require("./shazam_number_LT");
const shazam_number_LE = require("./shazam_number_LE");
const shazam_number_GT = require("./shazam_number_GT");
const shazam_number_GE = require("./shazam_number_GE");
const shazam_number_between_equals = require("./shazam_number_between_equals");

module.exports = {
  arche_money,
  arche_time_start_end,
  array_prevent_duplicate_strings,
  arrayify,
  clone_object,
  define,
  defineify,
  duration_hours_minutes,
  duration_months_days,
  duration_days_hours_minutes,
  generate_error_message,
  is_integer,
  normalize_email,
  object_does_not_have_property,
  object_has_property,
  query_param_add_value,
  query_param_is_present,
  query_param_is_query_string,
  query_param_replace_value,
  query_string_builder,
  query_string_endpoint,
  setter_chain_generator_config,
  setter_chain_generator_separate_arrays,
  regular_expression_patterns,
  shazam_is_time_RFC3339,
  shazam_date_human_readable,
  shazam_exact_length,
  shazam_is_coords,
  shazam_is_integer,
  shazam_is_boolean,
  shazam_is_url,
  shazam_is_url_facebook,
  shazam_object_has_property,
  shazam_is_array,
  shazam_min_length,
  shazam_max_length,
  shazam_max_length_array,
  shazam_min_length_array,
  shazam_number_LT,
  shazam_number_LE,
  shazam_number_GT,
  shazam_number_GE,
  shazam_number_between_equals,
};
