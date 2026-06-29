import type { Practice, PracticeSummary } from '@sharedTypes/practice';

export const computeSummary = (practices: Practice[]): PracticeSummary => {
  const completed = practices.filter((p) => p.completed_today);
  const ratings = completed
    .map((p) => p.rating)
    .filter((r): r is Exclude<Practice['rating'], null> => r !== null);

  const averageRating =
    ratings.length > 0
      ? Math.round((ratings.reduce((sum, r) => sum + r, 0) / ratings.length) * 10) / 10
      : null;

  return {
    completedToday: completed.length,
    total: practices.length,
    averageRating,
    ratedCount: ratings.length,
  };
};
