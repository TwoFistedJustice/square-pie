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
    sandboxSecretName: "SQUARE_SANDBOX_",
    productionSecretName: "SQUARE_PROUDCTION_KEY",
  },
  http_headers: {
    contentType: "application/json",
    Accept: "application/json",
  },
};
module.exports = config;
