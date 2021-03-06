const { nanoid } = require("nanoid/non-secure");
const { test_data_prep } = require("./data_prep");

const apiName = "customers";

const customer_list = async function () {
  let list = await test_data_prep(apiName, "get");
  return list.customers;
}; // END fn

const customer_add = async function (payload) {
  payload.idempotency_key = nanoid();
  return await test_data_prep(apiName, "post", undefined, payload);
}; // END fn

const customer_delete = async function (id) {
  return await test_data_prep(apiName, "delete", id);
};

module.exports = {
  customer_list,
  customer_add,
  customer_delete,
};
