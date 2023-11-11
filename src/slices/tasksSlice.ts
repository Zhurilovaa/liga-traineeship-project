import { createSlice } from '@reduxjs/toolkit';
import { tasksListData } from 'constants/taskListData';

// Действия для taskList
// 1) Delete task
// 2) Set isImportant
// 3) Set isComplete

export const tasksSlice = createSlice({
  name: 'taskList',
  initialState: {
    count: tasksListData.length,
    value: tasksListData,
  },
  reducers: {
    deleteTask: (state, action) => {
      //удаление task из state
      // записать обе части массива без taskDelete
      const start = state.value.slice(0, action.payload.index);
      const end = state.value.slice(action.payload.index + 1, state.count);
      // соединяем обе части
      state.value = start.concat(end);
      state.count = state.count - 1;
    },
    setIsImportantTask: (state, action) => {
      state.value[action.payload.index].isImportant = !state.value[action.payload.index].isImportant;
    },
    setIsCompleteTask: (state, action) => {
      state.value[action.payload.index].isCompleted = !state.value[action.payload.index].isCompleted;
    },
    addTask: (state, action) => {
      action.payload.taskNew.id = state.value[state.count - 1].id + 1;
      state.value.push(action.payload.taskNew);
      state.count += 1;
    },
    editTask: (state, action) => {
      const indexUpdate = action.payload.index;
      state.value[indexUpdate].name = action.payload.taskUpdate.name;
      state.value[indexUpdate].info = action.payload.taskUpdate.info;
      state.value[indexUpdate].isImportant = action.payload.taskUpdate.isImportant;
      state.value[indexUpdate].isCompleted = action.payload.taskUpdate.isCompleted;
    },
  },
});

export const { deleteTask, setIsImportantTask, setIsCompleteTask, addTask, editTask } = tasksSlice.actions;

export default tasksSlice.reducer;
