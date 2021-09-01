const Catalog_Item = require("../../src/lib/catalog_object_item");
const Catalog_Item_Variation = require("../../src/lib/catalog_object_item_variation");
const Catalog_Category = require("../../src/lib/catalog_object_category");
const Catalog_Item_Wrapper = require("../../src/lib/catalog_object_wrapper");

const wrapper = new Catalog_Item_Wrapper();

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
  .name("FancyCoffeeuo")
  .description("Froufrou Coffee Drink")
  .abbreviation("FC");
lg_config.name("Large").price_money(675);
lg_config.name("Large");
sm_config.name("Small").price_money(550);

itemConfig.variations(large.fardel).variations(small.fardel);
itemConfig.variations(large.fardel);

wrapper.attach(item.fardel);
wrapper.add(category.fardel);
wrapper.finalize();

// const doit = async function () {
// const Catalog_Request_Upsert = require("../../src/lib/catalog_request_upsert");
//   const upsert = new Catalog_Request_Upsert();
//
//   upsert.body = wrapper.fardel;
//   let delivered = await upsert.makeRequest();
//   console.log(delivered);
// };
// doit();

const sample_objects = {
  mulitple: wrapper.fardel,
};

module.exports = sample_objects;
