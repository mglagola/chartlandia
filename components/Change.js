import React from 'react';
import { StyleSheet } from 'react-native';
import Text from '../components/Text';
import { tickerIndication } from '../utils/ticker-utils';
import { AppStyles } from '../constants/styles';

const Change = ({
    style,
    change,
}) => (
    <Text style={[tickerIndication(change) === 'dec' ? styles.textDec : styles.textInc, style]}>
        {change}%
    </Text>
);

const styles = StyleSheet.create({
    textDec: {
        color: AppStyles.font.redColor,
    },
    textInc: {
        color: AppStyles.font.greenColor,
    },
});

export default Change;
