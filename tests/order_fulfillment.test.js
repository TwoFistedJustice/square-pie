// "use strict";

const Order_Fulfillment = require("../src/lib/order_fulfillment");
const should = require("chai").should();
const { long_strings } = require("./helper_objects");

const RFC339 = "2019-10-12T07:20:50.52Z";
const nonCompliantTime = Date.now();

describe.only("Silence Order Fulfillment tests", () => {
  test("Should silence tests", () => {
    expect("a").toEqual("a");
  });
});

describe("make method ", () => {
  test("make().uid() should set property", () => {
    let ful = new Order_Fulfillment();
    let expected = "some id";
    ful.make().uid(expected);
    expect(ful.uid).toEqual(expected);
  });

  test("make().state() should set property", () => {
    let ful = new Order_Fulfillment();
    let expected = "PROPOSED";
    ful.make().state().proposed();
    expect(ful.state).toEqual(expected);
  });

  test("make().type() should set property", () => {
    let ful = new Order_Fulfillment();
    let expected = "awesome";
    ful.make().type(expected);
    expect(ful.type).toEqual(expected);
  });

  test("make().shipment_details() should set property", () => {
    let ful = new Order_Fulfillment();
    let expected = {
      cancel_reason: "some reason",
    };
    ful.make().shipment_details(expected);
    expect(ful.shipment_details).toMatchObject(expected);
  });

  test("make().pickup_details() should set property", () => {
    let ful = new Order_Fulfillment();
    let expected = {
      cancel_reason: "some reason",
    };
    ful.make().pickup_details(expected);
    expect(ful.pickup_details).toMatchObject(expected);
  });

  test("cancel_reason should set all cancellation properties", () => {
    let ful = new Order_Fulfillment();
    let note = "This is a note.";
    let expected_shipment_details = {
      cancel_reason: note,
    };
    ful.make_shipment().cancel_reason(note);
    expect(ful.state).toEqual("CANCELED");
    expect(ful.shipment_details).toMatchObject(expected_shipment_details);
  });
});

