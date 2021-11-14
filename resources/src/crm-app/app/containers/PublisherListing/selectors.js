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

export {
  selectPublisherListingDomain,
  makeSelectLoading,
  makeSelectError,
  makeSelectPublishers,
  makeSelectUsers,
  makeSelectSearch,
  makeSelectSearchPublishers,
};
