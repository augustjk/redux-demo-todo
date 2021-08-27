import { v4 as uuidv4 } from 'uuid';
import * as actions from '../constants/actionTypes';

const initialState = {
  items: [],
  isFetching: false,
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.ADD_TODO_ITEM: {
      const { text } = action.payload;
      const newItem = {
        id: uuidv4(),
        text,
        completed: false,
      };
      return { ...state, items: [...state.items, newItem] };
    }

    case actions.TOGGLE_TODO_ITEM: {
      const items = state.items.map((item) => {
        if (item.id === action.payload) {
          return { ...item, completed: !item.completed };
        } else {
          return item;
        }
      });
      return { ...state, items };
    }

    case actions.REMOVE_TODO_ITEM: {
      const indexToRemove = state.items.findIndex((item) => item.id === action.payload);
      const items = state.items.slice();
      items.splice(indexToRemove, 1);
      return { ...state, items };
    }

    case actions.SET_TODO_IS_FETCHING: {
      return { ...state, isFetching: action.payload };
    }

    case actions.STORE_TODO_ITEMS: {
      return { ...state, items: action.payload };
    }

    default: {
      return state;
    }
  }
};

export default todoReducer;
