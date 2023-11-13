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
    setImportantFilter: (state) => {
      state.importantFilter = !state.importantFilter;
    },
    setCompleteFilter: (state) => {
      state.completeFilter = !state.completeFilter;
    },
    setNameSearch: (state, action) => {
      state.nameSearch = action.payload.nameSearch;
    },
    resetFilters: (state) => {
      state.completeFilter = false;
      state.importantFilter = false;
    },
  },
});

export const { setImportantFilter, setCompleteFilter, setNameSearch, resetFilters } = searchFormSlice.actions;

export default searchFormSlice.reducer;
