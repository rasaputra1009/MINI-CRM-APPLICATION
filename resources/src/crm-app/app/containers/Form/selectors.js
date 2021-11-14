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
const makeSelectName = () =>
  createSelector(selectFormDomain, state => state.name);
const makeSelectEmail = () =>
  createSelector(selectFormDomain, state => state.email);

const makeSelectPhone = () =>
  createSelector(selectFormDomain, state => state.phone);

const makeSelectWebsite = () =>
  createSelector(selectFormDomain, state => state.website);

const makeSelectAssigned = () =>
  createSelector(selectFormDomain, state => state.assigned_to);
const makeSelectId = () => createSelector(selectFormDomain, state => state.id);

export default makeSelectForm;
export {
  selectFormDomain,
  makeSelectName,
  makeSelectEmail,
  makeSelectWebsite,
  makeSelectAssigned,
  makeSelectPhone,
  makeSelectForm,
  makeSelectId,
};
