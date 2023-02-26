import { createSlice } from '@reduxjs/toolkit';
import { getAllRooms, getRoomById, addMessage } from './room-operations';
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
      })
      .addCase(getRoomById.pending, (state, _) => {
        handlePending(state);
      })
      .addCase(getRoomById.fulfilled, (state, { payload }) => {
        state.currentRoom = { ...payload };
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getRoomById.rejected, (state, action) => {
        handleRejected(state, action);
      })

      .addCase(addMessage.fulfilled, (state, { payload }) => {
        console.log('ADD mESSGAE ');
        state.currentRoom.messages = [...state.currentRoom.messages, payload];
        state.isLoading = false;
        state.error = null;
      })
      .addCase(addMessage.rejected, (state, action) => {
        handleRejected(state, action);
      });
  },
  reducers: {
    addReceivedMessage(state, { payload }) {
      state.currentRoom.messages = [...state.currentRoom.messages, payload];
    },
  },
});

// export const authReducer = persistReducer(authPersistConfig, authSlice.reducer);
export const { addReceivedMessage } = roomSlice.actions;
export const roomReducer = roomSlice.reducer;
