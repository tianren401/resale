import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { authService } from '_services';
import { formatPhoneNumber } from '_helpers';

export const loginAction = createAsyncThunk('auth/login', async (data) => {
  const response = await authService.login(data.email, data.password);
  return response;
});

export const passwordVerify = createAsyncThunk(
  'auth/verify',
  async (payload) => {
    await authService.passwordVerify(payload.body);
    payload.success();
  }
);

export const getUserInfoAction = createAsyncThunk('users/me', async () => {
  const response = await authService.getUserInfo();
  return response;
});

export const signupAction = createAsyncThunk('auth/signup', async (data) => {
  const firstName = data.fullName.split(' ')[0];
  const lastName = data.fullName.split(' ')[1];
  const response = await authService.signup(
    firstName,
    lastName,
    data.email,
    data.phone,
    data.password
  );
  return response;
});

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, loading: false },
  reducers: {
    logout(state) {
      state.user = null;
      authService.removeAuthInStorage();
    },
    setUser(state, action) {
      state.user = action.payload;
      state.user.phone = formatPhoneNumber(action.payload.phone);
    },
  },
  extraReducers: {
    [loginAction.fulfilled]: (state, action) => {
      const auth = action.payload;
      auth.user.phone = formatPhoneNumber(action.payload.user.phone);
      authService.setAuthInStorage(auth);
      state.user = auth.user;
      state.loading = false;
    },
    [loginAction.pending]: (state) => {
      state.loading = true;
    },
    [loginAction.rejected]: (state) => {
      state.loading = false;
    },
    [getUserInfoAction.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.user.phone = formatPhoneNumber(action.payload.phone);
    },
  },
});

export const { logout, setUser } = authSlice.actions;
export default authSlice.reducer;
