import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { userService } from '_services';

export const updateUserInfo = createAsyncThunk(
  'userProfile/update/user',
  async (payload) => {
    const response = await userService.updateUserInfo(payload.body);
    payload.success(response);
    return response;
  }
);

export const updateUserPassword = createAsyncThunk(
  'userProfile/update/password',
  async (payload) => {
    const response = await userService.updatePassword(payload.body);
    payload.success();
    return response;
  }
);

export const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState: {
    sidebarStage: 0,
    loading: false,
  },
  reducers: {
    setSidebarStage(state, action) {
      state.sidebarStage = action.payload;
    },
  },
  extraReducers: {
    [updateUserInfo.pending]: (state) => {
      state.loading = true;
    },
    [updateUserInfo.fulfilled]: (state) => {
      state.loading = false;
    },
    [updateUserInfo.rejected]: (state) => {
      state.loading = false;
    },
    [updateUserPassword.pending]: (state) => {
      state.loading = true;
    },
    [updateUserPassword.fulfilled]: (state) => {
      state.loading = false;
    },
    [updateUserPassword.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export const { setSidebarStage } = userProfileSlice.actions;
export default userProfileSlice.reducer;
