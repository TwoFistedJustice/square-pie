const Order_Service_Charge = require("../src/lib/order_object_service_charge");

let service_charge, make;
const id = "123";
const class_name = "Order_Service_Charge";

/* --------------------------------------------------------*
 *                                                         *
 *                        common structures
 *                                                         *
 * ------------------------------------------------------- */
describe(`${class_name} basic object class structures`, () => {
  beforeEach(() => {
    service_charge = new Order_Service_Charge();
    make = service_charge.make();
  });
  test("should have display name", () => {
    expect(service_charge.display_name).toBeDefined();
  });
  test("display name should be same as class name", () => {
    expect(service_charge.display_name).toEqual(class_name);
  });
  test("should have help", () => {
    expect(service_charge.help).toBeDefined();
  });
  test("should have defined square version", () => {
    expect(service_charge.square_version).toBeDefined();
  });
  test("should have defined _fardel", () => {
    expect(service_charge.fardel).toBeDefined();
  });
});
/* --------------------------------------------------------*
 *                                                         *
 *                        Error Checks
 *                                                         *
 * ------------------------------------------------------- */

/* --------------------------------------------------------*
 *                                                         *
 *                        getters/setters
 *                                                         *
 * ------------------------------------------------------- */

describe(`${class_name} getters/setters`, () => {
  beforeEach(() => {
    service_charge = new Order_Service_Charge();
    make = service_charge.make();
  });
  test("make().uid() should set ", () => {
    let expected = id;
    make.uid(expected);
    expect(service_charge.uid).toEqual(expected);
  });
  test("make().name() should set ", () => {
    let expected = id;
    make.name(expected);
    expect(service_charge.name).toEqual(expected);
  });
  test("make().catalog_object_id() should set ", () => {
    let expected = id;
    make.catalog_object_id(expected);
    expect(service_charge.catalog_object_id).toEqual(expected);
  });
  test("make().catalog_version() should set ", () => {
    let expected = 4;
    make.catalog_version(expected);
    expect(service_charge.catalog_version).toEqual(expected);
  });
  test("make().percentage() should set ", () => {
    let expected = "4.24";
    make.percentage(expected);
    expect(service_charge.percentage).toEqual(expected);
  });
  test("make().amount_money() should set ", () => {
    let expected = {
      amount: 4200,
      currency: "EUR",
    };
    make.amount_money(4200, "eur");
    expect(service_charge.amount_money).toEqual(expected);
  });
  test("make().calculation_phase() should set ", () => {
    let expected = "SUBTOTAL_PHASE";
    make.calculation_phase().subtotal_phase();
    expect(service_charge.calculation_phase).toEqual(expected);
  });

  test("make().calculation_phase() should set ", () => {
    let expected = "SUBTOTAL_PHASE";
    make.calculation_phase().subtotal();
    expect(service_charge.calculation_phase).toEqual(expected);
  });

  test("make().calculation_phase() should set ", () => {
    let expected = "TOTAL_PHASE";
    make.calculation_phase().total_phase();
    expect(service_charge.calculation_phase).toEqual(expected);
  });

  test("make().calculation_phase() should set ", () => {
    let expected = "TOTAL_PHASE";
    make.calculation_phase().total();
    expect(service_charge.calculation_phase).toEqual(expected);
  });

  test("make().taxable() should set ", () => {
    let expected = true;
    make.taxable(expected);
    expect(service_charge.taxable).toEqual(expected);
  });
  test("make().applied_taxes() should set ", () => {
    let expected = [id];
    make.applied_taxes(id);
    expect(service_charge.applied_taxes).toEqual(expected);
  });
});
