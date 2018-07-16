import F from 'lodash/fp';
import { PURGE } from 'redux-persist/lib/constants';

const isFailureType = (type) => type.indexOf('failure') >= 0;

const middleware = ({ dispatch, getState }) => (next) => (action) => {
    const {
        type,
        error,
    } = action;
    if (!isFailureType(type) || F.isEmpty(error)) {
        return next(action);
    }

    const isInvalidAuthToken = F.getOr(false, ['attributes', 'invalid_token'], error);
    if (isInvalidAuthToken) {
        dispatch({
            type: 'auth/reset',
        });
        dispatch({
            type: PURGE,
            result: () => {},
        });
    }

    return next(action);
};

export default middleware;
