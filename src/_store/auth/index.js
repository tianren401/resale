import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authService } from '_services';

export const loginAction = createAsyncThunk('auth/login', async (data) => {
  const response = await authService.login(data.email, data.password);
  return response;
});

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, loading: 'idle' },
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
      state.user = action.payload;
    },
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
