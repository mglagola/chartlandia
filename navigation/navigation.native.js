import { StackActions, NavigationActions } from 'react-navigation';

const reset = (routeName, meta, navigation) => {
    const resetAction = StackActions.reset({
        index: 0,
        actions: [
            NavigationActions.navigate({ routeName, params: meta }),
        ],
    });
    navigation.dispatch(resetAction);
};

const navigate = (routeName, meta, navigation) => {
    navigation.navigate(routeName, meta);
};

const back = (navigation) => {
    navigation.pop();
};

export default {
    reset,
    navigate,
    back,
};
