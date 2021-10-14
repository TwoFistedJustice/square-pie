# A Quick Guide On Documentation

## TODO

- [ ] Summary of intention
- [ ] Tooling Used
- [ ] Rules Overview
- [ ] Rules used/not used
- [ ] Getting Around Rules and when
- [ ] Prettier and Markdownlint
- [ ] Style Rules not covered by Markdownlint (yet)

<br/>

## Summary

## Prettier and Markdownlint

There is one known conflict between Prettier and Markdownlint regarding [list items](https://github.com/DavidAnson/markdownlint/blob/main/doc/Prettier.md) 

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
