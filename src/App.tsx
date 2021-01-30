import React from 'react';
import {SafeAreaView, StatusBar, View, LogBox} from 'react-native';
import {Fragment} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import {If, Then, Else} from 'react-if';

import {AppNavigator} from './Navigation';
import {NavigationService} from './Services';
import {APP_CONSTANTS} from './Constants';
import store from './Redux/store';
import {AppScreenLoader, AppErrorDialog, AppErrorBoundary} from './Components';

const AppContainer = (props) => {
  const {isAppError} = props;
  const ref = React.useRef(null);

  React.useEffect(() => {
    NavigationService.setTopLevelNavigator(ref);
  });

  return (
    <Fragment>
      <AppErrorBoundary>
        <If condition={isAppError}>
          <Then>
            <NavigationContainer ref={ref}>
              <AppNavigator />
            </NavigationContainer>
          </Then>
          <Else>
            <View style={{flex: 1}}>
              <AppErrorDialog
                isModalVisible={!isAppError}
                errorMessage={APP_CONSTANTS.APP_ERROR_MESSAGE}
                title="Technical Difficulties"
                showButton={false}
              />
            </View>
          </Else>
        </If>
      </AppErrorBoundary>
    </Fragment>
  );
};

const App = () => {
  const [isConnected, toggleNetwork] = React.useState(false);

  const handleConnectivityChange = async () => {
    const checkConnectivity = await NetInfo.fetch();
    const {isConnected} = checkConnectivity;
    toggleNetwork(isConnected);
  };

  React.useEffect(() => {
    NetInfo.addEventListener((change) => handleConnectivityChange());
    if (__DEV__)
      LogBox.ignoreLogs([
        'Expected style',
        'Require cycle: src/Components/index.ts',
      ]);
  }, [isConnected]);

  return (
    <>
      <Provider store={store}>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={{flex: 1}}>
          <AppScreenLoader />
          <AppContainer isAppError={isConnected} />
        </SafeAreaView>
      </Provider>
    </>
  );
};

export default App;
