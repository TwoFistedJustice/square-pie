"use strict";
const should = require("chai").should();
const { Category } = require("../src/catalog_object_classes");

describe("Empty block", () => {
  test("Should pass because it is an empty test", () => {});
});

describe("Catalog Category", () => {
  const schleeb = new Category("schleeb");
  let too_long =
    "ouwoiuwolakrusdspfvjknktuceglhhyemavhppauktqgxwnhfsfuvgdtrjxxcsuorblgukzyibvqdetdwetfjzvyooejafifnfnsqiqguojlthnrjoxxcimbqdkzrvmbtixiflmvkxcvtagwkyyelpahhmzciabaxcnjenaublzpzddkotoxcddsydyceggamrsuukxacgrqymmtogglpufrvfhoiueijldihluswluymcphzhmyzbpjwpjwcqnaawfhnn";
  test.only("Should reject a value that is more than 255 characters", () => {
    expect(() => {
      schleeb.name = too_long;
    }).toThrow();
  });
});
