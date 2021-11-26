/* eslint-disable import/no-cycle */
/* eslint-disable no-unused-vars */
import EditPublisherPage from '../pages/EditPublisherPage';
import CreateCustomerPage from '../pages/CreateCustomerPage';
import LoginPage from '../pages/LoginPage';
import Form from '../containers/PublisherForm';
import PublisherListingPage from '../pages/PublisherListingPage';
import NotFound from '../pages/NotFoundPage';

// FrontEnd Routes
const routes = [
  {
    url: '/crm/home',
    component: PublisherListingPage,
  },
  {
    url: '/crm/create',
    component: CreateCustomerPage,
  },
  {
    url: '/crm/edit/:id',
    component: CreateCustomerPage,
  },
  {
    url: '/crm/login',
    component: LoginPage,
  },
  {
    url: '/crm/details/:id',
    component: Form,
  },
  {
    url: '/crm/notfound',
    component: NotFound,
  },
];

// BackEnd Routes

const signingIn = '/crm/login';
const signingOut = '/crm/logout';

const readUsers = '/url/users';
const createPublisher = '/api/crm/publisher'; // create
const publisherInfo = id => `/api/crm/publisher/${id}`; // read update delete
const searchPublisher = (filter, search, assigned) =>
  `/api/crm/publishers?${filter}=${search}&assignedTo=${assigned}`; // search
export default {
  signingIn,
  signingOut,
  readUsers,
  searchPublisher,
  createPublisher,
  publisherInfo,
  routes,
};
