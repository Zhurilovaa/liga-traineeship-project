import { createSlice } from '@reduxjs/toolkit';
import { TaskData } from 'types/Task.types';

// Действия для taskList
// 1) Delete task
// 2) Add task
// 3) Edit task
// 4) Set task list

export const tasksSlice = createSlice({
  name: 'taskList',
  initialState: {
    count: 0,
    value: [] as TaskData[],
  },
  reducers: {
    deleteTask: (state, action) => {
      const start = state.value.slice(0, action.payload.index);
      const end = state.value.slice(action.payload.index + 1, state.count);
      state.value = start.concat(end);
      state.count = state.count - 1;
    },
    addTask: (state, action) => {
      state.value.push(action.payload.taskNew);
      state.count += 1;
    },
    editTask: (state, action) => {
      const index = state.value.findIndex((task: TaskData) => task.id === action.payload.taskUpdate.id);
      state.value[index].name = action.payload.taskUpdate.name;
      state.value[index].info = action.payload.taskUpdate.info;
      state.value[index].isImportant = action.payload.taskUpdate.isImportant;
      state.value[index].isCompleted = action.payload.taskUpdate.isCompleted;
    },
    setTaskList: (state, action) => {
      state.value = [];
      state.count = 0;
      action.payload.taskList.map((task: TaskData) => {
        state.value.push(task);
        state.count += 1;
      });
    },
  },
});

export const { setTaskList, deleteTask, addTask, editTask } = tasksSlice.actions;

export default tasksSlice.reducer;
