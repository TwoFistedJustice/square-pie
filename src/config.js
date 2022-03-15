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
  pie_defaults: {
    uid_length: 10, // feed to nanoid for uid property complexity  smaller is faster but increases chance of collision
    auto_set_appointment_service: false, // within Catalog_Item set auto set for product_type. True sets "APPOINTMENTS_SERVICE". false sets "REGULAR".
  },
};
module.exports = config;
