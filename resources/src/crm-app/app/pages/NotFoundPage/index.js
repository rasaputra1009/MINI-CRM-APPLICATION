/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import "./style.scss";

export default function NotFound() {
  return (
    <div className="notfound">
    <h1 className="notfoundtitle">Something Went Wrong</h1>
      <Link to={{pathname: `/crm/home`}}>
        <div className="btn">
        Go Back
      </div>
      </Link>
      </div>
  );
}
