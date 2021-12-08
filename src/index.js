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
const Customer_Object = require("./lib/customer_object");
const Customer_Create = require("./lib/customer_request_create");
const Customer_Delete = require("./lib/customer_request_delete");
const Customer_List = require("./lib/customer_request_list");
const Customer_Retrieve = require("./lib/customer_request_retrieve");
const Customer_Search = require("./lib/customer_request_search");
const Customer_Update = require("./lib/customer_request_update");
const Order_Object = require("./lib/order_object");
const Order_Discount = require("./lib/order_discount");
const Order_Fulfillment = require("./lib/order_fulfillment");
const Order_Line_Item = require("./lib/order_line_item");
const Order_Calculate = require("./lib/order_request_calculate");
const Order_Create = require("./lib/order_request_create");
const Order_Clone = require("./lib/stub.order_request_clone");
const Order_Pay = require("./lib/stub.order_request_pay");
const Order_Retrieve = require("./lib/order_request_retrieve");
const Order_Search = require("./lib/stub.order_request_search");
const Order_Upate = require("./lib/stub.order_request_update");

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
  Customer_Object,
  Customer_Create,
  Customer_Delete,
  Customer_List,
  Customer_Retrieve,
  Customer_Search,
  Customer_Update,
  Order_Object,
  Order_Discount,
  Order_Fulfillment,
  Order_Line_Item,
  Order_Calculate,
  Order_Create,
  Order_Clone,
  Order_Pay,
  Order_Retrieve,
  Order_Search,
  Order_Upate,
};

module.exports = square_pie;
