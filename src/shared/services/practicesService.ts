import type {
  MarkCompleteInput,
  Practice,
  PracticeQuery,
  SetRatingInput,
} from '@sharedTypes/practice';
import { getPractices, getSummary, patchPractice } from './httpClient';

export const PRACTICE_SERVICES = {
  fetchPractices: (query: PracticeQuery) => getPractices(query),

  fetchSummary: () => getSummary(),

  markComplete: ({ id, completed }: MarkCompleteInput) =>
    patchPractice(id, { completed_today: completed } satisfies Partial<Practice>),

  setRating: ({ id, rating }: SetRatingInput) =>
    patchPractice(id, { rating } satisfies Partial<Practice>),
};
