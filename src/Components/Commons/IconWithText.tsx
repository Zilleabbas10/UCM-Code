import * as React from 'react';
import {TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import {propOr} from 'ramda';
import {If, Switch, Case, Default} from 'react-if';

import {Metrics, Fonts, Colors} from '../../Themes';
import {IconWithBadge, AppText} from '../../Components';
import {ChevronRightSvgIcon} from '../SvgIcons';
import {isEmptyOrNil} from '../../Utils';

type IconWithTextContainerProps = {
  paddingVertical?: number;
  paddingHorizontal?: number;
  paddingTop?: number;
  paddingBottom?: number;
};
const IconWithTextContainer = styled(
  TouchableOpacity,
)<IconWithTextContainerProps>`
  flex-direction: row;
  padding-horizontal: ${(props) =>
    propOr(Metrics.smallMargin, 'paddingHorizontal', props)};
  padding-vertical: ${(props) =>
    propOr(Metrics.smallMargin, 'paddingVertical', props)};
  padding-top: ${(props) => propOr(0, 'paddingTop', props)};
  padding-bottom: ${(props) => propOr(0, 'paddingBottom', props)};
`;

const IconForText = (props) => {
  const {
    useSvgIcon = false,
    useCustomIcon = false,
    iconColor,
    icon,
    iconSize = 'small',
  } = props;

  return (
    <Switch>
      <Case condition={useSvgIcon}>
        <IconWithBadge
          iconStyle={{
            marginRight: Metrics.smallMargin,
          }}
          useSvgIcon
          RenderSvgIcon={() => <ChevronRightSvgIcon fillColor={iconColor} />}
        />
      </Case>
      <Case condition={useCustomIcon}>
        <IconWithBadge
          useCustomIcon
          iconStyle={{
            marginRight: Metrics.smallMargin,
          }}
          customIconSource={icon}
          iconSize={iconSize}
        />
      </Case>
      <Default>
        <IconWithBadge
          iconStyle={{
            marginRight: Metrics.baseMargin,
            height: Metrics.doubleBaseMargin + 2,
          }}
          color={iconColor}
          name={icon}
          iconSize={iconSize}
        />
      </Default>
    </Switch>
  );
};

type IconWithTextProps = {
  icon?: string;
  text: string;
  suffix?: boolean;

  useSvgIcon?: boolean;
  useCustomIcon?: boolean;
  iconColor?: string;
  textColor?: string;

  fontSize?: number;
  iconSize?: string;
  fontWeight?: string;
  paddingVertical?: number;
  paddingHorizontal?: number;
  textPaddingTop?: number;
  containerPaddingTop?: number;
  containerPaddingBottom?: number;
  width?: number | 'auto';
  onLinkPress?;
  textStyle?: object;
};
const IconWithText = (props: IconWithTextProps) => {
  const {
    text = '',
    onLinkPress,

    textColor = Colors.black,

    fontSize = Fonts.size.small,
    fontWeight = '300',
    paddingVertical = 0,
    paddingHorizontal = 0,
    textPaddingTop = 2,
    containerPaddingTop = 0,
    containerPaddingBottom = 0,
    width = Metrics.screenWidth - Metrics.doubleBaseMargin * 3,
    textStyle,

    suffix = false,
  } = props;

  return (
    <IconWithTextContainer
      onPress={onLinkPress}
      //hitSlop={{ top: 30, bottom: 30, left: 30, right: 30 }}
      disabled={isEmptyOrNil(onLinkPress)}
      paddingTop={containerPaddingTop}
      paddingBottom={containerPaddingBottom}
      paddingHorizontal={paddingHorizontal}
      paddingVertical={paddingVertical}>
      <If condition={!suffix}>{IconForText(props)}</If>
      <AppText
        style={textStyle}
        paddingTop={textPaddingTop}
        paddingRight={Metrics.smallMargin}
        fontWeight={fontWeight}
        fontSize={fontSize}
        color={textColor}
        width={width}
        numberOfLines={2}>
        {text}
      </AppText>
      <If condition={suffix}>{IconForText(props)}</If>
    </IconWithTextContainer>
  );
};

export default IconWithText;
