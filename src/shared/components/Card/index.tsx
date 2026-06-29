import { memo, type ReactNode } from 'react';
import { Pressable, View, type StyleProp, type ViewStyle } from 'react-native';
import { styles } from './styles';

interface CardProps {
  children: ReactNode;
  onPress?: () => void;
  accentColor?: string;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
  testID?: string;
}

const CardComponent = ({
  children,
  onPress,
  accentColor,
  style,
  accessibilityLabel,
  testID,
}: CardProps) => {
  const inner = (
    <View style={styles.inner}>
      {accentColor ? <View style={[styles.accent, { backgroundColor: accentColor }]} /> : null}
      <View style={styles.content}>{children}</View>
    </View>
  );

  if (!onPress) {
    return (
      <View style={[styles.card, style]} testID={testID}>
        {inner}
      </View>
    );
  }

  return (
    <Pressable
      testID={testID}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      style={({ pressed }) => [styles.card, pressed && styles.pressed, style]}
    >
      {inner}
    </Pressable>
  );
};

export const Card = memo(CardComponent);
