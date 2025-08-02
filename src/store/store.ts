// store.ts
import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';
import {persistReducer, persistStore} from 'redux-persist';

import {persistConfig} from '@/lib/persistConfig';

import {apiSlice} from './services/apiSlice';

import savedVideosReducer from './services/savedVideoSlices';

const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer, // RTK Query reducer
   savedVideos: savedVideosReducer,
});

const persistedReducer = persistReducer<ReturnType<typeof rootReducer>>(
  persistConfig,
  rootReducer,
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false, // MMKV storage is not serializable
    }).concat(apiSlice.middleware),
});

export const persistor = persistStore(store);

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
