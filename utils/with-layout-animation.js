import { LayoutAnimation } from 'react-native';
import { lifecycle } from 'recompose';
import { DEFAULT_LAYOUT_ANIMATION_CONFIG } from '../utils/layout-animation';

export default (config = DEFAULT_LAYOUT_ANIMATION_CONFIG) => lifecycle({
    componentDidUpdate () {
        LayoutAnimation.configureNext(DEFAULT_LAYOUT_ANIMATION_CONFIG);
    },
});
