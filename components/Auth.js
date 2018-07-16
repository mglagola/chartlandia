import React from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import TextInput from '../components/TextInput';
import SpinnerButton from '../components/SpinnerButton';
import { AppStyles, AuthStyles } from '../constants/styles';
import CardStyle from '../constants/card-style';
import Text from '../components/Text';
import TouchableOpacity from '../components/TouchableOpacity';
import { StatusNotificationDanger } from '../components/StatusNotification';

const Input = ({ ss, ...props }) => (
    <TextInput
        multiline={false}
        autoCapitalize='none'
        clearButtonMode='while-editing'
        keyboardAppearance='light'
        returnKeyType='next'
        autoCorrect={false}
        {...props}
        placeholderTextColor={ss([{
            when: 'gte',
            width: AppStyles.layout.maxMobileListWidth,
            style: { color: AuthStyles.large.inputPlaceholderTextColor },
        }, {
            when: 'lt',
            width: AppStyles.layout.maxMobileListWidth,
            style: { color: AuthStyles.small.inputPlaceholderTextColor },
        }])[0].color}
    />
);

const Auth = ({
    status,
    errorMessage,
    authUser,
    onEmailChange,
    onPasswordChange,
    ss,
    authType,
    authHeaderText,
    switchAuthDescriptionText,
    switchAuthActionText,
    onSwitchAuthTypePress,
}) => (
    <View style={[styles.container, ss(mediaStyles.container)]}>
        {status === 'failure' && <StatusNotificationDanger text={errorMessage || 'Something went wrong authenticating user'} />}
        <View style={[styles.inputHeader, ss(mediaStyles.inputHeader), ss(mediaStyles.inputHeaderSmall)]}>
            <Text style={[styles.inputHeaderText, ss(mediaStyles.inputHeaderText)]}>{authHeaderText}</Text>
            <View style={styles.switchAuthContainer}>
                <Text style={[styles.switchAuthDescriptionText, ss(mediaStyles.switchAuthDescriptionText)]}>{`${switchAuthDescriptionText} `}</Text>
                <TouchableOpacity onPress={onSwitchAuthTypePress}>
                    <Text style={styles.underline}>{switchAuthActionText}</Text>
                </TouchableOpacity>
            </View>
        </View>
        <View style={[styles.inputContainer, ss(mediaStyles.inputContainer)]}>
            <View style={[styles.innerInputContainer, ss(mediaStyles.innerInputContainer)]}>
                <View style={[styles.inputHeader, ss(mediaStyles.inputHeader), ss(mediaStyles.inputHeaderLarge)]}>
                    <Text style={[styles.inputHeaderText, ss(mediaStyles.inputHeaderText)]}>{authHeaderText}</Text>
                    <View style={styles.switchAuthContainer}>
                        <Text style={[styles.switchAuthDescriptionText, ss(mediaStyles.switchAuthDescriptionText)]}>{`${switchAuthDescriptionText} `}</Text>
                        <TouchableOpacity onPress={onSwitchAuthTypePress}>
                            <Text style={styles.underline}>{switchAuthActionText}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.inputLabelContainer}>
                    <Text style={[styles.inputLabel, ss(mediaStyles.inputLabel)]}>Email</Text>
                    <Input
                        ss={ss}
                        style={[styles.input, ss(mediaStyles.input)]}
                        placeholder='Email'
                        keyboardType='email-address'
                        onChangeText={onEmailChange}
                        autoFocus
                    />
                </View>
                <View style={[styles.inputBorder, ss(mediaStyles.inputBorder)]} />
                <View style={styles.inputLabelContainer}>
                    <Text style={[styles.inputLabel, ss(mediaStyles.inputLabel)]}>Password</Text>
                    <Input
                        ss={ss}
                        style={[styles.input, ss(mediaStyles.input)]}
                        onChangeText={onPasswordChange}
                        placeholder='Password'
                        secureTextEntry
                    />
                </View>
            </View>
        </View>
        <SpinnerButton
            style={[styles.nextButton, ss(mediaStyles.nextButton)]}
            onPress={authUser}
            showSpinner={status === 'loading'}
        >
            <Text style={[styles.nextButtonText]}>{authHeaderText}</Text>
        </SpinnerButton>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: AuthStyles.small.backgroundColor,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    innerInputContainer: {
        padding: 20,
        paddingBottom: 40,
        flex: 1,
        flexDirection: 'column',
    },
    input: {
        color: AuthStyles.small.inputTextColor,
        fontSize: 17,
    },
    inputBorder: {
        marginTop: 15,
        marginBottom: 15,
        height: 1,
        maxHeight: 1,
        flex: 1,
        backgroundColor: AuthStyles.small.inputBorderColor,
    },
    nextButton: {
        height: 50,
        maxHeight: 50,
        backgroundColor: AuthStyles.small.nextButtonColor,
        alignItems: 'center',
        justifyContent: 'center',
    },
    nextButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15,
    },
    inputLabel: {
        marginBottom: 5,
        fontSize: 13,
    },
    inputHeader: {
        marginTop: 20,
        flexDirection: 'column',
        alignItems: 'center',
    },
    inputHeaderText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 10,
    },
    switchAuthContainer: {
        flexDirection: 'row',
        alignItems: 'baseline',
    },
    underline: {
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        color: AppStyles.secondaryColor,
    },
    switchAuthDescriptionText: {
        color: 'white',
    },
});

