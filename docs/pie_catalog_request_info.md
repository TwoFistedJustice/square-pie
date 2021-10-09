# Catalog_Info class

The list endpoint sends back some data you can see, and some you have to parse yourself to see.
This class parses it for you.

<br/>

## How to use

1. Instantiate the class to a variable.
2. call `.request()`
3. get the information you want.

```js
const info = new Catalog_Info();
Await info.request();
```

You can access the whole response body or any part of it easily.\
Access all of it

- `info.delivery`

Access parts:

- `info.language_code`
- `info.limits`
- `info.standard_units`
- `info.standard_units_json`

<br/>

## Standard Units

These are units of measure.

To view them as javascript objects access `.standard_units`. This will return an array of objects that look like:

```js
{
    unit: { area_unit: 'METRIC_SQUARE_CENTIMETER', type: 'TYPE_AREA' },
    name: 'Square Centimeter',
    abbreviation: 'sq cm'
  }
```

To view them as JSON, access `.standard_unit_json`. This will return an array of objects that look like:

```json
{
  "unit": {
    "area_unit": "METRIC_SQUARE_CENTIMETER",
    "type": "TYPE_AREA"
  },
  "name": "Square Centimeter",
  "abbreviation": "sq cm"
}'
```

<br/>

## Language Code

Access the language code with `.language_code`. This will return a string that looks like:

```js
"en-US";
```

<br/>

## Limits

Access only the limits with `.limits`. This will return an object that looks like:

```js
{
  batch_upsert_max_objects_per_batch: 1000,
  batch_upsert_max_total_objects: 10000,
  batch_retrieve_max_object_ids: 1000,
  search_max_page_limit: 1000,
  batch_delete_max_object_ids: 200,
  update_item_taxes_max_item_ids: 1000,
  update_item_taxes_max_taxes_to_enable: 1000,
  update_item_taxes_max_taxes_to_disable: 1000,
  update_item_modifier_lists_max_item_ids: 1000,
  update_item_modifier_lists_max_modifier_lists_to_enable: 1000,
  update_item_modifier_lists_max_modifier_lists_to_disable: 1000
}

```
