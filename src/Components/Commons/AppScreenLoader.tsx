import * as React from 'react';
import ProgressLoader from 'rn-progress-loader';
import {connect} from 'react-redux';
import {If} from 'react-if';

import {Colors} from '../../Themes';

type AppLoaderProps = {
  hudColor?: string;
  color?: string;
  isHUD?: boolean;
  isModal?: boolean;
  isLoading?: boolean;
};
const AppScreenLoader = (props: AppLoaderProps) => {
  const {
    isLoading = false,
    hudColor = Colors.black,
    color = Colors.white,
    isHUD = true,
    isModal = true,
  } = props;

  return (
    <If condition={isLoading}>
      <ProgressLoader
        visible={true}
        isModal={isModal}
        isHUD={isHUD}
        hudColor={hudColor}
        color={color}
      />
    </If>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoading: state.appScreenLoader.isLoading,
  };
};

export default connect(mapStateToProps)(AppScreenLoader);
