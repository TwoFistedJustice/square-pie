| Level One Classes | Super | Idempotent|Implemented | Short Notes | Square Doc
| ----------------- | ----- | ---| ----------- | ----------- |--- |
| CatalogObject     | none  | yes | !         | | [CatalogObject](https://developer.squareup.com/reference/square/objects/CatalogObject)


### NOPE!-> Maybe make these methods on the CatalogObject instead of distinct classes

###Observations
 - CatalogObjects get nested inside each other




| Level Two Classes    | Super         | Idempotent| Implemented | Short Notes | Square Doc
| -------------------- | ------------- | ---| ----------- | ----------- |---- |
| Item                 | CatalogObject | super| !       | | [ ITEM ](https://developer.squareup.com/reference/square/objects/CatalogItem)
| Item_Variation                 | CatalogObject | super| !    |   |[ ITEM_VARIATION](https://developer.squareup.com/reference/square/objects/CatalogItemVariation)
| Modifier | CatalogObject | super| ! | | [ MODIFIER](https://developer.squareup.com/reference/square/objects/CatalogModifier)
| Category  | CatalogObject | super| ! | |[CATEGORY](https://developer.squareup.com/reference/square/objects/CatalogCategory)
|Discount  | CatalogObject | super| ! | |[DISCOUNT](https://developer.squareup.com/reference/square/objects/CatalogDiscount)
|Pricing_Rule  | CatalogObject | super| ! | |[PRICING_RULE](https://developer.squareup.com/reference/square/objects/CatalogPricingRule)
|Tax  | CatalogObject | super| ! | |[TAX](https://developer.squareup.com/reference/square/objects/CatalogTax)
|Quick_Amount_Setting  | CatalogObject | super| ! | |[QUICK_AMOUNT_SETTINGS](https://developer.squareup.com/reference/square/objects/CatalogQuickAmountsSettings)
|Custom_Attribute_Definition  | CatalogObject | super| ! | |[CUSTOM_ATTRIBUTE_DEFINITION](https://developer.squareup.com/reference/square/objects/CatalogCustomAttributeValue)
|  | CatalogObject | super| ! | |[]()



Class| Writable Properties | Read Only Properties | Value Type | |  
| --- |--- |--- |--- | --- |
|CatalogObject| |||
| |type | | string
| |id | | string
| | |updated_at| string |
| | |version | number | 
| | |is_deleted | boolean
| |custom_attribute_values | |Map<string, CatalogCustomAttributeValue>
| |catalog_v1_ids | |CatalogV1Id [ ]
| |present_at_all_locations | |Boolean
| |present_at_location_ids | |string [ ]
| |absent_at_location_ids | |string [ ]
| | image_id |  |string
| | item_data |  |CatalogItem
| | category_data |  |CatalogCategory
| | item_variation_data|  |item_variation_data
| | tax_data | |CatalogTax
| | discount_data |  |CatalogDiscount
| | modifier_list_data |  |CatalogModifierList
| | modifier_data |  |CatalogModifier
| | time_period_data |  |CatalogTimePeriod  
| | product_set_data |  |CatalogProductSet
| | pricing_rule_data |  |CatalogPricingRule
| | image_data |  |CatalogImage
| | measurement_unit_data |  |CatalogMeasurementUnit
| | subscription_plan_data|  |CatalogSubscriptionPlan
| | item_option_data |  |CatalogItemOption
| | item_option_value_data |  |CatalogItemOptionValue 
| |  custom_attribute_definition_data| |CatalogCustomAttributeDefinition
| |  quick_amounts_settings_data|  |CatalogQuickAmountsSettings
| |  | |
| |  | |
