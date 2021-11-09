/**
 * Asynchronously loads the component for NotFoundPage
 */
import Loadable from 'utils/loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
