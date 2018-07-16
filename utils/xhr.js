import { Platform } from 'react-native';
import F from 'lodash/fp';
import queryString from 'query-string';
import fetch from 'isomorphic-unfetch';
import AppInfo from '../utils/app-info';
import Config from '../config';

export const API_URL = (() => {
    const isProduciton = ['production', 'default'].indexOf(AppInfo.releaseChannel) >= 0;
    switch (Platform.OS) {
    case 'web':
        return isProduciton
            ? Config.web.prodApiURL
            : Config.web.devApiURL;
    default:
        return isProduciton
            ? Config.native.prodApiURL
            : Config.native.devApiURL;
    }
})();

function isAbsoluteURL (resource) {
    return F.startsWith(resource, 'https://') || F.startsWith(resource, 'http://');
}

const DEFAULT_HEADERS = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
};

const buildSendRequest = (baseURL) => (method, resource, query, body, headers = {}) => {
    const targetUrl = isAbsoluteURL(resource) ? resource : `${baseURL}${resource}`;

    const requestInfo = {
        headers,
        method,
    };

    const params = queryString.stringify(query);

    switch (method) {
    case 'POST':
    case 'PUT':
    case 'DELETE':
    case 'PATCH':
        requestInfo.body = JSON.stringify(body);
        break;
    default:
        break;
    }

    if (process.env.NODE_ENV === 'development') {
        console.info('REQUEST:', targetUrl, requestInfo, params, body);
    }

    return fetch(`${targetUrl}?${params}`, requestInfo)
        .then(x => x.json());
};

const xhr = (baseURL) => {
    const sendRequest = buildSendRequest(baseURL);
    return (authToken) => {
        const mergeHeaders = (...headers) => {
            const allHeaders = F.isEmpty(authToken)
                ? [DEFAULT_HEADERS].concat(headers)
                : [DEFAULT_HEADERS, { Authorization: authToken }].concat(headers);
            return F.merge(...allHeaders);
        };
        return {
            get: (url, query, headers) => {
                return sendRequest('GET', url, query, null, mergeHeaders(headers));
            },
            put: (url, query, body, headers) => {
                return sendRequest('PUT', url, query, body, mergeHeaders(headers));
            },
            patch: (url, query, body, headers) => {
                return sendRequest('PATCH', url, query, body, mergeHeaders(headers));
            },
            post: (url, query, body, headers) => {
                return sendRequest('POST', url, query, body, mergeHeaders(headers));
            },
            delete: (url, query, body, headers) => {
                return sendRequest('DELETE', url, query, body, mergeHeaders(headers));
            },
        };
    };
};

export const xhrWithAuth = xhr(API_URL);

export default (state) => {
    return xhrWithAuth();
};
