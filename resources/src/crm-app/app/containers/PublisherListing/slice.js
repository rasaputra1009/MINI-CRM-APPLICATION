/*
 * PublisherListing Slice
 *
 * Here we define:
 * - The shape of our container's slice of Redux store,
 * - All the actions which can be triggered for this slice, including their effects on the store.
 *
 * Note that, while we are using dot notation in our reducer, we are not actually mutating the state
 * manually. Under the hood, we use immer to apply these updates to a new copy of the state.
 * Please see https://immerjs.github.io/immer/docs/introduction for more information.
 *
 */

import { createSlice } from '@reduxjs/toolkit';
export const initialState = {
  id: '',
  publishers: [],
  searchpublishers: [],
  search: '',
  delete: false,
  loading: false,
  error: false,
  filter: 'name',
  userInfo: {
    user: '',
    userrole: '',
  },
};

const publisherListingSlice = createSlice({
  name: 'publisherListing',
  initialState,
  reducers: {
    updateSearch(state, { payload }) {
      state.search = payload;
    },
    updateFilter(state, { payload }) {
      state.filter = payload;
    },
    searchPublishers(state) {
      state.searchpublishers = [];
    },
    searchPublishersSuccess(state, { payload }) {
      state.searchpublishers = payload;
      state.loading = false;
    },
    searchPublishersError(state) {
      state.error = true;
    },
    deletePublisher(state, { payload }) {
      state.id = payload;
      state.delete = true;
      state.error = false;
    },
    deletePublisherSuccess(state) {
      state.delete = false;
    },
    deletePublisherError(state) {
      state.error = true;
      state.delete = false;
    },
    loadUserInfo(state) {
      state.userInfo.user = '';
      state.userInfo.userrole = '';
    },
    loadUserInfoSuccess(state, { payload }) {
      state.userInfo.user = payload.username;
      state.userInfo.userrole = payload.userrole;
    },
    loadUserInfoError(state, { payload }) {
      state.error = payload;
    },
  },
});

export const {
  loadUsersSuccess,
  searchPublishers,
  searchPublishersSuccess,
  searchPublishersError,
  deletePublisher,
  deletePublisherError,
  deletePublisherSuccess,
  updateSearch,
  updateFilter,
  loadUserInfo,
  loadUserInfoSuccess,
  loadUserInfoError,
} = publisherListingSlice.actions;

export const { reducer } = publisherListingSlice;
