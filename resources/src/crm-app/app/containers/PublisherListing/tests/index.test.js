/**
 *
 * Tests for PublisherListing
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';

import PublisherListing from '../index';
import configureStore from '../../../configureStore';

describe('<PublisherListing />', () => {
  let store;

  beforeEach(() => {
    store = configureStore({});
  });

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <Provider store={store}>
        <PublisherListing />
      </Provider>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Expect to have additional unit tests specified', () => {
    expect(true).toEqual(false);
  });

  /**
   * Unskip this test to use it
   *
   * @see {@link https://jestjs.io/docs/en/api#testskipname-fn}
   */
  it.skip('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <Provider store={store}>
        <PublisherListing />
      </Provider>,
    );
    expect(firstChild).toMatchSnapshot();
  });
});
