import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { userReducer } from './user/userSlice';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { persistReducer, persistStore } from 'redux-persist'; // Import these functions

// Combine reducers if you have multiple reducers
const rootReducer = combineReducers({
  user: userReducer,
});

// Persist configuration
const persistConfig = {
  key: 'root',
  storage,
  version: 1,
};

// Create the persisted reducer using persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create and export the store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Create and export the persistor
export const persistor = persistStore(store);
