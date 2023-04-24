import type { FormikValues } from 'formik';
import { useFormik } from 'formik';
import { Button, View, VStack } from 'native-base';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';
import * as yup from 'yup';

import CardWithShadow from '@/ui/components/CardWithShadow';
import Header from '@/ui/components/Header';
import RoundInput from '@/ui/components/RoundInput';
import colors from '@/ui/theme/colors';

type Props = {
  onNextStep?: () => void;
};

const AddFarmName = ({ onNextStep }: Props) => {
  const { t } = useTranslation();

  // Formik
  const { handleSubmit, handleChange, handleBlur, values, errors, touched } =
    useFormik<FormikValues>({
      initialValues: {
        farmName: '',
      },
      onSubmit: () => {
        console.log('onSubmit ==> ', values);
        onNextStep && onNextStep();
      },
      validationSchema: yup.object({
        farmName: yup.string().trim().required(t('name-required')),
      }),
    });

  return (
    <View style={styles.fullscreen} marginTop={5}>
      <CardWithShadow>
        <VStack p={5}>
          <Header title={'Choose farm name'} />
          <RoundInput
            mt={5}
            onBlur={handleBlur('farmName')}
            placeholder={t('name')}
            onChangeText={handleChange('farmName')}
            value={values.farmName}
            isInvalid={!!errors.farmName}
            errors={errors.farmName && touched.farmName && errors.farmName}
          />
          <Button
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
        </VStack>
      </CardWithShadow>
    </View>
  );
};

export default AddFarmName;

const styles = StyleSheet.create({
  fullscreen: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 100,
  },
});
