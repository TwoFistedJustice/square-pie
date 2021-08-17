const Retrieve_Update_Delete = require("./customer_request_R_U_D");

class Customer_Retrieve extends Retrieve_Update_Delete {
  constructor(id) {
    super(id);
    this._method = "get";
  }
}

module.exports = Customer_Retrieve;
