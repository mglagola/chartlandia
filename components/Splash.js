import React from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';
import F from 'lodash/fp';
import { SplashStyles } from '../constants/styles';
import Text from '../components/Text';
import TouchableOpacity from '../components/TouchableOpacity';
import Icon from '../components/Icon';
import Link from '../components/Link';

const LogoButton = ({
    kind,
    text,
    size = 30,
    color = 'white',
    style,
    url,
    onPress,
}) => {
    const childComp = (
        <TouchableOpacity style={[styles.logoButton, style]} onPress={onPress}>
            <View style={styles.logoButtonInner}>
                <View style={styles.logoButtonIcon}><Icon kind={kind} size={size} color={color} /></View>
                <Text style={styles.logoButtonText}>{text}</Text>
            </View>
        </TouchableOpacity>
    );
    if (!F.isEmpty(url)) {
        return (
            <Link url={url}>{childComp}</Link>
        );
    }
    return childComp;
};

const Splash = ({
    ss,
    appName,
    appDescription,
    appSecondaryHeader,
    appSecondaryDescription,
    onWebPress,
    googlePlayURL,
    appStoreURL,
    expoURL,
    githubURL,
    ...props
}) => (
    <View style={[styles.container, ss(mediaStyles.container)]} {...props}>
        <View style={[styles.leftContainer, ss(mediaStyles.leftContainer)]}>
            <View style={[styles.leftContainerInner, ss(mediaStyles.leftContainerInner)]}>
                <Text style={styles.headerText}>{appName}</Text>
                <Text style={styles.subtitleText}>{appDescription}</Text>
                <Text style={styles.whyHeaderText}>{appSecondaryHeader}</Text>
                <Text style={styles.whyDescriptionText}>{appSecondaryDescription}</Text>
            </View>
        </View>
        <View style={[styles.rightContainer, ss(mediaStyles.rightContainer)]}>
            <View style={styles.rightContainerInner}>
                <Text style={styles.availableOn}>Available on</Text>
                <LogoButton
                    kind='desktop'
                    text='Web'
                    onPress={onWebPress}
                />
                {appStoreURL && <LogoButton
                    kind='apple-logo'
                    text='App Store'
                    url={appStoreURL}
                />}
                {googlePlayURL && <LogoButton
                    kind='android-logo'
                    text='Google Play'
                    url={googlePlayURL}
                />}
                {expoURL && <LogoButton
                    kind='expo-logo'
                    text='Expo'
                    url={expoURL}
                />}
                {githubURL && <LogoButton
                    kind='github-logo'
                    text='GitHub'
                    url={githubURL}
                />}
            </View>
        </View>
    </View>
);

const LINE_HEIGHT = 30;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    leftContainer: {
        alignItems: 'center',
        backgroundColor: SplashStyles.leftContainerBackgroundColor,
    },
    rightContainer: {
        alignItems: 'center',
        backgroundColor: SplashStyles.rightContainerBackgroundColor,
        flexGrow: 1,
    },
    leftContainerInner: {
        marginTop: 50,
        marginBottom: 50,
        padding: 20,
        maxWidth: SplashStyles.layout.sideContainerMaxWidth,
    },
    rightContainerInner: {
        padding: 20,
        maxWidth: SplashStyles.layout.sideContainerMaxWidth,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
        marginBottom: 50,
    },
    headerText: {
        fontSize: 40,
        fontWeight: 'bold',
    },
    subtitleText: {
        fontSize: 20,
        lineHeight: LINE_HEIGHT,
        marginTop: 5,
    },
    whyHeaderText: {
        fontSize: 20,
        fontWeight: 'bold',
        lineHeight: LINE_HEIGHT,
        marginTop: 60,
    },
    whyDescriptionText: {
        fontSize: 20,
        lineHeight: LINE_HEIGHT,
        marginTop: 5,
    },
    availableOn: {
        fontSize: 20,
        fontWeight: 'bold',
        lineHeight: LINE_HEIGHT,
        color: 'white',
    },
    logoButton: {
        marginTop: 20,
        padding: 15,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 10,
        borderColor: 'white',
        borderWidth: StyleSheet.hairlineWidth,
    },
    logoButtonInner: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: 150,
    },
    logoButtonIcon: {
        marginRight: 5,
    },
    logoButtonText: {
        color: 'white',
        fontWeight: '500',
        fontSize: 18,
        marginLeft: 5,
    },
});

const mediaStyles = {
    container: [{
        when: 'gte',
        width: SplashStyles.layout.largeMinWidth,
        style: {
            flexDirection: 'row',
        },
    }],
    leftContainer: [{
        when: 'gte',
        width: SplashStyles.layout.largeMinWidth,
        style: {
            flex: 1.25,
            justifyContent: 'center',
        },
    }],
    rightContainer: [{
        when: 'gte',
        width: SplashStyles.layout.largeMinWidth,
        style: {
            flex: 1,
            justifyContent: 'center',
        },
    }],
    leftContainerInner: [{
        when: 'gte',
        width: SplashStyles.layout.largeMinWidth,
        style: {
            marginBottom: 50,
        },
    }],
    rightContainerInner: [{
        when: 'gte',
        width: SplashStyles.layout.largeMinWidth,
        style: {
            marginTop: 0,
        },
    }],
};

export default Splash;
