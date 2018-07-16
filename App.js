import React from 'react';
import { Provider, connect } from 'react-redux';
import Expo from 'expo';
import F from 'lodash/fp';
import configureStore from './store/configure';
import { PersistGate } from 'redux-persist/lib/integration/react';
import NavigationView from './navigation/NavigationView';
import Config from './config';
const { store, persistor } = configureStore();

const mapStateToProps = (state) => {
    return { initialRouteName: Config.routesMeta.initialRouteName };
};

const App = connect(mapStateToProps)(({ initialRouteName }) => (
    <NavigationView initialRouteName={initialRouteName} />
));

const Main = () => (
    <Provider store={store}>
        <PersistGate
            loading={<Expo.AppLoading />}
            persistor={persistor}
        >
            <App />
        </PersistGate>
    </Provider>
);

export default Main;
