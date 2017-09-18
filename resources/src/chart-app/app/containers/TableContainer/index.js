/*
 *
 * TableContainer
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'commons/utils/injectReducer';
import injectSaga from 'commons/utils/injectSaga';
import { selectTableContainerDomain } from './selectors';
import { fetchTableData } from './actions';
import reducer from './reducer';
import sagas from './sagas';

export class TableContainer extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    this.props.fetchTableData();
  }

  render() {
    const { tableData } = this.props;

    let content = null;

    if (tableData.get('loading') === true) {
      content = 'gdfhdffgsdgsdf';
    } else if (tableData.get('data')) {
      content = JSON.stringify(tableData.get('data'));
    }

    return (
      <div>
        {content}
        <Link to={{ pathname: '/chart/about' }}>
          /about
        </Link>
      </div>
    );
  }
}

TableContainer.propTypes = {
  fetchTableData: PropTypes.func.isRequired,
  tableData: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  tableData: selectTableContainerDomain(),
});

const mapDispatchToProps = {
  fetchTableData,
};

export default compose(
  injectReducer({ key: 'tableContainer', reducer }),
  ...sagas.map((saga, i) => injectSaga({ key: `tableContainer${i}`, saga })),
  connect(mapStateToProps, mapDispatchToProps),
)(TableContainer);
