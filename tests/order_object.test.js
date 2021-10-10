"use strict";
const Order_Object = require("../src/lib/stub.order_object");
const should = require("chai").should();
const { long_strings } = require("./helper_objects");

describe("Silence order object tests", () => {
  test("Should silence tests", () => {
    expect("a").toEqual("a");
  });
});

describe("Order object build_discount method", () => {
  // DONE pricing_options setter should throw if object not correctly formatted
  test("pricing_options setter should throw if object not correctly formatted", () => {
    let expected = [
      {
        auto_apply_discounts: true,
        auto_apply_taxes: false,
      },
    ];
    let order = new Order_Object();
    order.pricing(true, false);
    expect(order.pricing_options).toMatchObject(expected);
  });

  // pricing_options setter should throw if object doesn't have two booleans
  test("pricing_options setter should throw if object doesn't have two booleans", () => {
    let order = new Order_Object();
    expect(() => {
      order.pricing("beavers", 42);
    }).toThrow();
  });

  // pricing_options setter should NOT throw if object is correctly formatted
  //todo
  // this will always pass because it is not a complete test- you left out the part that checks
  // whether or not it throws an error
  // https://jestjs.io/docs/expect
  test("pricing_options setter should NOT throw if object is correctly formatted", () => {
    let order = new Order_Object();
    expect(() => {
      order.pricing(true, false);
    }).not.toThrow();
  });

  // build_state methods should set state property as expected - there are four of them
  // todo
  //  this will never pass because you are checking the return value of the arrow function which
  //  the arrow function will return 'undefined' because you are correctly setting a static value
  test('build_state open should equal "Open"', () => {
    let order = new Order_Object();
    order.build_state().open();

    expect(order.state).toEqual("OPEN");
  });

  // todo
  //  I corrected this one so you have a model to follow
  //  since we are checking a static value and not a THROW
  //  call the build methods outside of expect
  //  call the class GETTER inside of expect
  test('build_state canceled should equal "CANCELED"', () => {
    let order = new Order_Object();
    order.build_state().canceled();
    expect(order.state).toEqual("CANCELED");
  });

  test('build_state completed should equal "COMPLETED"', () => {
    let order = new Order_Object();
    order.build_state().completed();
    expect(order.state).toEqual("COMPLETED");
  });

  test('build_state draft should equal "DRAFT"', () => {
    let order = new Order_Object();
    order.build_state().draft();
    expect(order.state).toEqual("DRAFT");
  });

  // NOTE - BG: Not sure if it's the expected object or if I need to dothe who .make() bit. :(
  // todo: NOTE: RB- you got it right -- might be better to use a different currency tho since it default sets 'USD'
  //  also, your string value "42" revealed a bug which is fixed but the fix now needs its own tests... :-P
  //  also also -  Square money amounts are in cents. So 42 is really 42 cents.

  // todo: TEST - build_service_amount should throw when the amount is a value that cannot be converted to a Number

  test('build_service_charge_amount should correctly build an "amount_money" object when given two args', () => {
    let expected = [
      {
        amount_money: {
          amount: 42,
          currency: "AUD",
        },
      },
    ];
    let order = new Order_Object();
    order.build_service_charge_amount("42", "AUD");
    expect(order.service_charges).toMatchObject(expected);
  });

  // build_service_charge_amount should automatically set "USD" when given just amount
  test('build_service_charge_amount should automatically set "USD" when given just amount', () => {
    let expected = [
      {
        amount_money: {
          amount: 42,
          currency: "USD",
        },
      },
    ];
    let order = new Order_Object();
    order.build_service_charge_amount(42);
    expect(order.service_charges).toMatchObject(expected);
  });

  //build_service_charge_applied should correctly build an 'amount_money' object when given two args
  // NOTE: BG - Did you mean 'applied_money'?
  // todo: NOTE: RB - when in doubt, check the source code...
  test('build_service_charge_applied should correctly build an "amount_money" object when given two args', () => {
    let expected = [
      {
        applied_money: {
          amount: 46,
          currency: "AUD",
        },
      },
    ];
    let order = new Order_Object();
    order.build_service_charge_applied(46, "AUD");
    expect(order.service_charges).toMatchObject(expected);
  });
  //build_service_charge_applied should automatically set "USD" when given just amount
  test('build_service_charge_applied should automatically set "USD" when given just amount', () => {
    let expected = [
      {
        applied_money: {
          amount: 46,
          currency: "USD",
        },
      },
    ];
    let order = new Order_Object();
    order.build_service_charge_applied(46);
    expect(order.service_charges).toMatchObject(expected);
  });

  // build_discount add should equal expected
  test("build_discount add should equal expected", () => {
    let expected = [
      {
        type: "FIXED_AMOUNT",
      },
    ];
    let order = new Order_Object();
    order.build_discount().type_amount().add();
    expect(order.discounts).toMatchObject(expected);
  });

  // todo NOTE: RB - test statements should state clearly what they are testing
  //   "should equal expected" doesn't say anything useful
  //  a more useful statement might be something like
  //  build_discount().uid() should set discount.uid to the provided string value"
  // todo: Restate test statements to be descriptive of what is actually under test
  test("build_discount uid should equal expected", () => {
    let name = "Pieville USA";
    let expected = [
      {
        type: "FIXED_AMOUNT",
        uid: "Pieville USA",
      },
    ];
    let order = new Order_Object();
    order.build_discount().type_amount().uid(name).add();
    expect(order.discounts).toMatchObject(expected);
  });

  // build_discount name should equal expected
  // NOTE: BG - this is failing despite being exactly line the uid test
  // NOTE: RB= it's failing bc I effed up the the arguments passed to define(). Err, I mean, WHAT? You must have done something to break it!
  // NOTE: RB - fixed it. Err, I mean, I don't know what you are talking about. It always worked. Stop breaking stuff!
  test("build_discount name should equal expected", () => {
    let rname = "Pieville USA";
    let expected = [
      {
        name: "Pieville USA",
        type: "FIXED_AMOUNT",
      },
    ];
    let order = new Order_Object();
    order.build_discount().type_amount().name(rname).add();
    expect(order.discounts).toMatchObject(expected);
  });

  // build_discount catalog_object_id should equal expected
  test("build_discount catalog_object_id should equal expected", () => {
    let info = "913v1113";
    let expected = [
      {
        catalog_object_id: "913v1113",
        type: "FIXED_AMOUNT",
      },
    ];
    let order = new Order_Object();
    order.build_discount().type_amount().catalog_object_id(info).add();
    expect(order.discounts).toMatchObject(expected);
  });

  // build_discount scope_line should equal expected
  test("build_discount scope_line should equal expected", () => {
    let expected = [
      {
        scope: "LINE_ITEM",
        type: "FIXED_AMOUNT",
      },
    ];
    let order = new Order_Object();
    order.build_discount().type_amount().scope_line().add();
    expect(order.discounts).toMatchObject(expected);
  });

  // build_discount type_percentage should equal expected
  // NOTE: BG - both type_percentage and type_amount set the same key (type)
  // but it's not stated in the docs.
  test("build_discount type_percentage should equal expected", () => {
    let expected = [
      {
        type: "FIXED_PERCENTAGE",
      },
    ];
    let order = new Order_Object();
    order.build_discount().type_percentage().add();
    expect(order.discounts).toMatchObject(expected);
  });

  // build_discount percentage should equal expected
  test("build_discount percentage should equal expected", () => {
    let expected = [
      {
        percentage: 7.25,
        type: "FIXED_PERCENTAGE",
      },
    ];
    let order = new Order_Object();
    order.build_discount().type_percentage().percentage(7.25).add();
    expect(order.discounts).toMatchObject(expected);
  });

  // build_discount amount_money should equal expected
  test("build_discount amount_money with amount only should equal expected", () => {
    let expected = [
      {
        amount_money: {
          amount: 42,
          currency: "USD",
        },
        type: "FIXED_PERCENTAGE",
      },
    ];
    let order = new Order_Object();
    order.build_discount().type_percentage().amount_money(42).add();
    expect(order.discounts).toMatchObject(expected);
  });

  // build_discount applied_money should equal expected
  test("build_discount applied_money with amount only should equal expected", () => {
    let expected = [
      {
        applied_money: {
          amount: 46,
          currency: "USD",
        },
        type: "FIXED_PERCENTAGE",
      },
    ];
    let order = new Order_Object();
    order.build_discount().type_percentage().applied_money(46).add();
    expect(order.discounts).toMatchObject(expected);
  });

  // build_discount pricing_rule_id should equal expected
  test("build_discount pricing_rule_id with amount only should equal expected", () => {
    let expected = [
      {
        pricing_rule_id: "someId",
        type: "FIXED_PERCENTAGE",
      },
    ];
    let order = new Order_Object();
    order.build_discount().type_percentage().pricing_rule_id("someId").add();
    expect(order.discounts).toMatchObject(expected);
  });

  // build_discount reward_ids should equal expected
  test("build_discount reward_ids with amount only should equal expected", () => {
    let expected = [
      {
        reward_ids: ["someId", "someOtherId"],
        type: "FIXED_PERCENTAGE",
      },
    ];
    let order = new Order_Object();
    order
      .build_discount()
      .type_percentage()
      .reward_ids("someId")
      .reward_ids("someOtherId")
      .add();
    expect(order.discounts).toMatchObject(expected);
  });

  // build_discount.name should respect length limit
  test("build_discount.name should respect length limit", () => {
    let order = new Order_Object();
    expect(() => {
      order.build_discount().name(long_strings.len_256);
    }).toThrow();
  });
  // build_discount.name should respect length limit part 2
  // todo NOTE: RB-  test statements should explicitly state what is being tested.
  //  "build_discount.name" should not throw when given a name of an allowable length" -- or something similar
  test("build_discount.name should respect length limit part 2", () => {
    let order = new Order_Object();
    expect(() => {
      order.build_discount().name(long_strings.len_25);
    }).not.toThrow();
  });

  //build_discount.percentage should throw if fed a string arg that can't convert to a number
  test("build_discount.percentage should throw if fed a string arg that can't convert to a number", () => {
    let order = new Order_Object();
    expect(() => {
      order.build_discount().percentage("Holy wrong kind of string Batman!");
    }).toThrow();
  });

  //build_discount.percentage should throw if fed anything other than a string or number
  test("build_discount.percentage should throw if fed anything other than a string or number", () => {
    let order = new Order_Object();
    expect(() => {
      order.build_discount().percentage({ a: 1 });
    }).toThrow();
  });
  //build_discount.percentage should NOT throw if fed a compatible string
  test("build_discount.percentage should NOT throw if fed a compatible string", () => {
    let order = new Order_Object();
    expect(() => {
      order.build_discount().percentage("7.25");
    }).not.toThrow();
  });
  //build_discount.percentage should NOT throw if fed a number
  test("build_discount.percentage should NOT throw if fed a number", () => {
    let order = new Order_Object();
    expect(() => {
      order.build_discount().percentage(7.25);
    }).not.toThrow();
  });

  // pricing should correctly format the output
});
