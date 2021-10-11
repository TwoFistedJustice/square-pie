'use strict';
const Order_Object = require('../src/lib/stub.order_object');
const should = require('chai').should();
const { long_strings } = require('./helper_objects');

describe('Silence order object tests', () => {
	test('Should silence tests', () => {
		expect('a').toEqual('a');
	});
});

describe('Order object build_discount method', () => {
	let order;

	beforeEach(() => {
		order = new Order_Object();
	});

	test('pricing_options setter should throw if object not correctly formatted', () => {
		let expected = [
			{
				auto_apply_discounts : true,
				auto_apply_taxes     : false
			}
		];

		order.pricing(true, false);
		expect(order.pricing_options).toMatchObject(expected);
	});

	test("pricing_options setter should throw if object doesn't have two booleans", () => {
		expect(() => {
			order.pricing('beavers', 42);
		}).toThrow();
	});

	test('pricing_options setter should NOT throw if object is correctly formatted', () => {
		expect(() => {
			order.pricing(true, false);
		}).not.toThrow();
	});

	test('build_state open should equal "Open"', () => {
		order.build_state().open();

		expect(order.state).toEqual('OPEN');
	});

	test('build_state canceled should equal "CANCELED"', () => {
		order.build_state().canceled();
		expect(order.state).toEqual('CANCELED');
	});

	test('build_state completed should equal "COMPLETED"', () => {
		order.build_state().completed();
		expect(order.state).toEqual('COMPLETED');
	});

	test('build_state draft should equal "DRAFT"', () => {
		order.build_state().draft();
		expect(order.state).toEqual('DRAFT');
	});

	test('build_service_charge_amount should correctly build an "amount_money" object when given two args', () => {
		let expected = [
			{
				amount_money : {
					amount   : 42,
					currency : 'AUD'
				}
			}
		];

		order.build_service_charge_amount('42', 'AUD');
		expect(order.service_charges).toMatchObject(expected);
	});

	test('build_service_charge_amount should automatically set "USD" when given just amount', () => {
		let expected = [
			{
				amount_money : {
					amount   : 42,
					currency : 'USD'
				}
			}
		];

		order.build_service_charge_amount(42);
		expect(order.service_charges).toMatchObject(expected);
	});

	test('build_service_charge_applied should correctly build an "amount_money" object when given two args', () => {
		let expected = [
			{
				applied_money : {
					amount   : 46,
					currency : 'AUD'
				}
			}
		];

		order.build_service_charge_applied(46, 'AUD');
		expect(order.service_charges).toMatchObject(expected);
	});

	//build_service_charge_applied should automatically set "USD" when given just amount
	// NOTE: RB - THIS TEST IS DEPRECATED
	//  this feature has been extracted into the new #money method
	//  and the define() method used in build_discount() has been extracted into a utility
	//  together they are basically Batman and Robin
	//  Now we need a test for the #money method
	//  TODO Conveniently, this one will do nicely. All you need to do is change the test statement.
	test('#money method should automatically set "USD" when given just amount', () => {
		let expected = [
			{
				applied_money : {
					amount   : 46,
					currency : 'USD'
				}
			}
		];

		order.build_service_charge_applied(46);
		expect(order.service_charges).toMatchObject(expected);
	});

	// build_discount add should equal an object with the key type equaling the string "FIXED_AMOUNT"
	test('build_discount add should equal an object with the key type equaling the string "FIXED_AMOUNT"', () => {
		let expected = [
			{
				type : 'FIXED_AMOUNT'
			}
		];

		order.build_discount().type_amount().add();
		expect(order.discounts).toMatchObject(expected);
	});

	// TODO NOTE: RB - test statements should state clearly what they are testing
	//   "should equal expected" doesn't say anything useful
	//  a more useful statement might be something like
	//  build_discount().uid() should set discount.uid to the provided string value"
	// TODO: Restate test statements to be descriptive of what is actually under test
	test('build_discount uid should equal an object with the key uid equaling the string "Pieville USA"', () => {
		let name = 'Pieville USA';
		let expected = [
			{
				type : 'FIXED_AMOUNT',
				uid  : 'Pieville USA'
			}
		];

		order.build_discount().type_amount().uid(name).add();
		expect(order.discounts).toMatchObject(expected);
	});

	// build_discount name should equal an object with the key name equaling the string "Pieville USA"
	// NOTE: BG - this is failing despite being exactly line the uid test
	// NOTE: RB= it's failing bc I effed up the the arguments passed to define(). Err, I mean, WHAT? You must have done something to break it!
	// NOTE: RB - fixed it. Err, I mean, I don't know what you are talking about. It always worked. Stop breaking stuff!
	test('build_discount name should equal an object with the key name equaling the string "Pieville USA"', () => {
		let rname = 'Pieville USA';
		let expected = [
			{
				name : 'Pieville USA',
				type : 'FIXED_AMOUNT'
			}
		];

		order.build_discount().type_amount().name(rname).add();
		expect(order.discounts).toMatchObject(expected);
	});

	// build_discount catalog_object_id should equal an object with the key caatalog_object_id equaling the string "913v1113"
	test('build_discount catalog_object_id should equal an object with the key caatalog_object_id equaling the string "913v1113"', () => {
		let info = '913v1113';
		let expected = [
			{
				catalog_object_id : '913v1113',
				type              : 'FIXED_AMOUNT'
			}
		];

		order.build_discount().type_amount().catalog_object_id(info).add();
		expect(order.discounts).toMatchObject(expected);
	});

	// build_discount scope_line should equal an object with the key caatalog_object_id equaling the string "913v1113"
	test('build_discount scope_line should equal an object with the key scope equaling the string "LINE_ITEM"', () => {
		let expected = [
			{
				scope : 'LINE_ITEM',
				type  : 'FIXED_AMOUNT'
			}
		];

		order.build_discount().type_amount().scope_line().add();
		expect(order.discounts).toMatchObject(expected);
	});

	// build_discount type_percentage should equal an object with the key type equaling the string "FIXED_PERCENTAGE"
	// NOTE: BG - both type_percentage and type_amount set the same key (type)
	// but it's not stated in the docs.
	test('build_discount type_percentage should equal an object with the key type equaling the string "FIXED_PERCENTAGE"', () => {
		let expected = [
			{
				type : 'FIXED_PERCENTAGE'
			}
		];

		order.build_discount().type_percentage().add();
		expect(order.discounts).toMatchObject(expected);
	});

	// build_discount percentage should equal an object with the key percentage equaling the intiger 7.25
	test('build_discount percentage should equal an object with the key percentage equaling the intiger 7.25', () => {
		let expected = [
			{
				percentage : 7.25,
				type       : 'FIXED_PERCENTAGE'
			}
		];

		order.build_discount().type_percentage().percentage(7.25).add();
		expect(order.discounts).toMatchObject(expected);
	});

	// build_discount amount_money should equal an object with the key amount_money equaling the object with keys amount equaling the integer 42 and the key currency equaling the string "USD"
	test('build_discount amount_money with amount only should equal an object with the key amount_money equaling the object with keys amount equaling the integer 42 and the key currency equaling the string "USD"', () => {
		let expected = [
			{
				amount_money : {
					amount   : 42,
					currency : 'USD'
				},
				type         : 'FIXED_PERCENTAGE'
			}
		];

		order.build_discount().type_percentage().amount_money(42).add();
		expect(order.discounts).toMatchObject(expected);
	});

	// build_discount applied_money should equal an object with the key applied_money equaling the object with keys amount equaling the integer 46 and the key currency equaling the string "USD"
	test('build_discount applied_money with amount only should equal an object with the key applied_money equaling the object with keys amount equaling the integer 46 and the key currency equaling the string "USD"', () => {
		let expected = [
			{
				applied_money : {
					amount   : 46,
					currency : 'USD'
				},
				type          : 'FIXED_PERCENTAGE'
			}
		];

		order.build_discount().type_percentage().applied_money(46).add();
		expect(order.discounts).toMatchObject(expected);
	});

	// build_discount pricing_rule_id should equal an object with the key pricing_rule_id equaling the string "someId"
	test('build_discount pricing_rule_id with amount only should equal an object with the key pricing_rule_id equaling the string "someId"', () => {
		let expected = [
			{
				pricing_rule_id : 'someId',
				type            : 'FIXED_PERCENTAGE'
			}
		];

		order.build_discount().type_percentage().pricing_rule_id('someId').add();
		expect(order.discounts).toMatchObject(expected);
	});

	// build_discount reward_ids should equal an object with the key reward_ids equaling the an array with keys amount equaling the integer 46 and the key currency equaling the string "USD"
	test('build_discount reward_ids with amount only should equal an object with the key reward_ids equaling the an array with the string values "someId" and "someOtherId"', () => {
		let expected = [
			{
				reward_ids : ['someId', 'someOtherId'],
				type       : 'FIXED_PERCENTAGE'
			}
		];

		order.build_discount().type_percentage().reward_ids('someId').reward_ids('someOtherId').add();
		expect(order.discounts).toMatchObject(expected);
	});

	// build_discount.name should throw on a name longer than 255 characters
	test('build_discount.name should respect length limit', () => {
		expect(() => {
			order.build_discount().name(long_strings.len_256);
		}).toThrow();
	});

	// build_discount.name should respect length limit part 2
	// TODO NOTE: RB-  test statements should explicitly state what is being tested.
	//  "build_discount.name" should not throw when given a name of an allowable length" -- or something similar
	test('build_discount.name should not throw on a name shorter than 255 characters', () => {
		expect(() => {
			order.build_discount().name(long_strings.len_25);
		}).not.toThrow();
	});

	//build_discount.percentage should throw if fed a string arg that can't convert to a number
	test("build_discount.percentage should throw if fed a string arg that can't convert to a number", () => {
		expect(() => {
			order.build_discount().percentage('Holy wrong kind of string Batman!');
		}).toThrow();
	});

	//build_discount.percentage should throw if fed anything other than a string or number
	test('build_discount.percentage should throw if fed anything other than a string or number', () => {
		expect(() => {
			order.build_discount().percentage({ a: 1 });
		}).toThrow();
	});

	//build_discount.percentage should NOT throw if fed a compatible string
	test('build_discount.percentage should NOT throw if fed a compatible string', () => {
		expect(() => {
			order.build_discount().percentage('7.25');
		}).not.toThrow();
	});

	//build_discount.percentage should NOT throw if fed a number
	test('build_discount.percentage should NOT throw if fed a number', () => {
		expect(() => {
			order.build_discount().percentage(7.25);
		}).not.toThrow();
	});

	// pricing should correctly format the output
});
