# remote-script

[![Version](https://img.shields.io/npm/v/remote-script.svg)](https://www.npmjs.com/package/remote-script)
[![Build Status](https://img.shields.io/travis/rafamel/armory/master.svg)](https://travis-ci.org/rafamel/armory)
[![Coverage](https://img.shields.io/coveralls/rafamel/armory/master.svg)](https://coveralls.io/github/rafamel/armory)
[![Dependencies](https://img.shields.io/david/rafamel/armory.svg?path=packages%2Fremote-script)](https://david-dm.org/rafamel/armory.svg?path=packages%2Fremote-script)
[![Vulnerabilities](https://img.shields.io/snyk/vulnerabilities/npm/remote-script.svg)](https://snyk.io/test/npm/remote-script)
[![License](https://img.shields.io/github/license/rafamel/armory.svg)](https://github.com/rafamel/armory/blob/master/LICENSE)
[![Types](https://img.shields.io/npm/types/remote-script.svg)](https://www.npmjs.com/package/remote-script)

> Programmatically Loads remote scripts via script tag.

If you find it useful, consider [starring the project](https://github.com/rafamel/remote-script) 💪 and/or following [its author](https://github.com/rafamel) ❤️ -there's more on the way!

## Install

[`npm install remote-script`](https://www.npmjs.com/package/remote-script)

## Usage

* [Documentation](https://rafamel.github.io/armory/remote-script/globals.html)

```javascript
import load from 'remote-script';

/* Basic usage */
load('https://example.com/some-script.js')
  .then((e) => {
    if (!e) console.log('loaded');
    else console.log('ErrorEvent object', e);
  })
  .catch((err) => {
    console.log('Runtime error', err)
  });

/* Async attribute */
load('https://example.com/some-script.js', { async: true })
  .then(() => { /* ... */ });
  .catch(() => { /* ... */ });
```
