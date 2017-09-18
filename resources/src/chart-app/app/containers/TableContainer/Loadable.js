/**
 * Asynchronously loads the component for HomePage
 */
import Loadable from 'react-loadable';
import React from 'react';

function Loading() {
  return <div>Loaasdfdings</div>;
}


export default Loadable({
  loader: () => import('./index'),
  loading: Loading,
});
