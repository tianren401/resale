import { createSlice } from '@reduxjs/toolkit';

const homepageSlice = createSlice({
  name: 'homepage',
  initialState: { eventType: 0, loading: 'idle' },
  reducers: {
    setEventTypeAction(state, action) {
      state.eventType = action.payload;
    },
  },
});

export const { setEventTypeAction } = homepageSlice.actions;
export default homepageSlice.reducer;
