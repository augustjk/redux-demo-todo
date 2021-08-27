import * as actions from '../constants/actionTypes';

export const switchFilter = (payload) => ({
  type: actions.SWITCH_FILTER,
  payload,
});
