import React from 'react';
import {Image, View} from 'react-native';
import styled from 'styled-components/native';

import {Images, Metrics} from '../../Themes';

const HomePlaceholderContainer = styled.View`
  position: absolute;
  right: -35;
  bottom: -50;
  z-index: -1;
`;

const HomePlaceholder = () => {
  return (
    <HomePlaceholderContainer>
      <Image
        source={Images.placeholder}
        style={{
          height: Metrics.screenHeight / 3,
          width: Metrics.screenWidth / 2,
        }}
        resizeMode="contain"
      />
    </HomePlaceholderContainer>
  );
};

export default HomePlaceholder;
