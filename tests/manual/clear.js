// req all list classes
const Customer_List = require("../../src/lib/customer_request_list");
const Catalog_List = require("../../src/lib/catalog_request_list");
// const Invoice_List = require("../../src/lib/invoice_request_list");

// req all delete classes
const Customer_Delete = require("../../src/lib/customer_request_delete");
const Catalog_Delete = require("../../src/lib/catalog_request_delete");
// const Invoice_Delete = require("../../src/lib/invoice_request_delete");

const delete_customers = async function () {
  const list = new Customer_List();
  await list.request();
  let customers = list.delivery;
  if (list.delivery !== undefined) {
    customers.forEach(async (customer) => {
      console.log("deleting");
      console.log(customer);
      let killemall = new Customer_Delete(customer.id);
      await killemall.request();
    });
  }

  await list.request();
  if (list.delivery === undefined) {
    console.log("all customers deleted");
  } else {
    console.log("fail");
    console.log(list.delivery);
  }
};

// these should be gone
// 3EVKER7GMFKKF4GKXRUTSV63
//5Z64WRRVN5BJX4DBTTNGITXZ
const delete_items = async function () {
  const list = new Catalog_List();
  const clean_garage = new Catalog_Delete();
  await list.request();
  let stuff = [];
  console.log(list.delivery);
  if (list.delivery !== undefined) {
    list.delivery.forEach((thing) => {
      stuff.push(thing.id);
    });
    clean_garage.make().concat_object_ids(stuff);
    console.log("deleting:");
    console.log(clean_garage.body.object_ids);
    await clean_garage.request();
    if (clean_garage.delivery !== undefined) {
      console.log("deleted");
      console.log(clean_garage.delivery);
    } else {
      console.log("nothing to delete");
    }
  } else {
    console.log("nothing to delete");
  }
};

// this won't work until we build the Location API, invoices need an location id...
// const delete_invoices = async function(){
//   const list = new Invoice_List();
//   const deletio = new Invoice_Delete();
//
//   await list.request();
//   console.log (list.delivery)
//
// };

delete_customers();
delete_items();
// delete_invoices();
