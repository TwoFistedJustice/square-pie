/*
 *  These are values used throughout Square Pie.
 *  Keep them here for easy reference and maintenance.
 * */

const pie_defaults = {
  uid_length: 10, // feed to nanoid for uid property complexity  smaller is faster but increases chance of collision
  auto_set_appointment_service: false, // within Catalog_Item set auto set for product_type. True sets "APPOINTMENTS_SERVICE". false sets "REGULAR".
};

module.exports = pie_defaults;
