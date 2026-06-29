import { StyleSheet } from 'react-native';
import { colors } from '@theme/colors';
import { SPACING } from '@theme/globalStyles';

export const styles = StyleSheet.create({
  fill: {
    flex: 1,
    backgroundColor: colors.BACKGROUND,
  },
  listContent: {
    paddingHorizontal: SPACING.SM,
    paddingVertical: SPACING.MD,
  },
  cell: {
    flex: 1,
    paddingHorizontal: SPACING.SM,
    paddingBottom: SPACING.MD,
  },
  footer: {
    paddingVertical: SPACING.LG,
    alignItems: 'center',
  },
});
