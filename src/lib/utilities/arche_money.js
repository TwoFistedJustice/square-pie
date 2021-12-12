const { isISO4217 } = require("validator");
/** arche_money builds and returns a compliant Square money object.
 * @param {number}  amt is the amount in the smallest currency designation (cents)
 * @param {string} currency expects a three character case-insensitive string forming an ISO 4217 compliant currency designation
 * If currency argument is not provided, currency will be set to "USD"
 * @throws Throws a TypeError if amt is a boolean
 * @throws Throws a TypeError if amt is not convertible to a Number
 * @throws Throws an error if currency is not a valid ISO 4217 currency
 * @return {object}Returns a Square money object
 *
 * @typedef (object} Money
 * @property {number} An integer amount of money. Use smallest currency designation, usually cents.
 * @property {string} Three letter, ISO 4217 compliant currency code
 *
 *
 * @example
 * You want to make EUR 42.00 (you accidentally hit shift on the last letter of "eur")
 * arche_money(4200, "euR") =>{amount: 4200, currency: "EUR"}
 *
 *
 * */
const arche_money = function (amt, currency = "USD") {
  let sanitized_currency = currency.trim().toUpperCase();
  let amount = Number(amt);
  if (isNaN(amount) || typeof amt === "boolean") {
    throw new TypeError(`'amount' must be a number. received: ${typeof amt}`);
  }
  if (!isISO4217(sanitized_currency)) {
    throw new Error(
      `Received ${currency} --  currency arg must be ISO 4217 compliant.`
    );
  }
  return { amount, currency: sanitized_currency };
};

module.exports = arche_money;
