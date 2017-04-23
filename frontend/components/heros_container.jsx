import React from 'react';
import { fetchAllHeros } from '../actions/heros_actions';
import { connect } from 'react-redux';
import Heros from './heros';

const mapStateToProps = (state) => {
  return ({
    heros: state.heros
  })
}

const mapDispatchToProps = (dispatch) => {
  return ({
    fetchAllHeros: (offset) => dispatch(fetchAllHeros(offset))
  })
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Heros);
