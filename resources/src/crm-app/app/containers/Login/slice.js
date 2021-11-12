/*
 * Login Slice
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
  username: '',
  email: '',
  password: '',
  post: false,
  error: false,
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    // eslint-disable-next-line no-unused-vars
    updateUserName: (state, { payload }) => {
      state.username = payload;
    },
    updateEmail: (state, { payload }) => {
      state.email = payload;
    },
    updatePassword: (state, { payload }) => {
      state.password = payload;
    },
    loggingIn(state) {
      state.post = true;
      state.error = false;
    },
    loginSuccess(state, { payload }) {
      state.post = payload;
    },
    loginFailed(state) {
      state.username = '';
      state.email = '';
      state.password = '';
      state.error = true;
      state.post = false;
    },
  },
});

export const {
  updateUserName,
  updatePassword,
  updateEmail,
  loggingIn,
  loginSuccess,
  loginFailed,
} = loginSlice.actions;

export const { reducer } = loginSlice;
