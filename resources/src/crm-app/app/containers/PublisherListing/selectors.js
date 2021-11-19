import { createSelector } from 'reselect';
import { initialState } from './slice';

const selectPublisherListingDomain = state =>
  state.publisherListing || initialState;


const makeSelectLoading = () =>
  createSelector(
    selectPublisherListingDomain,
    publisherListing => publisherListing.loading,
  );
const makeSelectSearch = () =>
  createSelector(
    selectPublisherListingDomain,
    publisherListing => publisherListing.search,
  );
const makeSelectAssignedUser = () =>
  createSelector(
    selectPublisherListingDomain,
    publisherListing => publisherListing.assigned_user,
  );

const makeSelectError = () =>
  createSelector(
    selectPublisherListingDomain,
    publisherListing => publisherListing.error,
  );
const makeSelectId = () =>
  createSelector(
    selectPublisherListingDomain,
    publisherListing => publisherListing.id,
  );
const makeSelectFilter = () =>
  createSelector(
    selectPublisherListingDomain,
    publisherListing => publisherListing.filter,
  );
const makeSelectSearchPublishers = () =>
  createSelector(
    selectPublisherListingDomain,
    publisherListing => publisherListing.searchpublishers,
  );
const makeSelectUsers = () =>
  createSelector(
    selectPublisherListingDomain,
    publisherListing => publisherListing.users,
  );
const makeSelectUserRole = () =>
  createSelector(
    selectPublisherListingDomain,
    publisherListing => publisherListing.userInfo.userrole,
  );
const makeSelectUser = () =>
  createSelector(
    selectPublisherListingDomain,
    publisherListing => publisherListing.userInfo.user,
  );
export {
  selectPublisherListingDomain,
  makeSelectLoading,
  makeSelectError,
  makeSelectUsers,
  makeSelectId,
  makeSelectFilter,
  makeSelectSearch,
  makeSelectUserRole,
  makeSelectSearchPublishers,
  makeSelectUser,
  makeSelectAssignedUser,
};
