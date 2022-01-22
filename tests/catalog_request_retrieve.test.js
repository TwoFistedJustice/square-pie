const Catalog_Retrieve = require("../src/lib/catalog_request_retrieve");

describe("Catalog_Retrieve", () => {
  let retrieve;
  let class_name = "Catalog_Retrieve";
  let endpoint = "/batch-retrieve"; //copy and paste from Square docs
  let method = "POST"; //http method from Square docs
  beforeEach(function () {
    retrieve = new Catalog_Retrieve();
  });

  test("should have display name", () => {
    expect(retrieve._display_name).toBeDefined();
  });
  test("should have the method defined by Square set", () => {
    expect(retrieve.method).toEqual(method);
  });
  test("display name should be same as class name", () => {
    expect(retrieve.display_name).toEqual(class_name);
  });
  test("should have defined square version", () => {
    expect(retrieve.square_version).toBeDefined();
  });
  test("should have defined _help", () => {
    expect(retrieve.help).toBeDefined();
  });
  test("should have defined _body", () => {
    expect(retrieve.body).toBeDefined();
  });
  test("should have _delivery", () => {
    let expected = { objects: { a: 1 } };
    retrieve.delivery = expected;
    expect(retrieve.delivery).toMatchObject(expected);
  });

  test("Endpoint should match Square docs endpoint", () => {
    expect(retrieve.endpoint).toEqual(endpoint);
  });

  // Make()
  test("set object_ids should set PRIMARY property", () => {
    let id = "someId";
    let expected = [id];
    retrieve.object_ids = id;
    expect(retrieve.object_ids).toEqual(expected);
  });

  test("set object_array_concat should concat an array to an existing array", () => {
    let id1 = "someId1";
    let id2 = "someId2";
    let id3 = "someId3";
    let arr = [id2, id3];
    let expected = [id1, id2, id3];
    retrieve.make().object_ids(id1);
    retrieve.object_array_concat = arr;
    expect(retrieve.object_ids).toEqual(expected);
  });

  test("make().object_ids() should add ids to array", () => {
    let id = "someId";
    let expected = [id];
    retrieve.make().object_ids(id);
    expect(retrieve.object_ids).toEqual(expected);
  });

  test("make().retrieve(id) should add ids to array", () => {
    let id = "someId";
    let expected = [id];
    retrieve.make().retrieve(id);
    expect(retrieve.object_ids).toEqual(expected);
  });

  test("make().object(id) should add ids to array", () => {
    let id = "someId";
    let expected = [id];
    retrieve.make().object(id);
    expect(retrieve.object_ids).toEqual(expected);
  });

  test(".retrieve(id) should add ids to array", () => {
    let id = "someId";
    let expected = [id];
    retrieve.retrieve(id);
    expect(retrieve.object_ids).toEqual(expected);
  });

  test(".get(id) should add ids to array", () => {
    let id = "someId";
    let expected = [id];
    retrieve.get(id);
    expect(retrieve.object_ids).toEqual(expected);
  });

  test("make().concat_object_ids() should concat an array to an existing array", () => {
    let id1 = "someId1";
    let id2 = "someId2";
    let id3 = "someId3";
    let arr = [id2, id3];
    let expected = [id1, id2, id3];
    retrieve.make().object_ids(id1).concat_object_ids(arr);
    expect(retrieve.object_ids).toEqual(expected);
  });
});
