import React from 'react';

const Svg = (props) => <svg {...props} />;

Svg.Path = (props) => <path {...props} />;
Svg.G = (props) => <g {...props} />;

export default Svg;
