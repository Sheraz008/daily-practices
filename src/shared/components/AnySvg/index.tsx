import { memo } from 'react';
import type { SvgProps } from 'react-native-svg';
import { mvs } from '@theme/responsive';
import Chart from '@assets/svgs/chart.svg';
import Check from '@assets/svgs/check.svg';
import Meditation from '@assets/svgs/meditation.svg';
import Sprout from '@assets/svgs/sprout.svg';
import Star from '@assets/svgs/star.svg';
import StarOutline from '@assets/svgs/star-outline.svg';
import Warning from '@assets/svgs/warning.svg';

const REGISTRY = {
  star: Star,
  starOutline: StarOutline,
  check: Check,
  warning: Warning,
  sprout: Sprout,
  meditation: Meditation,
  chart: Chart,
} as const;

export type IconName = keyof typeof REGISTRY;

interface AnySvgProps extends SvgProps {
  name: IconName;
  size?: number;
  color?: string;
}

const AnySvgComponent = ({ name, size = mvs(20), color, ...rest }: AnySvgProps) => {
  const Glyph = REGISTRY[name];
  return <Glyph width={size} height={size} color={color} {...rest} />;
};

export const AnySvg = memo(AnySvgComponent);
