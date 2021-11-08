import { createSelector } from 'reselect';
import { initialState } from './slice';

/**
 * Direct selector to the publisherListing state domain
 */

const selectPublisherListingDomain = state => state.publisherListing || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by PublisherListing
 */

const makeSelectPublisherListing = () =>
  createSelector(selectPublisherListingDomain, substate => substate);

export default makeSelectPublisherListing;
export { selectPublisherListingDomain };
