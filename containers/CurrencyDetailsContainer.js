import F from 'lodash/fp';
import { connect } from 'react-redux';
import { lifecycle } from 'recompose';
import { withStyleConstraintsOnResize } from '../utils/with-style-constraints';
import CurrencyDetails from '../components/CurrencyDetails';
import {
    fetchCurrency,
} from '../reducers/Currencies';
import navigationParamsFromOwnProps from '../utils/navigation-params-from-own-props';
import currencyFromState from '../utils/currency-from-state';

const mapStateToProps = (state, ownProps) => {
    const { slug } = navigationParamsFromOwnProps(ownProps);
    const currency = currencyFromState(state, slug);
    const status = F.get(['Currencies', 'statuses', slug], state);
    const error = F.get(['Currencies', 'errors', slug], state);
    const history = F.get(['history'], currency);
    return {
        slug,
        status,
        error,
        currency,
        history,
    };
};

const mapActionCreators = {
    fetchCurrency,
};

export default F.compose(...F.remove(F.isNil, [
    connect(mapStateToProps, mapActionCreators),
    withStyleConstraintsOnResize(),
    lifecycle({
        componentDidMount () {
            const { fetchCurrency, slug } = this.props;
            fetchCurrency({ slug });
        },
    }),
]))(CurrencyDetails);
