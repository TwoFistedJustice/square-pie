repo structure

There is a method to the madness. The structure is meant to loosely resemble the
way Wix structures their code within their online IDE withouth duplicating the 
godawful mess that their Corvid npm package creates.

'src' is the topmost folder. Everything that goes into your wix site that you want to tinker with
locally, goes in this. 

'main' is what they call their 'Main Pages' AND AND AND what they call their 'Code Files'.

The way you get YOUR code into THEIR online development platform should take you back to a magical time
called the 1990's. Back then we used loud heavy keyboards made of stone and 'monitors' that shot ultra-violet and 
X-rays at our faces and made us blind. We used a feature called "copy and paste" to get code from one 
source to another, and what passed for version control was simply saving stuff with a different file
name, just like Wix expects you to do in their online development platform. At least with MY system, you 
can use git. But you still have to copy and paste.

Imports/Exports
Wix has their own implementation that is a bit wonky. Your IDE may not be compatible with it. All exports and 
imports in this repo are in the Wix style. So your IDE may not be abe to parse them.

In the 'public' section you can import/export functions using curly braces. Export {somevar} import {someVar}

In the 'backend' section you MUST use 'export function...'. You can declare your functions as variables
then return them from an export function.


Testing
Unit testing ain't gonna happen. The way you test is by copy and pasting (just like Willow had to do back in the 1990s!) into Wix.
In order for the Wix little green arrow thing to work, you MUST use the syntax 'export function someFunciton(){}'. You can call
const style functions in your hoisted function declarations.

