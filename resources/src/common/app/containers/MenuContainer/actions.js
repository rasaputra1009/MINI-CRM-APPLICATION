import {
  TOGGLE_MENU_STATE,
  MENU_STATE_LOADED,
  READ_MENU_STATE,
  FETCH_USER_DATA,
  FETCHED_USER_DATA,
} from './constants';

export function toggleMenuState() {
  return {
    type: TOGGLE_MENU_STATE,
  };
}

export function menuStateLoaded(menuOpen) {
  return {
    type: MENU_STATE_LOADED,
    menuOpen,
  };
}


export function readMenuState() {
  return {
    type: READ_MENU_STATE,
  };
}

export function fetchUserData() {
  return {
    type: FETCH_USER_DATA,
  };
}

export function fetchedUserData(user) {
  return {
    type: FETCHED_USER_DATA,
    user,
  };
}
