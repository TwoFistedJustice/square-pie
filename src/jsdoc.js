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
 * @property {number} end_at - A datetime value in RFC 3339 format indicating when the time range ends.
 * @property {number} start_at - A datetime value in RFC 3339 format indicating when the time range begins.
 * */
