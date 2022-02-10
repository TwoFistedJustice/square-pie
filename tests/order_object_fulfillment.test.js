"use strict";
const Order_Fulfillment = require("../src/lib/order_object_fulfillment");
const { long_strings } = require("./helper_objects");
const { duration_days_hours_minutes } = require("../src/lib/utilities/index");

const RFC339 = "2019-10-12T07:20:50.52Z";
const nonCompliantTime = Date.now();

let fulfillment;
const class_name = "Order_Fulfillment";

/* --------------------------------------------------------*
 *                                                         *
 *                        common structures
 *                                                         *
 * ------------------------------------------------------- */
describe(`${class_name} basic object class structures`, () => {
  beforeEach(() => {
    fulfillment = new Order_Fulfillment();
  });
  test("should have display name", () => {
    expect(fulfillment.display_name).toBeDefined();
  });
  test("display name should be same as class name", () => {
    expect(fulfillment.display_name).toEqual(class_name);
  });
  test("should have help", () => {
    expect(fulfillment.help).toBeDefined();
  });
  test("should have defined square version", () => {
    expect(fulfillment.square_version).toBeDefined();
  });
  test("should have defined _fardel", () => {
    expect(fulfillment.fardel).toBeDefined();
  });
});
/* --------------------------------------------------------*
 *                                                         *
 *                        make()
 *                                                         *
 * ------------------------------------------------------- */
describe("make method ", () => {
  beforeEach(() => {
    fulfillment = new Order_Fulfillment();
  });

  test("make().uid() should set property", () => {
    let expected = "some id";
    fulfillment.make().uid(expected);
    expect(fulfillment.uid).toEqual(expected);
  });

  test("make().state() should set property", () => {
    let expected = "PROPOSED";
    fulfillment.make().state().proposed();
    expect(fulfillment.state).toEqual(expected);
  });

  test("make().state() should curry-over", () => {
    let expected = "PROPOSED";
    fulfillment.make().state().proposed().uid("123");
    expect(fulfillment.uid).toEqual("123");
    expect(fulfillment.state).toEqual(expected);
  });

  test("make().type() should set property", () => {
    let expected = "awesome";
    fulfillment.make().type(expected);
    expect(fulfillment.type).toEqual(expected);
  });

  test("make().shipment_details() should set property", () => {
    let expected = {
      cancel_reason: "some reason",
    };
    fulfillment.make().shipment_details(expected);
    expect(fulfillment.shipment_details).toMatchObject(expected);
  });

  test("make().pickup_details() should set property", () => {
    let expected = {
      cancel_reason: "some reason",
    };
    fulfillment.make().pickup_details(expected);
    expect(fulfillment.pickup_details).toMatchObject(expected);
  });

  test("cancel_reason should set all cancellation properties", () => {
    let note = "This is a note.";
    let expected_shipment_details = {
      cancel_reason: note,
    };
    fulfillment.make_shipment().cancel_reason(note);
    expect(fulfillment.state).toEqual("CANCELED");
    expect(fulfillment.shipment_details).toMatchObject(
      expected_shipment_details
    );
  });
});

/* --------------------------------------------------------*
 *                                                         *
 *                        make_pickup()
 *                                                         *
 * ------------------------------------------------------- */
