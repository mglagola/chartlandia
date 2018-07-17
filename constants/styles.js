import { Platform, StyleSheet } from 'react-native';

const primaryColorWithAlpha = (alpha) => `rgba(39, 174, 96, ${alpha})`;
const primaryColor = primaryColorWithAlpha(1);

const lightColor = 'rgb(236, 240, 241)';
const lightColorWithAlpha = (alpha = 1) => `rgba(236, 240, 241, ${alpha})`;

const defaultBackgroundColorWithAlpha = (alpha) => `rgba(23, 23, 23, ${alpha})`;
const defaultBackgroundColor = defaultBackgroundColorWithAlpha(1);

const shadeColor = (s = 0.5) => {
    const x = parseInt(s * 255);
    return `rgb(${x}, ${x}, ${x})`;
};

export const ProgressBarStyles = {
    color: primaryColor,
};

export const RetryViewStyles = {
    backgroundColor: '#D0021B',
    borderColor: '#D0021B',
    textColor: lightColor,
    buttonBackgroundColor: 'rgba(0, 0, 0, 0.2)',
    buttonTextColor: lightColor,
};

export const NavigationStyles = {
    backgroundColor: shadeColor(0.137),
    titleColor: lightColor,
    tintColor: lightColor,
    buttonBackgroundColor: lightColor,
    borderColor: lightColorWithAlpha(0.1),
    defaultStyle: {
        backgroundColor: shadeColor(0.137),
        borderBottomColor: lightColorWithAlpha(0.1),
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
};

export const StatusNotificationStyles = {
    danger: {
        backgroundColor: '#D0021B',
    },
    success: {
        backgroundColor: '#27ae60',
    },
};

export const SplashStyles = {
    layout: {
        largeMinWidth: 800,
        sideContainerMaxWidth: 500,
    },
    leftContainerBackgroundColor: shadeColor(0.137),
    rightContainerBackgroundColor: undefined,
};

export const FeedStyles = {
    layout: {
        maxContentWidth: 1600,
    },
};

export const CurrencyDetailsStyles = {
    subtitleColor: lightColorWithAlpha(0.5),
    layout: {
        maxContentWidth: 600,
    },
};

// Universal styles
export const AppStyles = {
    primaryColor,
    primaryColorWithAlpha,
    lightColor,
    lightColorWithAlpha,
    shadeColor,

    defaultBackgroundColor: defaultBackgroundColor,

    font: {
        greenColor: '#27ae60',
        redColor: '#c0392b',
        default: {
            color: lightColor,
            fontName: (() => {
                switch (Platform.OS) {
                case 'ios': return 'HelveticaNeue';
                case 'android': return '"Helvetica Neue", HelveticaNueue, Helvetica, Arial, sans-sarif';
                case 'web': return 'HelveticaNeue';
                }
            })(),
        },
    },
    layout: {
        maxWidth: 1400,
        maxMobileListWidth: 600,
    },
};
