import React from 'react';
import {View} from 'react-native';
import {HomeSearchCityForm} from '.';

import {Colors, Fonts, Metrics} from '../../Themes';
import {AppHeading, AppText} from '../Commons';

const HomeContent = () => {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: Metrics.doubleBaseMargin,
      }}>
      <AppHeading color={Colors.primary} fontSize={Fonts.size.h1}>
        Hello Sunshine!
      </AppHeading>
      <AppHeading
        paddingRight={Metrics.smallMargin + 3}
        paddingLeft={Metrics.smallMargin + 3}
        paddingTop={Metrics.doubleBaseMargin}
        paddingBottom={Metrics.doubleBaseMargin}
        fontSize={Fonts.size.h1}
        textAlign="center">
        Can you please tell me the weather in Germany?
      </AppHeading>
      <AppText>Please enter a city</AppText>
      <HomeSearchCityForm />
    </View>
  );
};

export default HomeContent;
