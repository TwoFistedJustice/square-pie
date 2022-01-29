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
   * @param {object} self - the class on which the 'object_types' property sits.
   * @param {object} calling_this - pass in 'this' from the calling function.
   * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
   * @example
   * #enum_PROPERTY_NAME() {
   *   return name_of_class_enum.property(this)
   * }
   * */

  object_types: function (self, calling_this) {
    return {
      item: function () {
        self.object_types = "ITEM";
        return calling_this;
      },
      item_variation: function () {
        self.object_types = "ITEM_VARIATION";
        return calling_this;
      },
      item_option: function () {
        self.object_types = "ITEM_OPTION";
        return calling_this;
      },
      item_option_val: function () {
        self.object_types = "ITEM_OPTION_VAL";
        return calling_this;
      },
      image: function () {
        self.object_types = "IMAGE";
        return calling_this;
      },
      category: function () {
        self.object_types = "CATEGORY";
        return calling_this;
      },
      tax: function () {
        self.object_types = "TAX";
        return calling_this;
      },
      discount: function () {
        self.object_types = "DISCOUNT";
        return calling_this;
      },
      modifier: function () {
        self.object_types = "MODIFIER";
        return calling_this;
      },
      modifier_list: function () {
        self.object_types = "MODIFIER_LIST";
        return calling_this;
      },
      pricing_rule: function () {
        self.object_types = "PRICING_RULE";
        return calling_this;
      },
      product_set: function () {
        self.object_types = "PRODUCT_SET";
        return calling_this;
      },
      time_period: function () {
        self.object_types = "TIME_PERIOD";
        return calling_this;
      },
      measurement_unit: function () {
        self.object_types = "MEASUREMENT_UNIT";
        return calling_this;
      },
      subscription_plan: function () {
        self.object_types = "SUBSCRIPTION_PLAN";
        return calling_this;
      },
      custom_attribute_definition: function () {
        self.object_types = "CUSTOM_ATTRIBUTE_DEFINITION";
        return calling_this;
      },
      quick_amounts_setting: function () {
        self.object_types = "QUICK_AMOUNTS_SETTINGS";
        return calling_this;
      },
    };
  },
};

module.exports = catalog_search_objects_enum;
