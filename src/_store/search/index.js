import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { searchService, performerEventsService } from '_services';

export const searchLocationAction = createAsyncThunk(
  'search/fetchLocation',
  async (query) => {
    const response = await searchService.searchLocation(query);
    return response;
  }
);

export const searchQueryAction = createAsyncThunk(
  'search/fetchQuery',
  async (query) => {
    const response = await searchService.searchQuery(query);
    return response;
  }
);

export const getPerformersInfoAction = createAsyncThunk(
  'search/fetchPerformersInfo',
  async (performerIds) => {
    const response = await performerEventsService.getPerformerImages(
      performerIds
    );

    return response;
  }
);

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    query: '',
    category: 'any',
    location: null,
    date: 'all',
    dateRange: null,
    results: {},
    eventPageSize: 10,
    hitsPerPage: 10,
    performersMeta: {},
  },
  reducers: {
    setQuery(state, action) {
      state.query = action.payload;
    },
    setLocation(state, action) {
      state.location = action.payload;
    },
    setDate(state, action) {
      state.date = action.payload;
    },
    setDateRange(state, action) {
      state.dateRange = action.payload;
    },
    setCategory(state, action) {
      state.category = action.payload;
    },
    setResults(state, action) {
      state.results = action.payload;
    },
    loadMoreEvents(state) {
      state.eventPageSize += state.hitsPerPage;
    },
  },
  extraReducers: {
    [getPerformersInfoAction.fulfilled]: (state, action) => {
      const performersMeta = action.payload.reduce((agg, data) => {
        const performerImages = data.images.reduce(
          (agg, img) => ({
            ...agg,
            [img.imageType]: img.imageUrl,
          }),
          {}
        );
        agg[data.performer.id] = {
          images: performerImages,
          performer: data.performer,
        };
        return agg;
      }, {});

      state.performersMeta = {
        ...state.performersMeta,
        ...performersMeta,
      };
    },
  },
});

export const {
  setQuery,
  setLocation,
  setCategory,
  setDate,
  setDateRange,
  setResults,
  loadMoreEvents,
} = searchSlice.actions;

export default searchSlice.reducer;
