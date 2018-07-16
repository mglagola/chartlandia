import React from 'react';

const withNavigationOptions = (navigationOptions) => (WrappedComponent) => {
    const wrapped = (props) => <WrappedComponent {...props} />;
    wrapped.navigationOptions = navigationOptions;
    return wrapped;
};

export default withNavigationOptions;
