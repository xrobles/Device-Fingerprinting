
# Device Fingerprinting Browser Extension, based in Chameleon

This is  a browser extension based in [Chamaleon](https://github.com/ghostwords/chameleon)


### Detection

This browser extension  detects JavaScript and Canvas objects using machine learning, explicitly Naive Bayes classifier.


## Installation

To manually load this browser extension, check out (or [download](https://github.com/xrobles/Device-Fingerprinting/archive/master.zip) and unzip) this repository, go to `chrome://extensions/` in Chrome, make sure the "Developer mode" checkbox is checked, click on "Load unpacked extension..." and select the [chrome](chrome/) folder inside your Device-Fingerprinting folder.

To update manually loaded Device-Fingerprinting, update your checkout, visit `chrome://extensions` and click on the "Reload" link right under Device-Fingerprinting's entry.

You could also generate an installable CRX package. See below for details. To install from a CRX package, drag and drop the package file onto the `chrome://extensions` page.


## Development setup

1. `npm install` to install dev dependencies.
2. `npm run lint` to check JS code for common errors/formatting issues.
3. `npm run watch` to monitor extension sources for changes and regenerate extension JS bundles as needed. Leave this process running in a terminal as you work on the extension. Note that you still have to reload Chameleon in Chrome from the `chrome://extensions` page whenever you update Chameleon's injected script or background page.
4. `npm run dist` to generate an installable CRX package. This requires having the signing key in `~/.ssh/chameleon.pem`. To get a key, visit `chrome://extensions/` in Chrome and click on the "Pack extension..." button to generate a CRX manually.


