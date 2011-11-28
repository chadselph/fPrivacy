OOptOut Chrome Extension
========================

What does it do?
-----------

OOptOut lets you opt out of Facebook permissions when the authorization dialog is popped.

How Can I Use it?
-----------------

Hopefully soon-ish it will be on the Chrome web store, but for now:

*  Do a git clone of this repository
*  Open up chrome to chrome://extensions
*  Turn on "Developer Mode"
*  Click "Load unpacked extension"
*  Find the folder of your git checkout!

What needs to be done?
----------------------
Mostly CSS, logo, finding a better name. Help!
Maybe descriptions of what each permission does.
Maybe the ability to add permissions the site isn't acually asking for.

Why do some sites break when using this plugin?
----------------------------------------------
Sometimes server-side code is written without the consideration that a Facebook permission might not have been granted.  They might get a permission denied back from Facebook and not handle it gracefully.  Some sites might be more aggressive than others about checking which permissions you're missing and trying to get yout to re-auth.
