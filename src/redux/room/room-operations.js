import { createAsyncThunk } from '@reduxjs/toolkit';
import { instance } from 'redux/auth/auth-operations';
// import { errorToast, successToast } from 'shared/components';
// instance

export const getAllRooms = createAsyncThunk(
  'rooms/getAllRooms',
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await instance.get('/api/rooms');

      return data;
    } catch ({ response }) {
      //   errorToast('Something went wrong, try to reload the page');
      const { status, data } = response;
      const error = {
        status,
        message: data.message,
      };
      return rejectWithValue(error);
    }
  }
);

export const getRoomById = createAsyncThunk(
  'rooms/getRoomById',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await instance.get(`/api/rooms/${id}`);

      return data;
    } catch ({ response }) {
      //   errorToast('Something went wrong, try to reload the page');
      const { status, data } = response;
      const error = {
        status,
        message: data.message,
      };
      return rejectWithValue(error);
    }
  }
);

export const addMessage = createAsyncThunk(
  'rooms/addMessage',
  async ({ text, room }, { rejectWithValue }) => {
    try {
      const { data } = await instance.post(`/api/messages`, { text, room });

      return data;
    } catch ({ response }) {
      //   errorToast('Something went wrong, try to reload the page');
      const { status, data } = response;
      const error = {
        status,
        message: data.message,
      };
      return rejectWithValue(error);
    }
  }
);

// export const addUser = createAsyncThunk(
//   'rooms/addUser',
//   async ({ userName, userId, roomId }, { rejectWithValue }) => {
//     try {
//       const { data } = await instance.post(`/api/rooms/residents`, {
//         userName,
//         userId,
//         roomId,
//       });

//       return data;
//     } catch ({ response }) {
//       //   errorToast('Something went wrong, try to reload the page');
//       const { status, data } = response;
//       const error = {
//         status,
//         message: data.message,
//       };
//       return rejectWithValue(error);
//     }
//   }
// );
