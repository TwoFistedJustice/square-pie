const Location_Request = require("./location_request_abstract");

/** @class Location_RU super class of Location: Retrieve, Update
 * @param {id}  Sets the endpoint to the id your pass in.
 * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
 * */
class Location_RU extends Location_Request {
  _display_name = "Location_RU";
  constructor(id) {
    super();
    this._endpoint = `/${id}`;
  }
  get id() {
    return this._endpoint;
  }
  set id(someId) {
    this._endpoint = `/${someId}`;
  }
}

module.exports = Location_RU;
