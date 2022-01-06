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

  test(" variations method correctly modifies body", () => {
    let expected = {
      cursor: undefined,
      include_related_objects: undefined,
      begin_time: undefined,
      object_types: undefined,
      query: undefined,
      item_variations_for_item_option_values_query: [],
    };
    xref.items();
    xref.variations();
    expect(xref.body).toMatchObject(expected);
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
    xref.addId(id1).addId(id2);
    expect(xref.ids).toMatchObject(expected);
  });

  test("clear_ids clears the ids", () => {
    let expected = [];
    xref.addId(id1).addId(id2).clearIds();
    expect(xref.ids).toMatchObject(expected);
  });
});
