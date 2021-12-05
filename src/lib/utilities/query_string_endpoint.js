/**
 *  "slicer(key=val", "=") => "val"
 *   Cuts a string at the first occurrence of a character you provide and returns the remaining portion.
 * @param {string} str is the string you want to slice
 * @param {string} char is a single character where you want to slice it at,
 * removes everything up to and including the first occurrence of char
 * @return Returns a new string with the char and everything before it removed
 * */
const slicer = function (str, char) {
  let index = str.indexOf(char) + 1;
  return str.slice(index, str.length);
};

/** Builds onl a partial query string for when a class has an optional query string added to the endpoint.
 *  This version omits the leading '?'
 *
 * @param {string} string_to_modify - the string you want to add a value to
 * @param {string} key - the key to add the value to
 * @param {string} value - the value to add
 * @return Returns a new query string containing the key and value
 * */
const query_string_endpoint = function (string_to_modify, key, value) {
  const includesKey = string_to_modify.includes(`${key}=`);
  const inludesAmpersand = string_to_modify.includes("&");
  const isEmpty = string_to_modify.length === 0;

  // if string length is zero
  if (isEmpty) {
    return it_is_empty(key, value);
  }

  // if string contains key and does not contain an ampersand
  if (includesKey && !inludesAmpersand) {
    return it_has_key_but_not_ampersand(string_to_modify, value);
  }
  // if string contains BOTH key and ampersand
  if (includesKey && inludesAmpersand) {
    return it_has_key_and_ampersand(string_to_modify, key, value);
  }

  // if string does not contain key BUT is not empty (it has other key:value-sets)
  if (!includesKey && !isEmpty) {
    return it_has_other_keys_but_not_this_key(string_to_modify, key, value);
  }
};

/**
 * @param {string} string_to_modify - the string you want to modify
 * @param {string} key - the key you want to add a value to
 * @param {string} value - the value you want to add
 * @return Returns a copy of the old string with an new key-value-set added to it
 * */
const it_has_other_keys_but_not_this_key = function (
  string_to_modify,
  key,
  value
) {
  return `${string_to_modify}&${key}=${value}`;
};

/**
 * @param {string} string_to_modify - the string you want to modify
 * @param {string} value - the value you want to add
 * @return Returns a new string with teh value appended
 * */

const it_has_key_but_not_ampersand = function (string_to_modify, value) {
  return `${string_to_modify},${value}`;
};

/** it_is_empty() use on when the string is empty
 * @param {string} key - the key you want to add a value to
 * @param {string} val - the value you want add to the key
 * @return Returns a string in the form of "?key=value"
 * */
const it_is_empty = function (key, val) {
  return `?${key}=${val}`;
};

// test with string literal in node console
/**
 * @param {string} string_to_modify - the string you want to add a value to
 * @param {string} key - the key to add the value to
 * @param {string} value - the value to add
 * @throws Throws an error if the key:value pair you add is already present
 * @return Returns a new query string containing the key and value
 * */
const it_has_key_and_ampersand = function (string_to_modify, key, val) {
  const searchKey = `${key}=`;
  // "?key_1=val_1,val_2&key_2=val_1"

  // remove the leading ?
  // => "key_1=val_1,val_2&key_2=val_1"
  let len = string_to_modify.length;
  let string_without_question_mark = string_to_modify.slice(1, len);

  // use string.split to break at the ampersand
  // =>  ["key_1=val_1,val_2", "key_2=val_1"]
  let split_string_array = string_without_question_mark.split("&");

  // search the array and find the member containing key=
  // "key_1=val_1,val_2"
  let target = split_string_array.find((str) => str.includes(searchKey));

  // remove the string from the array
  // =>  ["key_2=val_1"]
  let filtered_array = split_string_array.filter((member) => member !== target);

  // remove the search key from the string
  // "key_1=val_1,val_2" => "val_1,val_2"

  // slice the string from = to end and convert to lower case
  // => "val_1,val_2"
  let values = slicer(target, "=").toLowerCase();
  // split the values up into an array for searching
  let valuesArray = values.split(",");

  // if it already has the value
  // throw an error
  let includesValue = valuesArray.includes(val.toLowerCase());
  if (includesValue) {
    throw new Error(`${val} is already added`);
  }

  // if it does NOT already have the value
  // append a comma and val to the target
  let updatedTarget = target.concat(",", val);
  filtered_array.push(updatedTarget);

  // add & to the beginning of every member except the first
  let rejoinedString = "";
  for (let i = 0; i < filtered_array.length; i++) {
    if (i > 0) {
      filtered_array[i] = "&" + filtered_array[i];
    }
    rejoinedString += filtered_array[i];
  }
  // add a ? to the beginning and send it home
  return "?" + rejoinedString;
};

module.exports = query_string_endpoint;
