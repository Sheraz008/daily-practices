import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { useCallback, useEffect } from 'react';
import type { SegmentedTab } from '@components/SegmentedTabs';
import { useColumns } from '@hooks/useColumns';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import {
  fetchPractices,
  selectCategory,
  selectHasMore,
  selectIsLoadingMore,
  selectIsRefreshing,
  selectListStatus,
  selectPage,
  selectPractices,
  selectPracticesError,
  selectTotal,
  setCategory,
} from '@redux/reducers/practicesSlice';
import type { CategoryFilter } from '@sharedTypes/practice';
import type { PracticesStackParamList } from '@navigations/types';

type Navigation = NativeStackNavigationProp<PracticesStackParamList, 'PracticesList'>;

export const CATEGORY_TABS: ReadonlyArray<SegmentedTab<CategoryFilter>> = [
  { key: 'all', label: 'All' },
  { key: 'movement', label: 'Movement' },
  { key: 'breath', label: 'Breath' },
  { key: 'reflection', label: 'Reflection' },
  { key: 'rest', label: 'Rest' },
];

export const usePracticesList = () => {
  const navigation = useNavigation<Navigation>();
  const dispatch = useAppDispatch();

  const practices = useAppSelector(selectPractices);
  const status = useAppSelector(selectListStatus);
  const error = useAppSelector(selectPracticesError);
  const hasMore = useAppSelector(selectHasMore);
  const isRefreshing = useAppSelector(selectIsRefreshing);
  const isLoadingMore = useAppSelector(selectIsLoadingMore);
  const page = useAppSelector(selectPage);
  const total = useAppSelector(selectTotal);
  const category = useAppSelector(selectCategory);
  const { columns } = useColumns();

  useEffect(() => {
    if (status === 'idle') dispatch(fetchPractices({ page: 1, mode: 'initial' }));
  }, [status, dispatch]);

  const onChangeCategory = useCallback(
    (next: CategoryFilter) => {
      if (next === category) return;
      dispatch(setCategory(next));
      dispatch(fetchPractices({ page: 1, mode: 'refresh' }));
    },
    [category, dispatch],
  );

  const onRefresh = useCallback(() => {
    dispatch(fetchPractices({ page: 1, mode: 'refresh' }));
  }, [dispatch]);

  const onRetry = useCallback(() => {
    dispatch(fetchPractices({ page: 1, mode: 'initial' }));
  }, [dispatch]);

  const onEndReached = useCallback(() => {
    if (hasMore && !isLoadingMore && status === 'succeeded') {
      dispatch(fetchPractices({ page: page + 1, mode: 'more' }));
    }
  }, [hasMore, isLoadingMore, status, page, dispatch]);

  const onPressPractice = useCallback(
    (id: string) => {
      const practice = practices.find((p) => p.id === id);
      navigation.navigate('PracticeDetail', { id, title: practice?.title ?? 'Practice' });
    },
    [practices, navigation],
  );

  return {
    practices,
    columns,
    category,
    total,
    isLoading: status === 'loading',
    isError: status === 'failed',
    isRefreshing,
    isLoadingMore,
    hasMore,
    error,
    onChangeCategory,
    onRefresh,
    onRetry,
    onEndReached,
    onPressPractice,
  };
};
