import React from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';
import { NavigationStyles } from '../constants/styles';
import Text from '../components/Text';

const NavigationTitle = ({
    style,
    textStyle,
    children,
}) => (
    <View style={[styles.container, style]}>
        <Text style={[styles.text, textStyle]}>{ children }</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
        fontWeight: '500',
        color: NavigationStyles.titleColor,
    },
});

export default NavigationTitle;
