import type { FormikValues } from 'formik';
import { useFormik } from 'formik';
import { Button, ScrollView, View, VStack } from 'native-base';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import * as yup from 'yup';

import type { City, FarmRequest, Governorate, Village } from '@/apis/model';
import DummyInput from '@/ui/components/DummyInput';
import Header from '@/ui/components/Header';
import RoundInput from '@/ui/components/RoundInput';
import colors from '@/ui/theme/colors';

import type { FarmInfoModal } from './add-farm-maps';
import CityList from './city-list';
import GetGovernerate from './get-governerate';
import VillageList from './village-list';

type Props = {
  onNextStep?: (farmRequest: FarmRequest & FarmInfoModal) => void;
  farmRequest?: FarmRequest & FarmInfoModal;
};

const AddFarmAddress = ({ onNextStep, farmRequest }: Props) => {
  const { t } = useTranslation();
  const [isGovernerateOpen, setGovernerateOpen] = useState<boolean>(false);
  const [isCityOpen, setCityOpen] = useState<boolean>(false);
  const [isVillageOpen, setVillageOpen] = useState<boolean>(false);

  // Formik
  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    errors,
    touched,
    setValues,
    setFieldValue,
  } = useFormik<FormikValues>({
    initialValues: {
      address: farmRequest?.address ?? '',
      governorate: farmRequest?.governorate ?? '',
      governorateFieldId: farmRequest?.governorateFieldId ?? '',
      city: farmRequest?.city ?? '',
      cityId: farmRequest?.cityId ?? '',
      village: farmRequest?.village ?? '',
      villageId: farmRequest?.villageId ?? '',
      organization: farmRequest?.organization ?? '',
    },
    onSubmit: () => {
      onNextStep &&
        onNextStep({
          ...farmRequest,
          address: values.address,
          governorate: values.governorate,
          governorateFieldId: values.governorateFieldId,
          city: values.city,
          cityId: values.cityId,
          villageId: values.villageId,
          village: values.village,
          organization: values.organization,
        });
    },
    validationSchema: yup.object({
      address: yup.string().trim().required('Address is required'),
      organization: yup.string().trim().required('Organization is required'),
      governorate: yup.string().trim().required('Governorate is required'),
      city: yup.string().trim().required('City is required'),
      village: yup.string().trim().required('Village is required'),
    }),
  });

  return (
    <View style={styles.fullscreen}>
      <VStack p={5}>
        <Header title={t('enter-farm-address')} />
        <ScrollView>
          <DummyInput
            value={
              values.governorate !== '' && values.governorate !== undefined
                ? values.governorate
                : ''
            }
            defaultValue={t('governerate')}
            mt={5}
            onOpen={() => setGovernerateOpen(true)}
            isInvalid={!!errors.governorate}
            errors={
              errors.governorate && touched.governorate && errors.governorate
            }
          />

          {values.governorate !== '' && values.governorate !== undefined && (
            <DummyInput
              value={
                values.city !== '' && values.city !== undefined
                  ? values.city
                  : ''
              }
              defaultValue={t('city')}
              mt={5}
              onOpen={() => setCityOpen(true)}
              isInvalid={!!errors.city}
              errors={errors.city && touched.city && errors.city}
            />
          )}

          {values.city !== '' && values.city !== undefined && (
            <DummyInput
              value={
                values.village !== '' && values.village !== undefined
                  ? values.village
                  : ''
              }
              defaultValue={t('village')}
              mt={5}
              onOpen={() => setVillageOpen(true)}
              isInvalid={!!errors.village}
              errors={errors.village && touched.village && errors.village}
            />
          )}

          <RoundInput
            mt={5}
            onBlur={handleBlur('address')}
            placeholder={t('address')}
            onChangeText={handleChange('address')}
            value={values.address}
            isInvalid={!!errors.address}
            errors={errors.address && touched.address && errors.address}
          />

          <RoundInput
            mt={5}
            onBlur={handleBlur('organization')}
            placeholder={t('organization')}
            onChangeText={handleChange('organization')}
            value={values.organization}
            isInvalid={!!errors.organization}
            errors={
              errors.organization && touched.organization && errors.organization
            }
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
        </ScrollView>
      </VStack>
      <Modal
        coverScreen={true}
        style={{ margin: 0 }}
        isVisible={isGovernerateOpen}
        onDismiss={() => setGovernerateOpen(false)}
        onModalHide={() => setGovernerateOpen(false)}
      >
        <GetGovernerate
          onGovernerateSelect={(governorate: Governorate[]) => {
            if (governorate.length > 0) {
              setValues({
                ...values,
                governorate: governorate[0].name,
                governorateFieldId: governorate[0].id,
                city: '',
                cityId: '',
                village: '',
                villageId: '',
              });
            }
            setGovernerateOpen(false);
          }}
          onClose={() => setGovernerateOpen(false)}
        />
      </Modal>
      <Modal
        coverScreen={true}
        style={{ margin: 0 }}
        isVisible={
          isCityOpen &&
          values.governorateFieldId !== '' &&
          values.governorateFieldId !== undefined
        }
        onDismiss={() => setCityOpen(false)}
        onModalHide={() => setCityOpen(false)}
      >
        <CityList
          governateId={values.governorateFieldId}
          onCitySelect={(city: City[]) => {
            setValues({
              ...values,
              city: city[0].name,
              cityId: city[0].id,
              village: '',
              villageId: '',
            });
            setCityOpen(false);
          }}
          onClose={() => setCityOpen(false)}
        />
      </Modal>
      <Modal
        coverScreen={true}
        style={{ margin: 0 }}
        isVisible={
          isVillageOpen &&
          values.governorateFieldId !== '' &&
          values.governorateFieldId !== undefined
        }
        onDismiss={() => setVillageOpen(false)}
        onModalHide={() => setVillageOpen(false)}
      >
        <VillageList
          cityId={values.cityId}
          onVillageSelect={(village: Village[]) => {
            setValues({
              ...values,
              village: village[0].name,
              villageId: village[0].id,
            });
            setVillageOpen(false);
          }}
          onClose={() => setVillageOpen(false)}
        />
      </Modal>
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
