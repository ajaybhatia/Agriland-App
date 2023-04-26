import type { FormikValues } from 'formik';
import { useFormik } from 'formik';
import { Button, Icon, Pressable, Text, View, VStack } from 'native-base';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as yup from 'yup';

import type { GovernorateResponse } from '@/apis/model';
import Header from '@/ui/components/Header';
import RoundInput from '@/ui/components/RoundInput';
import colors, { BORDER_COLOR_DARK } from '@/ui/theme/colors';

import GetGovernerate from './get-governerate';

type Props = {
  onNextStep?: () => void;
};

const AddFarmAddress = ({ onNextStep }: Props) => {
  const { t } = useTranslation();
  const [isGovernerateOpen, setGovernerateOpen] = useState<Boolean>(false);

  // Formik
  const { handleSubmit, handleChange, handleBlur, values, errors, touched } =
    useFormik<FormikValues>({
      initialValues: {
        address: '',
        city: '',
        organization: '',
        village: '',
      },
      onSubmit: () => {
        console.log('onSubmit ==> ', values);
        onNextStep && onNextStep();
      },
      validationSchema: yup.object({
        address: yup.string().trim().required(t('name-required')),
        city: yup.string().trim().required(t('name-required')),
        organization: yup.string().trim().required(t('name-required')),
        village: yup.string().trim().required(t('name-required')),
      }),
    });

  return (
    <View style={styles.fullscreen}>
      <VStack p={5}>
        <Header title={'Enter farm address'} />

        <RoundInput
          mt={5}
          onBlur={handleBlur('address')}
          placeholder={'address'}
          onChangeText={handleChange('address')}
          value={values.address}
          isInvalid={!!errors.address}
          errors={errors.address && touched.address && errors.address}
        />
        <Pressable
          onPress={() => setGovernerateOpen(true)}
          mt={5}
          borderWidth={2}
          borderColor={BORDER_COLOR_DARK}
          borderRadius={15}
        >
          <View
            flexDirection={'row'}
            alignItems={'center'}
            justifyContent={'space-between'}
          >
            <Text color={'#a9a9a9'} fontSize={'xs'} ml={3} py={4}>
              Governerate
            </Text>
            <Icon
              mr={3}
              as={MaterialIcons}
              name={'arrow-drop-down'}
              size={'2xl'}
              color={'amber.600'}
            />
          </View>
        </Pressable>

        <RoundInput
          mt={5}
          onBlur={handleBlur('city')}
          placeholder={'city'}
          onPressIn={() => {
            Toast.show({
              type: 'error',
              text1: 'RoundInput',
            });
          }}
          onChangeText={handleChange('city')}
          value={values.city}
          isInvalid={!!errors.city}
          errors={errors.city && touched.city && errors.city}
        />
        <RoundInput
          mt={5}
          onBlur={handleBlur('city')}
          placeholder={'city'}
          onChangeText={handleChange('city')}
          value={values.city}
          isInvalid={!!errors.city}
          errors={errors.city && touched.city && errors.city}
        />
        <RoundInput
          mt={5}
          onBlur={handleBlur('organization')}
          placeholder={'organization'}
          onChangeText={handleChange('organization')}
          value={values.organization}
          isInvalid={!!errors.organization}
          errors={
            errors.organization && touched.organization && errors.organization
          }
        />
        <RoundInput
          mt={5}
          onBlur={handleBlur('village')}
          placeholder={'village'}
          onChangeText={handleChange('village')}
          value={values.village}
          isInvalid={!!errors.village}
          errors={errors.village && touched.village && errors.village}
        />
        <Button
          backgroundColor={colors.button_color}
          mt={10}
          onPress={handleSubmit}
          // onPress={() => {
          //   if (I18nManager.isRTL) {
          //     onSelect({ label: translate('settings.english'), value: 'en' });
          //   } else {
          //     onSelect({ label: translate('settings.arabic'), value: 'ar' });
          //   }
          // }}
          borderRadius={8}
          width={'80%'}
          fontWeight={'normal'}
          fontSize={20}
          overflow={'hidden'}
          alignSelf={'center'}
        >
          {t('continue')}
        </Button>
      </VStack>
      {isGovernerateOpen && (
        <GetGovernerate
          onGovernerateSelect={(governorate: GovernorateResponse[]) => {
            console.log('Selected governorate ===> ', governorate);
            setGovernerateOpen(false);
          }}
        />
      )}
    </View>
  );
};

export default AddFarmAddress;

const styles = StyleSheet.create({
  fullscreen: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'white',
  },
});
