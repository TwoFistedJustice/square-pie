#To Do In Lead Up to Deployment of Alpha 1.0 to NPM

Create document separate document folders for contributors vs users
Rename `aaaIndex.js` to `index.js`
Add all Core Classes to `index.js`
Separate unit tests to own files - one per Core Class
Create .md document which goes over common Core Class user syntax
Create .md document laying out all Core Classes and any non-standard features of each
Create a `_help` property and getter on Core Classes that don't have one
Get all 'red' unit test blocks into 'yellow'
Add jsdoc comments to all Core Classes and to any non-standard features
Refactor shazam utilities so that argument order follows order of operations. ( left_side < right_side ) instead of (right_side < left_side)
the above includes fixing them where they are used.
