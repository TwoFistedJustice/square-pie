const Invoice_RUDCnP = require("./invoice_request_abstract_RUDCP_super");
const {
  query_param_is_query_string,
  query_param_is_present,
  query_param_replace_value,
  shazam_integer,
} = require("./utilities");
const man =
  " http request to delete an invoice.\n" +
  "Pass the id of the invoice to be deleted as a string argument when you instantiate the class.\n" +
  "There is no option to add it afterwards. The make() method on this class only sets the version to delete.\n" +
  "\nhttps://developer.squareup.com/reference/square/invoices-api/delete-invoice";
/** @class Invoice_Delete
 * @param {string} id The invoice_id of the invoice you want
 * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
 * * {@link https://developer.squareup.com/reference/square/invoices-api/delete-invoice | Square Docs}
 * */
class Invoice_Delete extends Invoice_RUDCnP {
  _display_name = "Invoice_Delete";
  _last_verified_square_api_version = "2021-12-15";
  _help = this.display_name + ": " + man;
  constructor(id) {
    super(id);
    this._method = "DELETE";
    this._delivery;
  }

  set delivery(parcel) {
    this._delivery = parcel;
  }

  get delivery() {
    return this._delivery;
  }

  set #endpoint(str) {
    this._endpoint = str;
  }

  set version(int) {
    if (shazam_integer(int, this.display_name, "version"))
      this.#query_param_replace("version", int + "");
  }

  #init_query_param_sequence(param, value) {
    let modified_endpoint = this.endpoint;
    // check if endpoint is already formatted as a query string.
    if (!query_param_is_query_string(modified_endpoint)) {
      // if not then append ?param=value and return false
      modified_endpoint += "?" + param + "=" + value;
      this.#endpoint = modified_endpoint;
      return false;
    } else {
      // if it is modified - check for presence of param
      if (!query_param_is_present(modified_endpoint, param)) {
        // if param is not present- append &param=value and return false
        modified_endpoint += "&" + param + "=" + value;
        this.#endpoint = modified_endpoint;
        return false;
      } else {
        // if param is present return true.
        return true;
      }
    }
  }

  #query_param_replace(param, value) {
    if (this.#init_query_param_sequence(param, value)) {
      this.#endpoint = query_param_replace_value(this.endpoint, param, value);
    }
  }

  // MAKER METHODS
  make() {
    return {
      self: this,
      version: function (int) {
        this.self.version = int;
        return this;
      },
    };
  }
}

module.exports = Invoice_Delete;
