# prefetchit

[![Version](https://img.shields.io/github/package-json/v/rafamel/prefetchit.svg)](https://github.com/rafamel/prefetchit)
[![Build Status](https://travis-ci.org/rafamel/prefetchit.svg)](https://travis-ci.org/rafamel/prefetchit)
[![Coverage](https://img.shields.io/coveralls/rafamel/prefetchit.svg)](https://coveralls.io/github/rafamel/prefetchit)
[![Dependencies](https://david-dm.org/rafamel/prefetchit/status.svg)](https://david-dm.org/rafamel/prefetchit)
[![Vulnerabilities](https://snyk.io/test/npm/prefetchit/badge.svg)](https://snyk.io/test/npm/prefetchit)
[![Issues](https://img.shields.io/github/issues/rafamel/prefetchit.svg)](https://github.com/rafamel/prefetchit/issues)
[![License](https://img.shields.io/github/license/rafamel/prefetchit.svg)](https://github.com/rafamel/prefetchit/blob/master/LICENSE)

<!-- markdownlint-disable MD036 -->
**A naive prefetch for the browser.**
<!-- markdownlint-enable MD036 -->

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