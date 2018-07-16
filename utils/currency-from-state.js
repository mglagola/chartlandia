import F from 'lodash/fp';

const currencyFromState = (state, slug) => {
    const currency = F.getOr({}, ['Currencies', 'results', slug], state);
    if (!F.isEmpty(currency)) {
        return currency;
    }
    return F.compose(
        F.getOr({}, [slug]),
        F.keyBy('slug'),
        F.getOr([], ['Feed', 'result', 'result']),
    )(state);
};

export default currencyFromState;
