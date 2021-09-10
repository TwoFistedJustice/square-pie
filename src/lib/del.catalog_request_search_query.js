// This is not to be a new class, or maybe it is. IDK
// https://developer.squareup.com/reference/square/objects/CatalogQuery
// https://developer.squareup.com/reference/square/objects/CatalogQueryExact

const Catalog_Search_Objects = require("./stub.catalog_request_search_objects");

// fn () {
//   const methods = () => {
//     const properties = {
//       self: this,
//       name: function(){ return this;},
//       prop: function(){ return this;},
//       prop: function(){ return this;},
//     };
//     return properties;
//   };
//   return methods();
// }

Catalog_Search_Objects.prototype.query = function () {
  this.exact_query = function () {
    const properties = {
      self: this,
      item: function () {
        const searchable = {
          self: this,
          name: undefined,
          description: undefined,
          abbreviation: undefined,
        };
        return searchable;
      },
    };
    return properties;
  };
  this.item_variations_for_item_option_values_query;
  this.items_for_item_options_query;
  this.items_for_modifier_list_query;
  this.items_for_tax_query;
  this.prefix_query;
  this.range_query;
  this.set_query;
  this.sorted_attribute_query;
  this.text_query;
};
//
// const search = Catalog_Search_Objects.item.exact
//   .name("something")
//   .description("a red bird")
//   .abbreviation("ST");
// search.variation;
// search.category;
// search.tax;
// search.discount;
// search.modifier;
//
//exact_query -
//
//  the value is fuzzy so just have it take a string

// sorted_attribute_query
// name: like exact
// initial_attribute_value: fuzzy string
// Sort order: ASC or DESC

// set_query
// exact: like exact
// value: also EXACT and case senstive

// prefix_query- I don't understand this one, what is meant by 'prefix'?
// attribute_name
// attribute_prefix

// range_query
// attribute name
// attribute_max_value
// attribute_min_value

// text_query
// keywords: []
// 1-3 keywords, each must have at least 3 characters
// throw an error if user enters a string of one or two length
// on each entry, log the array to console so user can see what's happening if they want
// if user adds more than three let it happen but remove the element at the opposite end of the array

// text_query_delete
// this one is mine - supports text_query
// removes the item specified by the user so they can add another
// make it so they can either remove via a number corresponding to an index or an exact text value

// items_for_tax_query
// tax_ids: []

// items_for_modifier_list_query
// modifier_list_ids: []

// items_for_item_options_query
// item_option_ids: [ ]

// item_variations_for_item_option_values_query
// item_option_value_ids: []
