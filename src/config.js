//
const config = {
  environment: "test",
  backbone: {
    node: true,
    wix: false,
  },
  square: {
    api_version: "2021-06-16",
  },
  secrets: {
    sandbox_secret_name: "SQUARE_SANDBOX",
    production_secret_name: "SQUARE_PRODUCTION_KEY",
  },
  http_headers: {
    content_type: "application/json",
    Accept: "application/json",
  },
};
module.exports = config;
