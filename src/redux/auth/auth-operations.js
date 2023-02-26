import { createAsyncThunk } from '@reduxjs/toolkit';
// import { errorToast, successToast } from 'shared/components';
import axios from 'axios';

const BASE_URL = 'https://online-chat-server.onrender.com';
// http://localhost:3030
// https://online-chat-server.onrender.com/
export const instance = axios.create({
  baseURL: BASE_URL,
});

const token = {
  set(token) {
    instance.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    instance.defaults.headers.common.Authorization = '';
  },
};

export const register = createAsyncThunk(
  'auth/register',
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await instance.post('/api/users/register', credentials);

      return data;
    } catch ({ response }) {
      const error = {
        status: response.status,
        message: response.data.message,
      };
      return rejectWithValue(error);
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await instance.post('/api/users/login', credentials);
      token.set(data.token);
      return data;
    } catch ({ response }) {
      const error = {
        status: response.status,
        message: response.data.message,
      };
      return rejectWithValue(error);
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  'auth/current',
  async (_, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      const persistedToken = auth.token;

      if (!persistedToken) {
        rejectWithValue('Unable to fetch user');
      }
      token.set(persistedToken);
      const { data } = await instance.get('/api/users/current');
      return data;
    } catch ({ response }) {
      const error = {
        status: response.status,
        message: response.data.message,
      };
      return rejectWithValue(error);
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await instance.get('/api/users/logout');
      token.unset();
      return data;
    } catch ({ response }) {
      // errorToast('Something went wrong, try to reload the page');
      const error = {
        status: response.status,
        message: response.data.message,
      };
      return rejectWithValue(error);
    }
  }
);
