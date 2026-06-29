import { StyleSheet } from 'react-native';
import { colors } from '@theme/colors';
import { fontFamily, fontSize } from '@theme/fonts';
import { RADIUS, SPACING } from '@theme/globalStyles';
import { mvs } from '@theme/responsive';

export const styles = StyleSheet.create({
  base: {
    minHeight: mvs(48),
    borderRadius: RADIUS.MD,
    paddingHorizontal: SPACING.LG,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  primary: { backgroundColor: colors.PRIMARY },
  primaryPressed: { backgroundColor: colors.PRIMARY_PRESSED },
  primaryDisabled: { backgroundColor: colors.PRIMARY_DISABLED },
  secondary: {
    backgroundColor: colors.SURFACE,
    borderWidth: 1,
    borderColor: colors.PRIMARY,
  },
  secondaryPressed: { backgroundColor: colors.SURFACE_MUTED },
  secondaryDisabled: { borderColor: colors.PRIMARY_DISABLED },
  label: {
    fontSize: fontSize.FONT_14,
    fontFamily: fontFamily.SEMIBOLD,
  },
  labelPrimary: { color: colors.TEXT_INVERSE },
  labelSecondary: { color: colors.PRIMARY },
  labelSpaced: { marginLeft: SPACING.XS },
});
