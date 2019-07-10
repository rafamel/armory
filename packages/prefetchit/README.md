# prefetchit

[![Version](https://img.shields.io/npm/v/prefetchit.svg)](https://www.npmjs.com/package/prefetchit)
[![Build Status](https://img.shields.io/travis/rafamel/armory/master.svg)](https://travis-ci.org/rafamel/armory)
[![Coverage](https://img.shields.io/coveralls/rafamel/armory/master.svg)](https://coveralls.io/github/rafamel/armory)
[![Dependencies](https://img.shields.io/david/rafamel/armory.svg?path=packages%2Fprefetchit)](https://david-dm.org/rafamel/armory.svg?path=packages%2Fprefetchit)
[![Vulnerabilities](https://img.shields.io/snyk/vulnerabilities/npm/prefetchit.svg)](https://snyk.io/test/npm/prefetchit)
[![License](https://img.shields.io/github/license/rafamel/armory.svg)](https://github.com/rafamel/armory/blob/master/LICENSE)
[![Types](https://img.shields.io/npm/types/prefetchit.svg)](https://www.npmjs.com/package/prefetchit)

> A naive prefetch for the browser.

If you find it useful, consider [starring the project](https://github.com/rafamel/prefetchit) 💪 and/or following [its author](https://github.com/rafamel) ❤️ -there's more on the way!

## Install

[`npm install prefetchit`](https://www.npmjs.com/package/prefetchit)

## Usage

`prefetchit` will add a `<link rel="prefetch" href="asset.ext" />` to the current `document` head for each resource passed, filtering for duplications.

### `add(asset: string): void`

```javascript
import prefetch from 'prefetchit';

prefetch.add('./my-res.png');
prefetch.add('./my-other-res.png');
```

### `bulk(...asset: string): void`

```javascript
import prefetch from 'prefetchit';

prefetch.bulk('./my-res.png', './my-other-res.png');
```
