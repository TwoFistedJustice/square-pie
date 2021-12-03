const Catalog_Item = require("./lib/catalog_object_item");
const Catalog_Category = require("./lib/catalog_object_category");
const Catalog_Item_Variation = require("./lib/catalog_object_item_variation");
// const { Catalog_Object_ } = require("./lib/");
// const { Catalog_Object_ } = require("./lib/");
// const { Catalog_Object_ } = require("./lib/");

const version = "1.0.0";
const square_pie = {
  version: version,
  Catalog_Item: Catalog_Item,
  Catalog_Item_Variation: Catalog_Item_Variation,
  Catalog_Category: Catalog_Category,
};

module.exports = square_pie;
