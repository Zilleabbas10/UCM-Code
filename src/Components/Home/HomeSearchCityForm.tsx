import React from 'react';
import {Formik} from 'formik';
import * as yup from 'yup';
import {useDispatch} from 'react-redux';

import {getCityWeatherReport, emptyCityWeatherReportList} from '../../Actions';
import {PrimaryButton} from '../Commons';
import {FormikInputField} from '../Commons/FormFields';
import {Colors, Metrics} from '../../Themes';

const cityFormValidations = () => {
  return yup.object().shape({
    city: yup.string().required('City name is required.'),
  });
};

const HomeSearchCityForm = () => {
  const dispatch = useDispatch();
  const cityFormInitialValues = {city: ''};
  const getCityData = async (params) => {
    const {city} = params;
    await dispatch(emptyCityWeatherReportList());
    await dispatch(getCityWeatherReport(city));
  };
  return (
    <Formik
      initialValues={cityFormInitialValues}
      onSubmit={(values) => getCityData(values)}
      validationSchema={cityFormValidations}>
      {({
        values,
        handleChange,
        errors,
        setFieldTouched,
        touched,
        isValid,
        handleSubmit,
        setFieldValue,
      }) => (
        <>
          <FormikInputField
            fieldName={'city'}
            fieldProps={{
              value: values.city,
              onChangeHandler: handleChange('city'),
              onBlurHandler: () => setFieldTouched('city'),
              placeholder: 'Enter city',
              keyboardType: 'default',
              errorMessage:
                touched.city && errors.city ? (errors.city as string) : '',
            }}
          />
          <PrimaryButton
            fullWidth={false}
            width={Metrics.screenWidth / 2}
            disabled={!isValid}
            buttonColor={Colors.primary}
            buttonLabel="Have a look"
            onClickHandler={handleSubmit}
          />
        </>
      )}
    </Formik>
  );
};

export default HomeSearchCityForm;
