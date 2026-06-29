import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import API_CONFIG from '@config/apiConfig';
import { PRACTICE_SERVICES } from '@services/practicesService';
import type {
  CategoryFilter,
  MarkCompleteInput,
  Page,
  Practice,
  PracticeSummary,
  SetRatingInput,
} from '@sharedTypes/practice';
import type { RootState } from '../store';

type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed';
type FetchMode = 'initial' | 'refresh' | 'more';

interface FetchArg {
  page: number;
  mode: FetchMode;
}

interface PracticesState {
  items: Practice[];
  page: number;
  pageSize: number;
  total: number;
  hasMore: boolean;
  status: RequestStatus;
  isRefreshing: boolean;
  isLoadingMore: boolean;
  error: string | null;
  category: CategoryFilter;
  search: string;
  summary: PracticeSummary | null;
  summaryStatus: RequestStatus;
  mutatingIds: string[];
}

const initialState: PracticesState = {
  items: [],
  page: 0,
  pageSize: API_CONFIG.MOCK.pageSize,
  total: 0,
  hasMore: false,
  status: 'idle',
  isRefreshing: false,
  isLoadingMore: false,
  error: null,
  category: 'all',
  search: '',
  summary: null,
  summaryStatus: 'idle',
  mutatingIds: [],
};

const toMessage = (error: unknown, fallback: string): string =>
  error instanceof Error ? error.message : fallback;

export const fetchPractices = createAsyncThunk<Page<Practice>, FetchArg, { state: RootState }>(
  'practices/fetch',
  async ({ page }, { getState, rejectWithValue }) => {
    const { pageSize, category, search } = getState().practices;
    try {
      const res = await PRACTICE_SERVICES.fetchPractices({ page, pageSize, category, search });
      return res.data;
    } catch (error) {
      return rejectWithValue(toMessage(error, 'Failed to load practices.'));
    }
  },
);

export const fetchSummary = createAsyncThunk<PracticeSummary, void>(
  'practices/fetchSummary',
  async (_arg, { rejectWithValue }) => {
    try {
      const res = await PRACTICE_SERVICES.fetchSummary();
      return res.data;
    } catch (error) {
      return rejectWithValue(toMessage(error, 'Failed to load summary.'));
    }
  },
);

export const markComplete = createAsyncThunk<Practice, MarkCompleteInput, { state: RootState }>(
  'practices/markComplete',
  async (input, { dispatch, getState, rejectWithValue }) => {
    const previous = selectPracticeById(getState(), input.id);
    dispatch(patchPractice({ id: input.id, changes: { completed_today: input.completed } }));
    try {
      const res = await PRACTICE_SERVICES.markComplete(input);
      return res.data;
    } catch (error) {
      if (previous) {
        dispatch(
          patchPractice({ id: input.id, changes: { completed_today: previous.completed_today } }),
        );
      }
      return rejectWithValue(toMessage(error, 'Could not update this practice.'));
    }
  },
);

export const rate = createAsyncThunk<Practice, SetRatingInput, { state: RootState }>(
  'practices/rate',
  async (input, { dispatch, getState, rejectWithValue }) => {
    const previous = selectPracticeById(getState(), input.id);
    dispatch(patchPractice({ id: input.id, changes: { rating: input.rating } }));
    try {
      const res = await PRACTICE_SERVICES.setRating(input);
      return res.data;
    } catch (error) {
      if (previous) {
        dispatch(patchPractice({ id: input.id, changes: { rating: previous.rating } }));
      }
      return rejectWithValue(toMessage(error, 'Could not save your rating.'));
    }
  },
);

const upsert = (state: PracticesState, practice: Practice) => {
  const index = state.items.findIndex((p) => p.id === practice.id);
  if (index !== -1) state.items[index] = practice;
};

const practicesSlice = createSlice({
  name: 'practices',
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<CategoryFilter>) => {
      state.category = action.payload;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    patchPractice: (
      state,
      action: PayloadAction<{ id: string; changes: Partial<Practice> }>,
    ) => {
      const index = state.items.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index]!, ...action.payload.changes };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPractices.pending, (state, action) => {
        state.error = null;
        if (action.meta.arg.mode === 'more') state.isLoadingMore = true;
        else if (action.meta.arg.mode === 'refresh') state.isRefreshing = true;
        else state.status = 'loading';
      })
      .addCase(fetchPractices.fulfilled, (state, action) => {
        const { items, page, total, hasMore } = action.payload;
        if (action.meta.arg.mode === 'more') {
          const seen = new Set(state.items.map((p) => p.id));
          items.forEach((p) => {
            if (!seen.has(p.id)) state.items.push(p);
          });
        } else {
          state.items = items;
        }
        state.page = page;
        state.total = total;
        state.hasMore = hasMore;
        state.status = 'succeeded';
        state.isRefreshing = false;
        state.isLoadingMore = false;
      })
      .addCase(fetchPractices.rejected, (state, action) => {
        state.isRefreshing = false;
        state.isLoadingMore = false;
        if (action.meta.arg.mode === 'initial') state.status = 'failed';
        state.error = (action.payload as string) ?? 'Failed to load practices.';
      });

    builder
      .addCase(fetchSummary.pending, (state) => {
        state.summaryStatus = 'loading';
      })
      .addCase(fetchSummary.fulfilled, (state, action) => {
        state.summary = action.payload;
        state.summaryStatus = 'succeeded';
      })
      .addCase(fetchSummary.rejected, (state) => {
        state.summaryStatus = 'failed';
      });

    [markComplete, rate].forEach((thunk) => {
      builder
        .addCase(thunk.pending, (state, action) => {
          state.mutatingIds.push(action.meta.arg.id);
        })
        .addCase(thunk.fulfilled, (state, action) => {
          upsert(state, action.payload);
          state.mutatingIds = state.mutatingIds.filter((id) => id !== action.meta.arg.id);
        })
        .addCase(thunk.rejected, (state, action) => {
          state.mutatingIds = state.mutatingIds.filter((id) => id !== action.meta.arg.id);
        });
    });
  },
});

export const { setCategory, setSearch, patchPractice } = practicesSlice.actions;

export const selectPractices = (state: RootState) => state.practices.items;
export const selectListStatus = (state: RootState) => state.practices.status;
export const selectPracticesError = (state: RootState) => state.practices.error;
export const selectHasMore = (state: RootState) => state.practices.hasMore;
export const selectIsRefreshing = (state: RootState) => state.practices.isRefreshing;
export const selectIsLoadingMore = (state: RootState) => state.practices.isLoadingMore;
export const selectPage = (state: RootState) => state.practices.page;
export const selectTotal = (state: RootState) => state.practices.total;
export const selectCategory = (state: RootState) => state.practices.category;
export const selectSearch = (state: RootState) => state.practices.search;
export const selectSummary = (state: RootState) => state.practices.summary;
export const selectSummaryStatus = (state: RootState) => state.practices.summaryStatus;
export const selectPracticeById = (state: RootState, id: string) =>
  state.practices.items.find((p) => p.id === id);
export const selectIsMutating = (state: RootState, id: string) =>
  state.practices.mutatingIds.includes(id);

export default practicesSlice.reducer;
