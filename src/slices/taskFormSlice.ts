import { createSlice } from '@reduxjs/toolkit';

// Действия для taskForm
// 1) Set taskCurr for Form

export const taskFormSlice = createSlice({
  name: 'taskForm',
  initialState: {
    taskFormCurr: {
      id: -1,
      name: '',
      info: '',
      isImportant: false,
      isCompleted: false,
    },
  },
  reducers: {
    setTaskCurrForForm: (state, action) => {
      state.taskFormCurr.id = action.payload.taskForm.id;
      state.taskFormCurr.name = action.payload.taskForm.name;
      state.taskFormCurr.info = action.payload.taskForm.info;
      state.taskFormCurr.isImportant = action.payload.taskForm.isImportant;
      state.taskFormCurr.isCompleted = action.payload.taskForm.isCompleted;
    },
  },
});

export const { setTaskCurrForForm } = taskFormSlice.actions;

export default taskFormSlice.reducer;
