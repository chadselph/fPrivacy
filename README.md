OOptOut Chrome Extension
========================

What does it do?
-----------

OOptOut lets you opt out of Facebook permissions when the authorization dialog is popped.

Suppose you want to try out a sketchy app without handing over all of your data.
![](http://github.com/chadselph/OOptOut-Chrome-Extension/raw/master/screenshots/too%20many.png)

Whoa there buddy! We just met!  Why don't we just disable a few of these...

![](http://github.com/chadselph/OOptOut-Chrome-Extension/raw/master/screenshots/removing.png)

And then hit "Update"

![](http://github.com/chadselph/OOptOut-Chrome-Extension/raw/master/screenshots/gone.png)

Phew! I feel much safer now.

How Can I Use it?
-----------------

Hopefully soon-ish it will be on the Chrome web store, but for now:

*  Do a git clone of this repository
*  Open up chrome to chrome://extensions
*  Turn on "Developer Mode"
*  Click "Load unpacked extension"
*  Find the folder of your git checkout!
*  Try it out - for example at the [Vimeo Login Page](http://vimeo.com/log_in)

What needs to be done?
----------------------
Mostly CSS, logo, finding a better name. Help!
Maybe descriptions of what each permission does.
Maybe the ability to add permissions the site isn't acually asking for.

Why do some sites break when using this plugin?
----------------------------------------------
Sometimes server-side code is written without the consideration that a Facebook permission might not have been granted.  They might get a permission denied back from Facebook and not handle it gracefully.  Some sites might be more aggressive than others about checking which permissions you're missing and trying to get yout to re-auth.
