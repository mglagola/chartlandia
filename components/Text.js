import React from 'react';
import {
    Text as _Text,
    StyleSheet,
} from 'react-native';
import F from 'lodash/fp';
import { AppStyles } from '../constants/styles';

const Text = ({
    style,
    ...props
}) => (
    <_Text style={F.flatten([styles.text, style])} {...props} />
);

const styles = StyleSheet.create({
    text: {
        fontSize: 16,
        fontWeight: '400',
        fontFamily: AppStyles.font.default.fontName,
        color: AppStyles.font.default.color,
    },
});

export default Text;
