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
   * @param {object} obj - pass in 'this' from the referencing class.
   * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
   * @example
   * #enum_PROPERTY_NAME() {
   *   return name_of_class_enum.property(this)
   * }
   * */

  sort_order: function (obj, calling_this) {
    return {
      ascending: function () {
        obj.sort_order = "ASC";
        return calling_this;
      },
      up: function () {
        obj.sort_order = "ASC";
        return calling_this;
      },
      oldest_first: function () {
        obj.sort_order = "ASC";
        return calling_this;
      },
      descending: function () {
        obj.sort_order = "DESC";
        return calling_this;
      },
      down: function () {
        obj.sort_order = "DESC";
        return calling_this;
      },
      newest_first: function () {
        obj.sort_order = "DESC";
        return calling_this;
      },
    };
  },

  sort_field: function (obj, calling_this) {
    return {
      created_at: function () {
        obj.sort_field = "CREATED_AT";
        return calling_this;
      },
      created: function () {
        obj.sort_field = "CREATED_AT";
        return calling_this;
      },
      updated_at: function () {
        obj.sort_field = "UPDATED_AT";
        return calling_this;
      },
      updated: function () {
        obj.sort_field = "UPDATED_AT";
        return calling_this;
      },
      closed_at: function () {
        obj.sort_field = "CLOSED_AT";
        return calling_this;
      },
      closed: function () {
        obj.sort_field = "CLOSED_AT";
        return calling_this;
      },
    };
  },
};

module.exports = arche_sorting_enum;
