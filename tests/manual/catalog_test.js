// const Catalog_Upsert = require("../../src/lib/catalog_request_upsert");
// const sample_objects = require("../data_preparation/sample_catalog_data");
// const Catalog_List = require("../../src/lib/catalog_request_list");
// const Catalog_Search_Filter = require("../../src/lib/catalog_request_search_objects_filter");
// const Catalog_Search_Cross_Reference = require("../../src/lib/catalog_request_search_objects_cross_reference");
const Catalog_Info = require("../../src/lib/stub.catalog_request_info");
// const list = new Catalog_List();

// const filter = new Catalog_Search_Filter();
// const xref = new Catalog_Search_Cross_Reference();
// xref.id("tasty").id("burrito");
// xref.id("RJREZRB5H4RVFUMXB3R5V73Z"); //item
// xref.addId("HXUTLPOIUE3FZGSK4NBZGMZD"); //tax
// xref.variations();
// xref.items();
// xref.clearIds();
// xref.modifiers();
// xref.taxes();
// const criteria = {
//   attribute_name: "amount",
//   attribute_prefix: "Coffee",
// attribute_min_value: 549,
// attribute_max_value: 559,
// };
// filter.range_query = criteria;

const info = new Catalog_Info();

const log = async function () {
  // await list.request();
  // console.log(list.delivery);
  // await filter.request();
  // console.log(filter.delivery);
  // console.log(xref.query);
  // await xref.request();
  // console.log(xref.delivery);
  // await del.request();
  // console.log(del.delivery);

  await info.request();
  // console.log(info.delivery);
  console.log(info.limits);
  // console.log(info.standard_unit_json);
  // console.log(info.standard_units);
  // console.log(info.language_code);
};

log();
