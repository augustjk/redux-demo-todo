import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selection: 'all',
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    switchFilter: (draft, action) => {
      draft.selection = action.payload;
    },
  },
});

export const { switchFilter } = filterSlice.actions;
export default filterSlice.reducer;
