export interface ICache {
  [key: string]: Promise<ErrorEvent | null>;
}

export const cache: ICache = {};
