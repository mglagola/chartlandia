import Expo from 'expo';
import F from 'lodash/fp';

const manifest = Expo.Constants.manifest;

const deviceId = F.getOr(
    F.getOr('', ['android', 'package'], manifest),
    ['ios', 'bundleIdentifier'],
    manifest
);

const releaseChannel = F.getOr(
    'Local',
    ['releaseChannel'],
    manifest
);

const build = `${F.getOr(
    F.getOr('', ['android', 'versionCode'], manifest),
    ['ios', 'buildNumber'],
    manifest
)}`;

const fullVersion = `${manifest.version}-b${build}`;

export default {
    deviceId,
    name: manifest.name,
    version: manifest.version,
    build: build,
    fullVersion,
    releaseChannel,
    appVersionSnippet: `${fullVersion}${releaseChannel[0]}`,
};
