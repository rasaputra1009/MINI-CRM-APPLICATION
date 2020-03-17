/**
 * Asynchronously loads the component for NotFoundPage
 */
import Loadable from 'commons/utils/loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