describe("make_pickup() strings should be set correctly.", () => {
  // +PROPOSED + RESERVED + PREPARED + COMPLETED + CANCELED + FAILED;

  let fulfillment, pickup;

  beforeEach(function () {
    fulfillment = new Order_Fulfillment();
    pickup = fulfillment.make_pickup();
  });

  test("auto_complete_duration should set", () => {
    let duration = "P2DT12H30M"; //2 days, 12 hours, 30 minutes, and 15 seconds
    pickup.auto_complete_duration(duration_days_hours_minutes(2, 12, 30));
    expect(fulfillment.fardel.pickup_details.auto_complete_duration).toEqual(
      duration
    );
  });

  test("type should be set to 'PICKUP' ", () => {
    expect(fulfillment.type).toEqual("PICKUP");
  });

  test("pickup state should be set to PROPOSED", () => {
    let expected = "PROPOSED";
    pickup.state().proposed();
    expect(fulfillment.state).toEqual(expected);
  });

  test("pickup state should curry-over", () => {
    let expected = "PROPOSED";
    let asap = {
      schedule_type: "ASAP",
    };
    pickup.state().proposed().asap();
    expect(fulfillment.pickup_details).toMatchObject(asap);
    expect(fulfillment.state).toEqual(expected);
  });

  test("state should be set to RESERVED", () => {
    let expected = "RESERVED";
    pickup.state().reserved();
    expect(fulfillment.state).toEqual(expected);
  });

  test("state should be set to COMPLETED", () => {
    let expected = "COMPLETED";
    pickup.state().completed();
    expect(fulfillment.state).toEqual(expected);
  });
  test("state should be set to CANCELED", () => {
    let expected = "CANCELED";
    pickup.state().canceled();
    expect(fulfillment.state).toEqual(expected);
  });
  test("state should be set to FAILED", () => {
    let expected = "FAILED";
    pickup.state().failed();
    expect(fulfillment.state).toEqual(expected);
  });

  test("ASAP should be set for schedule type", () => {
    let expected = {
      schedule_type: "ASAP",
    };
    pickup.asap();
    expect(fulfillment.pickup_details).toMatchObject(expected);
  });

  test("SCHEDULED should be set for schedule type", () => {
    let expected = {
      schedule_type: "SCHEDULED",
    };
    pickup.scheduled();
    expect(fulfillment.pickup_details).toMatchObject(expected);
  });

  test("Note should be set", () => {
    let note = "This is a note.";
    let expected = {
      note: note,
    };
    pickup.note(note);
    expect(fulfillment.pickup_details).toMatchObject(expected);
  });

  test("cancel_reason should set all cancellation properties", () => {
    let ful = new Order_Fulfillment();
    let note = "This is a note.";
    let expected_pickup_details = {
      cancel_reason: note,
    };
    ful.make_pickup().cancel_reason(note);
    expect(ful.state).toEqual("CANCELED");
    expect(ful.pickup_details).toMatchObject(expected_pickup_details);
  });

  test("cancel should set all cancellation properties", () => {
    let ful = new Order_Fulfillment();
    let note = "This is a note.";
    let expected_pickup_details = {
      cancel_reason: note,
    };
    ful.make_pickup().cancel(note);

    expect(ful.state).toEqual("CANCELED");
    expect(ful.pickup_details).toMatchObject(expected_pickup_details);
  });

  test("setting shipment details should set pickup details to undefined", () => {
    let ful = new Order_Fulfillment();
    let note = "This is a note.";
    let expected_pickup_details = {
      cancel_reason: note,
    };
    ful.make_pickup().cancel(note);
    ful.make_shipment().cancel(note);
    expect(ful.pickup_details).toBeUndefined();
  });
  test("setting pickup details should set shipment details to undefined", () => {
    let ful = new Order_Fulfillment();
    let note = "This is a note.";
    let expected_pickup_details = {
      cancel_reason: note,
    };
    ful.make_shipment().cancel(note);
    ful.make_pickup().cancel(note);
    expect(ful.shipment_details).toBeUndefined();
  });
});

/* --------------------------------------------------------*
 *                                                         *
 *                        time_date
 *                                                         *
 * ------------------------------------------------------- */
describe("#time_date should reject non RFC339 time formats.", () => {
  beforeEach(() => {
    fulfillment = new Order_Fulfillment();
  });
  test("#time_date  should throw when fed non RFC339 time.", () => {
    let pickup = fulfillment.make_pickup();

    expect(() => {
      pickup.pickup_at(nonCompliantTime);
    }).toThrow();
  });

  test(`pickup_at should be ${RFC339}`, () => {
    let expected = {
      pickup_at: RFC339,
    };
    fulfillment.make_pickup().pickup_at(RFC339);

    expect(fulfillment.pickup_details).toMatchObject(expected);
  });

  test(`expires_at should be ${RFC339}`, () => {
    let expected = {
      expires_at: RFC339,
    };
    fulfillment.make_pickup().expires_at(RFC339);
    expect(fulfillment.pickup_details).toMatchObject(expected);
  });

  test(`pickup_window_duration should be ${RFC339}`, () => {
    let expected = {
      pickup_window_duration: RFC339,
    };
    fulfillment.make_pickup().pickup_window_duration(RFC339);
    expect(fulfillment.pickup_details).toMatchObject(expected);
  });

  test(`prep_time_duration should be ${RFC339}`, () => {
    let expected = {
      prep_time_duration: RFC339,
    };
    fulfillment.make_pickup().prep_time_duration(RFC339);
    expect(fulfillment.pickup_details).toMatchObject(expected);
  });
});

/* --------------------------------------------------------*
 *                                                         *
 *                        Private functions
 *                                                         *
 * ------------------------------------------------------- */
