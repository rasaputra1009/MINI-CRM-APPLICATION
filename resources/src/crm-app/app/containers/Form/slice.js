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
  loadUsers,
  loadUsersSuccess,
  loadUsersError,
  updateValidationErrors,
} = formSlice.actions;

export const { reducer } = formSlice;
