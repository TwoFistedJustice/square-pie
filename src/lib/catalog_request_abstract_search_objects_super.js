const Catalog_Request = require("./catalog_request_abstract");
const { shazam_time_RFC3339, shazam_integer } = require("./utilities");
const catalog_search_objects_enum = require("./enum/catalog_search_objects_enum");

/*
 *  The query feature is INCOMPLETE
 *  It will probably need to be extracted out
 *  Catalog_Search_Objects.prototype.query = function...
 *
 * */
/** @class  Catalog_Search_Objects_Super - super class of catalog object search classes
 * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
 * {@link https://developer.squareup.com/reference/square/catalog-api/search-catalog-objects | Square Docs}
 * */
class Catalog_Search_Objects_Super extends Catalog_Request {
  _display_name = "Catalog_Search_Objects_Super";
  constructor() {
    super();
    this._method = "POST";
    this._endpoint = "/search";
    this._body = {
      cursor: undefined,
      include_related_objects: undefined, // boolean
      begin_time: undefined, // RFC 3339 format
      object_types: undefined, //[enum]
      query: {}, // A query to be used to filter or sort the results. If no query is specified, the entire catalog will be returned.
      limit: undefined,
    };
  }
  get cursor() {
    return this._body.cursor;
  }
  get include_related_objects() {
    return this._body.include_related_objects;
  }
  get begin_time() {
    return this._body.begin_time;
  }
  get object_types() {
    return this._body.object_types;
  }
  get query() {
    return this._body.query;
  }
  get limit() {
    return this._body.limit;
  }
  set cursor(token) {
    this._body.cursor = token;
  }
  set include_related_objects(bool) {
    this._body.include_related_objects = bool;
  }
  set begin_time(time) {
    if (shazam_time_RFC3339(time, this.display_name, "begin_time")) {
      this._body.begin_time = time;
    }
  }
  set object_types(type) {
    let callback = (word) => word === type;
    if (!Array.isArray(this.object_types)) {
      this._body.object_types = [];
    }

    if (this.object_types.some(callback)) {
      throw new Error(`object_types array already contains ${type}`);
    }
    this._body.object_types.push(type);
  }
  set limit(int32) {
    if (shazam_integer(int32, this._display_name, "limit")) {
      this._body.limit = int32;
    }
  }
  query_reset() {
    this._body.query = {};
  }

  query_remove() {
    this._body.query = undefined;
  }

  // NOT PRIVATE METHODS = because you can't reference private functions from subclasses

  enum_object_types() {
    return catalog_search_objects_enum.object_types(this);
  }
} // END class

module.exports = Catalog_Search_Objects_Super;
