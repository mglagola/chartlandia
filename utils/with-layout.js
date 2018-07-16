import React from 'react';
import F from 'lodash/fp';

const withLayout = (LayoutComponent, navigationProps = {}) => (WrappedComponent) => {
    const WithLayout = (props) => {
        const _navigationProps = F.isFunction(navigationProps)
            ? navigationProps(props)
            : navigationProps;
        return (
            <LayoutComponent navigationProps={_navigationProps}><WrappedComponent {...props} /></LayoutComponent>
        );
    };
    WithLayout.propTypes = WrappedComponent.propTypes;
    WithLayout.getInitialProps = WrappedComponent.getInitialProps;
    return WithLayout;
};

export default withLayout;
