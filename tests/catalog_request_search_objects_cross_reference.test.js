"use strict";
const Catalog_Search_Cross_Reference = require("../src/lib/catalog_request_search_objects_cross_reference");
const { dateCodes } = require("./helper_objects");

// tack on .only to this empty test to silence all other tests
describe("silence test suite", () => {
  test("", () => {
    expect("a").toEqual("a");
  });
});

/* --------------------------------------------------------*
 *                                                         *
 *                        Basics
 *                                                         *
 * ------------------------------------------------------- */
describe("Catalog_Search_Cross_Reference", () => {
  let xref;
  let class_name = "Catalog_Search_Cross_Reference";
  let endpoint = "/search"; //copy and paste from Square docs
  let method = "post"; //http method from Square docs
  beforeEach(function () {
    xref = new Catalog_Search_Cross_Reference();
  });

  test("should have display name", () => {
    expect(xref._display_name).toBeDefined();
  });
  test("should have the method defined by Square set", () => {
    expect(xref.method).toEqual(method);
  });
  test("display name should be same as class name", () => {
    expect(xref.display_name).toEqual(class_name);
  });
  test("should have defined square version", () => {
    expect(xref.square_version).toBeDefined();
  });
  test("should have defined _help", () => {
    expect(xref.help).toBeDefined();
  });
  test("should have defined _body", () => {
    expect(xref.body).toBeDefined();
  });
  test("should have _delivery", () => {
    xref.delivery = { someProp: { a: 1 } };
    expect(xref.delivery).toBeDefined();
  });

  test("should have an endpoint", () => {
    expect(xref.endpoint).toEqual(endpoint);
  });
});

/* --------------------------------------------------------*
 *                                                         *
 *                        Super inheritance
 *                                                         *
 * ------------------------------------------------------- */

describe("Super inheritance", () => {
  let xref, make;
  beforeEach(function () {
    xref = new Catalog_Search_Cross_Reference();
    make = xref.make();
  });
  test("include_related_objects", () => {
    make.include_related_objects(true);
    expect(xref.include_related_objects).toEqual(true);
  });

  test("begin_time shoudl throw on non RFC3339", () => {
    expect(() => {
      make.begin_time(dateCodes.notRFC3339);
    }).toThrow();
  });

  test("begin_time should set", () => {
    let expected = dateCodes.RFC3339;
    make.begin_time(expected);
    expect(xref.begin_time).toEqual(expected);
  });

  test("object_types should set", () => {
    let expected = [
      "ITEM",
      "ITEM_VARIATION",
      "ITEM_OPTION",
      "ITEM_OPTION_VAL",
      "IMAGE",
      "CATEGORY",
      "TAX",
      "DISCOUNT",
      "MODIFIER",
      "MODIFIER_LIST",
      "PRICING_RULE",
      "PRODUCT_SET",
      "TIME_PERIOD",
      "MEASUREMENT_UNIT",
      "SUBSCRIPTION_PLAN",
      "CUSTOM_ATTRIBUTE_DEFINITION",
      "QUICK_AMOUNTS_SETTINGS",
    ];

    make
      .object_types()
      .item()
      .item_variation()
      .item_option()
      .item_option_val()
      .image()
      .category()
      .tax()
      .discount()
      .modifier()
      .modifier_list()
      .pricing_rule()
      .product_set()
      .time_period()
      .measurement_unit()
      .subscription_plan()
      .custom_attribute_definition()
      .quick_amounts_setting();

    expect(xref.object_types).toEqual(expected);
  });
});

/* --------------------------------------------------------*
 *                                                         *
 *          Catalog_Search_Cross_Reference: array builders
 *                                                         *
 * ------------------------------------------------------- */

