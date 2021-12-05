const { isISO4217 } = require("validator");
/** arche_money builds and returns a compliant Square money object
 * @param {number}  amt is the amount in the smallest currency designation (cents)
 * @param {string} currency expects a three character string forming an ISO 4217 compliant currency desgination
 * If currency argument is not provided, currency will be set to "USD"
 * @throws Throws a Typerror if amt is a boolean
 * @throws Throws a Typerror if amt is not convertible to a Number
 * @throws Throws an error if currency is not a valid ISO 4217 currency
 * @return Returns a Square money object
 * */
const arche_money = function (amt, currency = "USD") {
  let amount = Number(amt);
  if (isNaN(amount) || typeof amt === "boolean") {
    throw new TypeError(`'amount' must be a number. received: ${typeof amt}`);
  }
  if (!isISO4217(currency)) {
    throw new Error(
      `Received ${currency} --  money_helper currency arg must be ISO 4217 compliant.`
    );
  }
  return { amount, currency };
};

module.exports = arche_money;
