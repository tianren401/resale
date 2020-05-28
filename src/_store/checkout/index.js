import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { checkoutService } from '_services';

export const getClientToken = createAsyncThunk(
  'checkout/payment/token',
  async (payload) => {
    const response = await checkoutService.getBraintreeClientToken();
    payload.success();
    return response;
  }
);

export const getPaymentMethodNonce = createAsyncThunk(
  'checkout/payment/nonce',
  async (payload) => {
    const response = await payload.instance.requestPaymentMethod();
    payload.success();
    return response;
  }
);

export const purchasePayment = createAsyncThunk(
  'checkout/payment/purchase',
  async (payload) => {
    const response = await checkoutService.submitTicketOrder(payload.request);
    payload.success();
    return response;
  }
);

export const checkoutSlice = createSlice({
  name: 'checkout',
  initialState: {
    checkoutStage: 0,
    deliveryInfo: {
      name: '',
      email: '',
      phoneNumber: '',
    },
    clientToken: null,
    orderId: null,
    nonce: null,
    loading: false,
    paymentMethod: { type: null, lastFour: null },
    saveCardInfo: false,
  },
  reducers: {
    setCheckoutState(state, action) {
      state.checkoutStage = action.payload;
    },
    toggleSaveCardInfo(state) {
      state.saveCardInfo = !state.saveCardInfo;
    },
    getDeliveryInfo(state, action) {
      state.deliveryInfo = {
        name: action.payload.name || 'Guest',
        email: action.payload.email,
        phoneNumber: action.payload.phoneNumber,
      };
    },
  },
  extraReducers: {
    [getClientToken.fulfilled]: (state, action) => {
      state.clientToken = action.payload.clientToken;
      state.loading = false;
    },
    [getClientToken.pending]: (state) => {
      state.loading = true;
    },
    [getClientToken.rejected]: (state) => {
      state.loading = false;
    },
    [getPaymentMethodNonce.fulfilled]: (state, action) => {
      const { nonce, details } = action.payload;
      state.nonce = nonce;
      state.paymentMethod = {
        type: details.cardType,
        lastFour: details.lastFour,
      };
      state.loading = false;
    },
    [purchasePayment.fulfilled]: (state, action) => {
      state.orderId = action.payload.response;
      state.loading = false;
    },
    [purchasePayment.pending]: (state) => {
      state.loading = true;
    },
    [purchasePayment.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export const {
  getDeliveryInfo,
  setCheckoutState,
  toggleSaveCardInfo,
} = checkoutSlice.actions;
export default checkoutSlice.reducer;
