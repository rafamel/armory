import { Value } from '~/types';

export default function parseValue(value: Value): string | undefined {
  return ['string', 'number'].includes(typeof value) || value
    ? String(value)
    : undefined;
}
