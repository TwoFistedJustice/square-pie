const { expect } = require("chai");

describe("is it real or is it Memorex?", () => {
  it("Should not be Memorex", () => {
    expect("Memorex").to.not.eql("real");
  });
  it("should be real", () => {
    expect("real").to.eql("real");
  });
});
