const Catalog_Request = require("./catalog_request");

class Create_Catalog_Image extends Catalog_Request {
  constructor() {
    super();
    this._method = "post";
    this._endpoint = "/images";
    this._body = {
      image: undefined,
      object_id: undefined,
    };
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
    const methods = function () {
      const properties = {
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
      return properties;
    };
    return methods();
  }
}

module.exports = Create_Catalog_Image;
