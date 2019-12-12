import flatten from 'flat';
import decamelize from 'decamelize';
import parseValue from './value';
import { Theme, Value } from '~/types';

export default function parseTheme(
  theme: Theme,
  fn: (variable: string, value: string) => void
): void {
  const flat: Record<string, Value> = flatten(theme, { delimiter: '-' });
  const entries = Object.entries(flat);
  for (const [camelName, rawValue] of entries) {
    const name = decamelize(camelName, '-');
    const value = parseValue(rawValue);
    if (value) fn('--' + name, value);
  }
}
