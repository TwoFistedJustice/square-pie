// configuring babel for Jest and node
//https://jestjs.io/docs/getting-started#using-babel

module.exports = {
  presets: [["@babel/preset-env", { targets: { node: "current" } }]],
};

/* ********************
// Jest can also be made ot use process.env.NODE_ENV  = 'test'
module.exports = api => {
  const isTest = api.env('test');
  // You can use isTest to determine what presets and plugins to use.
  
  return {
    // ternary? preset 1 : preset 2
  };
};
 ********************** */
