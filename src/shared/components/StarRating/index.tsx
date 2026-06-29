import { memo } from 'react';
import { Pressable, View } from 'react-native';
import { AnySvg } from '@components/AnySvg';
import { colors } from '@theme/colors';
import { mvs } from '@theme/responsive';
import type { Rating } from '@sharedTypes/practice';
import { styles } from './styles';

interface StarRatingProps {
  value: Rating;
  onChange?: (rating: Exclude<Rating, null>) => void;
  size?: number;
  testID?: string;
}

const STARS = [1, 2, 3, 4, 5] as const;

const StarRatingComponent = ({ value, onChange, size = mvs(32), testID }: StarRatingProps) => {
  const interactive = typeof onChange === 'function';

  return (
    <View
      style={styles.row}
      testID={testID}
      accessibilityRole={interactive ? 'adjustable' : 'image'}
      accessibilityLabel={value ? `Rated ${value} of 5 stars` : 'Not rated'}
    >
      {STARS.map((star) => {
        const filled = value !== null && star <= value;
        const glyph = (
          <AnySvg
            name={filled ? 'star' : 'starOutline'}
            size={size}
            color={filled ? colors.STAR : colors.STAR_EMPTY}
          />
        );

        if (!interactive) {
          return <View key={star}>{glyph}</View>;
        }

        return (
          <Pressable
            key={star}
            testID={`${testID ?? 'star'}-${star}`}
            onPress={() => onChange?.(star)}
            accessibilityRole="button"
            accessibilityLabel={`Rate ${star} ${star === 1 ? 'star' : 'stars'}`}
            hitSlop={6}
            style={styles.tap}
          >
            {glyph}
          </Pressable>
        );
      })}
    </View>
  );
};

export const StarRating = memo(StarRatingComponent);
