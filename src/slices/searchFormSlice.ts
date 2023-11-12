import { createSlice } from '@reduxjs/toolkit';

// Действия для searchForm
// 1) Set important filter
// 2) Set complete filter
// 3) Set name search

export const searchFormSlice = createSlice({
  name: 'searchForm',
  initialState: {
    importantFilter: false,
    completeFilter: false,
    nameSearch: '',
  },
  reducers: {
    setImportantFilter: (state, action) => {
      state.importantFilter = !state.importantFilter;
    },
    setCompleteFilter: (state, action) => {
      state.completeFilter = !state.completeFilter;
    },
    setNameSearch: (state, action) => {
      state.nameSearch = action.payload.nameSearch;
    },
  },
});

export const { setImportantFilter, setCompleteFilter, setNameSearch } = searchFormSlice.actions;

export default searchFormSlice.reducer;
