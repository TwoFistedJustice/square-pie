// It accepts a decimal number in a string format that can take up to 10 digits before the decimal point and up to 5 digits after the decimal point.
const number_quantity_regex = /^[1-9]{1}[0-9]{0,9}\.{1}[0-9]{1,5}$/;

module.exports = number_quantity_regex;
