import F from 'lodash/fp';
import { createStackNavigator as _createStackNavigator } from 'react-navigation';
import { NavigationStyles } from '../constants/styles';
import Config from '../config';
import RouteScreens from '../config/route-screens';

const routes = F.keys(Config.routes)
    .filter(routeName => {
        const route = Config.routes[routeName];
        return !F.isNil(route.screen);
    })
    .reduce((accum, routeName) => {
        const route = Config.routes[routeName];
        accum[routeName] = Object.assign({}, route, {
            screen: RouteScreens[route.screen],
        });
        return accum;
    }, {});

const defaultOptions = {
    mode: 'card',
    headerMode: 'screen',
    navigationOptions: {
        headerStyle: NavigationStyles.defaultStyle,
    },
};

export const statusBarStyleFromRoute = (routeName, defaultValue = 'default') => {
    return F.getOr(defaultValue, [routeName, 'statusBarStyle'], routes);
};

export const createStackNavigator = (options) => {
    return _createStackNavigator(routes, Object.assign({}, defaultOptions, options));
};
