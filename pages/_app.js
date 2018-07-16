import React from 'react';
import { Provider } from 'react-redux';
import App, { Container } from 'next/app';
import withRedux from 'next-redux-wrapper';
import { PersistGate } from 'redux-persist/lib/integration/react';
import LoadingView from '../components/LoadingView';
import _createStore from '../store/configure';

const createStore = (...args) => _createStore(...args).store;

class MyApp extends App {
    static async getInitialProps ({ Component, ctx }) {
        const res = Component.getInitialProps
            ? await Component.getInitialProps(ctx)
            : {};
        return res;
    }

    render () {
        const { Component, store, ...props } = this.props;
        return (
            <Container>
                <Provider store={store}>
                    <PersistGate persistor={store.__persistor} loading={<LoadingView />}>
                        <Component {...props} />
                    </PersistGate>
                </Provider>
            </Container>
        );
    }
}

export default withRedux(createStore)(MyApp);
