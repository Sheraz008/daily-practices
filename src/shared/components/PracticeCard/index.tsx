import { memo } from 'react';
import { Text, View } from 'react-native';
import { AnySvg } from '@components/AnySvg';
import { Card } from '@components/Card';
import { StarRating } from '@components/StarRating';
import { categoryColors, colors } from '@theme/colors';
import { mvs } from '@theme/responsive';
import type { Practice } from '@sharedTypes/practice';
import { styles } from './styles';

interface PracticeCardProps {
  practice: Practice;
  onPress: (id: string) => void;
}

const PracticeCardComponent = ({ practice, onPress }: PracticeCardProps) => {
  const accent = categoryColors[practice.category];

  return (
    <Card
      accentColor={accent}
      onPress={() => onPress(practice.id)}
      accessibilityLabel={`${practice.title}, ${practice.category}, ${practice.duration_minutes} minutes${
        practice.completed_today ? ', completed' : ''
      }`}
      testID={`practice-card-${practice.id}`}
    >
      <View style={styles.headerRow}>
        <Text style={styles.title} numberOfLines={1}>
          {practice.title}
        </Text>
        {practice.completed_today ? (
          <View style={styles.doneBadge}>
            <AnySvg name="check" size={mvs(12)} color={colors.TEXT_INVERSE} />
            <Text style={styles.doneBadgeText}>Done</Text>
          </View>
        ) : null}
      </View>

      <Text style={styles.description} numberOfLines={2}>
        {practice.description}
      </Text>

      <View style={styles.metaRow}>
        <View style={[styles.pill, { backgroundColor: accent }]}>
          <Text style={styles.pillText}>{practice.category}</Text>
        </View>
        <Text style={styles.duration}>{practice.duration_minutes} min</Text>
        <View style={styles.spacer} />
        <StarRating value={practice.rating} size={mvs(14)} />
      </View>
    </Card>
  );
};

const areEqual = (prev: PracticeCardProps, next: PracticeCardProps) => {
  const a = prev.practice;
  const b = next.practice;
  return (
    prev.onPress === next.onPress &&
    a.id === b.id &&
    a.title === b.title &&
    a.description === b.description &&
    a.duration_minutes === b.duration_minutes &&
    a.category === b.category &&
    a.completed_today === b.completed_today &&
    a.rating === b.rating
  );
};

export const PracticeCard = memo(PracticeCardComponent, areEqual);
