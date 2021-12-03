const Catalog_Item = require("../../src/lib/catalog_object_item");
const Catalog_Item_Variation = require("../../src/lib/catalog_object_item_variation");
const Catalog_Category = require("../../src/lib/catalog_object_category");

const category = new Catalog_Category();
category.name = "Guitars";

const item = new Catalog_Item();
const itemConfig = item.make();

const large = new Catalog_Item_Variation();
const lg_config = large.make();

const small = new Catalog_Item_Variation();
const sm_config = small.make();

itemConfig.id("coffee").name("pie").description("dessert").abbreviation("FC");
lg_config.name("blue").price_money(675);
sm_config.name("red").price_money(550);

itemConfig.variations(large.fardel).variations(small.fardel);

const sample_objects = {
  item: item.fardel,
};

module.exports = sample_objects;
