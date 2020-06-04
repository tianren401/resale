import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: { isOpenModal: false, passwordInputType: 'password' },
  reducers: {
    setModalOpen(state, action) {
      state.isOpenModal = action.payload;
    },
    setPasswordInputType(state) {
      if (state.passwordInputType === 'password') {
        state.passwordInputType = 'text';
      } else {
        state.passwordInputType = 'password';
      }
    },
  },
});

export const { setModalOpen, setPasswordInputType } = uiSlice.actions;

export default uiSlice.reducer;
