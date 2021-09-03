# Top Level Classes

###Square_Request
Method |Type| Expected Argument | Short Notes |
| -------------------- | --------------- | ----------- | ----------- |
| secretName |computed| - | Gets the secret name based on value of NODE_ENV
| baseUrl|computed | - | determines which Square base url to use based on value of NODE_ENV |
| url | computed |- | constructs the final url to include in the http request|
| headers| method | - | constructs the http headers based on values from .config
| ⋈ request | method | - | makes the actual http request saves the response to this.delivery |
|options | method | - | creates the http options object |
