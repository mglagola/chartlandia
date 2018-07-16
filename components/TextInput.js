import React from 'react';
import {
    TextInput as _TextInput,
    Platform,
    StyleSheet,
} from 'react-native';
import F from 'lodash/fp';
import { AppStyles } from '../constants/styles';

const TextInput = ({ style, ...props }) => (
    <_TextInput
        style={F.flatten([styles.text, style])}
        {...(Platform.OS === 'android' ? { underlineColorAndroid: 'rgba(0,0,0,0)' } : {})}
        {...props}
    />
);

const styles = StyleSheet.create({
    text: {
        color: AppStyles.font.default.color,
        fontFamily: AppStyles.font.default.fontName,
        fontWeight: '400',
    },
});

export default TextInput;
