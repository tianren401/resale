import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authService } from '_services';

export const loginAction = createAsyncThunk('auth/login', async (data) => {
  const response = await authService.login(data.email, data.password);
  return response;
});

export const getUserInfoAction = createAsyncThunk('users/me', async () => {
  const response = await authService.getUserInfo();
  return response;
});

export const signupAction = createAsyncThunk('signup/signup', async (data) => {
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
  },
  extraReducers: {
    [loginAction.fulfilled]: (state, action) => {
      localStorage.setItem('auth', JSON.stringify(action.payload));
      authService.setAuthInStorage(action.payload);
      state.user = action.payload.user;
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
    },
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
