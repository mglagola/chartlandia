import React from 'react';
import {
    View,
    ActivityIndicator,
    StyleSheet,
} from 'react-native';
import { ProgressBarStyles } from '../constants/styles';

const LoadingView = ({
    iconProps = {},
    children,
    ...props
}) => (
    <View style={styles.container}>
        <ActivityIndicator color={ProgressBarStyles.color} size='large' />
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default LoadingView;
