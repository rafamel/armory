import { cache } from './cache';

export interface IAttributes {
  async?: boolean;
  [key: string]: any;
}

export default function load(
  src: string,
  attributes: IAttributes = {}
): Promise<ErrorEvent | null> {
  // Ensure it's a browser environment
  if (typeof window === 'undefined' || typeof window.document === 'undefined') {
    return Promise.reject(Error(`Tried to load a script outside of a browser`));
  }

  if (!cache.hasOwnProperty(src)) {
    cache[src] = new Promise((resolve, reject) => {
      const element = document.createElement('script');

      function handleLoad(): void {
        resolve(null);
        element.removeEventListener('load', handleLoad);
        element.removeEventListener('error', handleError);
      }
      function handleError(e: ErrorEvent): void {
        resolve(e);
        element.removeEventListener('load', handleLoad);
        element.removeEventListener('error', handleError);
      }

      try {
        element.src = src;
        const entries = Object.entries(attributes);
        delete attributes.src;
        for (let [key, value] of entries) {
          (element as any)[key] = value;
        }

        element.addEventListener('load', handleLoad);
        element.addEventListener('error', handleError);
        document.body.appendChild(element);
      } catch (e) {
        reject(e);
      }
    });
  }

  return cache[src];
}
