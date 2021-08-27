import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './slices/todoSlice';
import filterReducer from './slices/filterSlice';

const store = configureStore({
  reducer: {
    todos: todoReducer,
    filters: filterReducer,
  },
});

export default store;
