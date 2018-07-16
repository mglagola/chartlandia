import React from 'react';
import F from 'lodash/fp';
import Container from '../containers/CurrencyDetailsContainer';
import withNavigationOptions from '../utils/with-navigation-options';

import NavigationTitle from '../components/NavigationTitle';
import IconButton from '../components/IconButton';
import Navigation from '../navigation/navigation';
import { NavigationStyles } from '../constants/styles';

export default F.compose(
    withNavigationOptions(({ navigation }) => ({
        headerLeft: (
            <IconButton
                kind='chevron-left'
                color={NavigationStyles.tintColor}
                size={24}
                onPress={() => Navigation.back(navigation)}
            />
        ),
        headerTitle: <NavigationTitle>{F.getOr('', ['state', 'params', 'name'], navigation)}</NavigationTitle>,
    })),
)(Container);
