# Welcome to square-pie 👋

![Version](https://img.shields.io/badge/version-1.0.0--alpha-red.svg?cacheSeconds=2592000)
[![License: ISC](https://img.shields.io/badge/License-ISC-yellow.svg)](#)

> "an easy to use class based (sometimes) chainable interface for accessing the Square API."

## Table of Contents

- [About](#about)
- [Installation](#install)
- [Contributing Code](#contributing-code)
- [Basic Usage](#basic-usage)

## About

This project came into existence because my former housemate who is a talented front end designer is opening a
[family run pie bakery in Texas](https://www.pievilleusa.com/) and the fam wants to use Square with Wix.
The existing tools for that are not very user friendly for people not skilled in backend devlopment. So I
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

Request classes are **asynchronous** and help you store, fetch, and manipulate data in Square's database. Request classes have a "body".

Object classes are **synchronous** and help you format the data to store in Square's database. Object classes have a "fardel". A fardel will eventually get added to a body or fardel belonging to another class.

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

Note:  
It is vital to return the "delivery" property from an asynchronous function or it will whine about being `undefined`.
It's easier to just give it what it wants. Trust me on this.
