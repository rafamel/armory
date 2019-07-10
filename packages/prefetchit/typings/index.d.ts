/**
 * @module Prefetchit
 */

declare const prefetchit: {
  add(asset: string): void;
  bulk(...asset: string): void;
};

export default prefetchit;
