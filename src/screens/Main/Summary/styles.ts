import { StyleSheet } from 'react-native';
import { colors } from '@theme/colors';
import { fontFamily, typography } from '@theme/fonts';
import { COMMON_STYLES, RADIUS, SPACING } from '@theme/globalStyles';
import { mvs } from '@theme/responsive';

export const styles = StyleSheet.create({
  fill: {
    flex: 1,
    backgroundColor: colors.BACKGROUND,
  },
  content: {
    padding: SPACING.LG,
    paddingBottom: SPACING.XXL,
  },
  heading: {
    ...typography.title,
    color: colors.TEXT_PRIMARY,
  },
  subheading: {
    ...typography.body,
    color: colors.TEXT_SECONDARY,
    marginTop: mvs(2),
    marginBottom: SPACING.LG,
  },
  hero: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: RADIUS.LG,
    padding: SPACING.XL,
    ...COMMON_STYLES.cardElevation,
    shadowColor: colors.GRADIENT_END,
    shadowOpacity: 0.35,
    shadowRadius: mvs(16),
    shadowOffset: { width: 0, height: mvs(8) },
    elevation: 8,
  },
  heroText: {
    flex: 1,
    paddingRight: SPACING.MD,
  },
  heroTitle: {
    ...typography.heading,
    color: colors.WHITE,
  },
  heroSubtitle: {
    ...typography.body,
    color: colors.TEXT_INVERSE_MUTED,
    marginTop: SPACING.XS,
  },
  ringValue: {
    fontFamily: fontFamily.MONTSERRAT_BOLD,
    fontSize: mvs(22),
    color: colors.WHITE,
  },
  ringLabel: {
    ...typography.caption,
    color: colors.TEXT_INVERSE_MUTED,
    marginTop: -mvs(2),
  },
  tileRow: {
    flexDirection: 'row',
    gap: SPACING.MD,
    marginTop: SPACING.LG,
  },
  tile: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.SURFACE,
    borderRadius: RADIUS.LG,
    paddingVertical: SPACING.LG,
    paddingHorizontal: SPACING.SM,
    ...COMMON_STYLES.cardElevation,
  },
  tileIcon: {
    width: mvs(40),
    height: mvs(40),
    borderRadius: RADIUS.PILL,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.SM,
  },
  tileValue: {
    ...typography.title,
    color: colors.TEXT_PRIMARY,
  },
  tileLabel: {
    ...typography.caption,
    color: colors.TEXT_SECONDARY,
    marginTop: mvs(2),
  },
  progressCard: {
    backgroundColor: colors.SURFACE,
    borderRadius: RADIUS.LG,
    padding: SPACING.LG,
    marginTop: SPACING.LG,
    ...COMMON_STYLES.cardElevation,
  },
  progressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  progressTitle: {
    ...typography.heading,
    color: colors.TEXT_PRIMARY,
  },
  progressPercent: {
    ...typography.label,
    color: colors.PRIMARY,
  },
  progressTrackWrap: {
    marginTop: SPACING.MD,
  },
  progressNote: {
    ...typography.body,
    color: colors.TEXT_SECONDARY,
    marginTop: SPACING.MD,
  },
});
