/**
 *  These are values used throughout Square Pie.
 *  Keep them here for easy reference and maintenance.
 * @typedef {function} pie_defaults
 * @public
 * @property {number} uid_length - feed to nanoid for uid property complexity  smaller is faster but increases chance of collision
 * @property {boolean} auto_set_appointment_service - within Catalog_Item set auto set for product_type. True sets "APPOINTMENTS_SERVICE". false sets "REGULAR".
 * */

const pie_defaults = {
  uid_length: 10,
  auto_set_appointment_service: false,
};

module.exports = pie_defaults;
