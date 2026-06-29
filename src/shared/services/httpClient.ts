import API_CONFIG from '@config/apiConfig';
import type { Page, Practice, PracticeQuery, PracticeSummary } from '@sharedTypes/practice';
import { computeSummary } from '@utils/summary';
import { createSeedPractices } from './mockData';

interface ApiResponse<T> {
  data: T;
  status: number;
}

let db: Practice[] = createSeedPractices(API_CONFIG.MOCK.seedCount);

export const __resetDb = (seed?: Practice[]): void => {
  db = seed ?? createSeedPractices(API_CONFIG.MOCK.seedCount);
};

const delay = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

const clone = (p: Practice): Practice => ({ ...p });

const ok = <T>(data: T): ApiResponse<T> => ({ data, status: 200 });

const applyFilters = (practices: Practice[], query: PracticeQuery): Practice[] => {
  const search = query.search.trim().toLowerCase();
  return practices.filter((p) => {
    const matchesCategory = query.category === 'all' || p.category === query.category;
    const matchesSearch = search.length === 0 || p.title.toLowerCase().includes(search);
    return matchesCategory && matchesSearch;
  });
};

export const getPractices = async (query: PracticeQuery): Promise<ApiResponse<Page<Practice>>> => {
  await delay(API_CONFIG.MOCK.latencyMs);
  if (API_CONFIG.MOCK.failureRate > 0 && Math.random() < API_CONFIG.MOCK.failureRate) {
    throw new Error('Failed to load practices. Please try again.');
  }

  const filtered = applyFilters(db, query);
  const start = (query.page - 1) * query.pageSize;
  const items = filtered.slice(start, start + query.pageSize).map(clone);

  return ok({
    items,
    page: query.page,
    pageSize: query.pageSize,
    total: filtered.length,
    hasMore: start + query.pageSize < filtered.length,
  });
};

export const getSummary = async (): Promise<ApiResponse<PracticeSummary>> => {
  await delay(API_CONFIG.MOCK.latencyMs);
  return ok(computeSummary(db));
};

export const patchPractice = async (
  id: string,
  patch: Partial<Practice>,
): Promise<ApiResponse<Practice>> => {
  await delay(API_CONFIG.MOCK.latencyMs);
  const index = db.findIndex((p) => p.id === id);
  if (index === -1) {
    throw new Error(`Practice ${id} not found`);
  }
  const next: Practice = { ...db[index]!, ...patch };
  db[index] = next;
  return ok(clone(next));
};
