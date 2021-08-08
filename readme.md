# Welcome to square-pie 👋

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000)
[![License: ISC](https://img.shields.io/badge/License-ISC-yellow.svg)](#)

> "an easy to use class based chainable interface for accessing the Square API."

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
npm install
```

## Unit tests

### writing tests

We use Jest and Chai. You should be able to use jest and chai versions of `expect` concurrently without modification.
However, in order to keep some syntactic separation between them, we use `should` for running Chai assertions and
`expect` for running Jest assertions.

### Running the tests

Unit tests are run against the actual Squareup.com sandbox server. This causes some problems with timeouts. We have a
workaround. Before running the tests we clean and re-populate the database with the command:

```
npm run setTest
```

Then we wait. Square's database doesn't update all lickety split like we would hope. While deletes are quick, writes
can take up to a minute to show up. So go refill your cup or go potty. Or do both simultaneously if you are one of
those East Bay folks into that sort of thing. After you return to your 'pooter run the tests with the command:

```
npm run test
```

Tests may still fail due to timeout. Supposedly Jest has a way to extend the timeout, but the method outlined in
their docs does not seem to actually affect anything.

## Testing on Wix Velo

Test functions exist. They must be run from the 'backend' in a .jsw file. Click the little green arrow. To write
new test functions, use the syntax

```
export async function yourFunction(){ // your test function must return the expected value }
```

## Author

👤 **Russ Bain**

## Contributing Code

Firstly, make sure that your editor is configured per our Style Guide. All contributions should be made on a
new branch. Push your new branch and then create a pull request. This will trigger a number of actions and
queue up your commits for review.

### Git:

Please follow the [Conventional Commits Standard](https://www.conventionalcommits.org/en/v1.0.0/)

Conventional Commits [Types can be found here](https://github.com/commitizen/conventional-commit-types/blob/master/index.json)

### Style Guide:

We use Prettier defaults with eslint running on a pre-commit hook as described in the
[Prettier install docs](https://prettier.io/docs/en/install.html) Please remember to [configure your editor](https://prettier.io/docs/en/editors.html)
to use the same version of Prettier as we do. This will not affect your global editor settings.

## Show your support

Give a ⭐️ if this project helped you!

---
