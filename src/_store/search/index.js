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
    query: null,
    location: null,
    date: null,
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
    setResults(state, action) {
      const { params, results } = action.payload;
      state.results = results;
    },
  },
});

export const {
  setQuery,
  setLocation,
  setDate,
  setResults,
} = searchSlice.actions;

export default searchSlice.reducer;
