import React from 'react';
import styleConstraints from 'style-constraints/dist/index';
import { Dimensions } from 'react-native';
import F from 'lodash/fp';
import onDeviceResize from '../utils/on-device-resize';

const bodySize = () => ({
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
});

export const withStyleConstraints = (key = 'ss') => (WrappedComponent) => {
    const wrapped = (props) => {
        const deviceSize = props.deviceSize || bodySize();
        const selectStyles = styleConstraints(deviceSize);
        return <WrappedComponent {...{ [key]: selectStyles }} {...props} />;
    };
    return wrapped;
};

export const withStyleConstraintsOnResize = (...args) => F.compose(
    onDeviceResize(),
    withStyleConstraints(...args),
);
