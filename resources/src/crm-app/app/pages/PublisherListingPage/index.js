/* eslint-disable react/button-has-type */
import React from 'react';
import PublisherListHeader from 'components/PublisherListHeader';
import PublisherList from 'components/PublisherList';
import PublisherListSearch from 'components/PublisherListSearch';

function index() {
  return (
    <div>
      <PublisherListHeader />
      <PublisherListSearch />
      <PublisherList />
    </div>
  );
}

export default index;
