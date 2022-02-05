const Catalog_Request = require("./catalog_request_abstract");
const {
  arrayify,
  array_prevent_duplicate_strings,
  shazam_time_RFC3339,
  shazam_integer,
} = require("./utilities");

/*
 *  The query feature is INCOMPLETE
 *  It will probably need to be extracted out
 *  Catalog_Search_Objects.prototype.query = function...
 *
 * */
/** @class  Catalog_Search_Objects_Super - abstract super class of catalog object search classes
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
    arrayify(this._body, "object_types", this.display_name);
    array_prevent_duplicate_strings(
      type,
      this.object_types,
      this.display_name,
      "object_types"
    );
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

  /** @function concat_object_types - concatenates an array of objects to the object_types array. Inherited by its sub classes.
   * @param {array} array_to_add - an array of object 'types' (strings)
   * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
   * {@link  | Square Docs}
   * @example
   * */

  concat_object_types(array_to_add) {
    arrayify(
      this._body,
      "object_types",
      this.display_name,
      "concat_object_types"
    );
    let replacement = this.object_types.concat(array_to_add);
    this._body.object_types = replacement;
  }
} // END class

module.exports = Catalog_Search_Objects_Super;
