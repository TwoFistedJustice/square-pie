const { v4: uuid4 } = require("uuid");
uuid4();
const { test_data_prep } = require("./data_prep");

const apiName = "catalog";

const payload = {
  batches: [
    {
      objects: [
        {
          type: "ITEM",
          id: "#Tea",
          present_at_all_locations: true,
          item_data: {
            name: "Tea",
            description: "Hot Leaf Juice",
            category_id: "#Beverages",
            tax_ids: ["#SalesTax"],
            variations: [
              {
                type: "ITEM_VARIATION",
                id: "#Tea_Mug",
                present_at_all_locations: true,
                item_variation_data: {
                  item_id: "#Tea",
                  name: "Mug",
                  pricing_type: "FIXED_PRICING",
                  price_money: {
                    amount: 150,
                    currency: "USD",
                  },
                },
              },
            ],
          },
        },
        {
          type: "ITEM",
          id: "#Coffee",
          present_at_all_locations: true,
          item_data: {
            name: "Coffee",
            description: "Hot Bean Juice",
            category_id: "#Beverages",
            tax_ids: ["#SalesTax"],
            variations: [
              {
                type: "ITEM_VARIATION",
                id: "#Coffee_Regular",
                present_at_all_locations: true,
                item_variation_data: {
                  item_id: "#Coffee",
                  name: "Regular",
                  pricing_type: "FIXED_PRICING",
                  price_money: {
                    amount: 250,
                    currency: "USD",
                  },
                },
              },
              {
                type: "ITEM_VARIATION",
                id: "#Coffee_Large",
                present_at_all_locations: true,
                item_variation_data: {
                  item_id: "#Coffee",
                  name: "Large",
                  pricing_type: "FIXED_PRICING",
                  price_money: {
                    amount: 350,
                    currency: "USD",
                  },
                },
              },
            ],
          },
        },
        {
          type: "CATEGORY",
          id: "#Beverages",
          present_at_all_locations: true,
          category_data: {
            name: "Beverages",
          },
        },
        {
          type: "TAX",
          id: "#SalesTax",
          present_at_all_locations: true,
          tax_data: {
            name: "Sales Tax",
            calculation_phase: "TAX_SUBTOTAL_PHASE",
            inclusion_type: "ADDITIVE",
            percentage: "5.0",
            applies_to_custom_amounts: true,
            enabled: true,
            tax_type_id: "us_sales_tax",
            tax_type_name: "Sales Tax",
          },
        },
      ],
    },
  ],
};

const catalog_list = async function () {
  let endpoint = "/list";
  let list = await test_data_prep(apiName, "get", endpoint);
  return list.delivery;
}; // END fn

const catalog_add = async function () {
  let endpoint = "batch-upsert";
  payload.idempotency_key = uuid4();
  return await test_data_prep(apiName, "post", endpoint, payload);
}; // END fn

const catalog_delete = async function (id) {
  return await test_data_prep(apiName, "delete", id);
};

module.exports = {
  catalog_list,
  catalog_add,
  catalog_delete,
};
