import { combineReducers } from 'redux';
import HerosReducer from './heros_reducer';

const RootReducer = combineReducers({
    heros: HerosReducer
});

export default RootReducer;
