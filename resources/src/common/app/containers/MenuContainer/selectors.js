import { createSelector } from 'reselect';

/**
 * Direct selector to the tableContainer state domain
 */
export const selectMenuDomain = () => (state) => state.get('menu');

export const selectMenuOpen = () => createSelector(
  selectMenuDomain(),
  (menu) => menu.get('menuOpen')
);

export const selectUser = () => createSelector(
  selectMenuDomain(),
  (menu) => menu.get('user')
);
