import { configureStore } from '@reduxjs/toolkit';
import type { Practice } from '@sharedTypes/practice';

jest.mock('@services/practicesService', () => ({
  PRACTICE_SERVICES: {
    fetchPractices: jest.fn(),
    markComplete: jest.fn(),
    setRating: jest.fn(),
  },
}));

import { PRACTICE_SERVICES } from '@services/practicesService';
import practicesReducer, { markComplete, rate } from './practicesSlice';

const seed: Practice = {
  id: 'p1',
  title: 'Box Breathing',
  description: 'desc',
  duration_minutes: 5,
  category: 'breath',
  completed_today: false,
  rating: 2,
};

const deferred = <T>() => {
  let resolve!: (v: T) => void;
  let reject!: (e: unknown) => void;
  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
};

const setup = () =>
  configureStore({
    reducer: { practices: practicesReducer },
    preloadedState: {
      practices: {
        items: [{ ...seed }],
        page: 1,
        pageSize: 12,
        total: 1,
        hasMore: false,
        status: 'succeeded' as const,
        isRefreshing: false,
        isLoadingMore: false,
        error: null,
        category: 'all' as const,
        search: '',
        summary: null,
        summaryStatus: 'idle' as const,
        mutatingIds: [],
      },
    },
  });

describe('practicesSlice optimistic mutations', () => {
  beforeEach(() => jest.clearAllMocks());

  it('applies the new rating to state optimistically, before the service responds', async () => {
    const store = setup();
    const d = deferred<{ data: Practice }>();
    (PRACTICE_SERVICES.setRating as jest.Mock).mockReturnValue(d.promise);

    const pending = store.dispatch(rate({ id: 'p1', rating: 5 }) as never);
    expect(store.getState().practices.items[0]?.rating).toBe(5);

    d.resolve({ data: { ...seed, rating: 5 } });
    await pending;
    expect(store.getState().practices.items[0]?.rating).toBe(5);
  });

  it('rolls state back to the previous value if the mutation fails', async () => {
    const store = setup();
    const d = deferred<{ data: Practice }>();
    (PRACTICE_SERVICES.markComplete as jest.Mock).mockReturnValue(d.promise);

    const pending = store.dispatch(markComplete({ id: 'p1', completed: true }) as never);
    expect(store.getState().practices.items[0]?.completed_today).toBe(true);

    d.reject(new Error('network down'));
    await pending;
    expect(store.getState().practices.items[0]?.completed_today).toBe(false);
  });
});
