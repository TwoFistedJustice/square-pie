const Catalog_Delete = require("../src/lib/catalog_request_delete");

describe("Catalog_Delete basics", () => {
  let del;
  let class_name = "Catalog_Delete";
  beforeEach(function () {
    del = new Catalog_Delete();
  });

  test("should have display name", () => {
    expect(del.display_name).toBeDefined();
  });

  test("should have _help", () => {
    expect(del.help).toBeDefined();
  });

  test("should have the method defined by Square set", () => {
    expect(del.method).toEqual("post");
  });
  test("display name should be same as class name", () => {
    expect(del._display_name).toEqual(class_name);
  });

  test("should have defined square version", () => {
    expect(del.square_version).toBeDefined();
  });
  test("should have defined _body", () => {
    expect(del.body).toBeDefined();
  });
  test("should have _delivery", () => {
    del.delivery = { someProp: { a: 1 } };
    expect(del.delivery).toBeDefined();
  });

  test("should have an endpoint", () => {
    expect(del.endpoint).toEqual("/batch-delete");
  });

  // Make()

  test("set object_ids should set PRIMARY property", () => {
    let id = "someId";
    let expected = [id];
    del.object_ids = id;
    expect(del.object_ids).toEqual(expected);
  });

  test("set object_array_concat should concat an array to an existing array", () => {
    let id1 = "someId1";
    let id2 = "someId2";
    let id3 = "someId3";
    let arr = [id2, id3];
    let expected = [id1, id2, id3];
    del.make().object_ids(id1);
    del.object_array_concat = arr;
    expect(del.object_ids).toEqual(expected);
  });

  test("make().object_ids() should add ids to array", () => {
    let id = "someId";
    let expected = [id];
    del.make().object_ids(id);
    expect(del.object_ids).toEqual(expected);
  });

  test("make().concat_object_ids() should concat an array to an existing array", () => {
    let id1 = "someId1";
    let id2 = "someId2";
    let id3 = "someId3";
    let arr = [id2, id3];
    let expected = [id1, id2, id3];
    del.make().object_ids(id1).concat_object_ids(arr);
    expect(del.object_ids).toEqual(expected);
  });

  test("delete(id) should add ids to array", () => {
    let id = "someId";
    let expected = [id];
    del.delete(id);
    expect(del.object_ids).toEqual(expected);
  });

  test("effacer(id) should add ids to array", () => {
    let id = "someId";
    let expected = [id];
    del.effacer(id);
    expect(del.object_ids).toEqual(expected);
  });

  test("nix(id) should add ids to array", () => {
    let id = "someId";
    let expected = [id];
    del.nix(id);
    expect(del.object_ids).toEqual(expected);
  });

  test("disintegrate(id) should add ids to array", () => {
    let id = "someId";
    let expected = [id];
    del.disintegrate(id);
    expect(del.object_ids).toEqual(expected);
  });
});
