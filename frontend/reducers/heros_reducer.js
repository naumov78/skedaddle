import { RECEIVE_HEROS } from '../actions/heros_actions';
import merge from 'lodash/merge';

const initState = {
  heros: []
}

const HerosReducer = (state = initState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_HEROS:
      const newState = Object.assign({}, state, { heros: action.heros })
    default:
      return state;
  }
}

export default HerosReducer;
