## Unit tests

### Writing tests

We use Jest and Chai. You should be able to use jest and chai versions of `expect` concurrently without modification.
However, in order to keep some syntactical separation between them, we use `should` for running Chai assertions and
`expect` for running Jest assertions.

### Running the tests

Unit tests are separated into two folders. The main folder is 'tests' which is the default for Jest. All tests residing
in the default test directory should be synchronous. The other folder is `tests/async/`. All asynchronous tests should go
in there.

The command to run synchronous tests is

```npm
npm run t
```

Asynchronous unit tests are run against the actual Squareup.com sandbox server. This can cause some problems with timeouts. Before running the tests we clean and re-populate the database.

The command to set up and run asynchronous tests is

```npm
npm run async
```

You can also set them up and run them in two steps:

```npm
npm run setTest
```

Then we wait. Square's database doesn't update all lickety split like we would hope. While deletes are quick, writes
can take up to a minute to show up. So go refill your cup or go potty. Or do both simultaneously if you are one of
those East Bay folks into that sort of thing. After you return to your 'pooter run the tests with the command:

```npm
npm run asynctest
```

Tests may still fail due to timeout. Supposedly Jest has a way to extend the timeout, but the method outlined in
their docs does not seem to actually affect anything. That or I did it wrong.
