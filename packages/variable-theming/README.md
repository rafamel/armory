# variable-theming

[![Version](https://img.shields.io/npm/v/variable-theming.svg)](https://www.npmjs.com/package/variable-theming)
[![Build Status](https://img.shields.io/travis/rafamel/armory/master.svg)](https://travis-ci.org/rafamel/armory)
[![Coverage](https://img.shields.io/coveralls/rafamel/armory/master.svg)](https://coveralls.io/github/rafamel/armory)
[![Dependencies](https://img.shields.io/david/rafamel/armory.svg?path=packages%2Fvariable-theming)](https://david-dm.org/rafamel/armory.svg?path=packages%2Fvariable-theming)
[![Vulnerabilities](https://img.shields.io/snyk/vulnerabilities/npm/variable-theming.svg)](https://snyk.io/test/npm/variable-theming)
[![License](https://img.shields.io/github/license/rafamel/armory.svg)](https://github.com/rafamel/armory/blob/master/LICENSE)
[![Types](https://img.shields.io/npm/types/variable-theming.svg)](https://www.npmjs.com/package/variable-theming)

> CSS theming based on custom properties.

If you find it useful, consider [starring the project](https://github.com/rafamel/armory/tree/master/packages/variable-theming) 💪 and/or following [its author](https://github.com/rafamel) ❤️ -there's more on the way!

## Install

[`npm install variable-theming`](https://www.npmjs.com/package/variable-theming)

## Usage

* [Documentation](https://rafamel.github.io/armory/variable-theming/globals.html)

[`theming`](https://rafamel.github.io/armory/variable-theming/globals.html#theming) takes a non opinionated approach regarding the contents of your theme.

```javascript
import inject from 'style-inject';
import theming from 'variable-theming';

const mainTheme = {
  custom: {
    primaryPalette: {
      main: 'red',
      dark: 'black',
      light: 'white',
      contrast: 'blue'
    }
  },
  elements: {
    h1: {
      fontSize: '2em',
      color: 'var(--primary-palette-main)',
      background: 'green'
    }
  }
}

const secondaryTheme = {
  custom: {
    primaryPalette: {
      main: 'green',
      dark: 'black',
      light: 'white',
      contrast: 'red'
    }
  },
  elements: {
    h1: {
      fontSize: '1em',
      color: 'var(--primary-palette-main)',
      background: 'yellow'
    }
  }
}

/*
 `elements` properties will be assigned
  to variables on `setup` styles
*/
const { setup, ...main } = theming(
  mainTheme.custom,
  mainTheme.elements
);

/*
  Add setup styles as globals:
    - use setup.css string to create a global <style> tag,
    - or the setup.styles if you're using css-in-js.
  Then, add variable assignments on the :root scope.
*/
inject(setup.css);
inject(`:root { ${main.css} }`);

/*
  We don't need to assign element properties to variables
  anymore as they are already globally set, so we don't need
  to separate element styles and custom properties for setup.
*/
const secondary = theming({
  ...secondaryTheme.elements,
  ...secondaryTheme.custom
});
inject(`.someClassSecondaryWillApplyTo { ${secondary.css} }`);
```