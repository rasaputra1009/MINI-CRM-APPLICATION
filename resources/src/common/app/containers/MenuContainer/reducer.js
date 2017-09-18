/*
 *
 * TableContainer reducer
 *
 */

import { fromJS } from 'immutable';
import {
  TOGGLE_MENU_STATE,
  MENU_STATE_LOADED,
  FETCHED_USER_DATA,
} from './constants';

const initialState = fromJS({
  menuOpen: false,
  user: null,
});

function menuContainerReducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_MENU_STATE:
      return state.update('menuOpen', (menuOpen) => !menuOpen);
    case MENU_STATE_LOADED:
      return state.set('menuOpen', action.menuOpen);
    case FETCHED_USER_DATA:
      return state.set('user', fromJS(action.user));
    default:
      return state;
  }
}

export default menuContainerReducer;
