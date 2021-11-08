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

export const initialState = {};

const publisherListingSlice = createSlice({
  name: 'publisherListing',
  initialState,
  reducers: {
    // eslint-disable-next-line no-unused-vars
    defaultAction(state, action) {
      /* Update your state here */
      /* You can access action.payload to get data passed to the action */
    },
  },
});

export const {
  defaultAction,
} = publisherListingSlice.actions;

export const { reducer } = publisherListingSlice;
