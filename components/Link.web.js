import React from 'react';

const Link = ({
    url,
    target = '_blank',
    children,
    ...props
}) => (
    <a href={url} target={target} {...props}>{children}</a>
);

export default Link;
