import { Dimensions, PixelRatio, Platform } from 'react-native';

const width = Math.round(Dimensions.get('window').width);
const height = Math.round(Dimensions.get('window').height);

const guidelineBaseWidth = 360;
const guidelineBaseHeight = 800;

export const scale = (size: number) => (width / guidelineBaseWidth) * size;

export const vs = (size: number) => (height / guidelineBaseHeight) * size;

export const ms = (size: number, factor = 0.5) => size + (scale(size) - size) * factor;

export const mvs = (size: number, factor = Platform.OS === 'android' ? 0.7 : 0.5) =>
  PixelRatio.roundToNearestPixel(size + (vs(size) - size) * factor);

export const isTablet = Math.min(width, height) >= 600;

export const rsv = <T>(phone: T, tablet: T): T => (isTablet ? tablet : phone);

export const SCREEN_WIDTH = width;
export const SCREEN_HEIGHT = height;
