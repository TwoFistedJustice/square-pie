# A Quick Guide On Documentation

- [Overview](#overview)
- [Rules Overview](#rules-overview)
- [Adjusted Rules](#adjusted-rules)
  - [MD013: line-length](#md013-line-length)
  - [MD024: no-duplicate-heading/no-duplicate-header](#md024-no-duplicate-headingno-duplicate-header)
  - [MD033: no-inline-html](#md033-no-inline-html)
  - [Think we missed something?](#think-we-missed-something)
- [Getting Around Rules And When](#getting-around-rules-and-when)
- [Style Rules not covered by Markdownlint (Yet)](#style-rules-not-covered-by-markdownlint-yet)
- [Some... Quirks](#some-quirks)
- [Prettier and Markdownlint](#prettier-and-markdownlint)
- [Resources](#resources)

<br/>

## Overview

> Markdown is a plain text format for writing structured documents, based on formatting conventions from email and usenet.

As our documentation is "living" documentation this guide will help contributors
create consistent and readable documentation. Both linting and style guidelines are setup to best work with github's markdown stylesheet.

<br/>

## Rules Overview

[Markdownlint][markdownlint for node.js] rules are created based on the [CommonMark] specification which is as close to (project) language agnostic as possible. While we are sticking as closely to the default as possible a few rules have been adjusted to better fit our documentations style.

[markdownlint.json with comments][example file]

<br/>

## Adjusted Rules

This is a short list of rules that are changed for better flexibility in case you run into a conflict or want to suggest a change.

### MD013: line-length

#### All

- **Default**: 80
- **Changed**: false

##### Why

Adding spaces to any html paragraph has unexpected consequences. leaving this off allows for the (usually) default word-wrap property to do it's thing.

### MD024: no-duplicate-heading/no-duplicate-header

#### allow_different_nesting

- **Default**: false
- **Changed**: true

##### Why

This was changed as there are several series of tables in the documentation that have the same name as they label properties for a specific object(?).

#### siblings_only

- **Default**: false
- **Changed**: true

##### Why

This one states to only check on siblings. This would still be bad as you'd have two or more anchor links in same list with the same name.

### MD033: no-inline-html

#### allowed_elements

- **Default**: []
- **Changed**: ["br"]

##### Why

For better readability and strengthen the separation of section I've added this to the allowed `<br/>` in our docs. Currently, these are _only_ used for section breaks.

### Think we missed something?

This is only the initial adjustment to the markdownlinting. if you have a suggestion please let us know by creating a ticket with the [markdown lint rule][rules] you'd like to change.

<br/>

## Getting Around Rules And When

On some occasions you may be paraphrasing, referencing, or attempting to affect a look for an example but a rule is in the way. For most situations it's best to stick with a blockquote (\>) or code fence (\`\`\`-language) for these situations.

For the fringe case however you have a [couple of options][disable rules]. However, please note that these "fixes" will be judged and may be rejected if we feel they are excessive or could be dealt with another way.

Fastest options:

- Disable all rules for the next line only: `<!-- markdownlint-disable-next-line -->`
- Disable all rules: `<!-- markdownlint-disable -->`
- Enable all rules: `<!-- markdownlint-enable -->`

More options found [here][disable rules].

<br/>

## Style Rules not covered by Markdownlint (Yet)

Markdownlint allows for custom rules but we don't have any setup yet

- In regards to **MD033**, every section should have a `<br/>` at the end to help separate sections.
- Don't use a line break directly under a header 1 or 2. Github stylesheet already adds one.

<br/>

## Some... Quirks

As of 10/25/2021 there are a few false positives we have noticed. Currently we are keeping an eye on them to see if it's us or markdownlint.

- **MD013**: List items over 80 characters still trigger warning
- **MD043**: **Some** top headings _may_ trigger warning despite being correct visually

If you notice a false trigger like this please put in an issue so we can either fix it, "fix" it, or send it to creator.

## Prettier and Markdownlint

There is one known conflict between Prettier and Markdownlint regarding [list items](https://github.com/DavidAnson/markdownlint/blob/main/doc/Prettier.md).
**This issue only affects tab-width and only those who demand to use 4 spaces**

> The default settings of markdownlint and Prettier are compatible and don't result in any linting violations. If Prettier is used with --tab-width set to 4, the following markdownlint configuration can be used:

```json
{
  "MD007": {
    "indent": 4
  },
  "MD030": {
    "ul_single": 3,
    "ul_multi": 3
  }
}
```

<br/>

## Resources

- [Markdownlint for Node.js][markdownlint for node.js]
- [Markdownlint for Ruby][markdownlint for node.js]
- [Markdownlint cli][markdownlint cli]
- [Markdown cheat sheet][markdown cheatsheet]
- [CommonMark]

values can be found starting on line 38 of markdownlint.json

[markdownlint for node.js]: https://github.com/DavidAnson/markdownlint "Markdownlint for Node.js"
[markdownlint for node.js]: https://github.com/markdownlint/markdownlint "Markdownlint for Ruby"
[markdownlint cli]: https://github.com/igorshubovych/markdownlint-cli "Markdownlint cli"
[markdown cheatsheet]: https://www.markdownguide.org/cheat-sheet/ "Markdown Cheat sheet"
[commonmark]: https://commonmark.org/ "CommonMark"
[rules]: https://github.com/DavidAnson/markdownlint/blob/main/doc/Rules.md "markdownlint rules documentation"
[disable rules]: https://github.com/DavidAnson/markdownlint#configuration "list of inline disable tags"
[example file]: https://github.com/TwoFistedJustice/square-pie/docs/examples/markdownlint_defaults.jsonc "json doc with comments"
