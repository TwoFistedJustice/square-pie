const Location_Object = require("../../src/lib/location_object");
const Location_Create = require("../../src/lib/location_request_create");
const Location_Update = require("../../src/lib/location_request_update");
const Location_List = require("../../src/lib/location_request_list");
const Location_Retrieve = require("../../src/lib/location_request_retrieve");

const id = "LM1T0KY3GM24D";
let soccer_land_id = "L2X92PW79TPBX";

const address_sf = {
  address_line_1: "865 Valencia St",
  locality: "San Francisco",
  administrative_district_level_1: "CA",
  postal_code: "94110",
  country: "US",
};

const location = new Location_Object();
location
  .make()
  .name("soccer land")
  .phone_number("5558675309")
  .language_code()
  .spanish()
  .us()
  .status()
  .active()
  .type()
  .mobile()
  .address(address_sf);

const upsert = async function () {
  let create = new Location_Create();
  create.make().location(location.fardel);
  await create.request();
  console.log("create");
  console.log(create.delivery);
};

const list = async function () {
  let list = new Location_List();
  await list.request();
  console.log("list:");
  console.log(list.delivery);
};

const retrieve = async function () {
  let retrieve = new Location_Retrieve(id);
  await retrieve.request();
  console.log("retrieve");
  console.log(retrieve.delivery);
};

const update = async function () {
  let update = new Location_Update(soccer_land_id);
  let location = new Location_Object();

  // location.make().address(address).phone_number("14165978822")
  // location.make().status().inactive().language_code().english().us().type().mobile();
  // location.make().type().physical().status().inactive().language_code().english().us();
  location.make().name("soccer land");

  update.make().location(location.fardel);

  await update.request();
  console.log("updated version");
  console.log(update.delivery);
};

upsert();
list();
update();
retrieve();
