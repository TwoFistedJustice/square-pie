// this is not a super of fulfillment

class Order_Object {
  _idempotency_key;
  _id;
  _location_id; // required
  _closed_at;
  _created_at;
  _updated_at;

  _fulfillments; // [{complex objects}]
  _line_items; // [{complex objects}]

  _pricing_options; // {pricing_options: bool, auto_apply_taxes: bool}
  _reference_id; // backend ID or this order

  _return_amounts;

  _service_charges; //[{amount_money: {amount: 1, currency: "USD"} }, {applied_money: {amount: 1, currency: "USD"}]
  _discounts; //[{amount_money: {amount: 1, currency: "USD"} }, {applied_money: {amount: 1, currency: "USD"}]
  _source; //probably easiest to automatically set this to location id and leave an option to change it
  _state; //OPEN, COMPLETED, CANCELED, DRAFT
  _taxes; // [{applied_money: {amount: 1, currency: "USD"}] - complex: see JSON example in docs

  _total_discount_money; // [{amount: 1, currency: "USD"}] READ ONLY
  _total_money; // [{amount: 1, currency: "USD"}] READ ONLY
  _total_service_charge_money; // [{amount: 1, currency: "USD"}] READ ONLY
  _total_tax_money; // [{amount: 1, currency: "USD"}] READ ONLY
  _total_tip_money; // [{amount: 1, currency: "USD"}] READ ONLY

  _version; //`BETA`
  _customer_id; // `BETA`  MAX 191 -- make this required
  _metadata; // `BETA` READ ONLY - limits on L and content
  _net_amounts; // `BETA`  READ ONLY - not sure if this is just for response or also part of request??
  _refunds; // `BETA` [] READ ONLY - complex
  _returns; //`BETA` [] READ ONLY - complex
  _rewards; //`BETA` [] READ ONLY - complex
  _rounding_adjustment; //`BETA` READ ONLY - complex - don't support this in v1
  _tenders; //`BETA` [] READ ONLY - complex
  _ticket_name; //`BETA`  str - this is persisted and gets displayed on any printouts
  constructor() {
    this.configuration = {};
  }
}
module.exports = Order_Object;