const mediaStyles = {
    container: [{
        when: 'gte',
        width: AppStyles.layout.maxMobileListWidth,
        style: {
            backgroundColor: AuthStyles.large.backgroundColor,
        },
    }, {
        when: 'lt',
        width: AppStyles.layout.maxMobileListWidth,
        style: {
            paddingTop: 20,
        },
    }],
    inputContainer: [{
        when: 'gte',
        width: AppStyles.layout.maxMobileListWidth,
        style: {
            alignSelf: 'center',
            width: AppStyles.layout.maxMobileListWidth,
            alignItems: 'flex-start',
        },
    }, {
        when: 'lt',
        width: AppStyles.layout.maxMobileListWidth,
        style: {
            flex: 1,
        },
    }],
    innerInputContainer: [{
        when: 'gte',
        width: AppStyles.layout.maxMobileListWidth,
        style: {
            marginTop: 60,
            padding: 40,
            backgroundColor: AuthStyles.large.inputContainerBackgroundColor,
            ...CardStyle,
        },
    }],
    input: [{
        when: 'gte',
        width: AppStyles.layout.maxMobileListWidth,
        style: {
            color: AuthStyles.large.inputTextColor,
            borderColor: AuthStyles.large.inputBorderColor,
            borderWidth: StyleSheet.hairlineWidth,
            padding: 10,
        },
    }],
    inputBorder: [{
        when: 'gte',
        width: AppStyles.layout.maxMobileListWidth,
        style: {
            height: 0,
            backgroundColor: AuthStyles.large.inputBorderColor,
        },
    }],
    inputLabel: [{
        when: 'lt',
        width: AppStyles.layout.maxMobileListWidth,
        style: {
            display: 'none',
        },
    }],
    nextButton: [{
        when: 'gte',
        width: AppStyles.layout.maxMobileListWidth,
        style: {
            marginTop: 20,
            backgroundColor: AuthStyles.large.nextButtonColor,
            alignSelf: 'center',
            width: AppStyles.layout.maxMobileListWidth,
            ...CardStyle,
        },
    }, {
        when: 'lt',
        width: AppStyles.layout.maxMobileListWidth,
        style: {
            flex: 1,
        },
    }],
    inputHeader: [{
        when: 'gte',
        width: AppStyles.layout.maxMobileListWidth,
        style: {
            marginTop: 0,
            marginBottom: 40,
            flexDirection: 'row',
            alignItems: 'baseline',
            justifyContent: 'space-between',
        },
    }],
    inputHeaderText: [{
        when: 'gte',
        width: AppStyles.layout.maxMobileListWidth,
        style: {
            color: 'black',
        },
    }],
    switchAuthDescriptionText: [{
        when: 'gte',
        width: AppStyles.layout.maxMobileListWidth,
        style: {
            color: 'black',
        },
    }],
    inputHeaderSmall: [{
        when: 'gte',
        width: AppStyles.layout.maxMobileListWidth,
        style: {
            display: 'none',
        },
    }],
    inputHeaderLarge: [{
        when: 'lt',
        width: AppStyles.layout.maxMobileListWidth,
        style: {
            display: 'none',
        },
    }],
};

export default Auth;
