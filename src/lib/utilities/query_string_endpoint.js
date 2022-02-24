/**
 * @param {string} prop value at the property you want o modify
 * @param {string} The vallue to add
 * @return {string} Returns a new string that concatenates the new value preceded by a comma to the old string.
 *@ignore
 * */

// if duplicate prevention becomes an issue, have a look at query_string_builder. It exists there.
const query_string_endpoint = function (prop, value) {
  let output;
  if (prop === undefined) {
    output = value;
  } else {
    output = prop + "," + value;
  }
  return output;
};

module.exports = query_string_endpoint;
