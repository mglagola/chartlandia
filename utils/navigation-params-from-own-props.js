import F from 'lodash/fp';
import { Platform } from 'react-native';

const navigationParamsFromOwnProps = (ownProps) => Platform.OS === 'web'
    ? F.getOr({}, ['router', 'query'], ownProps)
    : F.getOr({}, ['navigation', 'state', 'params'], ownProps);

export default navigationParamsFromOwnProps;
