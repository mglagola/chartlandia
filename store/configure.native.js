import createStoreWithMiddleware from './create-store';
import createRootReducer from '../reducers';
import { persistStore, persistCombineReducers } from '../store/persist';

function configureStore (initialState = {}) {
    const reducers = createRootReducer(persistCombineReducers);
    const store = createStoreWithMiddleware(reducers, initialState);
    const persistor = persistStore(store);
    return { store, persistor };
};

export default configureStore;
