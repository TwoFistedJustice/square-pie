const Order_Discount = require("../src/lib/order_discount");
const { long_strings } = require("./helper_objects");

const id = "123";
/* --------------------------------------------------------*
 *                                                         *
 *               Order_Discount basic structures
 *                                                         *
 * ------------------------------------------------------- */
describe("Order_Discount structures", () => {
  let disc;
  let class_name = "Order_Discount";
  beforeEach(function () {
    disc = new Order_Discount();
  });

  test("should have display name", () => {
    expect(disc._display_name).toBeDefined();
  });
  test("display name should be same as class name", () => {
    expect(disc.display_name).toEqual(class_name);
  });
  test("should have defined square version", () => {
    expect(disc.square_version).toBeDefined();
  });
  test("should have defined _help", () => {
    expect(disc.help).toBeDefined();
  });
  test("should have _delivery", () => {
    disc.delivery = { someProp: { a: 1 } };
    expect(disc.delivery).toBeDefined();
  });
  // not every request class has these
  test("should have defined _fardel", () => {
    disc.make().type().fixed_amount();
    expect(disc.fardel).toBeDefined();
  });
});

/* --------------------------------------------------------*
 *                                                         *
 *               Order_Discount Error checking
 *                                                         *
 * ------------------------------------------------------- */

describe("Error checking", () => {
  let discount;

  beforeEach(() => {
    discount = new Order_Discount();
  });

  test("uid should respect max length 60", () => {
    expect(() => {
      discount.make().uid(long_strings.len_61);
    }).toThrow();
    expect(() => {
      discount.make().uid(long_strings.len_60);
    }).not.toThrow();
  });

  test("catalog_object_id should respect max length 192", () => {
    expect(() => {
      discount.make().catalog_object_id(long_strings.len_193);
    }).toThrow();

    expect(() => {
      discount.make().catalog_object_id(long_strings.len_192);
    }).not.toThrow();
  });

  test("name should respect max length 255", () => {
    expect(() => {
      discount.make().name(long_strings.len_256);
    }).toThrow();

    expect(() => {
      discount.make().name(long_strings.len_255);
    }).not.toThrow();
  });

  test("percentage should respect max length 10", () => {
    expect(() => {
      discount.make().percentage("1.345678911");
    }).toThrow();

    expect(() => {
      discount.make().percentage("1.34567891");
    }).not.toThrow();
  });

  test("percentage should throw if isNan", () => {
    let expected =
      "percentage expects strings that can be converted to a number and actual numbers.";
    expect(() => {
      discount.make().percentage("ABC");
    }).toThrowError(expected);

    expect(() => {
      discount.make().percentage(null);
    }).toThrowError(expected);

    expect(() => {
      discount.make().percentage(true);
    }).toThrowError(expected);
  });

  test("Discounts without a catalog_object_id should require type of FIXED_PERCENTAGE or FIXED_AMOUNT ", () => {
    discount.make().name("Super Chicken");
    expect(() => {
      console.log(discount.fardel);
    }).toThrow();
  });

  test("Discounts without a catalog_object_id should require type of FIXED_PERCENTAGE or FIXED_AMOUNT ", () => {
    discount.make().name("Super Chicken").type().fixed_amount();
    expect(() => {
      discount.fardel;
    }).not.toThrow();
  });

  test("Discounts without a catalog_object_id should require type of FIXED_PERCENTAGE or FIXED_AMOUNT ", () => {
    discount.make().name("Super Chicken").type().fixed_percentage();
    expect(() => {
      discount.fardel;
    }).not.toThrow();
  });

  test("Discounts without a catalog_object_id should require type of FIXED_PERCENTAGE or FIXED_AMOUNT ", () => {
    discount.make().name("Super Chicken").catalog_object_id("Fred");
    expect(() => {
      discount.fardel;
    }).not.toThrow();
  });
});

/* --------------------------------------------------------*
 *                                                         *
 *                        getters/setters
 *                                                         *
 * ------------------------------------------------------- */
describe("getters/setters", () => {
  let discount;

  beforeEach(() => {
    discount = new Order_Discount();
  });

  test("#enum_type should set correct values", () => {
    let expected = "UNKNOWN_DISCOUNT";
    discount.make().type().unknown();
    expect(discount.type).toEqual(expected);
  });
  test("#enum_type should set correct values", () => {
    let expected = "FIXED_PERCENTAGE";
    discount.make().type().fixed_percentage();
    expect(discount.type).toEqual(expected);
  });
  test("#enum_type should set correct values", () => {
    let expected = "FIXED_AMOUNT";
    discount.make().type().fixed_amount();
    expect(discount.type).toEqual(expected);
  });
  test("#enum_type should set correct values", () => {
    let expected = "VARIABLE_PERCENTAGE";
    discount.make().type().variable_percentage();
    expect(discount.type).toEqual(expected);
  });
  test("#enum_type should set correct values", () => {
    let expected = "VARIABLE_AMOUNT";
    discount.make().type().variable_amount();
    expect(discount.type).toEqual(expected);
  });

  test("#enum_scope should set correct values", () => {
    let expected = "OTHER_DISCOUNT_SCOPE";
    discount.make().scope().other();
    expect(discount.scope).toEqual(expected);
  });

  test("#enum_scope should set correct values", () => {
    let expected = "LINE_ITEM";
    discount.make().scope().line_item();
    expect(discount.scope).toEqual(expected);
  });

  test("#enum_scope should set correct values", () => {
    let expected = "ORDER";
    discount.make().scope().order();
    expect(discount.scope).toEqual(expected);
  });

  test("catalog_version should set", () => {
    let expected = 5;
    discount.make().catalog_version(5);
    expect(discount.catalog_version).toEqual(expected);
  });

  test("amount_money should set", () => {
    let expected = {
      amount: 27,
      currency: "EUR",
    };
    discount.make().amount_money(27, "EUR");
    expect(discount.amount_money).toEqual(expected);
  });

  test("applied_money should set", () => {
    let expected = {
      amount: 27,
      currency: "EUR",
    };
    discount.make().applied_money(27, "EUR");
    expect(discount.applied_money).toEqual(expected);
  });

  test("uid should set", () => {
    let expected = id;
    discount.make().uid(id);
    expect(discount.uid).toEqual(expected);
  });

  test("catalog_object_id should set", () => {
    let expected = id;
    discount.make().catalog_object_id(id);
    expect(discount.catalog_object_id).toEqual(expected);
  });

  test("name should set", () => {
    let expected = id;
    discount.make().name(id);
    expect(discount.name).toEqual(expected);
  });

  test("percentage should set", () => {
    let expected = 5;
    discount.make().percentage(5);
    expect(discount.percentage).toEqual(expected);
  });
});

// state type
// state scope