describe("make_pickup() strings should be set correctly.", () => {
  // +PROPOSED + RESERVED + PREPARED + COMPLETED + CANCELED + FAILED;

  let fulfillment, pickup;

  beforeEach(function () {
    fulfillment = new Order_Fulfillment();
    pickup = fulfillment.make_pickup();
  });

  test("type should be set to 'PICKUP' ", () => {
    expect(fulfillment.type).toEqual("PICKUP");
  });

  test("state should be set to PROPOSED", () => {
    let expected = "PROPOSED";
    pickup.state().proposed();
    expect(fulfillment.state).toEqual(expected);
  });
  test("state should be set to RESERVED", () => {
    let expected = "RESERVED";
    pickup.state().reserved();
    expect(fulfillment.state).toEqual(expected);
  });

  test("state should be set to PREPARED", () => {
    let expected = "PREPARED";
    pickup.state().reserved().prepared();
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

describe("#time_date should reject non RFC339 time formats.", () => {
  test("#time_date  should throw when fed non RFC339 time.", () => {
    let fulfillment = new Order_Fulfillment();
    let pickup = fulfillment.make_pickup();

    expect(() => {
      pickup.pickup_at(nonCompliantTime);
    }).toThrow();
  });

  test(`pickup_at should be ${RFC339}`, () => {
    let expected = {
      pickup_at: RFC339,
    };
    let fulfillment = new Order_Fulfillment();
    fulfillment.make_pickup().pickup_at(RFC339);

    expect(fulfillment.pickup_details).toMatchObject(expected);
  });

  test(`expires_at should be ${RFC339}`, () => {
    let expected = {
      expires_at: RFC339,
    };
    let fulfillment = new Order_Fulfillment();
    fulfillment.make_pickup().expires_at(RFC339);
    expect(fulfillment.pickup_details).toMatchObject(expected);
  });

  test(`pickup_window_duration should be ${RFC339}`, () => {
    let expected = {
      pickup_window_duration: RFC339,
    };
    let fulfillment = new Order_Fulfillment();
    fulfillment.make_pickup().pickup_window_duration(RFC339);
    expect(fulfillment.pickup_details).toMatchObject(expected);
  });

  test(`prep_time_duration should be ${RFC339}`, () => {
    let expected = {
      prep_time_duration: RFC339,
    };
    let fulfillment = new Order_Fulfillment();
    fulfillment.make_pickup().prep_time_duration(RFC339);
    expect(fulfillment.pickup_details).toMatchObject(expected);
  });
});

describe("Private functions Type and Conformity checking", () => {
  // private functions only need to be tested once each.
  // private functions only need to be tested once each.
  // note 500

  test("#note should throw when they exceed the character limit", () => {
    let fulfillment = new Order_Fulfillment();
    let limit = fulfillment.limits.note + 1;
    let len = `len_${limit}`;
    let pickup = fulfillment.make_pickup();

    expect(() => {
      pickup.note(long_strings[len]);
    }).toThrow();
  });

  test("#time_date  should throw when fed non RFC339 time.", () => {
    let fulfillment = new Order_Fulfillment();
    let pickup = fulfillment.make_pickup();

    expect(() => {
      pickup.pickup_at(nonCompliantTime);
    }).toThrow();
  });
});

describe("make_shipment() strings should be set correctly.", () => {
  const fulfillment = new Order_Fulfillment();
  let shipment = fulfillment.make_shipment();

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

  test("Note should be set", () => {
    let note = "This is a note.";
    let expected = {
      shipping_note: note,
    };
    shipment.note(note);
    expect(fulfillment.shipment_details).toMatchObject(expected);
  });

  test("Note should be set", () => {
    let note = "This is a note.";
    let expected = {
      shipping_note: note,
    };
    shipment.shipping_note(note);
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

describe("make_shipment should handle time formats correctly", () => {
  test("expected_shipped_at  should throw when fed non RFC339 time.", () => {
    let fulfillment = new Order_Fulfillment();
    let shipment = fulfillment.make_shipment();

    expect(() => {
      shipment.expected_shipped_at(nonCompliantTime);
    }).toThrow();
  });

  test(`expected_shipped_at should be ${RFC339}`, () => {
    let expected = {
      expected_shipped_at: RFC339,
    };
    let fulfillment = new Order_Fulfillment();
    fulfillment.make_shipment().expected_shipped_at(RFC339);

    expect(fulfillment.shipment_details).toMatchObject(expected);
  });
});

describe("Compliant recipient objects should be added to shipment and pickups.", () => {
  test("make_pickup should accept a properly formatted recipient object", () => {
    let fulfillment = new Order_Fulfillment();
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
    let fulfillment = new Order_Fulfillment();
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

describe("curbside pickups", () => {
  test("Adding a curbside_details note should also set is_curbside to true", () => {
    let fulfillment = new Order_Fulfillment();

    let detail = "park in reserved spot, deliver pie via catapult.";
    let expected = {
      curbside_details: detail,
      is_curbside_pickup: true,
    };
    fulfillment.make_pickup().curbside_details(detail);
    expect(fulfillment.pickup_details).toMatchObject(expected);
  });

  test(`buyer_arrived_at should be set to ${RFC339}`, () => {
    let fulfillment = new Order_Fulfillment();
    let expected = {
      buyer_arrived_at: RFC339,
    };
    fulfillment.make_pickup().buyer_arrived_at(RFC339);
    expect(fulfillment.pickup_details).toMatchObject(expected);
  });

  test(`buyer_arrived_at should throw when fed a non RFC339 date format`, () => {
    let fulfillment = new Order_Fulfillment();
    expect(() => {
      fulfillment.make_pickup().buyer_arrived_at(nonCompliantTime);
    }).toThrow();
  });
});
