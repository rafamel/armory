/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { readableColor, lighten, darken, parseToRgb } from 'polished';
import { RgbColor } from 'polished/lib/types/color';

/**
 * Define the parameters for color assignment from
 * `PaletteInput.main` in the absence of explicit colors.
 */
export interface PaletteOptions {
  /**
   * Default: `'#fafafa'`
   */
  contrastLight?: string;
  /**
   * Default: `'#2e2e2e'`
   */
  contrastDark?: string;
  /**
   * Default: `0.2`
   */
  tintBy?: number;
  /**
   * Default: `0.1`
   */
  shadeBy?: number;
}

export interface PaletteInput {
  main: string;
  contrast?: string;
  tint?: string;
  shade?: string;
  accent?: string;
}

export type Palette = Required<PaletteInput> &
  Record<'mainRgb' | 'contrastRgb', string>;

export interface MuiPalette {
  main: string;
  light: string;
  dark: string;
  contrastText: string;
}

/**
 * Returns a function that, taking a record of `PaletteInput`s,
 * returns a record of complete `Palettes`.
 */
export function palettes(options?: PaletteOptions) {
  const opts = Object.assign(
    {
      contrastLight: '#fafafa',
      contrastDark: '#2e2e2e',
      tintBy: 0.2,
      shadeBy: 0.1
    },
    options
  );

  return function create<T extends Record<string, PaletteInput>>(
    items: T
  ): { [P in keyof T]: Palette } {
    const entries = Object.entries(items);
    const response: { [P in keyof T]?: Palette } = {};

    for (const [name, palette] of entries) {
      const main = palette.main;
      const contrast =
        palette.contrast ||
        readableColor(main, opts.contrastLight, opts.contrastDark);
      const mainRgb = parseToRgb(main);
      const contrastRgb = parseToRgb(contrast);

      response[name as keyof T] = {
        main,
        contrast,
        tint: palette.tint || lighten(opts.tintBy, main),
        shade: palette.shade || darken(opts.shadeBy, main),
        accent:
          palette.accent ||
          readableColor(
            main,
            darken(opts.shadeBy, contrast),
            lighten(opts.tintBy, contrast)
          ),
        mainRgb: `${mainRgb.red}, ${mainRgb.green}, ${mainRgb.blue}`,
        contrastRgb: `${contrastRgb.red}, ${contrastRgb.green}, ${contrastRgb.blue}`
      };
    }

    return response as { [P in keyof T]: Palette };
  };
}

/**
 * Creates a `Material UI` compatible palette from a `Palette`
 */
palettes.mui = function muiPalettes<T extends Record<string, Palette>>(
  palettes: T
): { [P in keyof T]: MuiPalette } {
  const toRgb = (color: RgbColor & { alpha?: number }): string =>
    Object.hasOwnProperty.call(color, 'alpha')
      ? `rgba(${color.red}, ${color.green}, ${color.blue}, ${color.alpha})`
      : `rgb(${color.red}, ${color.green}, ${color.blue})`;

  const entries: Array<[keyof T, Palette]> = Object.entries(palettes);
  const response: { [P in keyof T]?: MuiPalette } = {};

  for (const [key, value] of entries) {
    response[key] = {
      main: toRgb(parseToRgb(value.main)),
      light: toRgb(parseToRgb(value.tint)),
      dark: toRgb(parseToRgb(value.shade)),
      contrastText: toRgb(parseToRgb(value.contrast))
    };
  }

  return response as { [P in keyof T]: MuiPalette };
};
