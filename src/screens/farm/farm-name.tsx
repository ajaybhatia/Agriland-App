import type { FormikValues } from 'formik';
import { useFormik } from 'formik';
import { ScrollView, View, VStack } from 'native-base';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';
import * as yup from 'yup';

import type { FarmRequest } from '@/apis/model';
import CardWithShadow from '@/ui/components/CardWithShadow';
import CustomButton from '@/ui/components/CustomButton';
import Header from '@/ui/components/Header';
import RoundInput from '@/ui/components/RoundInput';

type Props = {
  onNextStep?: (farmRequest: FarmRequest) => void;
  farmRequest?: FarmRequest;
};

const AddFarmName = ({ onNextStep, farmRequest }: Props) => {
  const { t } = useTranslation();

  // Formik
  const { handleSubmit, handleChange, handleBlur, values, errors, touched } =
    useFormik<FormikValues>({
      initialValues: {
        farmName: farmRequest?.name ?? '',
      },
      onSubmit: () => {
        onNextStep &&
          onNextStep({
            ...farmRequest,
            name: values.farmName,
          });
      },
      validationSchema: yup.object({
        farmName: yup.string().trim().required(t('name-required')),
      }),
    });

  return (
    <ScrollView style={styles.fullscreen}>
      <View mt={50}>
        <CardWithShadow>
          <VStack p={5}>
            <Header title={t('choose-farm-name')} />
            <RoundInput
              mt={5}
              onBlur={handleBlur('farmName')}
              placeholder={t('farm-name')}
              onChangeText={handleChange('farmName')}
              value={values.farmName}
              isInvalid={!!errors.farmName}
              errors={errors.farmName && touched.farmName && errors.farmName}
            />

            <CustomButton
              width={'80%'}
              onPress={handleSubmit}
              title={t('continue')}
            />
          </VStack>
        </CardWithShadow>
      </View>
    </ScrollView>
  );
};

export default AddFarmName;

const styles = StyleSheet.create({
  fullscreen: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
});
