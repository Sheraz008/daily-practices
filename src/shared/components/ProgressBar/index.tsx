import { memo, useEffect, useRef } from 'react';
import { Animated, Easing, View } from 'react-native';
import { styles } from './styles';

interface ProgressBarProps {
  progress: number;
  height: number;
  trackColor: string;
  fillColor: string;
  duration?: number;
}

const clamp = (value: number) => Math.max(0, Math.min(1, value));

const ProgressBarComponent = ({
  progress,
  height,
  trackColor,
  fillColor,
  duration = 800,
}: ProgressBarProps) => {
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(anim, {
      toValue: clamp(progress),
      duration,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  }, [anim, progress, duration]);

  const width = anim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={[styles.track, { height, borderRadius: height / 2, backgroundColor: trackColor }]}>
      <Animated.View
        style={[styles.fill, { width, borderRadius: height / 2, backgroundColor: fillColor }]}
      />
    </View>
  );
};

export const ProgressBar = memo(ProgressBarComponent);