describe("Private functions Type and Conformity checking", () => {
  // private functions only need to be tested once each.
  // private functions only need to be tested once each.
  // note 500
  beforeEach(() => {
    fulfillment = new Order_Fulfillment();
  });

  test("#note should throw when they exceed the character limit", () => {
    let limit = fulfillment.limits.note + 1;
    let len = `len_${limit}`;
    let pickup = fulfillment.make_pickup();

    expect(() => {
      pickup.note(long_strings[len]);
    }).toThrow();
  });

  test("#time_date  should throw when fed non RFC339 time.", () => {
    let pickup = fulfillment.make_pickup();

    expect(() => {
      pickup.pickup_at(nonCompliantTime);
    }).toThrow();
  });
});

/* --------------------------------------------------------*
 *                                                         *
 *                        make_shipment()
 *                                                         *
 * ------------------------------------------------------- */
describe("make_shipment() strings should be set correctly.", () => {
  let shipment;

  beforeEach(() => {
    fulfillment = new Order_Fulfillment();
    shipment = fulfillment.make_shipment();
  });

  test("type should be set to 'SHIPMENT' ", () => {
    expect(fulfillment.type).toEqual("SHIPMENT");
  });

  test("state should be set to PROPOSED", () => {
    let expected = "PROPOSED";
    shipment.state().proposed();
    expect(fulfillment.state).toEqual(expected);
  });
  test("state should be set to RESERVED", () => {
    let expected = "RESERVED";
    shipment.state().reserved();
    expect(fulfillment.state).toEqual(expected);
  });

  test("state should be set to PREPARED", () => {
    let expected = "PREPARED";
    shipment.state().prepared();
    expect(fulfillment.state).toEqual(expected);
  });
  test("state should be set to COMPLETED", () => {
    let expected = "COMPLETED";
    shipment.state().completed();
    expect(fulfillment.state).toEqual(expected);
  });
  test("state should be set to CANCELED", () => {
    let expected = "CANCELED";
    shipment.state().canceled();
    expect(fulfillment.state).toEqual(expected);
  });
  test("state should be set to FAILED", () => {
    let expected = "FAILED";
    shipment.state().failed();
    expect(fulfillment.state).toEqual(expected);
  });

  test("shipment state should curry-over", () => {
    let note = "This is a note.";
    let da_note = {
      shipping_note: note,
    };
    let state = "FAILED";
    shipment.state().failed().note(note);
    expect(fulfillment.state).toEqual(state);
    expect(fulfillment.shipment_details).toMatchObject(da_note);
  });

  test("tracking numer should set", () => {
    let note = "This is a note.";
    let expected = {
      tracking_number: note,
    };
    shipment.tracking_number(note);
    expect(fulfillment.shipment_details).toMatchObject(expected);
  });

  test("shipping note should set", () => {
    let note = "This is a note.";
    let expected = {
      shipping_note: note,
    };
    shipment.shipping_note(note);
    expect(fulfillment.shipment_details).toMatchObject(expected);
  });

  test("shipping note should set", () => {
    let note = "This is a note.";
    let expected = {
      shipping_note: note,
    };
    shipment.note(note);
    expect(fulfillment.shipment_details).toMatchObject(expected);
  });

  test("failure_reason should set", () => {
    let note = "This is a note.";
    let expected = {
      failure_reason: note,
    };
    shipment.failure_reason(note);
    expect(fulfillment.shipment_details).toMatchObject(expected);
  });

  test("failure_reason should set state to FAILED", () => {
    let note = "This is a note.";
    let expected = {
      failure_reason: note,
    };
    shipment.failure_reason(note);
    expect(fulfillment.shipment_details).toMatchObject(expected);
    expect(fulfillment.state).toEqual("FAILED");
  });

  test("tracking_url should set", () => {
    let note = "This is a note.";
    let expected = {
      tracking_url: note,
    };
    shipment.tracking_url(note);
    expect(fulfillment.shipment_details).toMatchObject(expected);
  });

  test("cancel_reason should set all cancellation properties", () => {
    let ful = new Order_Fulfillment();
    let reason = "This is a reason.";
    let expected = {
      cancel_reason: reason,
    };
    ful.make_shipment().cancel_reason(reason);
    expect(ful.state).toEqual("CANCELED");
    expect(ful.shipment_details).toMatchObject(expected);
  });

  test("cancel should set all cancellation properties", () => {
    let ful = new Order_Fulfillment();
    let reason = "This is a reason.";
    let expected = {
      cancel_reason: reason,
    };
    ful.make_shipment().cancel(reason);
    expect(ful.state).toEqual("CANCELED");
    expect(ful.shipment_details).toMatchObject(expected);
  });

  test("shipping_type should be set to PRIORITY ", () => {
    let ful = new Order_Fulfillment();
    let type = "PRIORITY";
    let expected = {
      shipping_type: type,
    };
    ful.make_shipment().shipping_type(type);
    expect(ful.shipment_details).toMatchObject(expected);
  });

  test("carrier should be set to USPS ", () => {
    let ful = new Order_Fulfillment();
    let type = "USPS";
    let expected = {
      carrier: type,
    };
    ful.make_shipment().carrier(type);
    expect(ful.shipment_details).toMatchObject(expected);
  });
});

