/**
 * @param {string} key - the class property that received the wrong value type
 * @param {string} expected_type - the type of argument expected
 * @param {any} received - the value that failed the error check
 * @return Returns an error message explaining what property went wrong, what was expected, and what was received.
 * @ignore
 * */
const generate_error_message = function (key, expected_type, received) {
  let type_received = typeof received;
  return `${key}\n expected type: ${expected_type}\n received type: ${type_received}\nvalue received: ${received} `;
};

module.exports = generate_error_message;
