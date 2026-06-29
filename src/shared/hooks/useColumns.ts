import { useWindowDimensions } from 'react-native';

const WIDE_BREAKPOINT = 700;

export const useColumns = (): { columns: number; isWide: boolean; width: number } => {
  const { width } = useWindowDimensions();
  const isWide = width >= WIDE_BREAKPOINT;
  return { columns: isWide ? 2 : 1, isWide, width };
};
