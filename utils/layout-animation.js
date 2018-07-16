import { LayoutAnimation } from 'react-native';

export const DEFAULT_LAYOUT_ANIMATION_CONFIG = {
    duration: 300,
    create: {
        type: LayoutAnimation.Types.spring,
        property: LayoutAnimation.Properties.opacity,
        springDamping: 1,
    },
    update: {
        type: LayoutAnimation.Types.spring,
        springDamping: 1,
    },
};
