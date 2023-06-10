import { configureStore, combineReducers, PreloadedState } from '@reduxjs/toolkit';
import { locationsApi, useFetchLocationsQuery } from './apis/locationsApi';
import { setupListeners } from '@reduxjs/toolkit/query';

const rootReducer = combineReducers({
  [locationsApi.reducerPath]: locationsApi.reducer,
});

export const store = configureStore({
  reducer: {
    [locationsApi.reducerPath]: locationsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(locationsApi.middleware);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

export function setupStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat(locationsApi.middleware);
    },
    preloadedState,
  });
}

setupListeners(store.dispatch);

export { useFetchLocationsQuery, useLazyFetchLocationsQuery } from './apis/locationsApi.ts';
