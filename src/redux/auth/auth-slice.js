import { createSlice } from '@reduxjs/toolkit';
import persistReducer from 'redux-persist/es/persistReducer';
import storage from 'redux-persist/lib/storage';
import {
  register,
  login,
  getCurrentUser,
  logout,
  // getCurrentUser,
  // updateUserAvatar,
  // updateUser,
  // addNewPet,
  // deletePet,
} from './auth-operations';

const handlePending = state => {
  state.isRefreshing = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.isRefreshing = false;
  state.error = action.payload;
};

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
};

const initialState = {
  token: null,
  user: {},
  isLoggedIn: false,
  isRefreshing: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(register.pending, (state, _) => {
        handlePending(state);
      })
      .addCase(register.fulfilled, (state, _) => {
        state.isRefreshing = false;
      })
      .addCase(register.rejected, (state, action) => {
        handleRejected(state, action);
      })
      .addCase(login.pending, (state, _) => {
        handlePending(state);
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        console.log('login payload', payload);
        state.isRefreshing = false;
        state.user = payload;
        state.token = payload.token;
        state.isLoggedIn = true;
      })
      .addCase(login.rejected, (state, action) => {
        handleRejected(state, action);
      })
      .addCase(getCurrentUser.pending, (state, _) => {
        handlePending(state);
      })
      .addCase(getCurrentUser.fulfilled, (state, { payload }) => {
        console.log('current payload', payload);
        state.isRefreshing = false;
        state.isLoggedIn = true;
        state.user = payload;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        handleRejected(state, action);
      })
      .addCase(logout.pending, (state, _) => {
        handlePending(state);
      })
      .addCase(logout.fulfilled, (state, { payload }) => {
        state.isRefreshing = false;
        state.user = {};
        state.token = '';
        state.isLoggedIn = false;
      })
      .addCase(logout.rejected, (state, action) => {
        handleRejected(state, action);
      });
  },
});

export const authReducer = persistReducer(authPersistConfig, authSlice.reducer);
// export const authReducer = authSlice.reducer;
