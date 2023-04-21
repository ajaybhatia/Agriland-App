import { ActivityIndicator, SafeAreaView, StyleSheet } from 'react-native';
/* eslint-disable react-native/no-inline-styles */
import {
  Button,
  HStack,
  Image as ImageBase,
  ScrollView,
  Text,
  VStack,
  View,
} from 'native-base';
import React, { useEffect, useState } from 'react';

import type { AuthStackParamList } from '../../navigation/auth-navigator';
import CardWithShadow from '@/ui/components/CardWithShadow';
import type { FirebaseAuthTypes } from '@react-native-firebase/auth';
import Header from '@/ui/components/Header';
import { LoginType } from '../../navigation/auth-navigator';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import OTPTextInput from 'react-native-otp-textinput';
import Toast from 'react-native-toast-message';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

type OtpVerifyScreenProps = NativeStackScreenProps<
  AuthStackParamList,
  'OtpVerifyScreen'
>;

const OtpVerifyScreen = ({ route }: OtpVerifyScreenProps) => {
  const [confirmation, setConfirmation] =
    useState<FirebaseAuthTypes.ConfirmationResult>();
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const { navigate } = useNavigation();
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
      let confirm = await confirmation?.confirm(otpValue);
      console.log('otp success:  ', confirm);
      navigate('AddFarmScreen', {
        loginType: LoginType.OTP,
        phoneNumber: phoneNumber,
      });
      setLoading(false);
    } catch (error) {
      console.log('otp error: ', error);
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
        <SafeAreaView style={{ flex: 1 }}>
          <VStack>
            <ImageBase
              alt=""
              height={'40'}
              marginTop={50}
              resizeMode={'contain'}
              alignSelf={'center'}
              source={require('@assets/app-logo.png')}
            />
            <CardWithShadow mx={3}>
              <VStack p={3}>
                <Header
                  title={t('otp-code')}
                  fontWeight="bold"
                  fontSize={18}
                  color={'green.500'}
                  mt={3}
                />
                <Header
                  title={`${t('enter-code')} ${phoneNumber}`}
                  fontWeight="thin"
                  fontSize={13}
                  color={'black'}
                />
                <View my={5} w={'100%'} h={'0.4'} bgColor={'gray.300'} />
              </VStack>
              <VStack mt={2} >
                <OTPTextInput
                  ref={ref}
                  handleTextChange={(text: string) => setOtpValue(text)}
                  textInputStyle={styles.roundedTextInput}
                  inputCount={6}
                  containerStyle={{flexDirection:"row-reverse"}}
                  inputCellLength={1}
                  keyboardType="numeric"
                  //   defaultValue={'----'}
                />
              </VStack>
              <VStack paddingX={'10'}>
                <HStack alignItems={'center'} mt={8}>
                  <Text fontWeight="thin" fontSize={13} color={'black'}>
                    {`${t('not-recieve-code')} `}
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
                      {t('resend-code')}
                    </Text>
                  )}
                </HStack>

                <Button
                  isLoading={isLoading}
                  overflow={'hidden'}
                  borderRadius={'lg'}
                  mt={8}
                  mb={5}
                  bgColor={'green.600'}
                  _text={{
                    textTransform: 'none',
                  }}
                  onPress={onConfirm}
                >
                  {t('verify')}
                </Button>
              </VStack>
            </CardWithShadow>
          </VStack>
        </SafeAreaView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  roundedTextInput: {
    //borderRadius: 5,
    borderBottomWidth: 1,
  },
});

export default OtpVerifyScreen;
