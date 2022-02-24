const { isURL } = require("validator");

/**@function shazam_is_url
 * @param {string} url - expects a valid url
 * @param {string} display_name - the _display_name static from the calling class
 * @param {string} caller - the name variable from the calling function
 * @throws throws and error if the url is not valid
 * @return {boolean} returns true if the url is valid
 * @ignore
 * */

const validator_options = {
  protocols: ["http", "https", "ftp"],
  require_tld: true,
  require_protocol: false,
  require_host: true,
  require_port: false,
  require_valid_protocol: true,
  allow_underscores: false,
  host_whitelist: false,
  host_blacklist: false,
  allow_trailing_dot: false,
  allow_protocol_relative_urls: false,
  allow_fragments: true,
  allow_query_components: true,
  disallow_auth: false,
  validate_length: false,
};

const shazam_is_url = function (
  url,
  display_name = "unspecified class",
  caller = "unspecified class setter"
) {
  if (!isURL(url, validator_options)) {
    throw new Error(
      `${display_name}.${caller} expects a valid URL Received: ${url}`
    );
  }
  return true;
};

module.exports = shazam_is_url;
