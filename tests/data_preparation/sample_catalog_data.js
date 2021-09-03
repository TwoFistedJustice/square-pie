const Catalog_Item = require("../../src/lib/catalog_object_item");
const Catalog_Item_Variation = require("../../src/lib/catalog_object_item_variation");
const Catalog_Category = require("../../src/lib/catalog_object_category");
const Catalog_Item_Wrapper = require("../../src/lib/catalog_object_wrapper");

const multiple = new Catalog_Item_Wrapper();
const single = new Catalog_Item_Wrapper();

const category = new Catalog_Category();
category.name = "Guitars";

const item = new Catalog_Item();
const itemConfig = item.spawn();

const large = new Catalog_Item_Variation();
const lg_config = large.spawn();

const small = new Catalog_Item_Variation();
const sm_config = small.spawn();

itemConfig
  .id("coffee")
  .name("FancyCoffee")
  .description("Froufrou Coffee Drink")
  .abbreviation("FC");
lg_config.name("Large").price_money(675);
lg_config.name("Large");
sm_config.name("Small").price_money(550);

itemConfig.variations(large.fardel).variations(small.fardel);
itemConfig.variations(large.fardel);

multiple.attach(item.fardel);
multiple.add(category.fardel);
multiple.finalize();

single.attach(category.fardel);
single.finalize();

// const doit = async function () {
//   const Catalog_Request_Upsert = require("../../src/lib/catalog_request_upsert");
//   const upsert = new Catalog_Request_Upsert();
//   upsert.make().body(wrapper.fardel);
//
//   let delivered = await upsert.request();
//   console.log(delivered);
// };
// doit();

const sample_objects = {
  multiple: multiple.fardel,
  single: single.fardel,
};

module.exports = sample_objects;
