const { uid_length } = require("../pie_defaults");
// "uid_ a-word # ending with nanoid // use the hash mark as an easy way to distinguish an order specific id
const uid_regex = new RegExp(
  `^(?:uid_)[a-z_]{1,}#{1}[A-Za-z0-9_-]{${uid_length}}$`
);

module.exports = uid_regex;
