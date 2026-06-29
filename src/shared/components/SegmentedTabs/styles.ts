import { StyleSheet } from 'react-native';
import { colors } from '@theme/colors';
import { typography } from '@theme/fonts';
import { RADIUS, SPACING } from '@theme/globalStyles';
import { mvs } from '@theme/responsive';

export const styles = StyleSheet.create({
  bar: {
    flexGrow: 0,
    flexShrink: 0,
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: SPACING.LG,
    paddingVertical: SPACING.SM,
    gap: SPACING.SM,
  },
  tab: {
    paddingHorizontal: SPACING.LG,
    paddingVertical: mvs(8),
    borderRadius: RADIUS.PILL,
    borderWidth: 1,
    borderColor: colors.BORDER,
    backgroundColor: colors.SURFACE,
  },
  tabActive: {
    backgroundColor: colors.PRIMARY,
    borderColor: colors.PRIMARY,
  },
  label: {
    ...typography.label,
    color: colors.TEXT_SECONDARY,
  },
  labelActive: {
    color: colors.TEXT_INVERSE,
  },
});
