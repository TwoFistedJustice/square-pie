console.log("Beginning data configuration.");
/*
 *  Set up new configurations by making a function to call the http request functions,
 * then add that function to the IIFE at the bottom.
 * */

const set_up_customer_DB_for_tests = async function () {
  console.log("Setting up customer data");
  const {
    customer_list,
    customer_add,
    customer_delete,
  } = require("./customer_prep");

  const { sampleCustomers } = require("./sample_customer_data");
  const customers = sampleCustomers();
  const buffy = customers.buffy;
  const jason = customers.jason;
  const fred = customers.fred;
  const freddie = customers.freddie;

  // count the customers stored in sandbox
  let customerList = await customer_list();
  //if there are none, add four and return
  if (!customerList) {
    await customer_add(buffy);
    await customer_add(jason);
    await customer_add(fred);
    await customer_add(freddie);
    return;
  }
  // if there are some, delete them all then add four
  // mikey will be added during the tests
  customerList.forEach(async (customer) => {
    await customer_delete(customer.id);
  });
  await customer_add(buffy);
  await customer_add(jason);
  await customer_add(fred);
  await customer_add(freddie);
  console.log("Completed customer data set up.");
  return;
}; // END fn

const set_up_catalog_DB_for_tests = async function () {
  console.log("Setting up catalog data");
  const {
    // catalog_list,
    catalog_add,
    // catalog_delete,
  } = require("./catalog_prep");

  await catalog_add();

  console.log("Completed catalog data set up.");
  return;
};

//
(async () => {
  await set_up_customer_DB_for_tests();
  await set_up_catalog_DB_for_tests();

  // this ties up the console so the user can't run the tests before the Square servers finish their internal operations.
  setTimeout(() => {
    console.log(
      'Data configuration complete. Run tests by typing "npm run test"'
    );
  }, 30 * 1000);

  return true;
})();