describe("Catalog_Search_Cross_Reference: array builders", () => {
  let xref, make, id1, id2, id3, arr;

  beforeEach(() => {
    xref = new Catalog_Search_Cross_Reference();
    make = xref.make();
    id1 = "id1";
    id2 = "id2";
    id3 = "id3";
    arr = [id1, id2, id3];
  });

  /* --------------------------------------------------------*
   *                                                         *
   *                        item_variations
   *   setter, fn, make, concat_setter, make-concat          *
   * ------------------------------------------------------- */

  test("set item_variations_for_item_option_values_query id add", () => {
    let expected = {
      item_variations_for_item_option_values_query: arr,
    };
    xref.item_variations_for_item_option_values_query = id1;
    xref.item_variations_for_item_option_values_query = id2;
    xref.item_variations_for_item_option_values_query = id3;
    expect(xref.query).toMatchObject(expected);
  });

  test(" variations method correctly modifies query", () => {
    let expected = {
      item_variations_for_item_option_values_query: arr,
    };
    xref.variation(id1).variation(id2).variation(id3);
    expect(xref.query).toMatchObject(expected);
  });

  test("make().variation()", () => {
    let expected = {
      item_variations_for_item_option_values_query: arr,
    };
    make.variation(id1).variation(id2).variation(id3);
    expect(xref.query).toMatchObject(expected);
  });

  test("set concat_variations", () => {
    let expected = {
      item_variations_for_item_option_values_query: arr,
    };
    xref.concat_item_variations_for_item_option_values_query = arr;
    expect(xref.query).toMatchObject(expected);
  });

  test("make() concat_variations", () => {
    let expected = {
      item_variations_for_item_option_values_query: arr,
    };
    make.concat_variations(arr);
    expect(xref.query).toMatchObject(expected);
  });

  /* --------------------------------------------------------*
   *                                                         *
   *                     items
   *                                                         *
   * ------------------------------------------------------- */

  test("set items_for_item_options_query id add", () => {
    let expected = {
      items_for_item_options_query: arr,
    };
    xref.items_for_item_options_query = id1;
    xref.items_for_item_options_query = id2;
    xref.items_for_item_options_query = id3;
    expect(xref.query).toMatchObject(expected);
  });

  test(" item method correctly modifies query", () => {
    let expected = {
      items_for_item_options_query: arr,
    };
    xref.item(id1).item(id2).item(id3);
    expect(xref.query).toMatchObject(expected);
  });
  test("make().item()", () => {
    let expected = {
      items_for_item_options_query: arr,
    };
    make.item(id1).item(id2).item(id3);
    expect(xref.query).toMatchObject(expected);
  });

  test("set concat_items", () => {
    let expected = {
      items_for_item_options_query: arr,
    };
    xref.concat_items_for_item_options_query = arr;
    expect(xref.query).toMatchObject(expected);
  });

  test("make() concat_items", () => {
    let expected = {
      items_for_item_options_query: arr,
    };
    make.concat_items(arr);
    expect(xref.query).toMatchObject(expected);
  });

  /* --------------------------------------------------------*
   *                                                         *
   *                        modifiers
   *                                                         *
   * ------------------------------------------------------- */
  test("set items_for_modifier_list_query id add", () => {
    let expected = {
      items_for_modifier_list_query: arr,
    };
    xref.items_for_modifier_list_query = id1;
    xref.items_for_modifier_list_query = id2;
    xref.items_for_modifier_list_query = id3;
    expect(xref.query).toMatchObject(expected);
  });

  test(" modifier method correctly modifies query", () => {
    let expected = {
      items_for_modifier_list_query: arr,
    };
    xref.modifier(id1).modifier(id2).modifier(id3);
    expect(xref.query).toMatchObject(expected);
  });

  test("make().modifier()", () => {
    let expected = {
      items_for_modifier_list_query: arr,
    };
    make.modifier(id1).modifier(id2).modifier(id3);
    expect(xref.query).toMatchObject(expected);
  });

  test("set concat_modifiers", () => {
    let expected = {
      items_for_modifier_list_query: arr,
    };
    xref.concat_items_for_modifier_list_query = arr;
    expect(xref.query).toMatchObject(expected);
  });

  test("make() concat_modifiers", () => {
    let expected = {
      items_for_modifier_list_query: arr,
    };
    make.concat_modifiers(arr);
    expect(xref.query).toMatchObject(expected);
  });

  /* --------------------------------------------------------*
   *                                                         *
   *                        taxes
   *                                                         *
   * ------------------------------------------------------- */
  test("set items_for_tax_query id add", () => {
    let expected = {
      items_for_tax_query: arr,
    };
    xref.items_for_tax_query = id1;
    xref.items_for_tax_query = id2;
    xref.items_for_tax_query = id3;
    expect(xref.query).toMatchObject(expected);
  });

  test(" variations method correctly modifies query", () => {
    let expected = {
      items_for_tax_query: arr,
    };
    xref.tax(id1).tax(id2).tax(id3);
    expect(xref.query).toMatchObject(expected);
  });

  test("make().variation()", () => {
    let expected = {
      items_for_tax_query: arr,
    };
    make.tax(id1).tax(id2).tax(id3);
    expect(xref.query).toMatchObject(expected);
  });

  test("set concat_variations", () => {
    let expected = {
      items_for_tax_query: arr,
    };
    xref.concat_items_for_tax_query = arr;
    expect(xref.query).toMatchObject(expected);
  });

  test("make() concat_variations", () => {
    let expected = {
      items_for_tax_query: arr,
    };
    make.concat_taxes(arr);
    expect(xref.query).toMatchObject(expected);
  });
});
