import type { RouteProp } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import type { FormikValues } from 'formik';
import { useFormik } from 'formik';
import { t } from 'i18next';
import { Button, View } from 'native-base';
import React from 'react';
import { I18nManager } from 'react-native';
import Toast from 'react-native-toast-message';
import * as yup from 'yup';

import { usePostApiAccountCreateUserBasicDetails } from '@/apis/endpoints/api';
import { useSelectedLanguage } from '@/core';
import type { Language } from '@/core/i18n/resources';
import type { AuthStackParamList } from '@/navigation/auth-navigator';
import type { Option } from '@/ui';
import Header from '@/ui/components/Header';
import RoundInput from '@/ui/components/RoundInput';
import colors from '@/ui/theme/colors';

interface Props {
  onNextSubmit?: () => void;
}

function AddUserInfo({ onNextSubmit }: Props) {
  const { language, setLanguage } = useSelectedLanguage();
  const route = useRoute<RouteProp<AuthStackParamList, 'AddFarmScreen'>>();
  const addUserInfo = usePostApiAccountCreateUserBasicDetails();
  // const getUserInfo = useGetApiAccountFetchUserBasicDetails({})

  // Formik
  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    resetForm,
    errors,
    touched,
    setFieldValue,
    setValues,
  } = useFormik<FormikValues>({
    initialValues: {
      displayName: route.params?.google?.displayName ?? '',
      emailId: route.params?.google?.email ?? '',
      mobileNumber: route.params?.phoneNumber ?? '',
    },
    onSubmit: () => {
      console.log('onSubmit ==> ', values);
      apiSubmitInfo(values);
    },
    validationSchema: yup.object({
      displayName: yup.string().trim().required(t('name-required')),
      emailId: yup
        .string()
        .trim()
        .required(t('e-mail-required'))
        .test('email', t('enter-valid-email'), function (value) {
          const emailRegex =
            /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
          let isValidEmail = emailRegex.test(value);
          if (!isValidEmail) {
            return false;
          }
          return true;
        }),
      mobileNumber: yup
        .string()
        .trim()
        .required(t('mobile-number-required'))
        .test('phone', t('valid-mobile-number'), function (value) {
          // const emailRegex = /\\(?\\d{3}\\)?[-\\/\\.\\s]?\\d{3}[-\\/\\.\\s]?/;

          const phoneRegex = /^(\+91-|\+91|0)?\d{10}$/; // Change this regex based on requirement
          let isValidPhone = phoneRegex.test(value);
          if (!isValidPhone) {
            return false;
          }
          return true;
        }),
    }),
  });

  function apiSubmitInfo() {
    addUserInfo.mutate(
      {
        data: values,
      },
      {
        onSuccess(data) {
          console.log('onSuccess ==> ', data);
          if (data) {
            onNextSubmit && onNextSubmit();
          } else {
            Toast.show({
              type: 'error',
              text1: 'Something went wrong!',
            });
          }
        },
        onError(error) {
          console.log('onError ==> ', error);
          Toast.show({
            type: 'error',
            text1: error.message,
          });
        },
      }
    );
  }

  const onSelect = React.useCallback(
    (option: Option) => {
      setLanguage(option.value as Language);
      if ((option.value as Language) === 'en') {
        I18nManager.forceRTL(false); // false for LTR direction
      } else {
        I18nManager.forceRTL(true);
      }
    },
    [setLanguage]
  );

  return (
    <View flex={1} mx={5}>
      <Header title={t('account-data')} mt={10} />
      <RoundInput
        mt={5}
        onBlur={handleBlur('displayName')}
        placeholder={t('name')}
        onChangeText={handleChange('displayName')}
        value={values.displayName}
        isDisabled={route.params?.google?.displayName ? true : false}
        isInvalid={!!errors.displayName}
        errors={errors.displayName && touched.displayName && errors.displayName}
      />
      <RoundInput
        mt={5}
        onBlur={handleBlur('emailId')}
        onChangeText={handleChange('emailId')}
        placeholder={t('e-mail')}
        value={values.emailId}
        keyboardType={'email-address'}
        isDisabled={route.params?.google?.email ? true : false}
        isInvalid={!!errors.emailId}
        errors={errors.emailId && touched.emailId && errors.emailId}
      />
      <RoundInput
        mt={5}
        onBlur={handleBlur('mobileNumber')}
        placeholder={t('mobile')}
        keyboardType={'number-pad'}
        onChangeText={handleChange('mobileNumber')}
        value={values.mobileNumber}
        isDisabled={route.params?.phoneNumber ? true : false}
        isInvalid={!!errors.mobileNumber}
        errors={
          errors.mobileNumber && touched.mobileNumber && errors.mobileNumber
        }
      />
      {/* <RoundInput mt={5} placeholder="password" />
      <Header
        title="Register as a company?"
        mt={5}
        fontSize={13}
        fontWeight={'normal'}
      />
      <Radio.Group
        name="exampleGroup"
        defaultValue="1"
        accessibilityLabel="pick a size"
      >
        <Stack
          mt={3}
          direction={{
            base: 'row',
            md: 'row',
          }}
          alignItems={{
            base: 'flex-start',
            md: 'center',
          }}
          space={4}
          w="75%"
          maxW="300px"
        >
          <Radio value="1" colorScheme="red" size="sm" my={1}>
            Yes
          </Radio>
          <Radio value="0" colorScheme="red" size="sm" my={1}>
            No
          </Radio>
        </Stack>
      </Radio.Group> */}

      <Button
        isLoading={addUserInfo.isLoading}
        backgroundColor={colors.button_color}
        mt={10}
        onPress={handleSubmit}
        borderRadius={8}
        width={'80%'}
        fontWeight={'normal'}
        fontSize={20}
        overflow={'hidden'}
        alignSelf={'center'}
      >
        {t('continue')}
      </Button>
    </View>
  );
}
export default AddUserInfo;
