# A Quick Guide On Query Params

We exclusively use Regular Expressions for working with query parameters.. Don't be frightened! We have utilities and examples a plenty
to make this easy.

Rather than putting the RegExp directly in the class, we have a library of patterns that are referenced from specialized utilities. Just
import the appropriate utility into your function and /Blammo!/, it works. Utilities designed to work with query params are always carry
the prefix "query*param*" in their name.

For a good working example to follow (read: lift wholesale) see the Catalog_List class at `src/lib/catalog_request_list.js`

In general:
Steal the following methods from Catalog_List

- [ ] #init_query_param_sequence
- [ ] #query_param_insert
- [ ] #query_param_replace

Then make a setter for each parameter you need and call either the *insert or *replace method from those setters.

If you find an edge case please let us know in the [issues](https://github.com/TwoFistedJustice/square-pie/issues);
