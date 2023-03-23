import { createAsyncThunk } from '@reduxjs/toolkit';
import { instance } from 'redux/auth/auth-operations';

export const getAllRooms = createAsyncThunk(
  'rooms/getAllRooms',
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await instance.get('/api/rooms');

      return data;
    } catch ({ response }) {
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
      const { status, data } = response;
      const error = {
        status,
        message: data.message,
      };
      return rejectWithValue(error);
    }
  }
);

export const addNewUser = createAsyncThunk(
  'rooms/addNewUser',
  async (roomId, { rejectWithValue }) => {
    try {
      const { data } = await instance.post(`/api/rooms/residents`, { roomId });

      return data;
    } catch ({ response }) {
      const { status, data } = response;
      const error = {
        status,
        message: data.message,
      };
      return rejectWithValue(error);
    }
  }
);

export const removeNewUser = createAsyncThunk(
  'rooms/removeNewUser',
  async (roomId, { rejectWithValue }) => {
    try {
      console.log(roomId);
      const { data } = await instance.delete(`/api/rooms/residents/${roomId}`);

      return data;
    } catch ({ response }) {
      const { status, data } = response;
      const error = {
        status,
        message: data.message,
      };
      return rejectWithValue(error);
    }
  }
);
