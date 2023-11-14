import { createSlice } from '@reduxjs/toolkit';

// Действия для statusApp
// 1) Set is loading status
// 2) Set is error status
// 3) Set error content

export const statusAppSlice = createSlice({
  name: 'statusApp',
  initialState: {
    isLoading: false,
    isError: false,
    errorContent: '',
  },
  reducers: {
    setIsLoadingStatus: (state) => {
      state.isLoading = !state.isLoading;
    },
    setIsErrorStatus: (state, action) => {
      state.isError = action.payload.status;
    },
    setErrorContent: (state, action) => {
      state.errorContent = action.payload.errorString;
    },
  },
});

export const { setIsLoadingStatus, setIsErrorStatus, setErrorContent } = statusAppSlice.actions;

export default statusAppSlice.reducer;
