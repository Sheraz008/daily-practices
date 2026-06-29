import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import {
  fetchSummary,
  selectSummary,
  selectSummaryStatus,
} from '@redux/reducers/practicesSlice';

export const useSummary = () => {
  const dispatch = useAppDispatch();
  const summary = useAppSelector(selectSummary);
  const status = useAppSelector(selectSummaryStatus);

  useFocusEffect(
    useCallback(() => {
      dispatch(fetchSummary());
    }, [dispatch]),
  );

  const onRetry = useCallback(() => {
    dispatch(fetchSummary());
  }, [dispatch]);

  return {
    summary,
    isLoading: !summary && status !== 'failed',
    isError: status === 'failed' && !summary,
    onRetry,
  };
};
