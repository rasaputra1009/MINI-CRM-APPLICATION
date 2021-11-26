/* eslint-disable no-redeclare */
import { createSlice } from '@reduxjs/toolkit';
export const initialState = {
  id: '',
  publisherData: {
    name: '',
    email: '',
    phone: '',
    website: '',
    assignedTo: '',
  },
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
    assignedTo: '',
  },
};
const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updatePublisherDataInfo: (state, { payload }) => {
      const { key, data } = payload;
      state.publisherData[key] = data;
    },
    updateState: (state, { payload }) => {
      state.publisherData = payload;
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
      state.loading = true;
      state.error = false;
      state.users = [];
    },
    loadUsersSuccess(state, { payload }) {
      state.users = payload;
      state.loading = false;
    },
    loadUsersError(state) {
      state.loading = false;
      state.error = true;
    },
  },
});

export const {
  updatePublisherDataInfo,
  updateState,
  dataPost,
  dataPosted,
  dataPostError,
  getData,
  getDataSuccess,
  getDataError,
  editData,
  editDataSuccess,
  updateValidationErrors,
  loadUsers,
  loadUsersSuccess,
  loadUsersError,
} = formSlice.actions;

export const { reducer } = formSlice;
