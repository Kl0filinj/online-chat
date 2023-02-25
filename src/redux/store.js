import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './auth/auth-slice';
import { roomReducer } from './room/room-slice';
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
// import { noticesReducer } from './notices/notices-slice';
// import filterReduser from './filter/filter-slice';
// import { partnersReducer } from './partners/partners-slice';

export const store = configureStore({
  reducer: {
    // notices: noticesReducer,
    // filter: filterReduser,
    room: roomReducer,
    auth: authReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
