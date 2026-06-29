import { StyleSheet } from 'react-native';
import { colors } from '@theme/colors';
import { RADIUS, SPACING } from '@theme/globalStyles';
import { mvs } from '@theme/responsive';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.SURFACE,
    borderRadius: RADIUS.LG,
    borderWidth: 1,
    borderColor: colors.BORDER,
    overflow: 'hidden',
  },
  pressed: { backgroundColor: colors.SURFACE_MUTED },
  inner: { flexDirection: 'row' },
  accent: { width: mvs(5) },
  content: { flex: 1, padding: SPACING.LG },
});
