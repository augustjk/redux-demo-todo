import * as actions from '../constants/actionTypes';

export const addTodoItem = (payload) => ({
  type: actions.ADD_TODO_ITEM,
  payload,
});

export const toggleTodoItem = (payload) => ({
  type: actions.TOGGLE_TODO_ITEM,
  payload,
});

export const removeTodoItem = (payload) => ({
  type: actions.REMOVE_TODO_ITEM,
  payload,
});

export const setTodoIsFetching = (payload) => ({
  type: actions.SET_TODO_IS_FETCHING,
  payload,
});

export const storeTodoItems = (payload) => ({
  type: actions.STORE_TODO_ITEMS,
  payload,
});

export const saveTodos = () => async (dispatch, getState) => {
  dispatch(setTodoIsFetching(true));

  try {
    const state = getState();
    const response = await fetch('/api/todos', {
      method: 'post',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ todos: state.todos.items }),
    });
    const data = await response.json();
    dispatch(storeTodoItems(data));
  } catch (err) {
    console.error(err);
  } finally {
    dispatch(setTodoIsFetching(false));
  }
};

export const loadTodos = () => async (dispatch) => {
  dispatch(setTodoIsFetching(true));
  try {
    const response = await fetch('/api/todos');
    const data = await response.json();
    dispatch(storeTodoItems(data));
  } catch (err) {
    console.error(err);
  } finally {
    dispatch(setTodoIsFetching(false));
  }
};
