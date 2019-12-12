# variable-theming

[![Version](https://img.shields.io/npm/v/variable-theming.svg)](https://www.npmjs.com/package/variable-theming)
[![Build Status](https://img.shields.io/travis/rafamel/armory/master.svg)](https://travis-ci.org/rafamel/armory)
[![Coverage](https://img.shields.io/coveralls/rafamel/armory/master.svg)](https://coveralls.io/github/rafamel/armory)
[![Dependencies](https://img.shields.io/david/rafamel/armory.svg?path=packages%2Fvariable-theming)](https://david-dm.org/rafamel/armory.svg?path=packages%2Fvariable-theming)
[![Vulnerabilities](https://img.shields.io/snyk/vulnerabilities/npm/variable-theming.svg)](https://snyk.io/test/npm/variable-theming)
[![License](https://img.shields.io/github/license/rafamel/armory.svg)](https://github.com/rafamel/armory/blob/master/LICENSE)
[![Types](https://img.shields.io/npm/types/variable-theming.svg)](https://www.npmjs.com/package/variable-theming)

> CSS theming based on custom properties.

## Install

[`npm install variable-theming`](https://www.npmjs.com/package/variable-theming)

## Usage

* [Documentation](https://rafamel.github.io/armory/variable-theming/globals.html)

### Theming

[`theming`](https://rafamel.github.io/armory/variable-theming/globals.html#theming) takes a non opinionated approach regarding the contents of your theme.

```javascript
import inject from 'style-inject';
import theming from 'variable-theming';

const mainTheme = {
  custom: {
    primaryPalette: {
      main: 'red',
      contrast: 'blue',
      tint: 'white',
      shade: 'black'
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
      contrast: 'red',
      tint: 'white',
      shade: 'black'
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

### Palettes

#### `palettes(options?: PaletteOptions): Function`

Returns a function that, taking a record of `PaletteInput`s, returns a record of complete `Palettes`.

```javascript
import { palettes, theming } from 'variable-theming';

const theme = theming({
  unit: { text: '1rem', space: '1rem', radius: '0.5rem' },
  palette: palettes()({
    primary: { 
      main: 'rgba(49, 50, 52, 0.85)',
      tint: '#B2B2B2',
      contrast: '#fafafa'
    },
    dark: {
      main: '#222428',
      tint: '#383a3e',
      shade: '#1e2023' 
    },
    light: {
      main: '#fafafa',
      contrast: 'rgba(49, 50, 52, 0.85)',
      shade: '#f5f5f5',
      accent: '#B2B2B2'
    }
  })
});
```

#### `palettes.mui(palettes: Record<string, Palette>): Record<string, MuiPalette>`

Creates a `Material UI` compatible palette from a `Palette`.

```javascript
import { palettes } from 'variable-theming';
import { createMuiTheme } from '@material-ui/core/styles';

const mui = createMuiTheme({
  palette: palettes.mui(
    palettes()({
      dark: {
        main: '#222428',
        tint: '#383a3e',
        shade: '#1e2023' 
      },
      light: {
        main: '#fafafa',
        contrast: 'rgba(49, 50, 52, 0.85)',
        shade: '#f5f5f5',
        accent: '#B2B2B2'
      }
    })
  )
});
```
