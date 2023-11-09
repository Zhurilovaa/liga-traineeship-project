import { createSlice } from '@reduxjs/toolkit';
import { TaskData } from 'types/Task.types';
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
    taskForm: {
      id: -1,
      name: '',
      info: '',
      isImportant: false,
      isComplete: false,
    },
  },
  reducers: {
    deleteTask: (state, action) => {
      //удаление task из state
      // получить индекс Элемента
      const indexDelete = state.value.findIndex((task: TaskData) => task.id === action.payload.id);
      // записать обе части массива без taskDelete
      const start = state.value.slice(0, indexDelete);
      const end = state.value.slice(indexDelete + 1, state.count);
      // соединяем обе части
      state.value = start.concat(end);
      state.count = state.count - 1;
    },
    setIsImportantTask: (state, action) => {
      // получить индекс Элемента
      const indexUpdateImp = state.value.findIndex((task: TaskData) => task.id === action.payload.id);
      state.value[indexUpdateImp].isImportant = !state.value[indexUpdateImp].isImportant;
    },
    setIsCompleteTask: (state, action) => {
      // получить индекс Элемента
      const indexUpdateComp = state.value.findIndex((task: TaskData) => task.id === action.payload.id);
      state.value[indexUpdateComp].isCompleted = !state.value[indexUpdateComp].isCompleted;
    },
    addTask: (state, action) => {
      state.value.push(action.payload.taskNew);
      state.count += 1;
    },
    editTask: (state, action) => {
      const idFind = action.payload.taskUpdate.id;
      // получить индекс Элемента
      const indexUpdate = state.value.findIndex((task: TaskData) => task.id === idFind);
      state.value[indexUpdate].name = action.payload.taskUpdate.name;
      state.value[indexUpdate].info = action.payload.taskUpdate.info;
      state.value[indexUpdate].isImportant = action.payload.taskUpdate.isImportant;
      state.value[indexUpdate].isCompleted = action.payload.taskUpdate.isCompleted;
    },
  },
});

export const { deleteTask, setIsImportantTask, setIsCompleteTask, addTask, editTask } = tasksSlice.actions;

export default tasksSlice.reducer;
