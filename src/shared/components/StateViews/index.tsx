import { ActivityIndicator, Text, View } from 'react-native';
import { AnySvg } from '@components/AnySvg';
import { Button } from '@components/Button';
import { colors } from '@theme/colors';
import { mvs } from '@theme/responsive';
import { styles } from './styles';

interface LoadingStateProps {
  label?: string;
}

interface ErrorStateProps {
  message?: string;
  onRetry: () => void;
}

interface EmptyStateProps {
  title?: string;
  message?: string;
}

export const LoadingState = ({ label = 'Loading practices…' }: LoadingStateProps) => (
  <View style={styles.center} testID="loading-state">
    <ActivityIndicator size="large" color={colors.PRIMARY} />
    <Text style={styles.message}>{label}</Text>
  </View>
);

export const ErrorState = ({ message, onRetry }: ErrorStateProps) => (
  <View style={styles.center} testID="error-state">
    <AnySvg name="warning" size={mvs(48)} color={colors.DANGER} />
    <Text style={styles.title}>Something went wrong</Text>
    <Text style={styles.message}>{message ?? 'We couldn’t load your practices.'}</Text>
    <Button label="Try again" onPress={onRetry} />
  </View>
);

export const EmptyState = ({
  title = 'No practices yet',
  message = 'When practices are added, they’ll show up here.',
}: EmptyStateProps) => (
  <View style={styles.center} testID="empty-state">
    <AnySvg name="sprout" size={mvs(48)} color={colors.SUCCESS} />
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.message}>{message}</Text>
  </View>
);
