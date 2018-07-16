import React from 'react';

const withGetInitialProps = (getInitialProps) => (WrappedComponent) => {
    const WithGetInitialProps = (props) => <WrappedComponent {...props} />;
    WithGetInitialProps.propTypes = WrappedComponent.propTypes;
    WithGetInitialProps.getInitialProps = getInitialProps;
    return WithGetInitialProps;
};

export default withGetInitialProps;
