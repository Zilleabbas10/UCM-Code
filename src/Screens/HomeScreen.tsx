import React from 'react';
import {FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import {pathOr} from 'ramda';
import styled from 'styled-components/native';
import {If} from 'react-if';

import {Colors, Metrics} from '../Themes';
import {
  ErrorMessage,
  HomeContent,
  HomePlaceholder,
  WeatherCard,
} from '../Components';
import {WeatherType} from '../types';
import {isEmptyOrNil} from '../Utils';

const HomeScreenContainer = styled.View`
  flex: 1;
  background-color: ${Colors.white};
`;

const HomeScreen = () => {
  const state = useSelector((state) => state);
  const weatherList: Array<WeatherType> = pathOr(
    [],
    ['home', 'weatherList'],
    state,
  );

  return (
    <HomeScreenContainer>
      <ErrorMessage />
      <FlatList
        data={weatherList}
        contentContainerStyle={{
          paddingHorizontal: Metrics.doubleBaseMargin,
          paddingBottom: Metrics.doubleBaseMargin,
        }}
        ListHeaderComponent={() => <HomeContent />}
        renderItem={({item}) => <WeatherCard item={item} />}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.dtTxt.toString()}
      />
      <If condition={isEmptyOrNil(weatherList)}>
        <HomePlaceholder />
      </If>
    </HomeScreenContainer>
  );
};

export default HomeScreen;
