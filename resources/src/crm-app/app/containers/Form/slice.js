/*
 * Form Slice
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
  name: '',
  email: '',
  phone: '',
  website: '',
  assigned_to: '',
  post: false,
  edit: false,
  error: false,
  errorMessage: '',
  loading: false,
  users: [],
  validationErrors: {
    name: '',
    email: '',
    phone: '',
    website: '',
    assigned_to: '',
  },
};
const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    // eslint-disable-next-line no-unused-vars
    updateName: (state, { payload }) => {
      state.name = payload;
    },
    updateEmail: (state, { payload }) => {
      state.email = payload;
    },
    updatePhone: (state, { payload }) => {
      state.phone = payload;
    },
    updateWebsite: (state, { payload }) => {
      state.website = payload;
    },
    updateAssignedTo: (state, { payload }) => {
      state.assigned_to = payload;
    },
    updateState: (state, { payload }) => {
      state.name = payload.name;
      state.email = payload.email;
      state.phone = payload.phone;
      state.website = payload.website;
      state.assigned_to = payload.assigned_to;
    },
    updateValidationErrors: (state, { payload }) => {
      // state.validationErros.name = payload.name;
      // state.validationErros.email = payload.email;
      // state.validationErros.phone = payload.phone;
      // state.validationErros.website = payload.website;
      // state.validationErros.assigned_to = payload.assigned_to;
      state.validationErrors = payload;
    },
    dataPost(state) {
      state.post = true;
      state.error = false;
    },
    dataPosted(state) {
      state.post = false;
    },
    dataPostError(state) {
      state.error = true;
      state.post = false;
    },
    getData(state, { payload }) {
      state.id = payload;
      state.post = true;
      state.error = false;
      state.loading = true;
    },
    getDataSuccess(state) {
      state.post = false;
      state.loading = false;
    },
    getDataError(state) {
      state.error = true;
      state.post = false;
      state.loading = false;
    },
    editData(state, { payload }) {
      state.id = payload;
      state.edit = true;
      state.error = false;
    },
    editDataSuccess(state) {
      state.edit = false;
    },
    editDataError(state, { payload }) {
      state.errorMessage = payload;
      state.error = true;
      state.edit = false;
    },
    loadUsers(state) {
      state.error = false;
      state.users = [];
    },
    loadUsersSuccess(state, { payload }) {
      state.users = payload;
    },
    loadUsersError(state) {
      state.error = true;
    },
  },
});

export const {
  updateEmail,
  updateName,
  updatePhone,
  updateWebsite,
  updateAssignedTo,
  updateState,
  dataPost,
  dataPosted,
  dataPostError,
  getData,
  getDataSuccess,
  getDataError,
  editData,
  editDataSuccess,
  editDataError,
  loadUsers,
  loadUsersSuccess,
  loadUsersError,
  updateValidationErrors,
} = formSlice.actions;

export const { reducer } = formSlice;
