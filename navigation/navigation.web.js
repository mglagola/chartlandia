import Router from 'next/router';
import F from 'lodash/fp';
import Config from '../config';

const routeNameToPaths = (routeName) => F.compose(
    x => [].concat(x),
    F.getOr([], ['routes', routeName, 'path'])
)(Config);

const routeInfoForPath = (path) => {
    if (F.isEmpty(path)) {
        return [];
    }
    const re = /{(.*?)}/g;
    const matches = [];
    for (;;) {
        const match = re.exec(path);
        if (F.isNil(match)) {
            break;
        }
        const value = match[0];
        matches.push({
            value: value,
            id: match[1],
            index: match.index,
            endIndex: match.index + value.length,
        });
    }
    return matches;
};

const insertMetaIntoPath = (path, routeInfo, meta) => {
    if (F.isEmpty(routeInfo)) {
        return path;
    }
    let newPath = '';
    let strIndex = 0;
    for (let i = 0; i < routeInfo.length; i++) {
        const { id, index, endIndex } = routeInfo[i];
        if (strIndex !== index) {
            const prevValue = path.slice(strIndex, index);
            newPath += prevValue;
        }
        const metaValue = meta[id];
        if (F.isNil(metaValue)) {
            throw new Error(`Cannot insert ${metaValue} (key="${id}") into path`);
        }
        newPath += metaValue;
        strIndex = endIndex;
    }
    return newPath;
};

const navigate = (routeName, meta, _) => {
    const [firstPath] = routeNameToPaths(routeName);
    const params = [].concat(firstPath)
        .map((path) => ({ path, routeInfo: routeInfoForPath(path) }))
        .map(({ path, routeInfo }) => insertMetaIntoPath(path, routeInfo, meta));
    Router.push(...params);
};

const back = (_) => {
    Router.back();
};

const reset = navigate;

export default {
    reset,
    navigate,
    back,
};
