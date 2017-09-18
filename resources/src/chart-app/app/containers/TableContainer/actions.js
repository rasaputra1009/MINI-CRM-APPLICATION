/*
 *
 * TableContainer actions
 *
 */

import {
  FETCH_TABLE_DATA,
  FETCHING_TABLE_DATA,
  FETCHED_TABLE_DATA,
} from './constants';

export function fetchTableData() {
  return {
    type: FETCH_TABLE_DATA,
  };
}

export function fetchingTableData() {
  return {
    type: FETCHING_TABLE_DATA,
  };
}

export function fetchedTableData(data) {
  return {
    type: FETCHED_TABLE_DATA,
    data,
  };
}
