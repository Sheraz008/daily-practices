import * as Haptics from 'expo-haptics';
import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import {
  markComplete,
  rate,
  selectIsMutating,
  selectListStatus,
  selectPracticeById,
} from '@redux/reducers/practicesSlice';
import type { RootState } from '@redux/store';
import type { Rating } from '@sharedTypes/practice';

export const usePracticeDetail = (id: string) => {
  const dispatch = useAppDispatch();
  const practice = useAppSelector((state: RootState) => selectPracticeById(state, id));
  const status = useAppSelector(selectListStatus);
  const isMutating = useAppSelector((state: RootState) => selectIsMutating(state, id));

  const onToggleComplete = useCallback(() => {
    if (!practice) return;
    const next = !practice.completed_today;
    if (next) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
    }
    dispatch(markComplete({ id: practice.id, completed: next }));
  }, [practice, dispatch]);

  const onRate = useCallback(
    (value: Exclude<Rating, null>) => {
      if (!practice) return;
      Haptics.selectionAsync().catch(() => {});
      dispatch(rate({ id: practice.id, rating: value }));
    },
    [practice, dispatch],
  );

  return {
    practice,
    isLoading: status === 'loading' && !practice,
    isMutating,
    onToggleComplete,
    onRate,
  };
};
