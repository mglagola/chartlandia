import { createReduxRequest } from 'redux-request-maker';
import xhr from '../utils/xhr';

const {
    request,
    reducer,
} = createReduxRequest({
    actionTypePrefix: 'feed',
    callAPI: (payload, state) => xhr(state).get('/api/v1/currencies').then(res => res),
});

export const fetchAllCurrencies = request;
export default reducer;
