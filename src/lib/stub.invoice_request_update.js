const Invoice_RUDCnP = require("./stub.invoice_request_abstract_RUDCP_super");
const { nanoid } = require("nanoid");
const { shazam_max_length, arrayify } = require("./utilities/aaa_index");

/** @class Invoice_Update
 * @param {object}  invoice_document Get the invoice you want to update from Square and pass it as an argument.
 * You MUST do this when instantiating the Invoice_Update class. There is no option do do it later.
 * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
 * {@link https://developer.squareup.com/reference/square/invoices-api/update-invoice | Square Docs}
 * */
class Invoice_Update extends Invoice_RUDCnP {
  _display_name = "Invoice_Update";
  _last_verified_square_api_version = "2021-12-15";
  _help = "";
  constructor(invoice_document) {
    super(invoice_document.id);
    this._method = "PUT";
    this._square_invoice_document = invoice_document;
    this._body = {
      idempotency_key: nanoid(), // 128
      invoice: undefined,
      fields_to_clear: undefined,
    };
    this.configuration = {
      maximums: {
        idempotency_key: 128,
      },
    };
  }

  get display_name() {
    return this._display_name;
  }
  get square_version() {
    return `The last verified compatible Square API version is ${this._last_verified_square_api_version}`;
  }
  get delivery() {
    return this._delivery;
  }
  get square_invoice_document() {
    return this._square_invoice_document;
  }

  get idempotency_key() {
    return this._body.idempotency_key;
  }

  get invoice() {
    return this._body.invoice;
  }

  get fields_to_clear() {
    return this._body.fields_to_clear;
  }

  // https://developer.squareup.com/docs/invoices-api/overview#update-an-invoice
  /** @method This validates the desired updates versus Square's rules by comparing the desired updates
   * to the invoice copy passed to the constructor.
   * @private
   * @param {object} fardel The sparse invoice you want to send as an update
   * @throws Throws an error if the versions do no match.
   * @throws Throws an error if the invoice cannot be updated to status.
   * @throws Throws an error if an attempt is made to update order_id or location_id.
   * @throws Throws an error if the invoice is published and an attempt is made to update primary_recipient
   * @throws Throws an error if the versions do not match.
   * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
   * {@link  | Square Docs}
   * */
  #validate(fardel) {
    //published status "UNPAID" "SCHEDULED" "PARTIALLY_PAID" "PARTIALLY_REFUNDED" ""
    let inv = this.square_invoice_document;
    let is_published;
    // let is_draft = inv.status === "DRAFT" ? true : false;
    let has_primary_recipient =
      fardel._primary_recipient !== undefined ? true : false;
    let has_order_id = fardel._order_id !== undefined ? true : false;
    let has_location_id = fardel._location_id !== undefined ? true : false;
    let cannot_update =
      inv.status === "PAID" ||
      inv.status === "REFUNDED" ||
      inv.status === "CANCELED" ||
      inv.status === "FAILED" ||
      inv.status === "PAYMENT_PENDING"
        ? true
        : false;

    // todo  have it check fields to clear where appropriate

    // invoice.status = "PAID", "REFUNDED", "CANCELED", "FAILED"
    //   cannot update
    // if (inv.status === "PAID" ||
    //     inv.status === "REFUNDED" ||
    //     inv.status ===  "CANCELED"||
    //     inv.status ===  "FAILED" ||
    //     inv.status ===  "PAYMENT_PENDING" ){
    if (cannot_update) {
      let message =
        "You cannot update an invoice which has a status of PAYMENT_PENDING, PAID, REFUNDED, CANCELED, or FAILED";
      throw new Error(message);
    } else if (has_order_id || has_location_id) {
      let message = "Cannot update order_id or location_id on an invoice.";
      throw new Error(message);
    }

    is_published =
      inv.status === "UNPAID" ||
      inv.status === "SCHEDULED" ||
      inv.status === "PARTIALLY_PAID" ||
      inv.status === "PARTIALLY_REFUNDED"
        ? true
        : false;

    // if (inv.status === "UNPAID" ||
    //    inv.status === "SCHEDULED" ||
    //    inv.status ===  "PARTIALLY_PAID"||
    //    inv.status ===  "PARTIALLY_REFUNDED" ){
    //    is_published = true;
    //  } else {
    //    is_published = false;
    //  }

    // invoice is published
    // cannot update: primary_recipient
    if (is_published && has_primary_recipient) {
      let message = "Cannot update primary recipient on a published invoice.";
      throw new Error(message);
    } else if (fardel.version !== inv.version) {
      // version - must match
      let message =
        "Versions do not match. Expected: " +
        inv.version +
        " Received: " +
        fardel.version;
      throw new Error(message);
    } else {
      // if all tests pass - move along
      return true;
    }
  }

  // SETTERS
  set idempotency_key(key) {
    if (
      shazam_max_length(
        this.configuration.maximums.idempotency_key,
        key,
        this.display_name,
        "idempotency_key"
      )
    ) {
      this._body.idempotency_key = key;
    }
  }

  set invoice(fardel) {
    if (this.#validate()) {
      this._body.invoice = fardel;
    }
  }

  set fields_to_clear(field) {
    if (
      arrayify(
        this._body,
        "fields_to_clear",
        this._display_name,
        "fields_to_clear"
      )
    ) {
      this._body.fields_to_clear.push(field);
    }
  }

  // MAKER METHODS
  make() {
    return {
      self: this,
      id: function (id) {
        this.self.id = id;
        return this;
      },
      invoice: function (fardel) {
        this.self.invoice = fardel;
        return this;
      },
      fields_to_clear: function (field) {
        this.self.fields_to_clear = field;
        return this;
      },
    };
  }
}

module.exports = Invoice_Update;
