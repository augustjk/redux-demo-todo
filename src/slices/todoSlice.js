import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  items: [],
  isFetching: false,
};

export const saveTodos = createAsyncThunk('todos/saveTodos', async (_, thunkAPI) => {
  const state = thunkAPI.getState();
  const response = await fetch('/api/todos', {
    method: 'post',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ todos: state.todos.items }),
  });
  return response.json();
});

export const loadTodos = createAsyncThunk('todos/loadTodos', async () => {
  const response = await fetch('/api/todos');
  return response.json();
});

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodoItem: (draft, action) => {
      const { text } = action.payload;
      const newItem = {
        id: uuidv4(),
        text,
        completed: false,
      };
      draft.items.push(newItem);
    },
    removeTodoItem: (draft, action) => {
      const indexToRemove = draft.items.findIndex((item) => item.id === action.payload);
      draft.items.splice(indexToRemove, 1);
    },
    toggleTodoItem: (draft, action) => {
      const itemToToggle = draft.items.find((item) => item.id === action.payload);
      itemToToggle.completed = !itemToToggle.completed;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(saveTodos.pending, (draft) => {
      draft.isFetching = true;
    });
    builder.addCase(saveTodos.fulfilled, (draft, action) => {
      draft.items = action.payload;
      draft.isFetching = false;
    });
    builder.addCase(saveTodos.rejected, (draft, action) => {
      console.error(action.error.message);
      draft.isFetching = false;
    });

    builder.addCase(loadTodos.pending, (draft) => {
      draft.isFetching = true;
    });
    builder.addCase(loadTodos.fulfilled, (draft, action) => {
      draft.items = action.payload;
      draft.isFetching = false;
    });
    builder.addCase(loadTodos.rejected, (draft, action) => {
      console.error(action.error.message);
      draft.isFetching = false;
    });
  },
});

export const { addTodoItem, removeTodoItem, toggleTodoItem } = todoSlice.actions;
export default todoSlice.reducer;
