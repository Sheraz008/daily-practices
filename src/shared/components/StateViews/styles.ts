import { StyleSheet } from 'react-native';
import { colors } from '@theme/colors';
import { typography } from '@theme/fonts';
import { SPACING } from '@theme/globalStyles';

export const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.XL,
    gap: SPACING.MD,
  },
  title: { ...typography.heading, color: colors.TEXT_PRIMARY, textAlign: 'center' },
  message: { ...typography.body, color: colors.TEXT_SECONDARY, textAlign: 'center' },
});
