"use strict";
const Catalog_Search_Cross_Reference = require("../src/lib/catalog_request_search_objects_cross_reference");

// tack on .only to this empty test to silence all other tests
describe("silence test suite", () => {
  test("", () => {
    expect("a").toEqual("a");
  });
});

describe("Catalog_Search_Cross_Reference", () => {
  let xref;
  let id1 = "HXUTLPOIUE3FZGSK4NBZGMZD";
  let id2 = "RJREZRB5H4RVFUMXB3R5V73Z";
  beforeEach(() => {
    xref = new Catalog_Search_Cross_Reference();
  });

  test("items method correctly modifies  body", () => {
    let expected = {
      cursor: undefined,
      include_related_objects: undefined,
      begin_time: undefined,
      object_types: undefined,
      query: undefined,
      items_for_item_options_query: [],
    };
    xref.variations();
    xref.items();
    expect(xref.body).toMatchObject(expected);
  });

  test("modifiers method correctly modifies  body", () => {
    let expected = {
      cursor: undefined,
      include_related_objects: undefined,
      begin_time: undefined,
      object_types: undefined,
      query: undefined,
      items_for_modifier_list_query: [],
    };
    xref.items();
    xref.modifiers();
    expect(xref.body).toMatchObject(expected);
  });

  test("taxes correctly modifies  body", () => {
    let expected = {
      cursor: undefined,
      include_related_objects: undefined,
      begin_time: undefined,
      object_types: undefined,
      query: undefined,
      items_for_tax_query: [],
    };
    xref.items();
    xref.taxes();
    expect(xref.body).toMatchObject(expected);
  });

  test("add_id method adds ids", () => {
    let expected = [id1, id2];
    xref.add_id(id1).add_id(id2);
    expect(xref.ids).toMatchObject(expected);
  });

  test("clear_ids clears the ids", () => {
    let expected = [];
    xref.add_id(id1).add_id(id2).clear_ids();
    expect(xref.ids).toMatchObject(expected);
  });

  test("query object should match", () => {
    let expected = {
      item_variations_for_item_option_values_query: ["id1", "id2", "id3"],
    };
    xref.make().variation("id1").variation("id2").variation("id3");
    expect(xref.query).toMatchObject(expected);
  });

  test("query object should match", () => {
    let expected = {
      item_variations_for_item_option_values_query: ["id1", "id2", "id3"],
    };
    xref.make().concat_variations(["id1", "id2", "id3"]);
    expect(xref.query).toMatchObject(expected);
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
   *                                                         *
   * ------------------------------------------------------- */
  test(" variations method correctly modifies query", () => {
    let expected = {
      item_variations_for_item_option_values_query: arr,
    };
    xref.variations(id1).variations(id2).variations(id3);
    expect(xref.query).toMatchObject(expected);
  });

  test("set item_variations_for_item_option_values_query id add", () => {
    let expected = {
      item_variations_for_item_option_values_query: arr,
    };
    xref.item_variations_for_item_option_values_query = id1;
    xref.item_variations_for_item_option_values_query = id2;
    xref.item_variations_for_item_option_values_query = id3;
    expect(xref.query).toMatchObject(expected);
  });

  test("make() variations", () => {
    let expected = {
      item_variations_for_item_option_values_query: arr,
    };
    make.variation(id1).variation(id2).variation(id3);
    expect(xref.query).toMatchObject(expected);
  });

  test("set item_variations_for_item_option_values_query id add", () => {
    let expected = {
      item_variations_for_item_option_values_query: arr,
    };
    xref.item_variations_for_item_option_values_query = id1;
    xref.item_variations_for_item_option_values_query = id2;
    xref.item_variations_for_item_option_values_query = id3;
    expect(xref.query).toMatchObject(expected);
  });

  test("make() concat_variations", () => {
    let expected = {
      item_variations_for_item_option_values_query: arr,
    };
    make.concat_variations(arr);
    expect(xref.query).toMatchObject(expected);
  });
});
