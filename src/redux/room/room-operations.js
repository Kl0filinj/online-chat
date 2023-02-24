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
