import {
    persistStore as _persistStore,
    persistCombineReducers as _persistCombineReducers,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import Config from '../config';

export const DEFAULT_PERSIST_CONFIG = {
    key: 'root',
    whitelist: Config.reduxPersist.whitelist,
    storage,
};

export function persistStore (store, callback) {
    return _persistStore(store, callback);
}

export function persistCombineReducers (reducers, config = DEFAULT_PERSIST_CONFIG) {
    return _persistCombineReducers(config, reducers);
}
