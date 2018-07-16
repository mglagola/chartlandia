import React from 'react';
import {
    ActivityIndicator,
    View,
} from 'react-native';
import TouchableOpacity from '../components/TouchableOpacity';

const Spinner = ({ spinnerProps, containerProps }) => (
    <View {...containerProps}>
        <ActivityIndicator
            size='small'
            color='white'
            {...spinnerProps}
        />
    </View>
);

const SpinnerButton = ({
    showSpinner = false,
    spinnerProps = {},
    spinnerContainerProps = {},
    children,
    ...props
}) => (
    <TouchableOpacity {...props}>
        {showSpinner
            ? <Spinner spinnerProps={spinnerProps} containerProps={spinnerContainerProps} />
            : children}
    </TouchableOpacity>
);

export default SpinnerButton;
