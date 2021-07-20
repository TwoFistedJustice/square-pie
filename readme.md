repo structure
Due to Wix's restrictions on importing into .jsw web modules, everything is in one file: square.jsw.js

**Dependencies**

[npm uuid](https://www.npmjs.com/package/uuid)


**Installation**

Make a new .jsw web module in the 'backend' directory. Call it whatever you want. I call it "square.jsw". Copy and paste
the entire contents of the repo file into the file you just made.

The way you get YOUR code into THEIR online development platform should take you back to a magical time
called the 1990's. Back then we used loud heavy keyboards made of stone and 'monitors' that shot ultra-violet and 
X-rays at our faces and made us blind. We used a feature called "copy and paste" to get code from one 
source to another, and what passed for version control was simply saving stuff with a different file
name, just like Wix expects you to do in their online development platform. At least with MY system, you 
can use git. But you still have to copy and paste.

**Imports/Exports in .jsw files**
Wix has their own implementation of import/export that is a bit wonky. Basically you can't import anything into a 
.jsw file and expect it to work they way you want, or at all. You cannot import into a .jsw file from another .jsw file. But
while you can import from a .js file, you won't be able to use any code that depends on that import in the front
end. This is extremely limiting, and IMO is a good reason to not use Wix for anything more than their canned modules
can provide. But... since the client wants to use Wix with Square, here we go.


**Filename Extensions**

Wix uses the '.jsw' extension for all of their web modules (backend directory). For ease of use in a local IDE, this repo appends '.js' to the file. When creating
files for Wix, be sure to omit the '.js'


**Testing**

Unit testing ain't gonna happen. The way you test is by copy and pasting (just like Willow had to do back in the 1990s!) into Wix.
In order for the Wix little green arrow thing to work, you MUST use the syntax 'export function someFunciton(){}'. You can call
const style functions in your hoisted function declarations.

