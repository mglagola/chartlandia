import React from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';

const withKeyboardAvoidingView = (keyboardAvoidingViewProps = {}) => (WrappedComponent) => {
    return (props) => (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            enabled
            {...(Platform.OS !== 'web'
                ? { behavior: 'padding', keyboardVerticalOffset: 64 }
                : {})}
            {...keyboardAvoidingViewProps}
        >
            <WrappedComponent {...props} />
        </KeyboardAvoidingView>
    );
};

export default withKeyboardAvoidingView;
