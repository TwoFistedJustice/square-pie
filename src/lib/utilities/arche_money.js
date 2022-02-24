const { isISO4217 } = require("validator");
/**
 * @description arche_money builds and returns a compliant Square money object.
 * @typedef {function} arche_money
 * @public
 * @function
 * @param {number}  amt is the amount in the smallest currency designation (cents)
 * @param {string=} currency expects a three character case-insensitive string forming an ISO 4217 compliant currency designation. If currency argument is not provided, currency will be set to "USD"
 * @throws Throws a TypeError if amt is not convertible to an integer
 * @throws Throws an error if currency is not a valid ISO 4217 currency
 * @return {money} Returns a Square money object
 * @example
 * You want to make EUR 42.00 (you accidentally hit shift on the last letter of "eur")
 * arche_money(4200, "euR") =>{amount: 4200, currency: "EUR"}
 * */

const arche_money = function (
  amt,
  currency = "USD",
  display_name = "unspecified class",
  caller = "unspecified method"
) {
  let sanitized_currency = currency.trim().toUpperCase();
  // check if amt in an integer
  let parsed = parseInt(amt);
  if (amt != parsed || isNaN(parsed)) {
    throw new TypeError(
      `${display_name}.${caller} expects an integer or a string that can be coerced to an integer. Received: ${amt}`
    );
  }
  // check if currency is valid
  if (!isISO4217(sanitized_currency)) {
    throw new Error(
      `Received ${currency} --  currency arg must be ISO 4217 compliant.`
    );
  }
  return {
    amount: Number(amt),
    currency: sanitized_currency,
  };
};

module.exports = arche_money;
