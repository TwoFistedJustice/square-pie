const Catalog_Category = require("../src/lib/catalog_object_category");

const { long_strings } = require("./helper_objects");

let catalog, make;
const class_name = "Catalog_Category";
let id = "123";

describe("Silence test suite", () => {
  test("", () => {});
});

/* --------------------------------------------------------*
 *                                                         *
 *                        common structures
 *                                                         *
 * ------------------------------------------------------- */
describe("basic object class structures", () => {
  beforeEach(() => {
    catalog = new Catalog_Category();
    make = catalog.make();
  });
  test("should have display name", () => {
    expect(catalog.display_name).toBeDefined();
  });
  test("display name should be same as class name", () => {
    expect(catalog.display_name).toEqual(class_name);
  });
  test("should have help", () => {
    expect(catalog.help).toBeDefined();
  });
  test("should have defined square version", () => {
    expect(catalog.square_version).toBeDefined();
  });
  test("should have defined _fardel", () => {
    make.name("Cockroach Souffle");
    expect(catalog.fardel).toBeDefined();
  });
  test("type should be CATEGORY", () => {
    expect(catalog.type).toEqual("CATEGORY");
  });
});

/* --------------------------------------------------------*
 *                                                         *
 *                        Error Checking
 *                                                         *
 * ------------------------------------------------------- */
describe("error checking", () => {
  beforeEach(() => {
    catalog = new Catalog_Category();
    make = catalog.make();
  });
  test("should throw if name is NOT defined", () => {
    expect(() => {
      catalog.fardel;
    }).toThrow();
  });
  test("should not throw if name is defined", () => {
    catalog.name = "Spider Silk Dress";
    expect(() => {
      catalog.fardel;
    }).not.toThrow();
  });

  test("should throw if name exceeds limit", () => {
    expect(() => {
      catalog.name = long_strings.len_256;
    }).toThrow();
  });

  test("should not throw if name deceeds limit", () => {
    expect(() => {
      catalog.name = long_strings.len_255;
    }).not.toThrow();
  });
});

/* --------------------------------------------------------*
 *                                                         *
 *                        getters/setters
 *                                                         *
 * ------------------------------------------------------- */

describe("getters/setters", () => {
  beforeEach(() => {
    catalog = new Catalog_Category();
    make = catalog.make();
  });

  test("make().name () should set ", () => {
    let expected = "Crunchy Spider Muffins";
    make.name(expected);
    expect(catalog.name).toEqual(expected);
  });
  test("make().id () should set id and add a # to denote temporary status ", () => {
    let expected = "#" + id;
    make.id(expected);
    expect(catalog.id).toEqual(expected);
  });
  test("make().present_at_all_locations () should set ", () => {
    let expected = true;
    make.present_at_all_locations(expected);
    expect(catalog.present_at_all_locations).toEqual(expected);
  });
  test("make().present_at_location_ids () should push id onto array ", () => {
    let expected = [id];
    make.present_at_location_ids(id);
    expect(catalog.present_at_location_ids).toEqual(expected);
  });
});
