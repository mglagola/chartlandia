import React from 'react';
import {
    View,
    Platform,
    StatusBar,
    StyleSheet,
} from 'react-native';
import F from 'lodash/fp';
import isEmpty from 'lodash/isEmpty';
import { createStackNavigator, statusBarStyleFromRoute } from '../navigation/Navigator';
import { AppStyles } from '../constants/styles';

const onNavigationStateChange = (setStatusBarStyle) => (prevState, newState) => {
    const currentIndex = F.getOr(0, ['index'], newState);
    const routeName = F.getOr('', ['routes', currentIndex, 'routeName'], newState);
    const statusBarStyle = statusBarStyleFromRoute(routeName);
    setStatusBarStyle(statusBarStyle);
};

class NavigationView extends React.Component {
    static defaultProps = {
        initialRouteName: undefined,
    };

    constructor (props) {
        super(props);

        const initialRouteName = props.initialRouteName;
        if (isEmpty(initialRouteName)) {
            throw new Error('initialRouteName prop is required for NavigationView');
        }

        this.navigator = createStackNavigator({ initialRouteName });
        this.state = {
            statusBarStyle: statusBarStyleFromRoute(initialRouteName),
        };
    }

    setStatusBarStyle = (statusBarStyle = 'default') => {
        this.setState({ statusBarStyle });
    }

    shouldComponentUpdate (nextProps, nextState) {
        return nextState.statusBarStyle !== this.state.statusBarStyle;
    }

    render () {
        const { statusBarStyle } = this.state;
        const Nav = this.navigator;
        return (
            <View style={styles.container}>
                {Platform.OS === 'ios' && <StatusBar barStyle={statusBarStyle} />}
                <Nav onNavigationStateChange={onNavigationStateChange(this.setStatusBarStyle)} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: AppStyles.defaultBackgroundColor,
    },
});

export default NavigationView;
