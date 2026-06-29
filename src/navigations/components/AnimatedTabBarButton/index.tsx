import type { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import { useRef } from 'react';
import { Animated, Pressable, type GestureResponderEvent } from 'react-native';
import { styles } from './styles';

export const AnimatedTabBarButton = ({
  children,
  onPress,
  onLongPress,
  accessibilityState,
  accessibilityLabel,
  testID,
}: BottomTabBarButtonProps) => {
  const scale = useRef(new Animated.Value(1)).current;

  const animateTo = (value: number) =>
    Animated.spring(scale, {
      toValue: value,
      useNativeDriver: true,
      speed: 40,
      bounciness: 10,
    }).start();

  return (
    <Pressable
      onPress={(event: GestureResponderEvent) => onPress?.(event)}
      onLongPress={onLongPress ?? undefined}
      onPressIn={() => animateTo(0.86)}
      onPressOut={() => animateTo(1)}
      accessibilityRole="button"
      accessibilityState={accessibilityState}
      accessibilityLabel={accessibilityLabel}
      testID={testID}
      style={styles.button}
    >
      <Animated.View style={[styles.content, { transform: [{ scale }] }]}>{children}</Animated.View>
    </Pressable>
  );
};
