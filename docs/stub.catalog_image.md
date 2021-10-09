# Catalog Image

## [Catalog_Image](https://developer.squareup.com/reference/square/catalog-api/create-catalog-image)

This class is incomplete. I don't have a way to test it without spending significant time creating a compatible Catalog Image Object.
This is a low priority.

This class will allow you to upsert a Square CatalogImage Object to Squares Create Image endpoint. However, at this time, Square Pie does not
have a means to create that object.

<br/>

### **Image**

This is required. Square will reject a request without it. It should contain a properly formatted
CatalogImage object.

You can only upsert one image object at a time. Any additional image objects added to this class instance will simply overwrite the last one
sitting on the `body.image` property.

<br/>

### **Object ID**

If you want to link an image to a particular object, this is where you add that object_id. Don't use this if just want
to upload an unattached image.

<br/>

### **Make()**

Call `.make()` to chain on setters. Since there are only two setters, this shouldn't actually be easier or faster.

The response data is stashed on the `.delivery` property.

<br/>

### **How to Use**

1. Instantiate the class.
2. attach your object
3. Await `.request()`

```js
const pic = new Create_Catalog_Image();
pic.image = yourImageObject; // REQUIRED
pic.id = "some object id"; // optional
await pic.request();

pic.delivery; // the response data
```
