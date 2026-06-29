import { StyleSheet } from 'react-native';
import { colors } from '@theme/colors';
import { typography } from '@theme/fonts';
import { RADIUS, SPACING } from '@theme/globalStyles';
import { mvs } from '@theme/responsive';

export const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    ...typography.heading,
    color: colors.TEXT_PRIMARY,
    flexShrink: 1,
    paddingRight: SPACING.SM,
  },
  description: {
    ...typography.body,
    color: colors.TEXT_SECONDARY,
    marginTop: SPACING.XS,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SPACING.MD,
  },
  pill: {
    paddingHorizontal: SPACING.SM,
    paddingVertical: mvs(2),
    borderRadius: RADIUS.PILL,
  },
  pillText: {
    ...typography.caption,
    color: colors.TEXT_INVERSE,
    textTransform: 'capitalize',
  },
  duration: {
    ...typography.caption,
    color: colors.TEXT_SECONDARY,
    marginLeft: SPACING.SM,
  },
  spacer: { flex: 1 },
  doneBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: mvs(3),
    backgroundColor: colors.SUCCESS,
    paddingHorizontal: SPACING.SM,
    paddingVertical: mvs(2),
    borderRadius: RADIUS.PILL,
  },
  doneBadgeText: {
    ...typography.caption,
    color: colors.TEXT_INVERSE,
  },
});
