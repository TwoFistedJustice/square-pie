const Catalog_Upsert = require("../../src/lib/catalog_request_upsert");
const { single, multiple } = require("../data_preparation/sample_catalog_data");
// const Catalog_List = require("../../src/lib/catalog_request_list");
// const Catalog_Search_Filter = require("../../src/lib/catalog_request_search_objects_filter");
// const Catalog_Search_Cross_Reference = require("../../src/lib/catalog_request_search_objects_cross_reference");
// const Catalog_Info = require("../../src/lib/catalog_request_info");
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

const upsert_one = new Catalog_Upsert();
const upsert_batch = new Catalog_Upsert();
upsert_one.body = single;
upsert_batch.body = multiple;

console.log("single");
console.log(single);
console.log("multiple");
console.log(multiple);

const log = async function () {
  // let upsert = upsert_one;
  let upsert = upsert_batch;
  console.log(upsert.body.batches[0].objects[0]);

  await upsert.request();
  console.log("delivery");
  console.log(upsert.delivery);
};

log();
