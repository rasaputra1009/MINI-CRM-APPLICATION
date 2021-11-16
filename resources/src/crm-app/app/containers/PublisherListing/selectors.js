import { createSelector } from 'reselect';
import { initialState } from './slice';

/**
 * Direct selector to the publisherListing state domain
 */

const selectPublisherListingDomain = state =>
  state.publisherListing || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by PublisherListing
 */

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

const makeSelectPublishers = () =>
  createSelector(
    selectPublisherListingDomain,
    publisherListing => publisherListing.publishers,
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
  makeSelectPublishers,
  makeSelectUsers,
  makeSelectId,
  makeSelectFilter,
  makeSelectSearch,
  makeSelectUserRole,
  makeSelectSearchPublishers,
  makeSelectUser,
};
