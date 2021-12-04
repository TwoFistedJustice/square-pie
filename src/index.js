const Catalog_Item = require("./lib/catalog_object_item");
const Catalog_Category = require("./lib/catalog_object_category");
const Catalog_Item_Variation = require("./lib/catalog_object_item_variation");
const Catalog_Delete = require("./lib/catalog_request_delete");
const Catalog_Info = require("./lib/catalog_request_info");
const Catalog_List = require("./lib/catalog_request_list");
const Catalog_Retrieve = require("./lib/catalog_request_retrieve");
const Catalog_Search_Items = require("./lib/catalog_request_search_items");
const Catalog_Search_Objects_Cross_Reference = require("./lib/catalog_request_search_objects_cross_reference");
const Catalog_Search_Objects_Filter = require("./lib/catalog_request_search_objects_filter");
const Catalog_Upsert = require("./lib/catalog_request_upsert");

const version = "1.0.0";
const square_pie = {
  version: version,
  Catalog_Item,
  Catalog_Item_Variation,
  Catalog_Category,
  Catalog_Delete,
  Catalog_Info,
  Catalog_List,
  Catalog_Retrieve,
  Catalog_Search_Items,
  Catalog_Search_Objects_Cross_Reference,
  Catalog_Search_Objects_Filter,
  Catalog_Upsert,
};

module.exports = square_pie;
