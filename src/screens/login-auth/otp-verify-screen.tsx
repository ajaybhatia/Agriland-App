import type { FirebaseAuthTypes } from '@react-native-firebase/auth';
import auth from '@react-native-firebase/auth';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
/* eslint-disable react-native/no-inline-styles */
import {
  Button,
  HStack,
  Image as ImageBase,
  ScrollView,
  Text,
  View,
  VStack,
} from 'native-base';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import OTPTextInput from 'react-native-otp-textinput';
import Toast from 'react-native-toast-message';

import type { AuthStackParamList } from '../../navigation/auth-navigator';

type OtpVerifyScreenProps = NativeStackScreenProps<
  AuthStackParamList,
  'OtpVerifyScreen'
>;

const OtpVerifyScreen = ({ route }: OtpVerifyScreenProps) => {
  const [confirmation, setConfirmation] =
    useState<FirebaseAuthTypes.ConfirmationResult>();
  const [phoneNumber, setPhoneNumber] = useState<string>('');

  const { t } = useTranslation();
  const ref = React.useRef(null);

  const [otpValue, setOtpValue] = useState<string>('');
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isResendLoading, setResendLoading] = useState<boolean>(false);

  useEffect(() => {
    if (route?.params?.confirmation) {
      setConfirmation(route.params.confirmation);

      setPhoneNumber(route.params.phoneNumber);
    }
  }, [route?.params?.confirmation, route?.params?.phoneNumber]);

  const onResendOtp = async () => {
    try {
      if (phoneNumber !== '') {
        try {
          setResendLoading(true);
          const _confirmation = await auth().signInWithPhoneNumber(
            phoneNumber,
            true
          );
          setConfirmation(_confirmation);
          setResendLoading(false);
          Toast.show({
            type: 'error',
            text1: 'Otp sent',
          });
        } catch (error) {
          setResendLoading(false);
          console.log(error);
          Toast.show({
            type: 'error',
            text1: 'Resend fail',
          });
        }
      }
    } catch (error) {
      console.log(error);
      setResendLoading(false);
      Toast.show({
        type: 'error',
        text1: 'Resend fail',
      });
    }
  };

  const onConfirm = async () => {
    try {
      setLoading(true);
      await confirmation?.confirm(otpValue);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      Toast.show({
        type: 'error',
        text1: 'Fail to confirm otp',
      });
    }
  };

  return (
    <ScrollView
      scrollEnabled={false}
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
    >
      <View flex={1}>
        <Image
          style={{
            position: 'absolute',
            top: -20,
            left: 0,
            height: 250,
            right: 0,
          }}
          resizeMode={'cover'}
          source={{
            uri: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
          }}
        />
        <SafeAreaView style={{ flex: 1 }}>
          <VStack paddingX={'10'}>
            <ImageBase
              alt="nice"
              height={'16'}
              marginTop={130}
              resizeMode={'contain'}
              alignSelf={'center'}
              source={{
                uri: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
              }}
            />
            <Text
              alignSelf={'center'}
              textAlign={'center'}
              fontWeight="normal"
              fontSize={13}
              mt={5}
              color={'black'}
            >
              {`${t('terms_title')} `}
              <Text fontWeight="medium" fontSize={13}>
                {t('Terms')}
              </Text>{' '}
              {`${t('and')} `}
              <Text fontWeight="medium" fontSize={13}>
                {`${t('Privacy statement')}`}
              </Text>
            </Text>
            <Text fontWeight="bold" fontSize={18} color={'green.500'} mt={8}>
              {t('Verification')}
            </Text>
            <Text fontWeight="thin" fontSize={13} color={'black'} mt={2}>
              {`${t('Enter the OTP you received to')} ${phoneNumber}`}
            </Text>
          </VStack>
          <VStack mt={5}>
            <OTPTextInput
              ref={ref}
              handleTextChange={(text: string) => setOtpValue(text)}
              textInputStyle={styles.roundedTextInput}
              inputCount={6}
              inputCellLength={1}
              keyboardType="numeric"
              //   defaultValue={'----'}
            />
          </VStack>
          <VStack paddingX={'10'}>
            <HStack alignItems={'center'} mt={8}>
              <Text fontWeight="thin" fontSize={13} color={'black'}>
                {`${t("i didn't receive a code !")} `}
              </Text>
              {isResendLoading ? (
                <View px={2}>
                  <ActivityIndicator size="small" color="#00ff00" />
                </View>
              ) : (
                <Text
                  color={'green.600'}
                  fontWeight="medium"
                  fontSize={13}
                  onPress={onResendOtp}
                >
                  {t('Please resend')}
                </Text>
              )}
            </HStack>

            <Button
              isLoading={isLoading}
              overflow={'hidden'}
              borderRadius={'lg'}
              mt={8}
              bgColor={'green.600'}
              _text={{
                textTransform: 'none',
              }}
              onPress={onConfirm}
            >
              {t('Verify')}
            </Button>
          </VStack>
        </SafeAreaView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  roundedTextInput: {
    borderRadius: 5,
    borderWidth: 1,
  },
});

export default OtpVerifyScreen;
