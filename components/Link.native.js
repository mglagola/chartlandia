import React from 'react';
import { WebBrowser } from 'expo';
import TouchableOpacity from '../components/TouchableOpacity';

const onURLPress = (url) => async () => {
    try {
        await WebBrowser.openBrowserAsync(url);
    } catch (error) {}
};

const Link = ({
    url,
    children,
    ...props
}) => (
    <TouchableOpacity onPress={onURLPress(url)} {...props}>
        {children}
    </TouchableOpacity>
);

export default Link;
