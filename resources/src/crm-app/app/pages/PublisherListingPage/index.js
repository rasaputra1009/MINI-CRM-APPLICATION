/* eslint-disable react/button-has-type */
import React from 'react';
import PublisherListHeader from 'components/PublisherListHeader';
import PublisherList from 'components/PublisherList';
import PublisherSearch from 'components/PublisherSearch';

function index() {
  return (
    <div>
      <PublisherListHeader />
      <hr />
      <PublisherSearch />
      <PublisherList />
    </div>
  );
}

export default index;
