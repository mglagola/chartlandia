import createStoreWithMiddleware from './create-store';
import createRootReducer from '../reducers';

function configureStore (initialState = {}, { isServer, req, debug, storeKey }) {
    if (isServer) {
        const reducers = createRootReducer();
        const store = createStoreWithMiddleware(reducers, initialState);
        return { store };
    }

    const { persistStore, persistCombineReducers } = require('../store/persist');
    const reducers = createRootReducer(persistCombineReducers);
    const store = createStoreWithMiddleware(reducers, initialState);
    const persistor = persistStore(store);
    store.__persistor = persistor;
    return { store, persistor };
};

export default configureStore;
