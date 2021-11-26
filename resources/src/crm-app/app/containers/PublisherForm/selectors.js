import { createSelector } from 'reselect';
import { initialState } from './slice';

const selectFormDomain = state => state.form || initialState;

const makeSelectPublisherForm = () =>
  createSelector(selectFormDomain, state => state.publisherData);

const makeSelectName = () =>
  createSelector(selectFormDomain, state => state.publisherData.name);

const makeSelectEmail = () =>
  createSelector(selectFormDomain, state => state.publisherData.email);

const makeSelectPhone = () =>
  createSelector(selectFormDomain, state => state.publisherData.phone);

const makeSelectWebsite = () =>
  createSelector(selectFormDomain, state => state.publisherData.website);

const makeSelectError = () =>
  createSelector(selectFormDomain, state => state.publisherData.error);

const makeSelectAssigned = () =>
  createSelector(selectFormDomain, state => state.publisherData.assignedTo);

const makeSelectLoading = () =>
  createSelector(selectFormDomain, state => state.loading);

const makeSelectUsers = () =>
  createSelector(selectFormDomain, state => state.users);
const makeSelectId = () => createSelector(selectFormDomain, state => state.id);

const makeSelectValidationErrors = () =>
  createSelector(
    selectFormDomain,
    publisherListing => publisherListing.validationErrors,
  );
export {
  selectFormDomain,
  makeSelectName,
  makeSelectEmail,
  makeSelectWebsite,
  makeSelectAssigned,
  makeSelectPhone,
  makeSelectPublisherForm,
  makeSelectId,
  makeSelectError,
  makeSelectLoading,
  makeSelectValidationErrors,
  makeSelectUsers,
};
