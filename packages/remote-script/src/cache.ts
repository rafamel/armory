export interface Cache {
  [key: string]: Promise<ErrorEvent | null>;
}

export const cache: Cache = {};
