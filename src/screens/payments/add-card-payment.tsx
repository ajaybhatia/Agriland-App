import type { RouteProp } from '@react-navigation/native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { FormikValues } from 'formik';
import { useFormik } from 'formik';
import { Button, ScrollView, View } from 'native-base';
import React, { useCallback, useEffect, useRef } from 'react';
import { CreditCardInput } from 'react-native-credit-card-input';
import * as yup from 'yup';

import type { AuthStackParamList } from '@/navigation/types';
import ListHeader from '@/ui/components/ListHeader';
import colors from '@/ui/theme/colors';

type Props = {};

export interface CardPayment {
  cardNumber: string;
  cvv: string;
  expireDate: string;
  name: string;
}

const AddCardPayment = (props: Props) => {
  const refCard = useRef();
  const nav = useNavigation();
  const route = useRoute<RouteProp<AuthStackParamList, 'AddCardPayment'>>();

  const {
    handleSubmit,
    handleChange,
    setValues,
    handleBlur,
    values,
    errors,
    touched,
  } = useFormik<FormikValues>({
    initialValues: {
      name: route?.params?.card?.name ?? '',
      cardNumber: route?.params?.card?.cardNumber ?? '',
      cvv: route?.params?.card?.cvv ?? '',
      expireDate: route?.params?.card?.expireDate ?? '',
    },
    onSubmit: () => {
      if (route?.params && route?.params?.onAddCard) {
        route?.params?.onAddCard(values as CardPayment);
        nav.goBack();
      }
    },
    validationSchema: yup.object({
      name: yup.string().trim().required('Enter name'),
      cardNumber: yup.string().trim().required('Enter card number'),
      cvv: yup.string().trim().required('Enter cvv'),
      expireDate: yup.string().trim().required('Enter ex. date'),
    }),
  });

  useEffect(() => {
    if (refCard && refCard.current) {
      refCard.current.setValues({
        name: route?.params?.card?.name ?? '',
        number: route?.params?.card?.cardNumber ?? '',
        expiry: route?.params?.card?.expireDate ?? '',
        cvc: route?.params?.card?.cvv ?? '',
      });
    }
  }, []);

  const onChange = useCallback(
    (creditform: any) => {
      setValues({
        ...values,
        name: creditform?.values?.name ?? '',
        cardNumber: creditform?.values?.number ?? '',
        cvv: creditform?.values?.cvc ?? '',
        expireDate: creditform?.values?.expiry ?? '',
      });
    },
    [setValues, values]
  );
  return (
    <ScrollView flex={1}>
      <View flex={1}>
        <ListHeader title="Add A New Payment Method" mt={5} mr={5} ml={5} />

        <CreditCardInput
          ref={refCard}
          onChange={onChange}
          cardScale={1.1}
          inputStyle={{
            borderColor: colors.button_color,
            borderWidth: 1,
            borderRadius: 10,
            marginTop: 10,
            paddingHorizontal: 10,
          }}
          inputContainerStyle={{
            borderBottomWidth: 0,
            flexDirection: 'column',
          }}
          requiresName
          autoFocus
          requiresCVC
          requiresPostalCode={false}
          allowScroll
        />
        {/* <RoundInput
        mt={5}
        onBlur={handleBlur('name')}
        placeholder={'Card Holder Name'}
        onChangeText={handleChange('name')}
        value={values.name}
        isInvalid={!!errors.name}
        errors={errors.name && touched.name && errors.name}
      />

      <RoundInput
        mt={5}
        onBlur={handleBlur('cardNumber')}
        placeholder={'Card Number'}
        onChangeText={handleChange('cardNumber')}
        value={values.cardNumber}
        isInvalid={!!errors.cardNumber}
        errors={errors.cardNumber && touched.cardNumber && errors.cardNumber}
      />

      <HStack justifyContent={'space-between'} alignItems={'center'} mt={5}>
        <RoundInput
          onBlur={handleBlur('cvv')}
          placeholder={'CVV'}
          onChangeText={handleChange('cvv')}
          value={values.cvv}
          isInvalid={!!errors.cvv}
          errors={errors.cvv && touched.cvv && errors.cvv}
        />

        <RoundInput
          onBlur={handleBlur('expireDate')}
          placeholder={'Expire date'}
          onChangeText={handleChange('expireDate')}
          value={values.expireDate}
          isInvalid={!!errors.expireDate}
          errors={errors.expireDate && touched.expireDate && errors.expireDate}
        />
      </HStack> */}

        <Button
          onPress={handleSubmit}
          backgroundColor={colors.button_color}
          borderRadius={8}
          width={'90%'}
          fontWeight={'normal'}
          fontSize={20}
          overflow={'hidden'}
          alignSelf={'center'}
          mt={10}
        >
          {'Add Card'}
        </Button>
      </View>
    </ScrollView>
  );
};

export default AddCardPayment;
