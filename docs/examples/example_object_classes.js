/*
 *  IRL we put all classes in their own file
 *  This is just an example file so we put them all in one fil
 *  to make it easier to read
 * */

/*
 *  We often need to check that a string doesn't exceed a length determined by Square.
 *  We use the `maxLength` utility for this.
 *
 *  We also often need to add a property to an object. We use the `define` (not shown)
 *  utility for that. `define` is written such that it won't cause linting errors
 *  when using sugary ES6 Classes. It also makes the property enumerable.
 *
 * */
const { maxLength } = require("../../src/lib/utilities");

class Super_Object {
  constructor() {
    // note: mutable properties always begin with an underscore
    this._fardel = {
      // The super is where we put key:values that are common to every instance.
      // whenever a prop is a simple type (booleans, string, number) we set it to `undefined`
      // The Request classes all use JSON.stringify to convert _fardel to request.body. Properties
      // set to `undefined` will be automatically discarded.
      common_properties: undefined,
    };
  }
  // GETTERS
  get prop1() {
    return this._fardel.common_properties;
  }
  // SETTERS
  set prop1(value) {
    // do some error checking
    this._fardel.common_properties = value;
  }
} // END Super_Object

class Sub_Object extends Super_Object {
  constructor() {
    super();
    this._fardel = {
      id: undefined,
      someNote: undefined,
      someCollection: undefined, // this is going to be an array
    };
    // configuration is NEVER mutated. It is for reference only.
    // so it has no leading underscore.
    this.configuration = {
      lengthLimits: {
        id: 191, // 191 is a common limit set on Square IDs
        // Square has a bunch of 'note' types, generally all limited to 500 characters.
        // There may be more than one 'note' type in a given Square Object so we just use
        // the one limit for them all. We SHOULD have utilities to automatically to
        // configure often repeated structures.
        note: 500,
      },
    };
  }

  // GETTERS - omitted for brevity, ALWAYS build getters for ALL mutable properties

  // SETTERS - ALWAYS build setters for ALL mutable properties
  // when naming arguments, the name should clearly indicate what kind of value is expected
  set id(id) {
    if (maxLength(this.configuration.id, id)) {
      this._fardel.id = id;
    }
  }

  /*
   *  We may add error checking in the setter.
   *  But pretend we have several note types. In that case we may add a private
   *  method call the appropriate setter from other methods.
   *
   * */
  set someNote(note) {
    if (maxLength(this.configuration.note, note)) {
      this._fardel.someNote = note;
    }
  }

  /* Square often uses arrays to send multiple objects
   * a given Object or endpoint may expect one or more such arrays.
   *  The property in fardel will start life as `undefined`.
   * The setter will check if the property is an array and if it is not
   * create the array.
   * Once the array is created it will push the object onto the array.
   *
   * Object sanitation is generally done in a private method rather than the setter.
   *
   * */
  set someCollection(sanitized_object) {
    if (!this._fardel.someCollection.isAray()) {
      this._fardel.someCollection = [];
    }
    this.someCollection.push(sanitized_object);
  }

  // METHODS
  /*  We have a private method using square bracket object notation to enable us
   * to call appropriate setters without having to write separate functions for each one
   *  We use a string value to set the appropriate key and the string value of the
   *  note we want to save. Error checking is done in the setter.
   *
   * */
  #note(key, note) {
    this[key] = note;
  }

  #someObject(value_A, value_B) {
    // we put the object in correct form and perform any error checking here
    let obj = {
      key_A: value_A,
      key_b: value_B,
    };
    // once the object is all nice and polite we send it off to the setter.
    this.someCollection = obj;
  }
  /**
   * EVERY class that is meant to instantiated by the end-uses MUST have a Make() method.
   * The make method always follows the same pattern and allows the user to access the
   * setters using method chaining. That is its ONLY purpose.
   * in general, sub-methods on make() should have the same name as the property they access.
   * There may be exceptions such as when a property expects a small number of fixed values, in which
   * case you may make a sub-method in the form of make().property_name_expected_value().
   *
   * Note: you may also use this general structure any time you need to build
   * some kind of special complex object.
   * */

  make() {
    // use an arrow function
    const methods = () => {
      const properties = {
        // we use `self` to create access to the outer context. In Pie we always call it `self`. It goes first.
        self: this,
        // use standard function expressions throughout and remember to `return this` to make it chainable.
        common_prop: function (value) {
          // this calls the setter on the super. This will need to be done from each sub class.
          this.self.common_prop = value;
          return this;
        },
        id: function (id) {
          this.self.id = id;
          return this;
        },
        someNote: function (note) {
          // normally you would just call the setter, this is just an example of how to
          // use the private function to call it.
          this.self.#note("someNote", note);
          return this;
        },
        someCollection: function (value_A, value_B) {
          // here we use a private method to sanitize data
          // this is different than just calling a setter directly.
          this.#someObject(value_A, value_B);
          return this;
        },
      };

      // send back the whole named object - yes, javascript allows us to simply send
      // back an un-named object. But don't do it.
      return properties;
    };
    // send back an executed function
    return methods();
  }
} // END Sub_Object

// export the class so we can use it elsewhere. Also, the linter won't let you not export it.
module.exports = Sub_Object;
