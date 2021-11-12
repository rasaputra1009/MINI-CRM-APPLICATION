import { createSelector } from 'reselect';
import { initialState } from './slice';

/**
 * Direct selector to the form state domain
 */

const selectFormDomain = state => state.form || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Form
 */

const makeSelectForm = () =>
  createSelector(selectFormDomain, substate => substate);
const makeSelectname = () =>
  createSelector(selectFormDomain, state => state.name);

export default makeSelectForm;
export { selectFormDomain, makeSelectname, makeSelectForm };
