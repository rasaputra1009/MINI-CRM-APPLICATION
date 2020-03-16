/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';

import NotFoundPage from 'commons/containers/NotFoundPage';

export default function App() {
  return (
    <div>
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <div>
              <div>It works!</div>
              <div> Run <code style={{ padding: '2px 4px', fontSize: '90%', color: '#c0341d', backgroundColor: '#fcefed', borderRadius: '3px', whiteSpace: 'pre-wrap', wordWrap: 'normal' }}> npm run remove:example </code> to remove the example-app and Example php module </div>
            </div>
          )}
        />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  );
}
