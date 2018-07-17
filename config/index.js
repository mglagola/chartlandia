// Avoid imports!

export default {
    web: {
        defaultHtmlTitle: 'Chartlandia',
        googleAnalyticsId: process.env.GOOGLE_ANALYTICS_ID || null,
        prodApiURL: '',
        devApiURL: 'http://localhost:3000',
    },
    native: {
        prodApiURL: 'https://chartlandia.com',
        devApiURL: 'https://chartlandia.com',
    },
    reduxPersist: {
        whitelist: [],
    },
    splash: {
        appName: 'Chartlandia',
        appDescription: 'A monolithic React Native & React Native Web App that pulls crypto currency ticker info from coinmarketcap.com.',
        appSecondaryHeader: '',
        appSecondaryDescription: '',
        googlePlayURL: undefined,
        appStoreURL: undefined,
        expoURL: 'https://expo.io/@mglagola/chartlandia',
        githubURL: 'https://github.com/mglagola/chartlandia',
    },
    routes: {
        Feed: {
            screen: 'Feed',
            statusBarStyle: 'light-content',
            path: '/',
        },
        CurrencyDetails: {
            screen: 'CurrencyDetails',
            statusBarStyle: 'light-content',
            path: [['/currency?slug={slug}', '/currencies/{slug}']],
        },
    },
    routesMeta: {
        initialRouteName: 'Feed',
    },
    auth: {
        routeName: 'Feed',
        alreadyAuthedRouteName: 'Feed',
    },
};
