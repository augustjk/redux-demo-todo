import * as actions from '../constants/actionTypes';

const initialState = {
  selection: 'all',
};

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SWITCH_FILTER: {
      return { ...state, selection: action.payload };
    }

    default: {
      return state;
    }
  }
};

export default filterReducer;
