# Square Catalog Items - current as of Version 2021-07-21

## These tables are arranged to help us understand how to implement, NOT to model Square's data structure

[Tables based on Square Docs for Catalog Object](https://developer.squareup.com/reference/square/enums/CatalogObjectType)

### Observations

- CatalogObjects get nested inside each other

Seems like it will be necessary to have a set of classes for Square object types and a set for Square Requests
then the object gets fed to the request.
OR
Do like we did with Customers api
Have the top level class make the request and set certain properties
Then have the lower level classes contribute the rest

BECAUSE the upsert features are primarily designed to work with BATCHES we will have to create the Objects, add them to an array and send that array as a property on the upsert command

#### **Argument Against:**

Using discrete classes and subclasses prevents us from layering on more data to an item.
Solution: Use fewer classes and use mixins

### Catalog_Object super should just be a WRAPPER - and not a super at all

<br/>

### Level One Objects

| Level One Objects      | Super | Idempotent | Implemented | Unit Tests in Place | Short Notes                                                                       | Square Doc                                                                             |
| ---------------------- | ----- | ---------- | ----------- | ------------------- | --------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| Catalog_Object_Wrapper | none  | yes        |             |                     |                                                                                   | [CatalogObject](https://developer.squareup.com/reference/square/objects/CatalogObject) |
| Catalog_Object_Super   | none  | no         |             |                     | Owns id property for setting temporary upser id, adds a hash mark if user doesn't |

<br/>

### Level Two Objects

| Level Two Objects       | Super                | Idempotent | Implemented | Unit Tests in Place | Short Notes | Square Doc |
| ----------------------- | -------------------- | ---------- | ----------- | ------------------- | ----------- | ---------- |
| Catalog_Object_Item     | Catalog_Object_Super | no         |             |                     |
| Catalog_Object_Category | Catalog_Object_Super | no         |             |                     |

 <br/>

### Level X Objects

| Level X Objects             | Priority  | Super                | Idempotent | Implemented | Unit Tests in Place | Square Doc                                                                                                         | Short Notes                     |
| --------------------------- | --------- | -------------------- | ---------- | ----------- | ------------------- | ------------------------------------------------------------------------------------------------------------------ | ------------------------------- |
| Category                    |           | Catalog_Object_Super | no         |             |                     | [CATEGORY](https://developer.squareup.com/reference/square/objects/CatalogCategory)                                |
| Item                        |           | Catalog_Object_Super | no         |             |                     | [ITEM](https://developer.squareup.com/reference/square/objects/CatalogItem)                                        |
| Item_Variation              |           | Catalog_Object_Super | no         |             |                     | [ITEM_VARIATION](https://developer.squareup.com/reference/square/objects/CatalogItemVariation)                     |
| Tax                         | PRIORITY  | Catalog_Object_Super | no         | !           | !                   | [TAX](https://developer.squareup.com/reference/square/objects/CatalogTax)                                          |
| Custom_Attribute_Definition |           | Catalog_Object_Super | no         | !           | !                   | [CUSTOM_ATTRIBUTE_DEFINITION](https://developer.squareup.com/reference/square/objects/CatalogCustomAttributeValue) |
| Discount                    |           | Catalog_Object_Super | no         | !           | !                   | [DISCOUNT](https://developer.squareup.com/reference/square/objects/CatalogDiscount)                                |
| Image                       |           | Catalog_Object_Super | no         | !           | !                   | [IMAGE]()                                                                                                          |
| !!! Measurement_Unit        | property? | ?                    | no         | !           | !                   | [MEASUREMENT_UNIT](https://developer.squareup.com/reference/square/objects/CatalogMeasurementUnit)                 | Better as a property on a class |
| Modifier                    |           | Catalog_Object_Super | no         | !           | !                   | [MODIFIER](https://developer.squareup.com/reference/square/objects/CatalogModifier)                                |
| Modifier_List               |           | Catalog_Object_Super | no         | !           | !                   | [MODIFIER_LIST]()                                                                                                  |
| Pricing_Rule                |           | Catalog_Object_Super | no         | !           | !                   | [PRICING_RULE](https://developer.squareup.com/reference/square/objects/CatalogPricingRule)                         |
| Product_Set                 |           | Catalog_Object_Super | no         | !           | !                   | [PRODUCT_SET](https://developer.squareup.com/reference/square/objects/CatalogProductSet)                           |
| Quick_Amounts_Setting       | property? | ?                    | no         | !           | !                   | [QUICK_AMOUNT_SETTINGS](https://developer.squareup.com/reference/square/objects/CatalogQuickAmountsSettings)       |
| Time_Period                 | property? | ?                    | no         | !           | !                   | [TIME_PERIOD]()                                                                                                    |

### Catalog_Object class

|Property | Type | Char Limit

- sets idempotency key
- sets name

### Catalog_Item_Variation

`._parent_id` : id of the item it belongs to

 <br/>

## CatalogObject

### Body Properties

| Class             | Owns Properties          | Read Only Properties | Value Type                               | Mutable | Short Notes                 | Implemented |
| ----------------- | ------------------------ | -------------------- | ---------------------------------------- | ------- | --------------------------- | ----------- |
| **CatalogObject** |                          |                      |                                          |         |                             | !           |
|                   | type                     |                      | string-fixed                             |         | Has fixed values - see docs |
|                   | id                       |                      | string                                   | no      |
|                   |                          | updated_at           | string                                   | no      |
|                   |                          | version              | number                                   | no      |
|                   |                          | is_deleted           | boolean                                  | no      |
|                   | custom_attribute_values  |                      | Map<string, CatalogCustomAttributeValue> |         | opinionated - see docs      |
|                   | catalog_v1_ids           |                      | CatalogV1Id [ ]                          |         | array of objects            |
|                   | present_at_all_locations |                      | Boolean                                  |
|                   | present_at_location_ids  |                      | string [ ]                               |
|                   | absent_at_location_ids   |                      | string [ ]                               |
|                   | image_id                 |                      | string                                   |         | _Method generated_          |

### CatalogObject.Methods

| Class             | Method Name | Owns Properties | Sub Properties | Value Type   | Short Notes | Implemented                                           |
| ----------------- | ----------- | --------------- | -------------- | ------------ | ----------- | ----------------------------------------------------- |
| **CatalogObject** |
|                   | image       | image_data      |                | CatalogImage |             | !                                                     |
|                   |             |                 | caption        | string       |
|                   |             |                 | name           | string       |
|                   |             |                 | url            | string       |             | generated by Square with CreateCatalogImage endpoint. |

 <br/>

## Item Object

### Body Properties

| Class    | Super.propertyName | Sub properties           | Value Type                     | Short Notes                                                            | Implemented |
| -------- | ------------------ | ------------------------ | ------------------------------ | ---------------------------------------------------------------------- | ----------- |
| **Item** | item_data          |                          | CatalogItem                    |                                                                        | !           |
|          |                    | name                     | string                         |
|          |                    | abbreviation             | string                         | Max length: 24                                                         |
|          |                    | available_electronically | boolean                        |
|          |                    | available_for_pickup     | boolean                        |
|          |                    | available_online         | boolean                        |
|          |                    | category_id              | string                         |
|          |                    | description              | string                         | Max length: 4096                                                       |
|          |                    | item_options             | CatalogItemOptionForItem [ ]   | _Method generated_                                                     |
|          |                    | label_color              | string                         |
|          |                    | modifier_list_info       | CatalogItemModifierListInfo [] |
|          |                    | product_type             | string                         |
|          |                    | skip_modifier_screen     | boolean                        |
|          |                    | sort_name                | string                         | supported only in Japan as of 7/21/21                                  |
|          |                    | tax_ids                  | string []                      |
|          |                    | variations               | CatalogObject []               | Array of Item_Variation objects for this item. Must have at least one. |

### Item.Methods

| Class    | Method Name    | Owns Properties    | Sub Properties                | Value Type       | Short Notes                                                                                            | Implemented |
| -------- | -------------- | ------------------ | ----------------------------- | ---------------- | ------------------------------------------------------------------------------------------------------ | ----------- |
| **Item** |
|          | itemOptions    | item_options       |                               | array            | List of item options IDs for this item. Used to manage and group item variations in a specified order. | !           |
|          |                |                    | { item_option_id : val }      | string           |
|          | modifyListInfo |                    |                               |                  | give it sub-methods including a default value, settable in a config file.                              | !           |
|          | modifyListInfo | modifier_list_info |                               | array of objects |                                                                                                        | !           |
|          |                |                    | modifier_list_id^^^           | string           |                                                                                                        | !           |
|          |                |                    | enabled                       | boolean          |                                                                                                        | !           |
|          |                |                    | max_selected_modifiers        | integer (32-bit) |                                                                                                        | !           |
|          |                |                    | min_selected_modifiers        | integer (32-bit) |                                                                                                        | !           |
|          |                |                    | modifier_overrides            | Array of objects |                                                                                                        | !           |
|          | prodType       | product_type       |                               | string           |                                                                                                        | !           |
|          |                |                    | value: "REGULAR"              |
|          |                |                    | value: "APPOINTMENTS_SERVICE" |

 <br/>

## Catalog Object

### Body Properties

| Class       | Super.propertyName | Sub properties | Value Type      | Short Notes                                             | Implemented |
| ----------- | ------------------ | -------------- | --------------- | ------------------------------------------------------- | ----------- |
| **Catalog** |                    |                |                 |                                                         | !           |
|             | category_data      |                | CatalogCategory | have it take the name as an argument to the constructor |
|             |                    | name           | string          |

 <br/>

## ItemVariation Object

### Body Properties

| Class             | Super.propertyName  | Sub properties            | Value Type                                 | Short Notes                                            | Implemented |
| ----------------- | ------------------- | ------------------------- | ------------------------------------------ | ------------------------------------------------------ | ----------- |
| **itemVariation** | item_variation_data |                           | CatalogItemVariation                       |                                                        | !           |
|                   |                     | item_id (constructor arg) | string                                     | of associated item                                     |
|                   |                     | name                      | string                                     | Max length: 255                                        |
|                   |                     | sku                       | string                                     |
|                   |                     | upc                       | string                                     | They check this value for conformity and punish misuse |
|                   |                     | ordinal                   | integer (32-bit)                           |
|                   |                     | track_inventory           | boolean                                    |
|                   |                     | inventory_alert_type^^^   | string                                     |
|                   |                     | inventory_alert_threshold | integer (64-bit)                           |
|                   |                     | user_data                 | string                                     | Max length: 255                                        |
|                   |                     | service_duration          | integer (64-bit)                           |
|                   |                     | available_for_booking     | boolean                                    |
|                   |                     | measurement_unit_id       | string                                     |
|                   |                     | stockable                 | boolean                                    |
|                   |                     | team_member_ids           | string []                                  |
|                   |                     | stockable_conversion      | CatalogStockConversion                     |
|                   |                     | pricing_type^^^           | string                                     |
|                   |                     | price_money^^^            | { Money }                                  | {amount: number, currency: string}                     |
|                   |                     | location_overrides^^^     | ItemVariationLocationOverrides [ ]         |
|                   |                     | item_option_values^^^     | CatalogItemOptionValueForItemVariation [ ] |

 <br/>

## Object

### Body Properties

| Class   | Super.propertyName | Sub properties            | Value Type | Short Notes     | Implemented |
| ------- | ------------------ | ------------------------- | ---------- | --------------- | ----------- |
| **Tax** |                    |                           |            |                 | !           |
|         | tax_data           |                           | CatalogTax |
|         |                    | name                      | string     | Max length: 255 |
|         |                    | percentage                | string     |
|         |                    | applies_to_custom_amounts | boolean    |
|         |                    | enabled                   | boolean    |
|         |                    | calculation_phase^^^      | string     |
|         |                    | inclusion_type^^^         | string     |

## copy these for new table headings

 <br/>

## Object

### Body Properties

| Class | Super.propertyName | Sub properties | Value Type | Short Notes | Implemented |
| ----- | ------------------ | -------------- | ---------- | ----------- | ----------- |
|       |                    |

### Methods

| Class | Method Name | Owns Properties | Sub Properties | Value Type | Short Notes | Implemented |
| ----- | ----------- | --------------- | -------------- | ---------- | ----------- | ----------- |

 <br/>

## These need to be tabled

| Class | Super.propertyName               | Owns Properties | Read Only Properties | Value Type                       | Mutable | Short Notes |
| ----- | -------------------------------- | --------------- | -------------------- | -------------------------------- | ------- | ----------- |
|       | discount_data                    |                 |                      | CatalogDiscount                  |
|       | modifier_list_data               |                 |                      | CatalogModifierList              |
|       | modifier_data                    |                 |                      | CatalogModifier                  |
|       | time_period_data                 |                 |                      | CatalogTimePeriod                |
|       | product_set_data                 |                 |                      | CatalogProductSet                |
|       | pricing_rule_data                |                 |                      | CatalogPricingRule               |
|       | measurement_unit_data            |                 |                      | CatalogMeasurementUnit           |
|       | subscription_plan_data           |                 |                      | CatalogSubscriptionPlan          |
|       | item_option_data                 |                 |                      | CatalogItemOption                |
|       | item_option_value_data           |                 |                      | CatalogItemOptionValue           |
|       | custom_attribute_definition_data |                 |                      | CatalogCustomAttributeDefinition |
|       | quick_amounts_settings_data      |                 |                      | CatalogQuickAmountsSettings      |
