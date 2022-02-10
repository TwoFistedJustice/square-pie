"use strict";
const Catalog_Search_Cross_Reference = require("../src/lib/catalog_request_search_objects_cross_reference");
const { dateCodes } = require("./helper_objects");

/* --------------------------------------------------------*
 *                                                         *
 *                        Basics
 *                                                         *
 * ------------------------------------------------------- */
describe("Catalog_Search_Cross_Reference", () => {
  let xref;
  let class_name = "Catalog_Search_Cross_Reference";
  let endpoint = "/search"; //copy and paste from Square docs
  let method = "POST"; //http method from Square docs
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
      .types()
      .item_variation()
      .types()
      .item_option()
      .types()
      .item_option_val()
      .types()
      .image()
      .types()
      .category()
      .types()
      .tax()
      .types()
      .discount()
      .types()
      .modifier()
      .types()
      .modifier_list()
      .types()
      .pricing_rule()
      .types()
      .product_set()
      .types()
      .time_period()
      .types()
      .measurement_unit()
      .types()
      .subscription_plan()
      .types()
      .custom_attribute_definition()
      .types()
      .quick_amounts_setting();

    expect(xref.object_types).toEqual(expected);
  });

  test("make().object_types() should curry-over", () => {
    let expected = ["ITEM", "ITEM_VARIATION"];

    make
      .object_types()
      .item()
      .begin_time(dateCodes.RFC3339)
      .types()
      .item_variation();
    expect(xref.begin_time).toEqual(dateCodes.RFC3339);
    expect(xref.object_types).toEqual(expected);
  });
});

/* --------------------------------------------------------*
 *                                                         *
 *          Catalog_Search_Cross_Reference: array builders
 *                                                         *
 * ------------------------------------------------------- */

describe("Catalog_Search_Cross_Reference: array builders", () => {
  let xref, make, id1, id2, id3, arr, expected;

  beforeEach(() => {
    xref = new Catalog_Search_Cross_Reference();
    make = xref.make();
    id1 = "id1";
    id2 = "id2";
    id3 = "id3";
    arr = [id1, id2, id3];
    expected = {
      variations: {
        item_variations_for_item_option_values_query: {
          item_option_value_ids: arr,
        },
      },
      items: {
        items_for_item_options_query: { item_option_ids: arr },
      },
      modifiers: {
        items_for_modifier_list_query: { modifier_list_ids: arr },
      },
      taxes: {
        items_for_tax_query: { tax_ids: arr },
      },
    };
  });

  /* --------------------------------------------------------*
   *                                                         *
   *                        item_variations
   *   setter, fn, make, concat_setter, make-concat          *
   * ------------------------------------------------------- */

  test("set item_variations_for_item_option_values_query id add", () => {
    xref.item_variations_for_item_option_values_query = id1;
    xref.item_variations_for_item_option_values_query = id2;
    xref.item_variations_for_item_option_values_query = id3;
    expect(xref.query).toMatchObject(expected.variations);
  });

  test(" variations method correctly modifies query", () => {
    xref.variations(id1).variations(id2).variations(id3);
    expect(xref.query).toMatchObject(expected.variations);
  });

  test("make().variations()", () => {
    make.variations(id1).variations(id2).variations(id3);
    expect(xref.query).toMatchObject(expected.variations);
  });

  test("set concat_variations", () => {
    xref.concat_item_variations_for_item_option_values_query = arr;
    expect(xref.query).toMatchObject(expected.variations);
  });

  test("make() concat_variations", () => {
    make.concat_variations(arr);
    expect(xref.query).toMatchObject(expected.variations);
  });

  test("concat_variations", () => {
    xref.concat_variations(arr);
    expect(xref.query).toMatchObject(expected.variations);
  });

  /* --------------------------------------------------------*
   *                                                         *
   *                     items
   *                                                         *
   * ------------------------------------------------------- */

  test("set items_for_item_options_query id add", () => {
    xref.items_for_item_options_query = id1;
    xref.items_for_item_options_query = id2;
    xref.items_for_item_options_query = id3;
    expect(xref.query).toMatchObject(expected.items);
  });

  test(" items method correctly modifies query", () => {
    xref.items(id1).items(id2).items(id3);
    expect(xref.query).toMatchObject(expected.items);
  });

  test("make().items()", () => {
    make.items(id1).items(id2).items(id3);
    expect(xref.query).toMatchObject(expected.items);
  });

  test("set concat_items", () => {
    xref.concat_items_for_item_options_query = arr;
    expect(xref.query).toMatchObject(expected.items);
  });

  test("make() concat_items", () => {
    make.concat_items(arr);
    expect(xref.query).toMatchObject(expected.items);
  });

  test(" concat_items", () => {
    xref.concat_items(arr);
    expect(xref.query).toMatchObject(expected.items);
  });

  /* --------------------------------------------------------*
   *                                                         *
   *                        modifiers
   *                                                         *
   * ------------------------------------------------------- */
  test("set items_for_modifier_list_query id add", () => {
    xref.items_for_modifier_list_query = id1;
    xref.items_for_modifier_list_query = id2;
    xref.items_for_modifier_list_query = id3;
    expect(xref.query).toMatchObject(expected.modifiers);
  });

  test(" modifiers method correctly modifies query", () => {
    xref.modifiers(id1).modifiers(id2).modifiers(id3);
    expect(xref.query).toMatchObject(expected.modifiers);
  });

  test("make().modifiers()", () => {
    make.modifiers(id1).modifiers(id2).modifiers(id3);
    expect(xref.query).toMatchObject(expected.modifiers);
  });

  test("set concat_modifiers", () => {
    xref.concat_items_for_modifier_list_query = arr;
    expect(xref.query).toMatchObject(expected.modifiers);
  });

  test("make() concat_modifiers", () => {
    make.concat_modifiers(arr);
    expect(xref.query).toMatchObject(expected.modifiers);
  });

  test("concat_modifiers", () => {
    xref.concat_modifiers(arr);
    expect(xref.query).toMatchObject(expected.modifiers);
  });

  /* --------------------------------------------------------*
   *                                                         *
   *                        taxes
   *                                                         *
   * ------------------------------------------------------- */
  test("set items_for_tax_query id add", () => {
    xref.items_for_tax_query = id1;
    xref.items_for_tax_query = id2;
    xref.items_for_tax_query = id3;
    expect(xref.query).toMatchObject(expected.taxes);
  });

  test(" taxes method correctly modifies query", () => {
    xref.taxes(id1).taxes(id2).taxes(id3);
    expect(xref.query).toMatchObject(expected.taxes);
  });

  test("make().taxes()", () => {
    make.taxes(id1).taxes(id2).taxes(id3);
    expect(xref.query).toMatchObject(expected.taxes);
  });

  test("set concat_taxes", () => {
    xref.concat_items_for_tax_query = arr;
    expect(xref.query).toMatchObject(expected.taxes);
  });

  test("make() concat_taxes", () => {
    make.concat_taxes(arr);
    expect(xref.query).toMatchObject(expected.taxes);
  });

  test("concat_taxes", () => {
    xref.concat_taxes(arr);
    expect(xref.query).toMatchObject(expected.taxes);
  });

  test("make().object_types_concat() should set", () => {
    let expected = ["ITEM", "CATEGORY"];
    xref.concat_object_types(expected);
    expect(xref.object_types).toMatchObject(expected);
  });
});
