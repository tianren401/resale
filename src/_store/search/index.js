import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { searchService } from '_services';

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

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    query: '',
    category: 'any',
    location: {
      lat: 32.8203525,
      lng: -97.011731,
    },
    date: 'all',
    dateRange: null,
    results: [],
    locations: [],
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
  },
});

export const {
  setQuery,
  setLocation,
  setCategory,
  setDate,
  setDateRange,
  setResults,
} = searchSlice.actions;

export default searchSlice.reducer;
