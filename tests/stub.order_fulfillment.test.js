// "use strict";
const Order_Fulfillment = require("../src/lib/stub.order_fulfillment");
const should = require("chai").should();
const { long_strings } = require("./helper_objects");

const RFC339 = " 2019-10-12T07:20:50.52Z";
const nonCompliantTime = Date.now();

describe("Silence Order Fulfillment tests", () => {
  test("Should silence tests", () => {
    expect("a").toEqual("a");
  });
});

// test each value for state
// test pickup details first bc that's easier

describe("build_pickup() strings should be set correctly.", () => {
  // +PROPOSED + RESERVED + PREPARED + COMPLETED + CANCELED + FAILED;

  const fulfillment = new Order_Fulfillment();
  let pickup = fulfillment.build_pickup();

  test("type should be set to 'PICKUP' ", () => {
    expect(fulfillment.type).toEqual("PICKUP");
  });

  test("state should be set to PROPOSED", () => {
    let expected = "PROPOSED";
    pickup.state_propose();
    expect(fulfillment.state).toEqual(expected);
  });
  test("state should be set to RESERVED", () => {
    let expected = "RESERVED";
    pickup.state_reserve();
    expect(fulfillment.state).toEqual(expected);
  });

  test("state should be set to PREPARED", () => {
    let expected = "PREPARED";
    pickup.state_prepare();
    expect(fulfillment.state).toEqual(expected);
  });
  test("state should be set to COMPLETED", () => {
    let expected = "COMPLETED";
    pickup.state_complete();
    expect(fulfillment.state).toEqual(expected);
  });
  test("state should be set to CANCELED", () => {
    let expected = "CANCELED";
    pickup.state_cancel();
    expect(fulfillment.state).toEqual(expected);
  });
  test("state should be set to FAILED", () => {
    let expected = "FAILED";
    pickup.state_fail();
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

  test("cancel_reason shoudl set all cancellation properties", () => {
    let ful = new Order_Fulfillment();
    let note = "This is a note.";
    ful.build_pickup().cancel_reason(note);

    let expected_pickup_details = {
      cancel_reason: note,
    };

    expect(ful.state).toEqual("CANCELED");
    expect(ful.pickup_details).toMatchObject(expected_pickup_details);
  });
});

describe("build_pickup() should handle time entries correctly", () => {
  test("pickup_details should throw when fed non RFC339 time.", () => {
    let fulfillment = new Order_Fulfillment();
    let pickup = fulfillment.build_pickup();

    expect(() => {
      pickup.pickup_at(nonCompliantTime);
    }).toThrow();
  });

  test(`pickup_at should be ${RFC339}`, () => {
    let expected = {
      pickup_at: RFC339,
    };
    let fulfillment = new Order_Fulfillment();
    fulfillment.build_pickup().pickup_at(RFC339);

    expect(fulfillment.pickup_details).toMatchObject(expected);
  });

  test(`expires_at should be ${RFC339}`, () => {
    let expected = {
      expires_at: RFC339,
    };
    let fulfillment = new Order_Fulfillment();
    fulfillment.build_pickup().expires_at(RFC339);

    expect(fulfillment.pickup_details).toMatchObject(expected);
  });

  test(`pickup_window_duration should be ${RFC339}`, () => {
    let expected = {
      pickup_window_duration: RFC339,
    };
    let fulfillment = new Order_Fulfillment();
    fulfillment.build_pickup().pickup_window_duration(RFC339);

    expect(fulfillment.pickup_details).toMatchObject(expected);
  });

  test(`prep_time_duration should be ${RFC339}`, () => {
    let expected = {
      prep_time_duration: RFC339,
    };
    let fulfillment = new Order_Fulfillment();
    fulfillment.build_pickup().prep_time_duration(RFC339);

    expect(fulfillment.pickup_details).toMatchObject(expected);
  });
});

describe("fulfillments should respect length limits", () => {
  // cancel_reason uses same private function as note - no test needed
  // note 500

  test.only("notes should thow when they exceed the limit", () => {
    let fulfillment = new Order_Fulfillment();
    let limit = fulfillment.limits.note + 1;
    let len = `len_${limit}`;
    let pickup = fulfillment.build_pickup();

    expect(() => {
      pickup.note(long_strings[len]);
    }).toThrow();
  });
});

// create a shipment and test output
// do same for pickup
