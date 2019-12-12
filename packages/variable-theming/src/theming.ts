import parseTheme from './parse/theme';
import { Theme, SetupOutput, Output, Elements, Setup } from '~/types';

export function theming(theme: Theme | null, elements: Elements): SetupOutput;
export function theming(theme: Theme | null, elements?: Elements): Output;
/**
 * Generates styles as an object -`styles`- and as a string -`css`- assigning css variables to their defined values. You can then inject these for usage in your css.
 *
 * If a second object is passed, it will also generate `setup` styles, assigning property values for all elements with names of `elements` keys to their respective variable.
 */
export function theming(
  theme: Theme | null,
  elements?: Elements
): Output | SetupOutput {
  const base: Output = { css: '', styles: {} };
  const setup: Setup = { css: '', styles: {} };

  if (theme) {
    parseTheme(theme, (variable, value) => {
      base.css += `\n${variable}: ${value};`;
      base.styles[variable] = value;
    });
  }

  if (elements) {
    parseTheme(elements, (variable, value) => {
      base.css += `\n${variable}: ${value};`;
      base.styles[variable] = value;

      const [name, ...arr] = variable.slice(2).split('-');
      const property = arr.join('-');

      if (!setup.styles[name]) setup.styles[name] = {};
      setup.styles[name][property] = `var(${variable});`;
      setup.css += `\n${name} { ${property}: var(${variable}); }`;
    });
  }

  base.css = base.css.trim();
  setup.css = setup.css.trim();

  return elements ? Object.assign(base, { setup }) : base;
}
