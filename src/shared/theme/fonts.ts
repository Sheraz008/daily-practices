import type { TextStyle } from 'react-native';
import { mvs } from './responsive';

export const fontFamily = {
  LIGHT: 'Poppins-Light',
  REGULAR: 'Poppins-Regular',
  MEDIUM: 'Poppins-Medium',
  SEMIBOLD: 'Poppins-SemiBold',
  BOLD: 'Poppins-Bold',
  MONTSERRAT_REGULAR: 'Montserrat-Regular',
  MONTSERRAT_MEDIUM: 'Montserrat-Medium',
  MONTSERRAT_SEMIBOLD: 'Montserrat-SemiBold',
  MONTSERRAT_BOLD: 'Montserrat-Bold',
} as const;

export const fontSize = {
  FONT_28: mvs(28),
  FONT_18: mvs(18),
  FONT_16: mvs(16),
  FONT_14: mvs(14),
  FONT_13: mvs(13),
  FONT_12: mvs(12),
} as const;

export const typography = {
  display: { fontSize: fontSize.FONT_28, fontFamily: fontFamily.MONTSERRAT_BOLD },
  title: { fontSize: fontSize.FONT_18, fontFamily: fontFamily.MONTSERRAT_BOLD },
  heading: { fontSize: fontSize.FONT_16, fontFamily: fontFamily.MONTSERRAT_SEMIBOLD },
  body: { fontSize: fontSize.FONT_14, fontFamily: fontFamily.REGULAR },
  label: { fontSize: fontSize.FONT_13, fontFamily: fontFamily.SEMIBOLD },
  caption: { fontSize: fontSize.FONT_12, fontFamily: fontFamily.MEDIUM },
} satisfies Record<string, TextStyle>;
