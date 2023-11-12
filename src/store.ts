import { configureStore } from '@reduxjs/toolkit';
// import { ReduxStoreToolkit } from "./types/ReduxStore.types";
import { createLogger } from 'redux-logger';
import tasksReducer from './slices/tasksSlice';
import searchFormReducer from './slices/searchFormSlice';
import statusAppReducer from './slices/statusAppSlice';

// logger
const logger = createLogger({ collapsed: true });

// Store
// при configureStore<ReduxStoreToolkit> ошибка на middleware
export const store = configureStore({
  reducer: {
    tasksList: tasksReducer,
    searchForm: searchFormReducer,
    statusApp: statusAppReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

console.log(store.getState());

export const reduxUnsubscribe = store.subscribe(() => console.log(store.getState()));

export type AppDispatch = typeof store.dispatch;
