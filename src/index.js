// Catalog API
const Catalog_Category = require("./lib/catalog_object_category");
const Catalog_Item = require("./lib/catalog_object_item");
const Catalog_Item_Variation = require("./lib/catalog_object_item_variation");
const Catalog_Delete = require("./lib/catalog_request_delete");
const Catalog_Info = require("./lib/catalog_request_info");
const Catalog_List = require("./lib/catalog_request_list");
const Catalog_Retrieve = require("./lib/catalog_request_retrieve");
const Catalog_Search_Items = require("./lib/catalog_request_search_items");
const Catalog_Search_Objects_Cross_Reference = require("./lib/catalog_request_search_objects_cross_reference");
const Catalog_Search_Objects_Filter = require("./lib/catalog_request_search_objects_filter");
const Catalog_Upsert = require("./lib/catalog_request_upsert");
// Customer API
const Customer_Object = require("./lib/customer_object");
const Customer_Create = require("./lib/customer_request_create");
const Customer_Delete = require("./lib/customer_request_delete");
const Customer_List = require("./lib/customer_request_list");
const Customer_Retrieve = require("./lib/customer_request_retrieve");
const Customer_Search = require("./lib/customer_request_search");
const Customer_Update = require("./lib/customer_request_update");
// Invoice API
const Invoice_Object = require("./lib/invoice_object");
const Invoice_Payment_Request_Object = require("./lib/invoice_payment_request_object");
const Invoice_Cancel = require("./lib/invoice_request_cancel");
const Invoice_Create = require("./lib/invoice_request_create");
const Invoice_Delete = require("./lib/invoice_request_delete");
const Invoice_List = require("./lib/invoice_request_list");
const Invoice_Publish = require("./lib/invoice_request_publish");
const Invoice_Retrieve = require("./lib/invoice_request_retrieve");
const Invoice_Search = require("./lib/invoice_request_search");
const Invoice_Update = require("./lib/invoice_request_update");
// Order API
const Order_Object = require("./lib/order_object");
const Order_Discount = require("./lib/order_discount");
const Order_Fulfillment = require("./lib/order_fulfillment");
const Order_Line_Item = require("./lib/order_line_item");
const Order_Calculate = require("./lib/order_request_calculate");
const Order_Clone = require("./lib/order_request_clone");
const Order_Create = require("./lib/order_request_create");
const Order_Pay = require("./lib/order_request_pay");
const Order_Retrieve = require("./lib/order_request_retrieve");
const Order_Search = require("./lib/order_request_search");
const Order_Upate = require("./lib/order_request_update");

const version = "1.0.0";
const square_pie = {
  version: version,
  // Catalog API
  Catalog_Category,
  Catalog_Item,
  Catalog_Item_Variation,
  Catalog_Delete,
  Catalog_Info,
  Catalog_List,
  Catalog_Retrieve,
  Catalog_Search_Items,
  Catalog_Search_Objects_Cross_Reference,
  Catalog_Search_Objects_Filter,
  Catalog_Upsert,
  // Customer API
  Customer_Object,
  Customer_Create,
  Customer_Delete,
  Customer_List,
  Customer_Retrieve,
  Customer_Search,
  Customer_Update,
  // Invoice API
  Invoice_Object,
  Invoice_Payment_Request_Object,
  Invoice_Cancel,
  Invoice_Create,
  Invoice_Delete,
  Invoice_List,
  Invoice_Publish,
  Invoice_Retrieve,
  Invoice_Search,
  Invoice_Update,
  // Order API
  Order_Object,
  Order_Discount,
  Order_Fulfillment,
  Order_Line_Item,
  Order_Calculate,
  Order_Clone,
  Order_Create,
  Order_Pay,
  Order_Retrieve,
  Order_Search,
  Order_Upate,
};

module.exports = square_pie;
