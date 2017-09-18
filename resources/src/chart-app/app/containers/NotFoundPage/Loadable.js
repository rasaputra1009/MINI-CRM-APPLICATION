/**
 * Asynchronously loads the component for NotFoundPage
 */
import Loadable from 'react-loadable';
import React from 'react';

export default Loadable({
  loader: () => import('./index'),
  loading: <div>Loading</div>,
});
