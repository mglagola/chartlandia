import { combineReducers } from 'redux';
import Feed from '../reducers/Feed';
import Currencies from '../reducers/Currencies';

const reducers = {
    Feed,
    Currencies,
};

const rootReducer = (appReducer) => (state, action) => {
    return appReducer(state, action);
};

function createRootReducer (combinerFunc = combineReducers) {
    const appReducer = combinerFunc(reducers);
    return rootReducer(appReducer);
}

export default createRootReducer;
