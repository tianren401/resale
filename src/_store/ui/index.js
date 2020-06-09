import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: { isOpenModal: false, passwordInputType: 'password' },
  reducers: {
    setModalOpen(state, action) {
      state.isOpenModal = action.payload;
    },
    setPasswordInputType(state, action) {
      if (action.payload) {
        state.passwordInputType = 'password';
      } else {
        state.passwordInputType =
          state.passwordInputType === 'password' ? 'text' : 'password';
      }
    },
  },
});

export const { setModalOpen, setPasswordInputType } = uiSlice.actions;

export default uiSlice.reducer;
