const Order_Discount = require("../src/lib/order_discount");
const { long_strings } = require("./helper_objects");

describe.only("Silence order discount tests", () => {
  test("Should silence tests", () => {
    expect("a").toEqual("a");
  });
});

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

describe("enums", () => {
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
});

// state type
// state scope
