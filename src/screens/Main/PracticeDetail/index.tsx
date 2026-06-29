import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { memo } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AnySvg } from '@components/AnySvg';
import { Button } from '@components/Button';
import { Card } from '@components/Card';
import { StarRating } from '@components/StarRating';
import { EmptyState, LoadingState } from '@components/StateViews';
import { categoryColors, colors } from '@theme/colors';
import { mvs } from '@theme/responsive';
import type { PracticesStackParamList } from '@navigations/types';
import { usePracticeDetail } from './usePracticeDetail';
import { styles } from './styles';

type Props = NativeStackScreenProps<PracticesStackParamList, 'PracticeDetail'>;

const PracticeDetail = ({ route }: Props) => {
  const { practice, isLoading, onToggleComplete, onRate } = usePracticeDetail(route.params.id);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.fill} edges={['bottom']}>
        <LoadingState label="Loading practice…" />
      </SafeAreaView>
    );
  }

  if (!practice) {
    return (
      <SafeAreaView style={styles.fill} edges={['bottom']}>
        <EmptyState title="Practice not found" message="This practice may no longer exist." />
      </SafeAreaView>
    );
  }

  const accent = categoryColors[practice.category];

  return (
    <SafeAreaView style={styles.fill} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.headerRow}>
          <View style={[styles.pill, { backgroundColor: accent }]}>
            <Text style={styles.pillText}>{practice.category}</Text>
          </View>
          <Text style={styles.duration}>{practice.duration_minutes} min</Text>
        </View>

        <Text style={styles.title}>{practice.title}</Text>
        <Text style={styles.description}>{practice.description}</Text>

        <Card style={styles.section}>
          <Text style={styles.sectionLabel}>Status</Text>
          <View style={styles.statusRow}>
            {practice.completed_today ? (
              <AnySvg name="check" size={mvs(18)} color={colors.SUCCESS} />
            ) : null}
            <Text style={styles.statusText}>
              {practice.completed_today ? 'Completed today' : 'Not completed yet'}
            </Text>
          </View>
          <Button
            label={practice.completed_today ? 'Mark as not done' : 'Mark complete'}
            iconName={practice.completed_today ? undefined : 'check'}
            variant={practice.completed_today ? 'secondary' : 'primary'}
            onPress={onToggleComplete}
            style={styles.actionButton}
            testID="mark-complete-button"
          />
        </Card>

        <Card style={styles.section}>
          <Text style={styles.sectionLabel}>Your rating</Text>
          <Text style={styles.helper}>
            {practice.rating ? `You rated this ${practice.rating}/5` : 'Tap a star to rate'}
          </Text>
          <StarRating value={practice.rating} onChange={onRate} testID="rating" />
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

export default memo(PracticeDetail);
