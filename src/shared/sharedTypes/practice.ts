export type PracticeCategory = 'movement' | 'breath' | 'reflection' | 'rest';

export type Rating = 1 | 2 | 3 | 4 | 5 | null;

export interface Practice {
  id: string;
  title: string;
  description: string;
  duration_minutes: number;
  category: PracticeCategory;
  completed_today: boolean;
  rating: Rating;
}

export interface MarkCompleteInput {
  id: string;
  completed: boolean;
}

export interface SetRatingInput {
  id: string;
  rating: Exclude<Rating, null>;
}

export type CategoryFilter = 'all' | PracticeCategory;

export interface PracticeQuery {
  page: number;
  pageSize: number;
  category: CategoryFilter;
  search: string;
}

export interface Page<T> {
  items: T[];
  page: number;
  pageSize: number;
  total: number;
  hasMore: boolean;
}

export interface PracticeSummary {
  completedToday: number;
  total: number;
  averageRating: number | null;
  ratedCount: number;
}
