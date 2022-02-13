# Welcome to square-pie 👋

![Version](https://img.shields.io/badge/version-1.0.0--alpha-red.svg?cacheSeconds=2592000)
[![License: ISC](https://img.shields.io/badge/License-ISC-yellow.svg)](#)

> "an easy to use class based (sometimes) chainable interface for accessing the Square API."

## Table of Contents

- [About](#about)
- [Installation](#install)
- [Contributing Code](#contributing-code)
- [Basic Usage](#basic-usage)
- [Patterns Used Throughout](#patterns-used-throughout)

## About

This project came into existence because my former housemate who is a talented front end designer is opening a
[family run pie bakery in Texas](https://www.pievilleusa.com/) and the fam wanted to use Square with Wix.
The existing tools for that are not very user-friendly for people not skilled in backend development. So I
decided to make a toolset that is easier to grok and use (grokootilize?). As far as I know they don't actually
make square pies. But they do take requests...

## Install

**not yet deployed to npm**
for now the installation method is "copy and paste"

```sh
npm install the last words of Joseph of Arimathea
```

## Author

👤 **Russ Bain**

## Contributing Code

--> **All contributions should be made on a new branch.**<--

The branch name should begin with the issue number it is meant to address.

Branch naming convention: `issue[issue number]_somethingMeaningful` eg:`issue27_custDocs`

Make sure that your editor is configured per our Style Guide.

Before writing any code, create a github Issue outlining the changes you intend to make (be clear and concise). Assign yourself
and TwoFistedJustice to the issue so that notifications will be sent to the repo owner. Assign an appropriate Label. Add the
issue to the appropriate Project. If no other project seems appropriate, add it to Overview.

On your local copy, make a new git branch for your edits. Make your edits. Push your branch up to github and create a pull request.
If your PR is an intermediate step add the comment `Progresses #[issue number]`. If your PR is final, then add the comment
`Closes #[issue number]` These comments will cause the project to update automatically when the PR is accepted.

### Commits:

Please follow the [Conventional Commits Standard](https://www.conventionalcommits.org/en/v1.0.0/)

Conventional Commits [Types can be found here](https://github.com/commitizen/conventional-commit-types/blob/master/index.json)

### Style Guide:

We use Prettier defaults with eslint running on a pre-commit hook as described in the
[Prettier install docs](https://prettier.io/docs/en/install.html) Please remember to [configure your editor](https://prettier.io/docs/en/editors.html)
to use the same version of Prettier as we do. This will not affect your global editor settings.

## Show your support

Give a ⭐️ if this project helped you!

---

## Basic Usage

Square Pie is divided into discrete classes and has a standardized syntax that works the same way across nearly every class.

There are two broad Class categories: Object and Request.

Request classes are **asynchronous** and help you store, fetch, and manipulate data in Square's database. Request classes have a "body". Remember to always use asynchronous functions for them.

Object classes are **synchronous** and help you format the data to store in Square's database. Object classes have a "fardel". A fardel will eventually get added to a body or fardel belonging to another class. Object classes can be used inside either regular or async functions.

Object classes sometimes stack. That is one may help to build another. In this case the fardel of one gets added to the fardel of the other.

To construct a body or a fardel, you will want to have the Square Docs open in front of you. They will explain in depth the structure you are working on.
Square Pie will help you build that structure without having to think too hard about how to build the internal structure.

Whenever a class helps you build a complex structure (i.e. an object) it will have a method called "make". Some object classes are designed to help you
construct fairly complicated sub-objects (objects inside objects inside objects). These may have additional "make"-like functions. They will generally be
named after the object they create, for example "make_complicated_thing".

Each "make" method will have at least a few sub-methods. They will always closely mimic the property names of the object they build. For example:
You want to interface with the (pretend)Thing API. So first you need to build a (pretend) BigThing object called "BigThing". So you would go to the Square
Docs for that. BigThing has a bajillion properties. Two example-pretend-properties are: "name" and" bigThingIds".

"name" expects an object that looks like {name: { name: "some name you made up"} }.
"bigThingIds" expects an array of Ids like ["abc123", "def456", "ghi789"]

Note that name has a property, also called name, that expects a string.

To create that in the longest most verbose way possible:

```js
const myThing = new Big_Thing();
myThing.make().name("some name you made up");
myThing.make().big_thing_ids("abc123");
myThing.make().big_thing_ids("def456");
myThing.make().big_thing_ids("ghi789");
```

A slightly shorter version:

```js
const myThing = new Big_Thing();
myThing.make().name("some name you made up");
myThing
  .make()
  .big_thing_ids("abc123")
  .big_thing_ids("def456")
  .big_thing_ids("ghi789");
```

an even shorter version (the order you chain the sub-methods does not matter)

```js
const myThing = new Big_Thing();
myThing
  .make()
  .big_thing_ids("abc123")
  .name("some name you made up")
  .big_thing_ids("def456")
  .big_thing_ids("ghi789");
```

an even SHORTER version using the included concat-type method...

```js
const myThing = new Big_Thing();
myThing
  .make()
  .name("some name you made up")
  .big_thing_ids_concat(["abc123", "def456", "ghi789"]);
```

Now you've built it. How do you get at it?

```js
myThing.fardel;
```

Which will contain

```js
{
  name: {
    name: "some name you made up"
  },
  bigThingIds: ["abc123", "def456", "ghi789"]
}

```

So now you want to upsert your Thing to the (pretend) Upsert-Thing endpoint.

First you need to create an instance of the (pretend) Upsert_Thing class and add your Thing to it.

There are several ways you can do that.

You can use the body setter:

```js
const upsert = new Upsert_Thing();
upsert.body = myThing.fardel;
```

Or you can use Upsert_Thing's make method.

```js
const upsert = new Upsert_Thing();
upsert.make().body(myThing.fardel);
```

How do you send it on up to Square? Firstly, you must be working in an asynchronous function.
Then you call the "request" method. Any return results from Square will be stored on the "delivery"
property.

```js
const myAsyncFunc = async function () {
  await upsert.request();
  let response_data = upsert.delivery;
};
```

The whole thing all put together looks like:

```js
const upsert = new Upsert_Thing();
const myThing = new Big_Thing();

myThing
  .make()
  .name("some name you made up")
  .bigThingIdsConcat(["abc123", "def456", "ghi789"]);

const myAsyncFunc = async function () {
  upsert.make().body(myThing.fardel);
  await upsert.request();
  // do something with the returned data
  console.log(upsert.delivery);

  // you could see what Things you have...
  const list = new List_Things();
  await list.request();
  console.log(list.delivery);
};

myAsyncFunc();
```

## Patterns Used Throughout

###

Square Pie uses snake_case because it's easier for me to read. When you see something that is in camelCase, it's because old habits die hard.

### Curry Is Good

Much of Square Pie is curried, meaning you can chain functions like in jquery.

### make methods

- most classes have at least one. A few don't have any.
- sub-methods mimic the keys of the Square object they help build.
- sometimes there are simplified alias methods, example the method `object_ids` might have an alias titled `id`. Or `concat_object_ids` might have one called `concat`.

### HTTP Reponse Body Data

- The "important" data is always stored on the `.delivery` property of any given Request class. If you fetch a list of customers, they will be stored there.

### Enums

Square frequently has properties that expect values chosen from a list of acceptable value. It is often from a list of words. Whenever this is the case,
we use a function we call an "enum" or "enumerated function" (our own terminology). These will have methods titled as lower_snake_case versions of the values they set. They will automatically set the
value in the form that Square expects. Some of these may be aliases that are quicker to type. For example `.true()` or `.false()` may have the aliases .`yes()` and `.no()`. There may even be aliases that make it
easier to reason about the values to set. For example `.sort().ascending()` and `.sort().descending()` may have the aliases like `sort().oldest_first()` and `sort().newest_first()`

Enums use a currying style we refer to as "curry-over". (I picture a pot of curry boiling over on the stove, thus the name). It simply means that there are additional sub-methods and you must complete an entire chain of sub-methods before
chaining the next method. For example, lets say you have a Thing object. You want to set the `name`, `sort`, and `id` properties. The make() methods will have each of those methods. The sort property accepts only the values "ASCENDING" or
"DESCENDING". Therefore the `sort` method of `make()` would be curried over. It will have a methods called `ascending()`and `descending()`. Once you enter the sort method, you must call one of those methods BEFORE calling either `name` or
`id`

```js
//this will work
thing.make().name("fred").sort().ascending().id("123abc");

// this will throw an error because the sort method was shorted.
thing.make().name("fred").sort().id("123abc");
```

### Arrays of Strings

Sometimes a Square object or endpoint will expect an array of strings. In those instances there will be functions to allow you to add individual stringss or whole arrays of strings or both. Generally
the functions that allow you to enter an array will have be similar to the one that adds individual values, but will either start with the word 'concat'. Occasionally one will end with 'concat' instead or
simpy not exist. Those are errors and we would appreciate if you went to our github repo and created an issue for that so we can fix it.
