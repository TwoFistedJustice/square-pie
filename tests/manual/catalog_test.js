const Catalog_Upsert = require("../../src/lib/catalog_request_upsert");
const Catalog_List = require("../../src/lib/catalog_request_list");

const sample_objects = require("../data_preparation/sample_catalog_data");

const upsert = new Catalog_Upsert();
upsert.make().body(sample_objects.multiple);

const list = new Catalog_List();

// const Catalog_Delete = require("../../src/lib/catalog_request_delete");
// const del = new Catalog_Delete();

// let deleteMe = "P2C2FR2MTJEHRSZ4J2HWY52N";
// del.nix(deleteMe);

// console.log(del.fardel);

const log = async function () {
  await upsert.request();
  await list.request();
  console.log(list.fardel);
  console.log(list.delivery);

  // await del.request();
  // console.log(del.delivery);
};

log();
