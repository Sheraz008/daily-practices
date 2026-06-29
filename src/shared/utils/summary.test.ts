import type { Practice } from '@sharedTypes/practice';
import { computeSummary } from './summary';

const makePractice = (overrides: Partial<Practice> = {}): Practice => ({
  id: 'p1',
  title: 'Test',
  description: 'desc',
  duration_minutes: 10,
  category: 'breath',
  completed_today: false,
  rating: null,
  ...overrides,
});

describe('computeSummary', () => {
  it('returns zeros and null average for an empty dataset', () => {
    expect(computeSummary([])).toEqual({
      completedToday: 0,
      total: 0,
      averageRating: null,
      ratedCount: 0,
    });
  });

  it('counts completed practices and ignores incomplete ones', () => {
    const data = [
      makePractice({ id: 'a', completed_today: true, rating: 4 }),
      makePractice({ id: 'b', completed_today: false, rating: 5 }),
      makePractice({ id: 'c', completed_today: true, rating: 2 }),
    ];
    const summary = computeSummary(data);
    expect(summary.completedToday).toBe(2);
    expect(summary.total).toBe(3);
  });

  it('averages ratings only across completed+rated practices, rounded to 1 dp', () => {
    const data = [
      makePractice({ id: 'a', completed_today: true, rating: 5 }),
      makePractice({ id: 'b', completed_today: true, rating: 2 }),
      makePractice({ id: 'c', completed_today: true, rating: null }),
      makePractice({ id: 'd', completed_today: false, rating: 1 }),
    ];
    const summary = computeSummary(data);
    expect(summary.averageRating).toBe(3.5);
    expect(summary.ratedCount).toBe(2);
  });

  it('returns null average when completed practices have no ratings', () => {
    const data = [makePractice({ completed_today: true, rating: null })];
    expect(computeSummary(data).averageRating).toBeNull();
  });

  it('rounds a repeating average to a single decimal', () => {
    const data = [
      makePractice({ id: 'a', completed_today: true, rating: 1 }),
      makePractice({ id: 'b', completed_today: true, rating: 2 }),
      makePractice({ id: 'c', completed_today: true, rating: 2 }),
    ];
    expect(computeSummary(data).averageRating).toBe(1.7);
  });
});
