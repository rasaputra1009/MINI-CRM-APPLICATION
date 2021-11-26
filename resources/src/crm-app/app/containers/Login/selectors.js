import { createSelector } from 'reselect';
import { initialState } from './slice';

/**
 * Direct selector to the login state domain
 */

const selectLoginDomain = state => state.login || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Login
 */

const makeSelectLogin = () =>
  createSelector(selectLoginDomain, state => state.loginCredentials);

const makeSelectUser = () =>
  createSelector(selectLoginDomain, state => state.username);

const makeSelectPost = () =>
  createSelector(selectLoginDomain, state => state.post);

export default makeSelectLogin;
export { selectLoginDomain, makeSelectUser, makeSelectLogin, makeSelectPost };
