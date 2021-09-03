const Catalog_List = require("../../src/lib/catalog_request_list");
const Catalog_Delete = require("../../src/lib/catalog_request_delete");

const list = new Catalog_List();
const del = new Catalog_Delete();

// let deleteMe = "3JE3LPA4YCOKPQQ4OIKYWLRK";
// let deleteMe2 = "ZWNCFJ6PNYFVJNIETRNFXWPM";
let deleteMe2 = "not_even_a_real_id";

// del.object_ids = deleteMe;
del.nix(deleteMe2);

console.log(del.fardel);

const log = async function () {
  await list.request();
  console.log(list.fardel);
  console.log(list.delivery);

  await del.request();
  console.log(del.delivery);
};

log();
