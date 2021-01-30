import React from 'react';
import styled from 'styled-components/native';

import {Colors, Fonts, Metrics} from '../../Themes';
import {WeatherType} from '../../types';
import {AppHeading, AppText} from '../Commons';

const WeatherCardContainer = styled.View`
  border-color: ${Colors.borderColor};
  border-radius: ${Metrics.baseMargin};
  border-width: 1;
  padding-horizontal: ${Metrics.doubleBaseMargin};
  padding-vertical: ${Metrics.doubleBaseMargin};
  background-color: ${Colors.white};
  margin-top: ${Metrics.baseMargin};
  margin-bottom: ${Metrics.smallMargin};
`;

const WeatherCardDateTimeContainer = styled.View`
  justify-content: space-between;
  flex-direction: row;
`;

const WeatherCardChipContainer = styled.View`
  padding-horizontal: ${Metrics.baseMargin - 2};
  padding-vertical: ${Metrics.smallMargin - 2};
  background-color: ${Colors.chipColor};
  margin-top: ${Metrics.baseMargin};
  align-self: flex-start;
  border-radius: 50;
`;
type WeatherCardType = {
  item: WeatherType;
};
const WeatherCard = (props: WeatherCardType) => {
  const {item} = props;
  return (
    <WeatherCardContainer>
      <WeatherCardDateTimeContainer>
        <AppText color={Colors.primary} fontSize={Fonts.size.extraSmall}>
          {item.date}
        </AppText>
        <AppText color={Colors.primary} fontSize={Fonts.size.extraSmall}>
          {item.time}
        </AppText>
      </WeatherCardDateTimeContainer>
      <AppHeading fontWeight="bold">Temperature: {item.temp}k</AppHeading>
      <AppHeading fontWeight="bold">
        Feels like temperature: {item.feelsLike}k
      </AppHeading>
      <WeatherCardChipContainer>
        <AppText fontSize={Fonts.size.extraSmall}>{item.description}</AppText>
      </WeatherCardChipContainer>
    </WeatherCardContainer>
  );
};

export default WeatherCard;
