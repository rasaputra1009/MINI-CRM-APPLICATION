import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';
import reducer from './reducer';
import sagas from './sagas';
import { selectMenuOpen, selectUser } from './selectors';
import { toggleMenuState, readMenuState, fetchUserData } from './actions';


export class Menu extends React.Component {
  componentDidMount() {
    this.props.readMenuState();
    this.props.fetchUserData();
  }

  render() {
    return (<div>
      <a href="/reporting">Table</a>
      <a href="/chart">Chart</a>
      <p>  {`${this.props.menuOpen}`}</p>
      <p>  {this.props.user && this.props.user.get('name')}</p>
      <p>  {this.props.user && this.props.user.get('id')}</p>
      <button onClick={this.props.toggleMenuState}> toggleMenuState </button>
    </div>);
  }
}

Menu.propTypes = {
  readMenuState: PropTypes.func.isRequired,
  fetchUserData: PropTypes.func.isRequired,
  toggleMenuState: PropTypes.func.isRequired,
  menuOpen: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
};

const msp = createStructuredSelector({
  menuOpen: selectMenuOpen(),
  user: selectUser(),
});

const mdp = {
  toggleMenuState,
  readMenuState,
  fetchUserData,
};

export default compose(
  injectReducer({ key: 'menu', reducer }),
  ...sagas.map((saga, i) => injectSaga({ key: `menuContainer${i}`, saga })),
  connect(msp, mdp),
)(Menu);
