import * as React from 'react';
import {Input} from 'react-native-elements';
import styled from 'styled-components/native';
import {isEmpty, propOr} from 'ramda';
import {If} from 'react-if';
import {View, Platform} from 'react-native';

import {Colors, Fonts, Metrics} from '../../../Themes';
import {AppText, _Text} from '../AppStyledComponents';

type InputContainerProps = {
  marginBottom?: string;
  marginTop?: string;
  paddingHorizontal?: number;
};
const InputContainer = styled(View)<InputContainerProps>`
  margin-top: ${(props) => propOr('0px', 'marginTop')(props)};
  margin-bottom: ${(props) => propOr('0px', 'marginBottom')(props)};
  padding-horizontal: ${(props) => propOr(0, 'paddingHorizontal')(props)};
  flex-direction: row;
  height: 55;
  align-items: center;
  justify-content: center;
  background-color: ${Colors.white};
  border-width: 1;
  border-radius: ${Metrics.smallMargin};
  border-color: ${Colors.borderColor};
`;

type InputErrorContainerProps = {
  marginBottom?: string;
  marginTop?: string;
};
const InputErrorContainer = styled(View)<InputErrorContainerProps>`
  margin-top: ${(props) => propOr('0px', 'marginTop')(props)};
  margin-bottom: ${(props) => propOr('0px', 'marginBottom')(props)};
  flex-direction: row;
  justify-content: space-between;
`;

const InputErrorText = styled(_Text)`
  color: ${Colors.error};
  font-size: ${Fonts.size.small};
  font-family: TTCommons-Regular;
`;
export type InputFieldProps = {
  label?: string;
  value: string;
  disabled?: boolean;
  errorMessage?: string;
  placeholder?: string;
  multiLine?: boolean;
  onChangeHandler(value: any): void;
  onBlurHandler?(value: any): void;
  onSubmitEditing?(value: any): void;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';

  //styling props
  InputStyle?: Object;

  showInputLinkComponent?: boolean;
  InputLinkComponent?(): React.ReactElement;
  inputFieldStyle?: object;
  disabledInputStyle?: object;
  showPrefix?: boolean;
  PrefixComponent?(): React.ReactElement;
};

const InputField = (props: InputFieldProps) => {
  const {
    label = '',
    placeholder = '',
    value = '',
    disabled = false,
    onChangeHandler,
    onBlurHandler = () => {},
    onSubmitEditing = () => {},
    errorMessage = '',
    showPrefix = false,
    PrefixComponent = () => <></>,
    secureTextEntry = false,
    keyboardType = 'default',
    autoCapitalize = 'none',
    showInputLinkComponent = false,
    InputLinkComponent = () => <></>,
    multiLine = false,

    //styling props
    inputFieldStyle = {
      marginTop: Metrics.doubleBaseMargin,
      width: Metrics.screenWidth / 1.5,
    },
    disabledInputStyle = {},
  } = props;

  const ShowPrefixComponent = () => (showPrefix ? <PrefixComponent /> : null);

  const inputFieldRef = React.useRef(null);

  return (
    <View style={inputFieldStyle}>
      <InputContainer>
        <Input
          ref={inputFieldRef}
          //label={label}
          inputStyle={{
            fontSize: Fonts.size.medium,
            fontFamily: 'TTCommons-DemiBold',
            textTransform: 'capitalize',
            textAlign: 'center',
          }}
          disabled={disabled}
          disabledInputStyle={disabledInputStyle}
          placeholder={placeholder}
          value={value}
          leftIcon={() => ShowPrefixComponent()}
          leftIconContainerStyle={{
            left: -Metrics.screenHorizontalPadding + 5,
            position: 'absolute',
            top: Platform.OS === 'android' ? Metrics.smallMargin : 0,
          }}
          onChangeText={onChangeHandler}
          onSubmitEditing={onSubmitEditing}
          onBlur={onBlurHandler}
          // errorMessage={errorMessage}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          multiline={multiLine}
          inputContainerStyle={{
            // borderBottomColor: !isEmptyOrNil(errorMessage)
            //   ? Colors.primary
            //   : Colors.darkGrey,
            borderBottomWidth: 0,
            paddingLeft: showPrefix ? Metrics.baseMargin + 3 : 0,
          }}
          maxFontSizeMultiplier={1.1}
          returnKeyType={multiLine ? 'default' : 'done'}
        />
      </InputContainer>
      <InputErrorContainer
        marginTop="5px"
        marginBottom={`${Metrics.doubleBaseMargin}px`}>
        <View style={{flex: 1}}>
          <If condition={!isEmpty(errorMessage)}>
            <InputErrorText>{errorMessage}</InputErrorText>
          </If>
        </View>
        <If condition={showInputLinkComponent}>
          <View style={{marginTop: Metrics.doubleBaseMargin}}>
            <InputLinkComponent />
          </View>
        </If>
      </InputErrorContainer>
    </View>
  );
};

export default InputField;
