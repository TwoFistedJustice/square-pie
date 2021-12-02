# To Dos - before moving on

## Easy

- [ ] Update customer tables
- [ ] [Add links to square docs on UML](https://plantuml.com/link)
- [x] Add a property to track which was last version of Square it is compliant with
- [x] Go over example js and make sure it represents current pattern
- [x] Add display_name prop and getter to each class

## Medium

- [ ] Refactor max and min len utils to shazam fns
- [ ] Refactor money_helper - rename to arche_money
- [ ] Refactor all classes to use shazam functions where appropriate
- [ ] Go through all js files and remove dead todos and comments
- [ ] Refactor all variables to snake_case

## Time Consuming

- [ ] Experiment with Catalog_Upsert to see if `batch` can do just one
- [ ] If Catalog_Upsert can do just one in `batches`, refactor to simplify structure to just use `batches`
- [ ] Experiment with Catalog_Object_Wrapper to see if `batch` can do just one
- [ ] If Catalog_Object_Wrapper can do just one in `batches`, refactor to simplify structure to just use `batches`
-

## Create a patterns/conventions page with general descriptions

- [x] fardel vs body vs delivery
- [x] snake_case
- [x] configuration
- [x] display_name
- [x] make fns
- [x] build fns
- [x] private functions
- [x] enums
- [x] shazam fns
- [x] arche fns (archetype)
- [x] arrayify
- [x] request()