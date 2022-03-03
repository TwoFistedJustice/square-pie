// NAMESPACES
/**
 * {@link https://developer.squareup.com/reference/square/objects|  Link To Square Docs}<br>
 * @namespace Archetypes
 * @classdesc
 * "Archetype" is Square-Pie terminology for a small Square API object type commonly used as a value in a key:value pair.
 * */

/**
 * @namespace Arche-Utility
 * @classdesc
 * An Arche-Utility is a Square Pie utility that exists solely to build an Archetype. Pronounced "Arch Utility" (as in Computer! Arch!)
 * */

/**
 * {@link https://developer.squareup.com/reference/square/enums|  Link To Square Docs}<br>
 * @namespace Enumerated
 * @classdesc
 * Square frequently uses enums to enforce data conformity. "Enumerated" functions help you quickly get
 * to the enum entry you need without having to worry about case. Your code completion engine will
 * make it so you don't even have to worry about spelling.
 * @example
 *  const myClass = new Class()
 *
 *  myClass.make().type().item().type().category() => {types: ["ITEM", "CATEGORY"]}
 * */

/**
 * @namespace Fardel
 * @classdesc
 * A "Fardel" is the "body" of a Square Pie Object class. Fardels eventually get passed as arguments to functions.
 * They will eventually become elements in an array or a value in in a key:value pair.
 *
 * A "Body" on the other hand, is the "body" of a Square Pie Request class. It will automatically
 * become the request body of an http request. You never pass a "Body" as an argument.
 * */

/**
 * @namespace id
 * @classdesc
 * An "id" is a  Square generated unique alphanumeric sequence used to identify a document in the Square database.
 * There is no definable pattern that we know of. I asked Square, but they didn't know either. (I actually did ask...)
 * */

/**
 * @namespace integer
 * @classdesc
 * An "integer" is a "counting number". While Javascript does not have "integer" as an official type, Square uses them frequently. Whenever
 * an integer is expected, a validation check will happen and an error will be thrown on any value that is not a number in the form of an
 * integer or a string that cannot be coerced into an integer.
 *
 * 5 is an integer.
 * "5" counts as an integer.
 * 5.1 is not an integer and will cause an error to be thrown.
 * */

/**
 * @namespace uid
 * @classdesc
 * A "uid" is **usually** a user-generated unique-ish alphanumeric sequence used to identify an object within a given
 * http request. Square Pie generally generates these for you using {@link https://www.npmjs.com/package/nanoid|nanoid(10)} to generate the unique portion and
 * prefixing each one according to object type: "uid_object_type#".
 *
 * A Square Pie generated uid will look like: "uid_service_charge#ad5d1q39m6"
 *
 * The logic behind that pattern is that for most small businesses, 10 digits should be enough to avoid collisions within a single transaction.
 * The rest is to make it easier to debug from log files. You know it's a uid for a service charge when you see it, because it explicitly says so.
 * The # is to make it easier for us to write our regex unit tests.
 * */

// TYPEDEFS
/**
 * {@link https://developer.squareup.com/reference/square/objects/Money |  Link To Square Docs}<br>
 * @describe A Square API object type.
 * @typedef {object} money
 * @property {number} amount - An integer amount of money. Use smallest currency designation, usually cents.
 * @property {string} currency - Three letter, ISO 4217 compliant currency code
 * */

/**
 * {@link https://developer.squareup.com/reference/square/objects/TimeRange |  Link To Square Docs}<br>
 * @describe A Square API TimeRange object .
 * @typedef {object} time_range
 * @property {time} end_at - A datetime string in RFC 3339 format indicating when the time range ends.
 * @property {time} start_at - A datetime string in RFC 3339 format indicating when the time range begins.
 * */

/**
 * {@link  https://developer.squareup.com/reference/square/objects/Address|  Link To Square Docs}<br>
 * @describe A date-time string in RFC3339 format.
 * @typedef {string} time
 * @property {string} time - A date-time string in RFC3339 format. Throws an Error if string is not a valid RFC3339 time-date.
 * */

/**
 * {@link  https://datatracker.ietf.org/doc/html/rfc3339|  Link To IETF}<br>
 * @describe A Square API  object .
 * @typedef {object} address
 * @property address_line_1{string} - Street address
 * @property address_line_2{string}  - additional street address details
 * @property address_line_3{string} - additional street address details
 * @property locality {string} - city or town or suburb
 * @property sublocality {string} - an area within a city or town
 * @property administrative_district_level_1 {string} - state/province/county
 * @property postal_code {string} The eire/postal/zip code.
 * @property country {string} The country, in the two-letter format of ISO 3166. For example, US or UK.
 * */
