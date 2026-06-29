import { memo } from 'react';
import {
  ActivityIndicator,
  Pressable,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { AnySvg, type IconName } from '@components/AnySvg';
import { colors } from '@theme/colors';
import { mvs } from '@theme/responsive';
import { styles } from './styles';

type ButtonVariant = 'primary' | 'secondary';

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  loading?: boolean;
  iconName?: IconName;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

const ButtonComponent = ({
  label,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  iconName,
  style,
  testID,
}: ButtonProps) => {
  const isDisabled = disabled || loading;
  const isPrimary = variant === 'primary';
  const tint = isPrimary ? colors.TEXT_INVERSE : colors.PRIMARY;

  return (
    <Pressable
      testID={testID}
      onPress={onPress}
      disabled={isDisabled}
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      accessibilityLabel={label}
      style={({ pressed }) => [
        styles.base,
        isPrimary ? styles.primary : styles.secondary,
        pressed && !isDisabled && (isPrimary ? styles.primaryPressed : styles.secondaryPressed),
        isDisabled && (isPrimary ? styles.primaryDisabled : styles.secondaryDisabled),
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={tint} />
      ) : (
        <View style={styles.content}>
          {iconName ? <AnySvg name={iconName} size={mvs(18)} color={tint} /> : null}
          <Text
            style={[
              styles.label,
              isPrimary ? styles.labelPrimary : styles.labelSecondary,
              iconName ? styles.labelSpaced : null,
            ]}
          >
            {label}
          </Text>
        </View>
      )}
    </Pressable>
  );
};

export const Button = memo(ButtonComponent);
