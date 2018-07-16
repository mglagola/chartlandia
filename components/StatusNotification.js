import React from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';
import F from 'lodash/fp';
import Text from '../components/Text';
import { StatusNotificationStyles } from '../constants/styles';

export const StatusNotification = ({ text, style, textStyle, ...props }) => (
    <View style={F.flatten([styles.container, style])} {...props}>
        <Text style={[styles.text, textStyle]}>{text}</Text>
    </View>
);

export const StatusNotificationDanger = ({ style, ...props }) => (
    <StatusNotification
        style={F.flatten([styles.dangerContainer, style])}
        {...props}
    />
);

export const StatusNotificationSuccess = ({ style, ...props }) => (
    <StatusNotification
        style={F.flatten([styles.successContainer, style])}
        {...props}
    />
);

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        maxWidth: 280,
        color: 'white',
        textAlign: 'center',
        fontWeight: '500',
        fontSize: 16,
    },
    dangerContainer: {
        backgroundColor: StatusNotificationStyles.danger.backgroundColor,
    },
    successContainer: {
        backgroundColor: StatusNotificationStyles.success.backgroundColor,
    },
});
