import { createStore, applyMiddleware, compose } from 'redux';
import { middleware as reduxRequestMiddleware } from 'redux-request-maker';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import authMiddleware from '../middleware/auth';

const ENABLE_DEV_LOGS = true;

const middleware = ENABLE_DEV_LOGS && __DEV__
    ? [thunkMiddleware, createLogger(), reduxRequestMiddleware, authMiddleware]
    : [thunkMiddleware, reduxRequestMiddleware, authMiddleware];

const createStoreWithMiddleware = compose(
    composeWithDevTools(applyMiddleware(...middleware)),
)(createStore);

export default createStoreWithMiddleware;
