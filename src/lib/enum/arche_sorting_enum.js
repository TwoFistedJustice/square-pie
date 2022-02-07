/**
 * Forget the mixin docs and examples online. They don't work with class 'this'
 * passing 'this' as an argument works without counter-intuitive syntax
 * */

const arche_sorting_enum = {
  /** @enum  an array of the allowable values on a property.
   * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
   * @example
   *
   * Use in make() for preventing the class setter from passing disallowed values
   * Do not use in the setter itself because it will be called every time
   *
   *    allowable_values:
   *     sort_order: ["ASC", "DESC"],
   *     sort_field: ["CREATED_AT","UPDATED_AT","CLOSED_AT" ]
   *
   * */

  allowable_values: {
    sort_order: ["ASC", "DESC"],
    sort_field: ["CREATED_AT", "UPDATED_AT", "CLOSED_AT"],
  },

  /** @function enum
   * @enum  enables a referencing class to set only allowable values on a property.
   * @param {object} obj - The object to be modified
   * @param {object} calling_this - pass in 'this' from the referencing class.
   * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
   * @example
   * #enum_PROPERTY_NAME() {
   *   return name_of_class_enum.property(this)
   * }
   * */

  /** @function sort_order()  enumerated function of arche_sorting_enum - method names are exactly the same as the property names listed
   * in the Square docs. There may be additional methods and/or shortened aliases of other methods.
   * @method ascending - sets sort_order to "ASC"
   * @method up - alias of `ascending`
   * @method oldest_first - alias of `ascending`
   * @method descending - sets sort_order to "DESC"
   * @method down - alias of `descending`
   * @method newest_first - alias of `descending`
   * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
   * */

  sort_order: function (obj, calling_this) {
    return {
      ascending: function () {
        obj.sort_order = "ASC";
        return calling_this;
      },
      up: function () {
        return this.ascending();
      },
      oldest_first: function () {
        return this.ascending();
      },
      descending: function () {
        obj.sort_order = "DESC";
        return calling_this;
      },
      down: function () {
        return this.descending();
      },
      newest_first: function () {
        return this.descending();
      },
    };
  },

  /** @function sort_field()  enumerated function of arche_sorting_enum - method names are exactly the same as the property names listed
   * in the Square docs. There may be additional methods and/or shortened aliases of other methods.
   * @method created_at sets sort_field to "CREATED_AT"
   * @method created - alias of created_at
   * @method updated_at sets sort_field to "UPDATED_AT"
   * @method updated - alias of updated_at
   * @method closed_at sets sort_field to "CLOSED_AT"
   * @method closed - alias of closed_at
   * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
   * */
  sort_field: function (obj, calling_this) {
    return {
      created_at: function () {
        obj.sort_field = "CREATED_AT";
        return calling_this;
      },
      created: function () {
        return this.created_at();
      },
      updated_at: function () {
        obj.sort_field = "UPDATED_AT";
        return calling_this;
      },
      updated: function () {
        return this.updated_at();
      },
      closed_at: function () {
        obj.sort_field = "CLOSED_AT";
        return calling_this;
      },
      closed: function () {
        return this.closed_at();
      },
    };
  },
};

module.exports = arche_sorting_enum;
