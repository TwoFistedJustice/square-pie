"use strict";
const should = require("chai").should();
const { v4: uuidv4 } = require("uuid");
uuidv4();

const {
  Catalog_Object_Wrapper,
  Helper_Name,
  Category,
} = require("../src/catalog_object_classes");

describe("Empty block", () => {
  test("Should pass because it is an empty test", () => {});
});

describe("Catalog Object Wrapper", () => {
  const arr = [{ a: 0 }, { b: 1 }, { c: 2 }, { d: 3 }, { e: 4 }];

  test("Payload should be an object when given a single object", () => {
    let thing = new Catalog_Object_Wrapper();
    thing.attach(arr[0]);
    expect(thing.payload).toMatchObject(arr[0]);
  });

  test("Payload should be an array of objects when given a more than one object", () => {
    let thing = new Catalog_Object_Wrapper();
    thing
      .attach(arr[0])
      .attach(arr[1])
      .attach(arr[2])
      .attach(arr[3])
      .attach(arr[4]);
    expect(thing.payload).toMatchObject(arr);
  });

  test("Add alias should function exactly as attach method", () => {
    let thing = new Catalog_Object_Wrapper();
    thing.add(arr[0]).add(arr[1]).add(arr[2]).add(arr[3]).add(arr[4]);
    expect(thing.payload).toMatchObject(arr);
  });

  test("Attach method and add alias should work together", () => {
    let thing = new Catalog_Object_Wrapper();
    thing.add(arr[0]).attach(arr[1]).add(arr[2]).attach(arr[3]).add(arr[4]);
    expect(thing.payload).toMatchObject(arr);
  });

  test("Idempotency key should be a proper UUID", () => {
    const { validate } = require("uuid");
    let thing = new Catalog_Object_Wrapper();
    thing.add(arr[0]);
    thing.finalize();
    validate(thing.fardel.idempotency_key).should.be.true;
  });

  test("Fardel should be in correct form with one object", () => {
    let thing = new Catalog_Object_Wrapper();
    thing.add(arr[0]);
    thing.finalize();
    // test vs object
    Object.prototype.hasOwnProperty.call(thing.fardel, "object").should.be.true;
    thing.fardel.object.should.be.an("object");
  });

  test("Fardel should be in correct form with multiple object", () => {
    let thing = new Catalog_Object_Wrapper();
    thing.add(arr[0]);
    thing.attach(arr[1]);
    thing.finalize();
    //test vs array
    Object.prototype.hasOwnProperty.call(thing.fardel, "objects").should.be
      .true;
    thing.fardel.objects.should.be.an("array");
  });

  // test("", () => {
  //   let thing = new Catalog_Object_Wrapper();
  // });
});

describe("Catalog: Helper_Name", () => {
  const helper = new Helper_Name();
  let just_right = "Just right";
  let too_long =
    "ouwoiuwolakrusdspfvjknktuceglhhyemavhppauktqgxwnhfsfuvgdtrjxxcsuorblgukz" +
    "yibvqdetdwetfjzvyooejafifnfnsqiqguojlthnrjoxxcimbqdkzrvmbtixiflmvkxcvtagw" +
    "kyyelpahhmzciabaxcnjenaublzpzddkotoxcddsydyceggamrsuukxacgrqymmtogglpufrv" +
    "fhoiueijldihluswluymcphzhmyzbpjwpjwcqnaawfhnn";

  test("Should accept a value that is less than 255 characters", () => {
    expect(() => {
      helper.name = just_right;
    }).not.toThrow();
  });

  test("Should reject a value that is more than 255 characters", () => {
    expect(() => {
      helper.name = too_long;
    }).toThrow();
  });
});

describe("Catalog: Category", () => {
  const name = "Thing";
  const testSubject = new Category(name);
  // const testValue = testSubject.parcel();
  const expected = {
    type: "CATEGORY",
    id: `#${name}`,
    present_at_all_locations: true,
    category_data: {
      name: name,
    },
  };
  test("Should have the expected name and type.", () => {
    expect(testSubject.parcel()).toMatchObject(expected);
  });
});
