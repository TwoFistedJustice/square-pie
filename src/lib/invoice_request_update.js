const Invoice_RUDCnP = require("./invoice_request_abstract_RUDCP_super");
const { nanoid } = require("nanoid");
const { shazam_max_length, arrayify } = require("./utilities");

const man =
  "http request to upate an invoice by modifying fields, clearing fields, or both. \n" +
  "Pass the invoice_id as a string argument when you instantiate the class. There is no option to do it later.\n" +
  "If you want to change values on invoice fields, create a sparse invoice using Invoice_Object class. If the invoice\n" +
  "has illegal updates this class will throw an error. To aid in debugging, the specific reason will be stashed at myVar.reason.\n" +
  "You can also manually validate a sparse invoice by passing it to myVar.validate(fardel). Then check myVar.reason.\n" +
  "You may not update the order_id or location_id. You may not update the primary_recipient on a published invoice.\n" +
  "\nhttps://developer.squareup.com/reference/square/invoices-api/update-invoice" +
  "\nhttps://developer.squareup.com/docs/invoices-api/overview#update-an-invoice";

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
  _help = this.display_name + ": " + man;
  _reason = "";
  constructor(invoice_document) {
    super(invoice_document.id);
    this._method = "PUT";
    this._square_invoice_document = invoice_document;
    this._invoice_is_updatable = this.#is_updatable();
    this._invoice_is_published = this.#is_invoice_published();
    this._body = {
      idempotency_key: nanoid(), // 128
      invoice: undefined, // sparse invoice object containing only the fields you want to update - don't be like Princess Vespa
      fields_to_clear: undefined,
    };
    this.configuration = {
      maximums: {
        idempotency_key: 128,
      },
    };
  }
  // GETTERS

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
    // don't use the !validate() syntax or it causes errors
    let validated = this.validate();
    if (validated === false) {
      throw new Error(this.reason);
    } else {
      return this._body;
    }
  }

  get reason() {
    return this._reason;
  }

  // GETTERS for the condtionals related to the Square document passed as an argument to the constructor
  get is_updatable() {
    return this._invoice_is_updatable;
  }
  get is_published() {
    return this._invoice_is_published;
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
    this._body.invoice = fardel;
    if (!this.validate()) {
      throw new Error(this.reason);
    }
  }
  set fields_to_clear(field) {
    if (field === "order_id" || field === "location_id") {
      let message = "It is not allowed to clear the " + field + " property.";
      throw new Error(message);
    }
    arrayify(
      this._body,
      "fields_to_clear",
      this._display_name,
      "fields_to_clear"
    );
    this._body.fields_to_clear.push(field);
  }

  set #reason(str) {
    let base = this._reason;
    let final;
    // if (this.reason === undefined) {
    if (base === "") {
      base = "Update disallowed for the following reason(s):";
    }
    final = base.concat("\n- " + str);
    this._reason = final;
  }

  // PRIVATE METHODS

  #is_invoice_published() {
    // these are legal to update but you can't update primary_recipient
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

  #is_updatable() {
    // these are always illegal to update
    let inv = this._square_invoice_document;
    let can_be_updated =
      inv.status === "PAID" ||
      inv.status === "REFUNDED" ||
      inv.status === "CANCELED" ||
      inv.status === "FAILED" ||
      inv.status === "PAYMENT_PENDING"
        ? false
        : true;

    if (can_be_updated === false) {
      this.#reason =
        "Invoices cannot be updated which have a status of PAYMENT_PENDING, PAID, REFUNDED, CANCELED, or FAILED";
    }
    return can_be_updated;
  }

  #compare_version(fardel) {
    let inv = this.square_invoice_document;
    if (fardel.version !== inv.version) {
      let message =
        "Versions do not match. Expected: " +
        inv.version +
        " Received: " +
        fardel.version;
      this.#reason = message;
      return false;
    } else {
      // if versions match return true
      return true;
    }
  }

  #validate_primary_recipient(fardel) {
    if (fardel.primary_recipient !== undefined) {
      if (this.is_published === true) {
        this.#reason =
          "It is not allowed to update primary_recipient on a published invoice.";
        return false;
      }
    } else {
      return true;
    }
  }

  #validate_order_id(fardel) {
    if (fardel.order_id !== undefined) {
      this.#reason = "It is not allowed to update order_id.";
      return false;
    } else {
      return true;
    }
  }

  #validate_location_id(fardel) {
    if (fardel.location_id !== undefined) {
      this.#reason = "It is not allowed to update location_id.";
      return false;
    } else {
      return true;
    }
  }

  #can_clear_primary_recipient() {
    if (this.is_published && Array.isArray(this._body.fields_to_clear)) {
      if (this._body.fields_to_clear.includes("primary_recipient")) {
        this.#reason =
          "It is not allowed to clear primary_recipient on a published invoice.";
        return false;
      }
    } else {
      return true;
    }
  }

  /** @method  validation - determines if an update is legal. If it is legal it returns true. If it is illegal,
   * it returns false and the reason can be accessed at yourVar.reason. This method is run automatically when
   * you call yourVar.request() and will throw an error if validation fails. If you run it manually, no error
   * will be thrown.
   * @param {object}  Invoice_Object.fardel
   * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
   * {@link https://developer.squareup.com/docs/invoices-api/overview#update-an-invoice | Square Docs}
   *
   * Determines whether the update is legal or not.
   * The update is illegal if
   * - if the versions do no match.
   * - an attempt is made to update order_id or location_id.
   * - the invoice is published and an attempt is made to update primary_recipient
   *
   * - invoice status is
   *    - "PAID"
   *    - "REFUNDED"
   *    - "CANCELED"
   *    - "FAILED"
   *    - "PAYMENT_PENDING
   * */
  // the default is the sparse invoice object NOT the original
  validate(fardel = this._body.invoice) {
    let is_legal;
    /** @function update_legality checks the value of is_legal
     * if it is undefined - it sets it to the received value
     * if it true set it to the  received value
     * if it is false, leave it as it is
     * @param {boolean} the result of a test
     * */
    let update_legality = function (bool) {
      if (is_legal === undefined || is_legal === true) {
        is_legal = bool;
      } else if (is_legal === false) {
        return;
      }
    };
    // disallow clearing primary_recipient if invoice is published
    update_legality(this.#can_clear_primary_recipient());
    // if there is not an invoice to validate, then don't!
    if (fardel !== undefined) {
      // if (this._body.invoice !== undefined ){
      // let fardel = this._body.invoice;
      // disallow update if status is PAYMENT_PENDING, PAID, REFUNDED, CANCELED, or FAILED.
      update_legality(this.is_updatable);
      // disallow updating primary_recipient if invoice is published
      update_legality(this.#validate_primary_recipient(fardel));

      // disallow update of order_id or location_id
      update_legality(this.#validate_order_id(fardel));
      update_legality(this.#validate_location_id(fardel));
      // versions must be the same
      update_legality(this.#compare_version(fardel));
    }
    return is_legal;
  }

  // MAKE METHODS
  /** @function make()  method of Invoice_Update - method names are exactly the same as the property names listed
   * in the Square docs. There may be additional methods and/or shortened aliases of other methods.
   * @method idempotency_key - this is set automatically
   * @param {string} key -
   * @method invoice
   * @param {object} fardel  - a sparse invoice object fardel containing only the fields to be changed.
   * @method fields_to_clear
   * @param {string} field - the key of the key:value pair to be cleard.
   
   * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
   * @example
   *  You must use parentheses with every call to make and with every sub-method. If you have to make a lot
   *  of calls from different lines, it will reduce your tying and improve readability to set make() to a
   *  variable.
   *  let make = myVar.make();
   *   make.gizmo()
   *   make.gremlin()
   *
   * */
  make() {
    return {
      self: this,
      idempotency_key: function (key) {
        this.self.idempotency_key = key;
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
