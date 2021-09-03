const Catalog_List = require("../../src/lib/catalog_request_list");

const list = new Catalog_List();

const log = async function () {
  await list.request();
  console.log(list.fardel);
  console.log(list.delivery);
};

log();
