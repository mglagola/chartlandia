import React from 'react';
import { connect } from 'react-redux';
import F from 'lodash/fp';
import Container from '../containers/CurrencyDetailsContainer';
import DefaultLayout from '../components/DefaultLayout';
import withLayout from '../utils/with-layout';
import navigationParamsFromOwnProps from '../utils/navigation-params-from-own-props';
import currencyFromState from '../utils/currency-from-state';

import NavigationTitle from '../components/NavigationTitle';
import IconButton from '../components/IconButton';
import Navigation from '../navigation/navigation';
import { NavigationStyles } from '../constants/styles';

const mapStateToProps = (state, ownProps) => {
    const { slug } = navigationParamsFromOwnProps(ownProps);
    const currency = currencyFromState(state, slug);
    return { currencyName: currency.name };
};

export default F.compose(
    connect(mapStateToProps),
    withLayout(DefaultLayout, ({ currencyName, navigation }) => ({
        headerLeft: (
            <IconButton
                kind='chevron-left'
                color={NavigationStyles.tintColor}
                size={24}
                onPress={() => Navigation.back(navigation)}
            />
        ),
        headerTitle: <NavigationTitle>{currencyName}</NavigationTitle>,
    }))
)(Container);
