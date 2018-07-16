import F from 'lodash/fp';
import appJson from '../app.json';

const nativeManifest = appJson.expo;

const releaseChannel = process.env.RELEASE_CHANNEL || 'Local';

const build = `${F.getOr(
    F.getOr('', ['android', 'versionCode'], nativeManifest),
    ['ios', 'buildNumber'],
    nativeManifest
)}`;

const fullVersion = `${nativeManifest.version}-b${build}`;

export default {
    deviceId: null,
    name: nativeManifest.name,
    version: nativeManifest.version,
    build: build,
    fullVersion,
    releaseChannel,
    appVersionSnippet: `${fullVersion}${releaseChannel[0]}`,
};
