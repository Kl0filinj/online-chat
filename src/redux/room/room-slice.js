import { createSlice } from '@reduxjs/toolkit';
import { getAllRooms } from './room-operations';
// import persistReducer from 'redux-persist/es/persistReducer';
// import storage from 'redux-persist/lib/storage';
// import {
//   register,
//   login,

// } from './auth-operations';

const handlePending = state => {
  state.isRefreshing = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.isRefreshing = false;
  state.error = action.payload;
};

// const authPersistConfig = {
//   key: 'auth',
//   storage,
//   whitelist: ['token'],
// };

const initialState = {
  rooms: [],
  currentRoom: {},
  isLoading: false,
  error: null,
};

const roomSlice = createSlice({
  name: 'room',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(getAllRooms.pending, (state, _) => {
        handlePending(state);
      })
      .addCase(getAllRooms.fulfilled, (state, { payload }) => {
        state.rooms = [...payload];
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getAllRooms.rejected, (state, action) => {
        handleRejected(state, action);
      });
    //   .addCase(login.pending, (state, _) => {
    //     handlePending(state);
    //   })
    //   .addCase(login.fulfilled, (state, { payload }) => {
    //     console.log('login payload', payload);
    //     state.isRefreshing = false;
    //     state.user = payload;
    //     state.token = payload.token;
    //     state.isLoggedIn = true;
    //   })
    //   .addCase(login.rejected, (state, action) => {
    //     handleRejected(state, action);
    //   });
    //   // .addCase(setGoogleToken.pending, (state, action) => {
    //   //   handlePending(state);
    //   // })
    //   // .addCase(setGoogleToken.fulfilled, (state, action) => {
    //   //   state.token = payload.token;
    //   // })
    //   // .addCase(setGoogleToken.rejected, (state, action) => {
    //   //   handleRejected(state, action);
    //   // })
    //   .addCase(logout.pending, (state, _) => {
    //     handlePending(state);
    //   })
    //   .addCase(logout.fulfilled, (state, { payload }) => {
    //     state.isRefreshing = false;
    //     state.user = {};
    //     state.token = '';
    //     state.isLoggedIn = false;
    //   })
    //   .addCase(logout.rejected, (state, action) => {
    //     handleRejected(state, action);
    //   })
    //   .addCase(getCurrentUser.pending, (state, _) => {
    //     handlePending(state);
    //   })
    //   .addCase(getCurrentUser.fulfilled, (state, { payload }) => {
    //     state.isRefreshing = false;
    //     state.isLoggedIn = true;
    //     state.user = payload;
    //   })
    //   .addCase(getCurrentUser.rejected, (state, action) => {
    //     handleRejected(state, action);
    //   })
    //   .addCase(updateUser.pending, (state, _) => {
    //     handlePending(state);
    //   })
    //   .addCase(updateUser.fulfilled, (state, { payload }) => {
    //     state.isRefreshing = false;
    //     state.user = { ...state.user, ...payload };
    //   })
    //   .addCase(updateUser.rejected, (state, action) => {
    //     handleRejected(state, action);
    //   })
    //   .addCase(updateUserAvatar.pending, (state, _) => {
    //     handlePending(state);
    //   })
    //   .addCase(updateUserAvatar.fulfilled, (state, { payload }) => {
    //     state.isRefreshing = false;
    //     state.user = { ...state.user, ...payload };
    //   })
    //   .addCase(updateUserAvatar.rejected, (state, action) => {
    //     handleRejected(state, action);
    //   })
    //   .addCase(addNewPet.pending, (state, _) => {
    //     handlePending(state);
    //   })
    //   .addCase(addNewPet.fulfilled, (state, { payload }) => {
    //     state.isRefreshing = false;
    //     state.user.pets = [payload, ...state.user.pets];
    //     state.error = null;
    //   })
    //   .addCase(addNewPet.rejected, (state, action) => {
    //     handleRejected(state, action);
    //   })
    //   .addCase(deletePet.pending, (state, _) => {
    //     handlePending(state);
    //   })
    //   .addCase(deletePet.fulfilled, (state, { payload }) => {
    //     state.isRefreshing = false;
    //     state.user.pets = state.user.pets.filter(({ _id }) => _id !== payload);
    //   })
    //   .addCase(deletePet.rejected, (state, action) => {
    //     handleRejected(state, action);
    //   });
  },
});

// export const authReducer = persistReducer(authPersistConfig, authSlice.reducer);
export const roomReducer = roomSlice.reducer;