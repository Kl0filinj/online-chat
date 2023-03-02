import { createSlice } from '@reduxjs/toolkit';
import {
  getAllRooms,
  getRoomById,
  addMessage,
  // addUser,
} from './room-operations';
// import persistReducer from 'redux-persist/es/persistReducer';
// import storage from 'redux-persist/lib/storage';
// import {
//   register,
//   login,

// } from './auth-operations';

const handlePending = state => {
  state.isLoading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
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
        console.log('ADD MESSGAE ');
        state.currentRoom.messages = [...state.currentRoom.messages, payload];
        state.isLoading = false;
        state.error = null;
      })
      .addCase(addMessage.rejected, (state, action) => {
        handleRejected(state, action);
      });

    // .addCase(addUser.fulfilled, (state, { payload }) => {
    //   console.log('ADD USER ');
    //   state.currentRoom.residents = [payload, ...state.currentRoom.residents];
    //   state.isLoading = false;
    //   state.error = null;
    // })
    // .addCase(addUser.rejected, (state, action) => {
    //   handleRejected(state, action);
    // });
  },
  reducers: {
    addReceivedMessage(state, { payload }) {
      state.currentRoom.messages = [...state.currentRoom.messages, payload];
    },
    // addactiveUser(state, { payload }) {
    //   state.currentRoom.residents = [payload, ...state.currentRoom.residents];
    // },
  },
});

// export const authReducer = persistReducer(authPersistConfig, authSlice.reducer);
export const { addReceivedMessage, addactiveUser } = roomSlice.actions;
export const roomReducer = roomSlice.reducer;
