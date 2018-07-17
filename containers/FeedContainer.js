import F from 'lodash/fp';
import { connect } from 'react-redux';
import { withStyleConstraintsOnResize } from '../utils/with-style-constraints';
import Navigation from '../navigation/navigation';
import Feed from '../components/Feed';
import { lifecycle, withProps } from 'recompose';
import {
    fetchAllCurrencies,
} from '../reducers/Feed';
import { formatNumber } from '../utils/ticker-utils';

const mapStateToProps = (state, ownProps) => {
    const marketCap = F.get(['Feed', 'result', 'marketCap'], state);
    const tickers = F.get(['Feed', 'result', 'result'], state);
    const fetchStatus = F.get(['Feed', 'status'], state);
    return {
        fetchStatus,
        tickers,
        marketCap,
    };
};

const mapActionCreators = {
    fetchAllCurrencies,
};

export default F.compose(
    withStyleConstraintsOnResize(),
    connect(mapStateToProps, mapActionCreators),
    withProps(({ tickers, navigation, fetchAllCurrencies }) => ({
        listData: F.compose(
            F.map((item, index) => Object.assign({}, item, {
                key: `${item.slug}-${formatNumber(item.price_usd, 0)}-${index}`,
                onPress: () => {
                    Navigation.navigate('CurrencyDetails', item, navigation);
                },
            }))
        )(tickers),
        onRefresh: fetchAllCurrencies,
    })),
    lifecycle({
        componentDidMount () {
            const { fetchAllCurrencies } = this.props;
            fetchAllCurrencies && fetchAllCurrencies();
        },
    }),
)(Feed);
