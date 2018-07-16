import React from 'react';
import Icon from '../components/Icon';
import TouchableOpacity from '../components/TouchableOpacity';

const IconButton = ({
    color,
    size,
    kind,
    iconProps = {},
    ...props
}) => (
    <TouchableOpacity {...props}>
        <Icon kind={kind} size={size} color={color} {...iconProps} />
    </TouchableOpacity>
);

export default IconButton;
