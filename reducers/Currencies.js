import { createReduxCollRequest } from 'redux-request-maker';
import xhr from '../utils/xhr';

const {
    reducer,
    request,
} = createReduxCollRequest({
    actionTypePrefix: 'fetch-currency',
    primaryKey: ['slug'],
    callAPI: async ({ slug }, state) => {
        const res = await xhr(state).get(`/api/v1/currencies/${slug}`);
        return res;
    },
});

export const fetchCurrency = request;
export default reducer;
