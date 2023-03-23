import { createSlice } from '@reduxjs/toolkit';
import {
  getAllRooms,
  getRoomById,
  addMessage,
  addNewUser,
  removeNewUser,
} from './room-operations';

const handlePending = state => {
  state.isLoading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

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
        state.currentRoom.messages = [
          ...state.currentRoom.messages,
          { ...payload, createdAt: new Date().toISOString() },
        ];
        state.isLoading = false;
        state.error = null;
      })
      .addCase(addMessage.rejected, (state, action) => {
        handleRejected(state, action);
      })

      .addCase(addNewUser.fulfilled, (state, { payload }) => {
        console.log('ADD USER ');
        state.currentRoom.residents = [...state.currentRoom.residents, payload];
        state.isLoading = false;
        state.error = null;
      })
      .addCase(addNewUser.rejected, (state, action) => {
        handleRejected(state, action);
      })

      .addCase(removeNewUser.fulfilled, (state, { payload }) => {
        console.log('REMOVE USER ');
        const index = state.currentRoom.residents.findIndex(
          item => item._id === payload._id
        );
        state.currentRoom.residents.splice(index, 1);
        state.isLoading = false;
        state.error = null;
      })
      .addCase(removeNewUser.rejected, (state, action) => {
        handleRejected(state, action);
      });
  },
  reducers: {
    addReceivedMessage(state, { payload }) {
      state.currentRoom.messages = [...state.currentRoom.messages, payload];
    },
    addNewReceivedUser(state, { payload }) {
      state.currentRoom.residents = [...state.currentRoom.residents, payload];
    },
    removeNewReceivedUser(state, { payload }) {
      const index = state.currentRoom.residents.findIndex(
        item => item._id === payload._id
      );
      state.currentRoom.residents.splice(index, 1);
    },
  },
});

export const { addReceivedMessage, addNewReceivedUser, removeNewReceivedUser } =
  roomSlice.actions;
export const roomReducer = roomSlice.reducer;
