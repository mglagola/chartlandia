import React from 'react';
import {
    TouchableOpacity,
} from 'react-native';
import F from 'lodash/fp';

class Touchable extends React.Component {
    setStyles = (styles) => {
        this.root.setNativeProps({ style: styles });
    }

    render () {
        const {
            hoverOpacity = 0.6,
            onHover: _onHover,
            style: _style,
            ...props
        } = this.props;
        const onHover = _onHover || { opacity: hoverOpacity };
        const style = F.isNil(_style)
            ? { opacity: 1 }
            : [{ opacity: 1 }, _style];
        return (
            <TouchableOpacity
                ref={(component) => { this.root = component; }}
                onMouseEnter={() => this.setStyles(onHover || { opacity: 0.9 })}
                onMouseLeave={() => this.setStyles(style)}
                style={[{ opacity: 1 }, style]}
                className='touchable'
                {...props}
            />
        );
    }
};

export default Touchable;
