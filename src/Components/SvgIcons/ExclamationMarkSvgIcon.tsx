import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {Colors} from '../../Themes';
import {SvgIconType} from '../../types';

const ExclamationMarkSvgIcon = (props: SvgIconType) => {
  const {fillColor = Colors.error, height = 24, width = 24} = props;

  return (
    <Svg width={width} height={height} {...props}>
      <Path
        fill={fillColor}
        fillRule="evenodd"
        d="M12 2.5a9 9 0 110 18 9 9 0 010-18zm0 11.25a1.75 1.75 0 100 3.5 1.75 1.75 0 000-3.5zm0-8.25a1.705 1.705 0 00-1.684 1.975L11 11.75a1.013 1.013 0 002 0l.684-4.275A1.705 1.705 0 0012 5.5z"
      />
    </Svg>
  );
};

export default ExclamationMarkSvgIcon;
