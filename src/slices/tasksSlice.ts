import { createSlice } from '@reduxjs/toolkit';
import { tasksListData } from 'constants/taskListData';
import { TaskData } from 'types/Task.types';

// Действия для taskList
// 1) Delete task
// 2) Set isImportant
// 3) Set isComplete
// 4) Add task
// 5) Edit task
// 6) Set task list

export const tasksSlice = createSlice({
  name: 'taskList',
  initialState: {
    count: 0,
    value: [] as TaskData[],
  },
  reducers: {
    setTaskList: (state, action) => {
      // чистим список задач
      state.value = [];
      state.count = 0;
      action.payload.taskList.map((task: TaskData) => {
        state.value.push(task);
        state.count += 1;
      });
    },
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

export const { setTaskList, deleteTask, setIsImportantTask, setIsCompleteTask, addTask, editTask } = tasksSlice.actions;

export default tasksSlice.reducer;