/* --------------------------------------------------------*
 *                                                         *
 *                        make_shipment time
 *                                                         *
 * ------------------------------------------------------- */

describe("make_shipment should handle time formats correctly", () => {
  let shipment;

  beforeEach(() => {
    fulfillment = new Order_Fulfillment();
    shipment = fulfillment.make_shipment();
  });

  test("expected_shipped_at  should throw when fed non RFC339 time.", () => {
    expect(() => {
      shipment.expected_shipped_at(nonCompliantTime);
    }).toThrow();
  });

  test(`expected_shipped_at should be ${RFC339}`, () => {
    let expected = {
      expected_shipped_at: RFC339,
    };
    fulfillment.make_shipment().expected_shipped_at(RFC339);

    expect(fulfillment.shipment_details).toMatchObject(expected);
  });
});

describe("Compliant recipient objects should be added to shipment and pickups.", () => {
  beforeEach(() => {
    fulfillment = new Order_Fulfillment();
  });

  test("make_pickup should accept a properly formatted recipient object", () => {
    let customer_id = "some id";
    let display_name = "Josephine";
    let email_address = "josie@firstempire.fr";
    let phone_number = "+33144423877";
    let address = {
      first_name: "Josephine",
      last_name: "Bonaparte",
      address_line_1: "Av. du Château de la Malmaison",
      locality: "Rueil-Malmaison",
      postal_code: "92500",
      country: "FR",
    };

    let expected = {
      recipient: {
        customer_id: customer_id,
        display_name: display_name,
        email_address: email_address,
        phone_number: phone_number,
        address: address,
      },
    };
    fulfillment
      .make_pickup()
      .recipient()
      .customer_id(customer_id)
      .display_name(display_name)
      .email(email_address)
      .phone(phone_number)
      .address(address);

    expect(fulfillment.pickup_details).toMatchObject(expected);
  });

  test("make_shipment should accept a properly formatted recipient object", () => {
    let customer_id = "some id";
    let display_name = "Josephine";
    let email_address = "josie@firstempire.fr";
    let phone_number = "+33144423877";
    let address = {
      first_name: "Josephine",
      last_name: "Bonaparte",
      address_line_1: "Av. du Château de la Malmaison",
      locality: "Rueil-Malmaison",
      postal_code: "92500",
      country: "FR",
    };

    let expected = {
      recipient: {
        customer_id: customer_id,
        display_name: display_name,
        email_address: email_address,
        phone_number: phone_number,
        address: address,
      },
    };
    fulfillment
      .make_shipment()
      .recipient()
      .customer_id(customer_id)
      .display_name(display_name)
      .email(email_address)
      .phone(phone_number)
      .address(address);

    expect(fulfillment.shipment_details).toMatchObject(expected);
  });
});

/* --------------------------------------------------------*
 *                                                         *
 *                        curbside pickups
 *                                                         *
 * ------------------------------------------------------- */

describe("curbside pickups", () => {
  test("Adding a curbside_details note should also set is_curbside to true", () => {
    let detail = "park in reserved spot, deliver pie via catapult.";
    let expected = {
      curbside_details: detail,
      is_curbside_pickup: true,
    };
    fulfillment.make_pickup().curbside_details(detail);
    expect(fulfillment.pickup_details).toMatchObject(expected);
  });

  test(`buyer_arrived_at should be set to ${RFC339}`, () => {
    let expected = {
      buyer_arrived_at: RFC339,
    };
    fulfillment.make_pickup().buyer_arrived_at(RFC339);
    expect(fulfillment.pickup_details).toMatchObject(expected);
  });

  test(`buyer_arrived_at should throw when fed a non RFC339 date format`, () => {
    expect(() => {
      fulfillment.make_pickup().buyer_arrived_at(nonCompliantTime);
    }).toThrow();
  });
});
