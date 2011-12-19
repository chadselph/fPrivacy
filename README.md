fPrivacy Chrome Extension
========================

What does it do?
-----------

fPrivacy lets you opt out of Facebook permissions when the authorization dialog is popped.

Suppose you want to try out a sketchy app without handing over all of your data.
![](http://github.com/chadselph/fPrivacy/raw/master/screenshots/too%20many.png)

Whoa there buddy! We just met!  Why don't we just disable a few of these...

![](http://github.com/chadselph/fPrivacy/raw/master/screenshots/removing.png)

And then hit "Update"

![](http://github.com/chadselph/fPrivacy/raw/master/screenshots/gone.png)

Phew! I feel much safer now.

How Can I Use it?
-----------------

__Chrome__

[From the Web Store](https://chrome.google.com/webstore/detail/lkllliihmodekgjcioihaaodkbpeleph)

or from git

*  Do a git clone of this repository
*  Open up chrome to chrome://extensions
*  Turn on "Developer Mode"
*  Click "Load unpacked extension"
*  Find the folder of your git checkout!
* Try it out - for example at the [Vimeo Login Page](http://vimeo.com/log_in)

__Safari__

* Do a git clone of this repository
* Get a certificate from the [Safari Dev Center](http://developer.apple.com/devcenter/safari/index.action)
* Make sure the Safari Develop menu is enabled (Safari -> Preferences -> Advancecd -> Show Develop menu in menu bar)
* Open the Safari Extension Builder (in the Develop menu)
* Click "New Extension" and choose a location to save your extension
* Copy the style.css and extension.js files from your git checkout folder into the new extension folder
* Set Access Level to "Some"
* In Allowed Domains, enter "www.facebook.com" and check the "Include Secure Pages" checkbox
* Add a new end script, then select extension.js from the dropdown
* Add a new style sheet, then select style.css from the dropdown
* Add a Whitelist URL pattern: "https://www.facebook.com/dialog/permissions.request*"
* Click "Install"
* Try it out - for example at the [Vimeo Login Page](http://vimeo.com/log_in)

What needs to be done?
----------------------
*  (Maybe) descriptions of what each permission does.
*  (Maybe) ability to add permissions the site isn't acually asking for.
*  Makefile to package up in different browser extension formats

Why do some sites break when using this plugin?
----------------------------------------------
Sometimes server-side code is written without the consideration that a Facebook permission might not have been granted.  They might get a permission denied back from Facebook and not handle it gracefully.  Some sites might be more aggressive than others about checking which permissions you're missing and trying to get you to re-auth.


Links
-----
* [Hacker News conversation](https://news.ycombinator.com/item?id=3287272)
* [Firefox port](https://github.com/psawaya/OOptOut-Extension-Firefox)
* [cheald](http://hackerne.ws/user?id=cheald) on hackernews found this [similar project](https://chrome.google.com/webstore/detail/mlnhcepfaddcopbeggpobodmmodilgmc) although I don't think the UI is very good; and it apparently records which permissions you chose (for a good reason: their reseach; but ironic for a "privacy" application.)  I don't know if it works, I haven't tried it.
