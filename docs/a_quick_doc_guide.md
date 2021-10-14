# A Quick Guide On Documentation

## TODO

- [ ] Summary of intention
- [ ] Tooling Used
- [ ] Rules Overview
- [ ] Rules used/not used
- [ ] Getting Around Rules and when
- [X] Prettier and Markdownlint
- [ ] Style Rules not covered by Markdownlint (yet)

<br/>

## Summary

> Markdown is a plain text format for writing structured documents, based on formatting conventions from email and usenet.

As our documentation is "living" documentation this guide will help contributors 
create consistant and readable documentation. Both linting and style guidelines are setup to best work with githubs markdown stylesheet.

<br/>

## Tools and Resources

- [Markdownlint for Node.js](https://github.com/DavidAnson/markdownlint)
- [Markdownlint for Ruby](https://github.com/markdownlint/markdownlint)
- [Markdownlint cli](https://github.com/igorshubovych/markdownlint-cli)
- [Markdown Cheatsheet](https://www.markdownguide.org/cheat-sheet/)
- [CommonMark](https://commonmark.org/)

<br/>

## Prettier and Markdownlint

There is one known conflict between Prettier and Markdownlint regarding [list items](https://github.com/DavidAnson/markdownlint/blob/main/doc/Prettier.md). **This issue only affects tab-width and only those who demand to use 4 spaces**

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
*values can be found starting on line 38 of markdownline.json*
