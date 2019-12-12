export type Value = string | number | null | undefined | void;

export type Elements = Record<string, Record<string, Value>>;

export interface Theme {
  [key: string]: Theme | Value;
}

export interface Output {
  css: string;
  styles: Record<string, string>;
}

export interface Setup {
  css: string;
  styles: Record<string, Record<string, string>>;
}

export interface SetupOutput extends Output {
  setup: Setup;
}
