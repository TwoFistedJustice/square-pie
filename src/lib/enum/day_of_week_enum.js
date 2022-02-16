const day_of_week_enum = {
  /** @function days
   *  Enumerated methods set specific values from a limited set of allowable values defined by Square.
   *  For each value, a sub-method will exist that is the lowercase version of that value. There may also
   *  exist abbreviated aliases.
   *
   *  Enumerated methods are usually called by other functions and set the value on the object on which
   *  the calling function operates.
   *  @param {obj} obj - The object that has the property `day_of_week`
   *  @param {object} calling_this - pass in the calling function's 'this'
   * @method sun sets value to "SUN"
   * @method sunday sets value to "Sunday"
   * @method mon sets value to "MON"
   * @method monday sets value to "Monday"
   * @method tue sets value to "TUE"
   * @method tuesday sets value to "Tuesday"
   * @method wed sets value to "WED"
   * @method wednesday sets value to "Wednesday"
   * @method thu sets value to "THU"
   * @method thursday sets value to "Thursday"
   * @method fri sets value to "FRI"
   * @method friday sets value to "Friday"
   * @method sat sets value to "SAT"
   * @method saturday sets value to "Saturday"
   * @method sun sets value to "SUN"
   * @method sunday sets value to "Sunday"
   
   * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
   * {@link https://developer.squareup.com/reference/square/enums/DayOfWeek | Square Docs}
   * @example
   *  If you were allowed to choose from the set ["GOOD", "BAD", "UGLY"] in order to set the
   *  value of `clint` on the object 'western'
   *
   *  vyMar.make_western().clint.().good() => const spaghetti = {western : {clint: "GOOD"}}
   * */
  days: function (obj, calling_this) {
    return {
      self: this,
      sun: function () {
        obj.day_of_week = "SUN";
        return calling_this;
      },
      sunday: function () {
        obj.day_of_week = "Sunday";
        return calling_this;
      },
      mon: function () {
        obj.day_of_week = "MON";
        return calling_this;
      },
      monday: function () {
        obj.day_of_week = "Monday";
        return calling_this;
      },
      tue: function () {
        obj.day_of_week = "TUE";
        return calling_this;
      },
      tuesday: function () {
        obj.day_of_week = "Tuesday";
        return calling_this;
      },
      wed: function () {
        obj.day_of_week = "WED";
        return calling_this;
      },
      wednesday: function () {
        obj.day_of_week = "Wednesday";
        return calling_this;
      },
      thu: function () {
        obj.day_of_week = "THU";
        return calling_this;
      },
      thursday: function () {
        obj.day_of_week = "Thursday";
        return calling_this;
      },
      fri: function () {
        obj.day_of_week = "FRI";
        return calling_this;
      },
      friday: function () {
        obj.day_of_week = "Friday";
        return calling_this;
      },
      sat: function () {
        obj.day_of_week = "SAT";
        return calling_this;
      },
      saturday: function () {
        obj.day_of_week = "Saturday";
        return calling_this;
      },
    };
  },
  allowable_values: [
    "SUN",
    "Sunday",
    "MON",
    "Monday",
    "TUE",
    "Tuesday",
    "WED",
    "Wednesday",
    "THU",
    "Thursday",
    "FRI",
    "Friday",
    "SAT",
    "Saturday",
  ],
};
module.exports = day_of_week_enum;
