"use strict";
const should = require("chai").should();
const { Helper_Name, Category } = require("../src/catalog_object_classes");

describe("Empty block", () => {
  test("Should pass because it is an empty test", () => {});
});

describe("Catalog: Helper_Name", () => {
  const helper = new Helper_Name();
  let just_right = "Just right";
  let too_long =
    "ouwoiuwolakrusdspfvjknktuceglhhyemavhppauktqgxwnhfsfuvgdtrjxxcsuorblgukzyibvqdetdwetfjzvyooejafifnfnsqiqguojlthnrjoxxcimbqdkzrvmbtixiflmvkxcvtagwkyyelpahhmzciabaxcnjenaublzpzddkotoxcddsydyceggamrsuukxacgrqymmtogglpufrvfhoiueijldihluswluymcphzhmyzbpjwpjwcqnaawfhnn";
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
    name: name,
  };
  test.only("Should have the expected name and type.", () => {
    expect(testSubject.parcel()).toMatchObject(expected);
  });
});
