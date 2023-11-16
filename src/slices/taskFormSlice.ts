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
      state.taskFormCurr = {
        ...action.payload.taskForm,
      };
    },
  },
});

export const { setTaskCurrForForm } = taskFormSlice.actions;

export default taskFormSlice.reducer;
