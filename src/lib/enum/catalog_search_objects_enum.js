/**
 * Forget the mixin docs and examples online. They don't work with class 'this'
 * passing 'this' as an argument works without counter-intuitive syntax
 * */

const catalog_search_objects_enum = {
  /** @enum  an array of the allowable values on a property.
   * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
   * @example
   *
   * Use in make() for preventing the class setter from passing disallowed values
   * Do not use in the setter itself because it will be called every time
   * */

  allowable_values: {
    object_types: [
      "ITEM",
      "ITEM_VARIATION",
      "ITEM_OPTION",
      "ITEM_OPTION_VAL",
      "IMAGE",
      "CATEGORY",
      "TAX",
      "DISCOUNT",
      "MODIFIER",
      "MODIFIER_LIST",
      "PRICING_RULE",
      "PRODUCT_SET",
      "TIME_PERIOD",
      "MEASUREMENT_UNIT",
      "SUBSCRIPTION_PLAN",
      "CUSTOM_ATTRIBUTE_DEFINITION",
      "QUICK_AMOUNTS_SETTINGS",
    ],
  },

  /** @function enum
   * @enum  enables a referencing class to set only allowable values on a property.
   * @param {object} self - pass in 'this' from the referencing class.
   * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
   * @example
   * #enum_PROPERTY_NAME() {
   *   return name_of_class_enum.property(this)
   * }
   * */

  object_types: function (self) {
    return {
      item: function () {
        self.object_types = "ITEM";
        return this;
      },
      item_variation: function () {
        self.object_types = "ITEM_VARIATION";
        return this;
      },
      item_option: function () {
        self.object_types = "ITEM_OPTION";
        return this;
      },
      item_option_val: function () {
        self.object_types = "ITEM_OPTION_VAL";
        return this;
      },
      image: function () {
        self.object_types = "IMAGE";
        return this;
      },
      category: function () {
        self.object_types = "CATEGORY";
        return this;
      },
      tax: function () {
        self.object_types = "TAX";
        return this;
      },
      discount: function () {
        self.object_types = "DISCOUNT";
        return this;
      },
      modifier: function () {
        self.object_types = "MODIFIER";
        return this;
      },
      modifier_list: function () {
        self.object_types = "MODIFIER_LIST";
        return this;
      },
      pricing_rule: function () {
        self.object_types = "PRICING_RULE";
        return this;
      },
      product_set: function () {
        self.object_types = "PRODUCT_SET";
        return this;
      },
      time_period: function () {
        self.object_types = "TIME_PERIOD";
        return this;
      },
      measurement_unit: function () {
        self.object_types = "MEASUREMENT_UNIT";
        return this;
      },
      subscription_plan: function () {
        self.object_types = "SUBSCRIPTION_PLAN";
        return this;
      },
      custom_attribute_definition: function () {
        self.object_types = "CUSTOM_ATTRIBUTE_DEFINITION";
        return this;
      },
      quick_amounts_setting: function () {
        self.object_types = "QUICK_AMOUNTS_SETTINGS";
        return this;
      },
    };
  },
};

module.exports = catalog_search_objects_enum;
