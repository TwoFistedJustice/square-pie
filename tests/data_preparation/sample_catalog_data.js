const Catalog_Item = require("../../src/lib/catalog_object_item");
const Catalog_Item_Variation = require("../../src/lib/catalog_object_item_variation");
const Catalog_Item_Wrapper = require("../../src/lib/catalog_object_wrapper");

const wrapper = new Catalog_Item_Wrapper();
const item = new Catalog_Item();
const large = new Catalog_Item_Variation();
const small = new Catalog_Item_Variation();

const itemConfig = item.spawn();
const lg_config = large.spawn();
const sm_config = small.spawn();

itemConfig
  .name("Fancy Coffee")
  .description("Froufrou Coffee Drink")
  .abbreviation("FC");
lg_config.name("Large").price_money(675);
sm_config.name("Small").price_money(550);

itemConfig.variations(large.fardel).variations(small.fardel);
wrapper.attach(item.fardel);

// in case thou needest to see the data
// this bes a goodly point to stop
// let outputI = JSON.stringify(item.fardel, null, 2);

const sample_objects = {
  coffee: item.fardel,
};

module.exports = sample_objects;
