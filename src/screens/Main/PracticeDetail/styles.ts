import { StyleSheet } from 'react-native';
import { colors } from '@theme/colors';
import { typography } from '@theme/fonts';
import { RADIUS, SPACING } from '@theme/globalStyles';
import { mvs } from '@theme/responsive';

export const styles = StyleSheet.create({
  fill: {
    flex: 1,
    backgroundColor: colors.BACKGROUND,
  },
  content: {
    padding: SPACING.LG,
    gap: SPACING.MD,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pill: {
    paddingHorizontal: SPACING.MD,
    paddingVertical: mvs(4),
    borderRadius: RADIUS.PILL,
  },
  pillText: {
    ...typography.caption,
    color: colors.TEXT_INVERSE,
    textTransform: 'capitalize',
  },
  duration: {
    ...typography.label,
    color: colors.TEXT_SECONDARY,
  },
  title: {
    ...typography.title,
    color: colors.TEXT_PRIMARY,
  },
  description: {
    ...typography.body,
    color: colors.TEXT_SECONDARY,
    lineHeight: mvs(22),
  },
  section: { marginTop: SPACING.SM },
  sectionLabel: {
    ...typography.label,
    color: colors.TEXT_SECONDARY,
    textTransform: 'uppercase',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.XS,
    marginTop: SPACING.XS,
  },
  statusText: {
    ...typography.heading,
    color: colors.TEXT_PRIMARY,
  },
  helper: {
    ...typography.body,
    color: colors.TEXT_SECONDARY,
    marginTop: SPACING.XS,
    marginBottom: SPACING.SM,
  },
  actionButton: { marginTop: SPACING.MD },
});
