import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {SvgIconType} from '../../types';
import {Colors} from '../../Themes';

const ChevronRightSvgIcon = (props: SvgIconType) => {
  const {
    fillColor = Colors.primaryText,
    scale = 0.55,
    height = 24,
    width = 24,
  } = props;

  return (
    <Svg width={width} height={height} {...props}>
      <Path
        fill="none"
        stroke={fillColor}
        scale={scale}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
        d="M8.4 4.8l7.053 7.137-7.053 6.97"></Path>
    </Svg>
  );
};

export default ChevronRightSvgIcon;
