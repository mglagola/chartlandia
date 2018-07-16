import Document, { Head, Main, NextScript } from 'next/document';
import React from 'react';
import { AppRegistry } from 'react-native-web';
import { AppStyles } from '../constants/styles';
import Config from '../config';

const GOOGLE_ANALYTICS_ID = Config.web.googleAnalyticsId;

let index = 0;

// Force Next-generated DOM elements to fill their parent's height.
// Not required for using of react-native-web, but helps normalize
// layout for top-level wrapping elements.
const normalizeNextElements = `
    html, body {
        font-family: ${AppStyles.font.default.fontName};
        padding: 0;
        margin: 0;
        color: black;
        background-color: ${AppStyles.defaultBackgroundColor};
    }
    input, textarea {
        outline: none;
    }
    a,
    a:link,
    a:visited,
    a:hover,
    a:active {
        text-decoration: none;
    }
    body > div:first-child, #__next {
        display: flex;
        flex-direction: column;
        height: 100%;
    }
    .layout {
        flex: 1;
        flex-direction: column;
        height: 100%;
        display: flex;
    }
    .layout-inner {
        flex: 1;
        display: flex;
        flex-direction: column;
    }
    .layout-inner > div:first-child {
        flex: 1;
    }
    .touchable {
        cursor: pointer;
    }
`;

export default class MyDocument extends Document {
    static async getInitialProps ({ renderPage }) {
        AppRegistry.registerComponent('Main', () => Main);
        const { getStyleElement } = AppRegistry.getApplication('Main');
        const page = renderPage();
        const styles = [
            <style
                key={index++}
                dangerouslySetInnerHTML={{ __html: normalizeNextElements }}
            />,
            getStyleElement(),
        ];
        return { ...page, styles };
    }

    render () {
        return (
            <html style={{ height: '100%', width: '100%' }}>
                <Head>
                    <title>{Config.web.defaultHtmlTitle}</title>
                    <meta name='viewport' content='width=device-width, initial-scale=1' />
                    <meta name="msapplication-TileColor" content="#ffffff" />
                    <meta name="msapplication-TileImage" content="/public/ms-icon-144x144.png" />
                    <meta name="theme-color" content="#34495e" />
                    <link rel="apple-touch-icon" sizes="57x57" href="/public/apple-icon-57x57.png" />
                    <link rel="apple-touch-icon" sizes="60x60" href="/public/apple-icon-60x60.png" />
                    <link rel="apple-touch-icon" sizes="72x72" href="/public/apple-icon-72x72.png" />
                    <link rel="apple-touch-icon" sizes="76x76" href="/public/apple-icon-76x76.png" />
                    <link rel="apple-touch-icon" sizes="114x114" href="/public/apple-icon-114x114.png" />
                    <link rel="apple-touch-icon" sizes="120x120" href="/public/apple-icon-120x120.png" />
                    <link rel="apple-touch-icon" sizes="144x144" href="/public/apple-icon-144x144.png" />
                    <link rel="apple-touch-icon" sizes="152x152" href="/public/apple-icon-152x152.png" />
                    <link rel="apple-touch-icon" sizes="180x180" href="/public/apple-icon-180x180.png" />
                    <link rel="icon" type="image/png" sizes="192x192"  href="/public/android-icon-192x192.png" />
                    <link rel="icon" type="image/png" sizes="32x32" href="/public/favicon-32x32.png" />
                    <link rel="icon" type="image/png" sizes="96x96" href="/public/favicon-96x96.png" />
                    <link rel="icon" type="image/png" sizes="16x16" href="/public/favicon-16x16.png" />
                    <link rel="manifest" href="/public/manifest.json" />

                    {GOOGLE_ANALYTICS_ID && <script async src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`} />}
                    {GOOGLE_ANALYTICS_ID && <script dangerouslySetInnerHTML={{ __html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        
                        gtag('config', '${GOOGLE_ANALYTICS_ID}');
                    ` }} />}

                </Head>
                <body style={{ height: '100%', width: '100%', overflowY: 'scroll' }}>
                    <Main />
                    <NextScript />
                </body>
            </html>
        );
    }
}
