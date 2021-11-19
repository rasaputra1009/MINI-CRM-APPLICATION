import { createSelector } from 'reselect';
import { initialState } from './slice';


const selectFormDomain = state => state.form || initialState;

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

const makeSelectError = () =>
  createSelector(selectFormDomain, state => state.error);

const makeSelectAssigned = () =>
  createSelector(selectFormDomain, state => state.assigned_to);

const makeSelectLoading = () =>
  createSelector(selectFormDomain, state => state.loading);

const makeSelectUsers = () =>
  createSelector(selectFormDomain, publisherListing => publisherListing.users);

const makeSelectId = () => createSelector(selectFormDomain, state => state.id);

const makeSelectValidationErrors = () =>
  createSelector(
    selectFormDomain,
    publisherListing => publisherListing.validationErrors,
  );

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
  makeSelectError,
  makeSelectUsers,
  makeSelectLoading,
  makeSelectValidationErrors,
};
