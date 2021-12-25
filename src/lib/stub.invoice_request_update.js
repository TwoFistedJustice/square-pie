const Invoice_RUDCnP = require("./stub.invoice_request_abstract_RUDCP_super");
const { nanoid } = require("nanoid");
const { shazam_max_length, arrayify } = require("./utilities/aaa_index");

/** @class Invoice_Update
 * @param {object}  invoice_document Get the invoice you want to update from Square and pass it as an argument.
 * You MUST do this when instantiating the Invoice_Update class. There is no option do do it later.
 * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
 * {@link https://developer.squareup.com/reference/square/invoices-api/update-invoice | Square Docs: Update endpoint}
 * {@link https://developer.squareup.com/docs/invoices-api/overview#update-an-invoice | Square Docs: Update an invoice}
 * */
class Invoice_Update extends Invoice_RUDCnP {
  _display_name = "Invoice_Update";
  _last_verified_square_api_version = "2021-12-15";
  _help = "";
  constructor(invoice_document) {
    super(invoice_document.id);
    this._method = "PUT";
    this._square_invoice_document = invoice_document;
    this._document_conditions = {
      is_published: this.#is_invoice_published(),
      cannot_update: this.#can_invoice_be_updated(),
    };
    this._invoice_conditionals = {
      has_primary_recipient: undefined,
      has_order_id: undefined,
      has_location_id: undefined,
    };
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
  // GETTERS
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

  get body() {
    // if .invoice has a value other than undefined and that value passes validation
    if (
      this._body.invoice !== undefined &&
      this.#validate(this._body.invoice)
    ) {
      return this._body;
    }
    // to quieten the linter
    return false;
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
    // todo test
    this._invoice_conditionals.has_order_id =
      fardel.order_id !== undefined ? true : false;
    this._invoice_conditionals.has_location_id =
      fardel.location_id !== undefined ? true : false;
    this._invoice_conditionals.has_primary_recipient =
      fardel.primary_recipient !== undefined ? true : false;
    this._body.invoice = fardel;
  }
  set fields_to_clear(field) {
    if (field === "order_id" || field === "location_id") {
      let message = "It is not allowed to clear the " + field + " property.";
      throw new Error(message);
    }

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

  // PRIVATE METHODS

  #is_invoice_published() {
    let inv = this._square_invoice_document;
    let is_published =
      inv.status === "UNPAID" ||
      inv.status === "SCHEDULED" ||
      inv.status === "PARTIALLY_PAID" ||
      inv.status === "PARTIALLY_REFUNDED"
        ? true
        : false;

    return is_published;
  }

  #can_invoice_be_updated() {
    // let inv = this._document_conditions.doc;
    let inv = this._square_invoice_document;
    let cannot_update =
      inv.status === "PAID" ||
      inv.status === "REFUNDED" ||
      inv.status === "CANCELED" ||
      inv.status === "FAILED" ||
      inv.status === "PAYMENT_PENDING"
        ? true
        : false;
    return cannot_update;
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
    let fields_is_array, includes_primary_recipient;

    //published status "UNPAID" "SCHEDULED" "PARTIALLY_PAID" "PARTIALLY_REFUNDED" ""
    let inv = this.square_invoice_document;
    let fields_to_clear = this._body.fields_to_clear;
    let is_published = this._document_conditions.is_published;

    let has_primary_recipient =
      this._invoice_conditionals.has_primary_recipient;
    let has_order_id = this._invoice_conditionals.has_order_id;
    let has_location_id = this._invoice_conditionals.has_primary_recipient;

    let cannot_update = this._document_conditions.cannot_update;

    // check if fields_to_clear is an array
    // if it is, does it include loc, ord, or prim
    fields_is_array = Array.isArray(fields_to_clear);

    if (cannot_update) {
      let message =
        "You cannot update an invoice which has a status of PAYMENT_PENDING, PAID, REFUNDED, CANCELED, or FAILED";
      throw new Error(message);
    } else if (has_order_id || has_location_id) {
      let message = "Cannot update order_id or location_id on an invoice.";
      throw new Error(message);
    } // END conditional sequence

    // if invoice is published
    // cannot update: primary_recipient
    if (is_published) {
      // todo this may be more complicated than just checking for a string
      includes_primary_recipient = fields_is_array
        ? fields_to_clear.includes("primary_recipient")
        : false;
      if (has_primary_recipient) {
        let message = "Cannot update primary recipient on a published invoice.";
        throw new Error(message);
      } else if (includes_primary_recipient) {
        let message =
          "Cannot update primary recipient on a published invoice. Please remove from fields_to_clear.";
        throw new Error(message);
      }
    } // END conditional sequence

    if (fardel.version !== inv.version) {
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
    } // END conditional sequence
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
