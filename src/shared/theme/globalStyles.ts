import { StyleSheet } from 'react-native';
import { colors } from './colors';
import { mvs } from './responsive';

export const SPACING = {
  XS: mvs(4),
  SM: mvs(8),
  MD: mvs(12),
  LG: mvs(16),
  XL: mvs(24),
  XXL: mvs(32),
} as const;

export const RADIUS = {
  SM: mvs(8),
  MD: mvs(12),
  LG: mvs(16),
  PILL: mvs(999),
} as const;

export const COMMON_STYLES = StyleSheet.create({
  fill: {
    flex: 1,
    backgroundColor: colors.BACKGROUND,
  },
  centerAlign: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowDirection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardElevation: {
    shadowColor: colors.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: mvs(8),
    elevation: 2,
  },
});
