import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';

import tasksReducer from 'src/slices/tasksSlice';
import taskFormReducer from 'src/slices/taskFormSlice';
import searchFormReducer from 'src/slices/searchFormSlice';
import statusAppReducer from 'src/slices/statusAppSlice';

// logger
const logger = createLogger({ collapsed: true });

// Store
export const store = configureStore({
  reducer: {
    tasksList: tasksReducer,
    taskForm: taskFormReducer,
    searchForm: searchFormReducer,
    statusApp: statusAppReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

console.log(store.getState());

export const reduxUnsubscribe = store.subscribe(() => console.log(store.getState()));

export type AppDispatch = typeof store.dispatch;
