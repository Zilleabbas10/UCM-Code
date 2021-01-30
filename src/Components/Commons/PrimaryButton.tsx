import * as React from 'react';
import {TouchableOpacity, Platform} from 'react-native';
import styled from 'styled-components/native';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import * as Animatable from 'react-native-animatable';
import {If, Else, Then} from 'react-if';
import {propOr, prop} from 'ramda';

import {Colors, Metrics, Fonts} from '../../Themes';
import {_Text} from './AppStyledComponents';
import IconWithText from './IconWithText';

const buttonWidth = Metrics.screenWidth - (Metrics.doubleBaseMargin * 2 - 10);
const smallButtonWidth = buttonWidth / 2;
interface ButtonContainerType {
  fullWidth?: boolean;
  buttonColor?: string;
  width?: number;
  height?: number;
  borderRadius?: number;
}

const ButtonContainer = styled(TouchableOpacity)<ButtonContainerType>`
  width: ${(props) => (props.fullWidth ? buttonWidth : prop('width', props))};
  height: ${(props) => props.height};
  padding: 12px;
  border-radius: ${(props) => propOr(0, 'borderRadius', props)};
  align-items: center;
  justify-content: center;
  background-color: ${(props) => propOr(Colors.primary, 'buttonColor', props)};
`;

const ButtonLabel = styled(_Text)`
  font-size: ${Fonts.size.medium};
  color: ${Colors.white};
  font-family: TTCommons-DemiBold;
  font-weight: ${Platform.OS === 'android' ? '400' : 'bold'};
  text-align: center;
`;

const ButtonIcon = styled(EvilIcon)`
  font-size: ${Fonts.size.h1};
  color: ${Colors.white};
  font-weight: bold;
  text-align: center;
`;
const ButtonLoaderIcon = () => (
  <Animatable.View iterationCount={'infinite'} animation="rotate">
    <ButtonIcon name="spinner-3" />
  </Animatable.View>
);

interface ButtonType {
  buttonLabel: string;
  buttonColor?: string;
  fullWidth?: boolean;
  width?: number;
  height?: number;
  activeOpacity?: number;
  onClickHandler(): void;
  disabled?: boolean;
  loading?: boolean;
  showIconComponent?: boolean;
  iconName?: string;
  borderRadius?: number;
}
const PrimaryButton = (props: ButtonType) => {
  const {
    buttonLabel = 'Primary Button',
    fullWidth = false,
    width = smallButtonWidth,
    height = 55,
    onClickHandler,
    activeOpacity = 0.2,
    disabled = false,
    loading = false,
    buttonColor,
    showIconComponent = false,
    iconName = '',
    borderRadius = 5,
  } = props;
  return (
    <ButtonContainer
      activeOpacity={activeOpacity}
      onPress={onClickHandler}
      fullWidth={fullWidth}
      width={width}
      height={height}
      borderRadius={borderRadius}
      disabled={disabled || loading}
      buttonColor={buttonColor}>
      <If condition={loading}>
        <ButtonLoaderIcon />
      </If>
      <If condition={!loading}>
        <If condition={showIconComponent}>
          <Then>
            <IconWithText
              width="auto"
              fontSize={Fonts.size.regular}
              fontWeight={Platform.OS === 'android' ? '400' : 'bold'}
              iconColor={Colors.white}
              textColor={Colors.white}
              textStyle={{
                fontFamily: 'TTCommons-DemiBold',
                bottom: 2,
              }}
              icon={iconName}
              iconSize="small"
              text={buttonLabel}
            />
          </Then>
          <Else>
            <ButtonLabel>{buttonLabel}</ButtonLabel>
          </Else>
        </If>
      </If>
    </ButtonContainer>
  );
};

export default PrimaryButton;
