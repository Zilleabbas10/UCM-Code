import React from 'react';
import {useSelector} from 'react-redux';
import {pathOr} from 'ramda';
import styled from 'styled-components/native';

import {AppText} from './AppStyledComponents';
import {If} from 'react-if';
import {isEmptyOrNil} from '../../Utils';
import {View} from 'react-native';
import {Colors, Metrics} from '../../Themes';

const ErrorMessageContainer = styled.View`
  padding-vertical: ${Metrics.baseMargin};
  background-color: ${Colors.chipColor};
  justify-content: center;
  align-items: center;
`;

const ErrorMessage = () => {
  const state = useSelector((state) => state);
  const errorMessage: string = pathOr('', ['home', 'errorMessage'], state);
  return (
    <If condition={!isEmptyOrNil(errorMessage)}>
      <ErrorMessageContainer>
        <AppText
          color={Colors.error}
          fontWeight={'bold'}
          textTransform="capitalize"
          textAlign="center">
          {errorMessage}
        </AppText>
      </ErrorMessageContainer>
    </If>
  );
};

export default ErrorMessage;
