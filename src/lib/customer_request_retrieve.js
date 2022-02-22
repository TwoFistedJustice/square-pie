const Retrieve_Update_Delete = require("./customer_request_abstract_R_U_D_super");
const man =
  "fetches one customer record.\n" +
  "Add the Square id of the customer record to delete as an argument when you create the class. This is required. \n" +
  "There is no native make() method for this class." +
  "https://developer.squareup.com/reference/square/customers-api/retrieve-customer";

/**
 * {@link https://developer.squareup.com/reference/square/customers-api/retrieve-customer |  **-------> Link To Square Docs <-------**}
 * @class Customer_Retrieve
 * @classdesc
 * Fetches one customer record.<br>
 * Add the Square id of the customer record to delete as an argument when you create the class. This is required.
 * */

class Customer_Retrieve extends Retrieve_Update_Delete {
  _display_name = "Customer_Retrieve";
  _last_verified_square_api_version = "2021-12-15";
  _help = this.display_name + ": " + man;
  constructor(id) {
    super(id);
    this._method = "GET";
    this._delivery;
  }
}

/**
 *  make() method  inherited from Customer_Retrieve_Update_Delete_Super
 *  Make sure to have the Square Docs open in front of you.
 * Sub-Method names are exactly the same as the property names listed
 * in the Square docs. There may be additional methods and/or shortened aliases of other methods.
 *
 * You should read the generated docs as:
 *     method_name(arg) {type} description of arg
 *
 * @typedef {function} Customer_Retrieve.make
 * @method
 * @public
 * @memberOf Customer_Retrieve
 * @property id(id) {string} - sets the id in the URL
 * @example
 *  You must use parentheses with every call to make and with every sub-method. If you have to make a lot
 *  of calls from different lines, it will reduce your tying and improve readability to set make() to a
 *  variable.
 *
 *  let make = myVar.make();
 *   make.gizmo()
 *   make.gremlin()
 *    //is the same as
 *   myVar.make().gizmo().gremlin()
 * */

module.exports = Customer_Retrieve;
