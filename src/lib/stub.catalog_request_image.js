const Catalog_Request = require("./catalog_request_abstract");

class Create_Catalog_Image extends Catalog_Request {
  _display_name = "Create_Catalog_Image";
  _last_verified_square_api_version = "2021-07-21";
  constructor() {
    super();
    this._method = "post";
    this._endpoint = "/images";
    this._body = {
      image: undefined,
      object_id: undefined,
    };
  }
  get display_name() {
    return this._display_name;
  }
  get square_version() {
    return `The last verified compatible Square API version is ${this._last_verified_square_api_version}`;
  }
  get image() {
    return this._body.image;
  }
  get object_id() {
    return this._body.object_id;
  }

  set image(catalogImage) {
    this._body.image = catalogImage;
  }

  set object_id(id) {
    this._body.object_id = id;
  }

  make() {
    return {
      self: this,
      image: (catalogImage) => {
        this.self.image = catalogImage;
        return this;
      },
      object_id: (id) => {
        this.self.object_id = id;
        return this;
      },
    };
  }
}

module.exports = Create_Catalog_Image;
