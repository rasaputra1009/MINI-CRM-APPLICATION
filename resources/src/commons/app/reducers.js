/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux-immutable';
import { connectRouter } from 'connected-react-router/immutable';
import { isEmpty, identity } from 'ramda';

/**
 * Creates the main reducer with the dynamically injected ones
 */
export default function createReducer(history, injectedReducers = {}) {
  const rootReducers = isEmpty(injectedReducers) ? identity : combineReducers({
    ...injectedReducers,
  });

  return connectRouter(history)(rootReducers);
}
