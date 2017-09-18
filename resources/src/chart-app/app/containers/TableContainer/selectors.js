import { createSelector } from 'reselect';

/**
 * Direct selector to the tableContainer state domain
 */
export const selectTableContainerDomain = () => (state) => state.get('tableContainer');

export const selectLoading = () => createSelector(
  selectTableContainerDomain(),
  (tableContainer) => tableContainer.get('loading')
);
