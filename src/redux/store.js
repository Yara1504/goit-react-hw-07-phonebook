import { configureStore } from '@reduxjs/toolkit';
import contactsReducer from './contactsSlice';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

const persistConfig = {
  key: 'contacts',
  storage,
};

const persistedContactReducer = persistReducer(persistConfig, contactsReducer);

export const store = configureStore({
  reducer: persistedContactReducer, 
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  })
});
