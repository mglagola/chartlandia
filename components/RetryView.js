import React from 'react';
import {
    View,
    StyleSheet,
    Platform,
} from 'react-native';
import { RetryViewStyles } from '../constants/styles';
import Text from '../components/Text';
import TouchableOpacity from '../components/TouchableOpacity';

const RetryView = ({
    errorMessageBold = 'Oh no!',
    errorMessage = 'Something went wrong.',
    onRetryPress,
}) => (
    <View style={styles.container}>
        <Text style={styles.text}>
            <Text style={styles.boldText}>{errorMessageBold}</Text>
            {` ${errorMessage}`}
        </Text>
        <TouchableOpacity style={styles.button} onPress={onRetryPress}>
            <Text style={styles.buttonText}>Retry</Text>
        </TouchableOpacity>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        paddingLeft: 15,
        paddingRight: 15,
        backgroundColor: RetryViewStyles.backgroundColor,
        borderBottomColor: RetryViewStyles.borderColor,
        borderBottomWidth: 1,
    },
    text: {
        flex: Platform.OS !== 'web' ? 1 : undefined,
        marginRight: 10,
        color: RetryViewStyles.textColor,
    },
    boldText: {
        fontWeight: '500',
    },
    button: {
        padding: 8,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: RetryViewStyles.buttonBackgroundColor,
    },
    buttonText: {
        color: RetryViewStyles.buttonTextColor,
        fontWeight: '500',
    },
});

export default RetryView;
