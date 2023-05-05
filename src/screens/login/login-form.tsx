import auth from '@react-native-firebase/auth';
import type { NativeModuleError } from '@react-native-google-signin/google-signin';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { useNavigation } from '@react-navigation/native';
import {
  Box,
  Button,
  Icon,
  Image,
  ScrollView,
  Text,
  View,
  VStack,
} from 'native-base';
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { I18nManager, Platform, SafeAreaView } from 'react-native';
import { StyleSheet } from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import Toast from 'react-native-toast-message';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as z from 'zod';

import { useSelectedLanguage } from '@/core';
import type { Language } from '@/core/i18n/resources';
import { LoginType } from '@/navigation/auth-navigator';
import type { Option } from '@/ui';
import CardWithShadow from '@/ui/components/CardWithShadow';
import Header from '@/ui/components/Header';

const schema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email('Invalid email format'),
  password: z
    .string({
      required_error: 'Password is required',
    })
    .min(6, 'Password must be at least 6 characters'),
});

export type FormType = z.infer<typeof schema>;

// type Props = {
//   onSubmit?: (data: FormType) => void;
// };

export const LoginForm = () => {
  const phoneInput = useRef<PhoneInput>(null);
  const { t } = useTranslation();
  const { language, setLanguage } = useSelectedLanguage();
  const { navigate } = useNavigation();

  const [valuePhone, setPhoneValue] = useState<string>('');
  const [formattedValue, setFormattedValue] = useState<string>('');
  const [isOTPLoading, setOTPLoading] = useState<boolean>(false);
  const [isGoogleLoading, setGoogleLoading] = useState<boolean>(false);
  const [isFacebookLoading, setFacebookLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  // const { handleSubmit, control } = useForm<FormType>({
  //   resolver: zodResolver(schema)
  // });

  const onOtpLogin = () => {
    if (phoneInput.current?.isValidNumber(formattedValue)) {
      setOTPLoading(true);
      setFacebookLoading(false);
      auth()
        .signInWithPhoneNumber(formattedValue)
        .then((confirmation) => {
          setOTPLoading(false);
          navigate('OtpVerifyScreen', {
            phoneNumber: formattedValue,
            confirmation: confirmation,
          });
        })
        .catch((error) => {
          setOTPLoading(false);
          Toast.show({
            type: 'error',
            text1: error.message?.split(']')?.[1] ?? error.message,
          });
        });
    } else {
      setOTPLoading(false);
      setErrorMessage('Please enter a valid phone number');
    }
  };

  // Somewhere in your code
  const signIn = async () => {
    try {
      setGoogleLoading(true);
      await GoogleSignin.signOut();
      await GoogleSignin.hasPlayServices();
      // Get the users ID token
      const userInfo = await GoogleSignin.signIn();
      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(
        userInfo.idToken
      );
      // Sign-in the user with the credential
      let googleDetail = await auth().signInWithCredential(googleCredential);

      setGoogleLoading(false);
      navigate('AddFarmScreen', {
        loginType: LoginType.GOOGLE,
        google: googleDetail.user,
      });
    } catch (error) {
      setGoogleLoading(false);
      const typedError = error as NativeModuleError;
      if (typedError?.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (typedError?.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (typedError?.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

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
    <ScrollView
      width={'100%'}
      flex={1}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContainer}
    >
      <View flex={1}>
        <SafeAreaView style={styles.safeArea}>
          <VStack flex={1} px={5}>
            <Image
              alt=""
              height={'40'}
              marginTop={50}
              resizeMode={'contain'}
              alignSelf={'center'}
              source={require('@assets/app-logo.png')}
            />
            {/* <Text
              alignSelf={'center'}
              textAlign={'center'}
              fontWeight="normal"
              fontSize={13}
              mt={5}
              color={'black'}
            >
              <Text fontWeight="medium" fontSize={13}>
                {t('Terms')}
              </Text>{' '}
              {`${t('and')} `}
              <Text fontWeight="medium" fontSize={13}>
                {`${t('Privacy statement')}`}
              </Text>
            </Text> */}
            <CardWithShadow mx={2}>
              <VStack p={3}>
                <Header
                  title={t('welcome')}
                  fontWeight="200"
                  fontSize={12}
                  color={'black'}
                  mt={3}
                />
                <Header
                  title={t('sign-in')}
                  color={'black'}
                  mt={-1}
                  fontSize={'xl'}
                  fontWeight="600"
                />
              </VStack>
              <View my={2} w={'100%'} h={'0.4'} bgColor={'gray.300'} />
              <VStack p={3}>
                <VStack
                  mt={2}
                  borderRadius={'lg'}
                  borderWidth={1}
                  p={1}
                  borderColor={'green.200'}
                  overflow={'hidden'}
                >
                  <PhoneInput
                    ref={phoneInput}
                    defaultCode="EG"
                    layout="first"
                    textInputProps={{
                      keyboardType: 'phone-pad',
                      value: valuePhone,
                      maxLength: 10,
                      textAlign: I18nManager.isRTL ? 'right' : 'left',

                      style: {
                        fontWeight: '200',
                        fontFamily: 'Poppins-Regular',
                        fontStyle: 'normal',
                        height: 40,
                        flex: 1,
                        padding: 0,

                        alignSelf: 'center',
                        textAlignVertical: 'center',
                      },
                    }}
                    onChangeText={(text) => {
                      if (text.match(/^\d*$/)) {
                        setPhoneValue(text);
                        setErrorMessage('');
                      }
                    }}
                    onChangeFormattedText={(text) => {
                      const callingCode = `+${phoneInput.current?.getCallingCode()}`;
                      const phoneNumber = text.replace(callingCode, '');
                      if (phoneNumber.match(/^\d*$/)) {
                        setFormattedValue(text);
                        setErrorMessage('');
                      }
                    }}
                    withDarkTheme={false}
                    withShadow={false}
                    placeholder={t('enter-mobile')}
                    containerStyle={styles.inputContainer}
                    textContainerStyle={styles.inputTxtContainer}
                    textInputStyle={styles.input}
                    codeTextStyle={styles.codeTxt}
                  />
                </VStack>
                <Box h={10}>
                  <Text color={'red.400'} fontSize={'xs'} ml={24}>
                    {errorMessage}
                  </Text>
                </Box>

                <Button
                  isLoading={isOTPLoading}
                  onPress={onOtpLogin}
                  overflow={'hidden'}
                  borderRadius={'lg'}
                  mt={5}
                  w={'80%'}
                  // w={'100%'}
                  alignSelf={'center'}
                  bgColor={'green.600'}
                  _text={{
                    textTransform: 'none',
                  }}
                >
                  {t('get-otp')}
                </Button>

                {/* <HStack justifyContent={'center'} alignItems={'center'} mt={8}>
                  <View h={'0.4'} w={'1/3'} bgColor={'gray.300'} mr={5} />
                  <Text fontWeight="medium" fontSize={13}>
                    {t('Or sign in with')}
                  </Text>
                  <View ml={5} w={'1/3'} h={'0.4'} bgColor={'gray.300'} />
                </HStack> */}

                <VStack alignItems={'center'} justifyContent={'center'} mt={5}>
                  {/* <Pressable
                    onPress={signIn}
                    overflow={'hidden'}
                    w={'80%'}
                    py={'3'}
                    mb={4}
                    px={3}
                    bgColor={'#EB4335'}
                    flexDirection={'row'}
                    alignItems={'center'}
                    borderRadius={'lg'}
                  >
                    {!isGoogleLoading ? (
                      <ActivityIndicator style={{ alignItems: 'center' }} />
                    ) : (
                      <>
                        <Icon
                          as={FontAwesome}
                          name="google-plus-square"
                          size="lg"
                          color={'white'}
                          justifyContent={'flex-start'}
                          //style={{ alignSelf: 'flex-start' }}
                        />
                        <Text
                          position={'absolute'}
                          left={10}
                          right={10}
                          fontSize={14}
                          color={'white'}
                          textAlign={'center'}
                          alignSelf={'center'}
                          fontWeight={'medium'}
                          fontStyle={'normal'}
                          numberOfLines={1}
                        >{`${t('signin-with-google')} google sign`}</Text>
                      </>
                    )}
                  </Pressable> */}
                  <Button
                    isLoading={isGoogleLoading}
                    onPress={signIn}
                    overflow={'hidden'}
                    w={'80%'}
                    borderRadius={'lg'}
                    _text={{
                      textTransform: 'none',
                    }}
                    bgColor={'#EB4335'}
                    leftIcon={
                      <Icon
                        as={FontAwesome}
                        name="google-plus-square"
                        size="lg"
                        justifyContent={'flex-start'}
                        //style={{ alignSelf: 'flex-start' }}
                      />
                    }
                  >
                    {`${t('signin-with-google')}     `}
                  </Button>

                  <Button
                    isDisabled={false}
                    w={'80%'}
                    mb={3}
                    isLoading={isFacebookLoading}
                    //onPress={() => faceBookSignin()}
                    onPress={() => {
                      // onFacebookButtonPress().then(() => {
                      //   console.log('Signed in with Facebook!');
                      //   setFacebookLoading(false);
                      // })
                      // if (I18nManager.isRTL) {
                      //   onSelect({
                      //     label: translate('settings.english'),
                      //     value: 'en',
                      //   });
                      // } else {
                      //   onSelect({
                      //     label: translate('settings.arabic'),
                      //     value: 'ar',
                      //   });
                      // }
                    }}
                    overflow={'hidden'}
                    borderRadius={'lg'}
                    mt={5}
                    _text={{
                      textTransform: 'none',
                    }}
                    bgColor={'#1777F2'}
                    leftIcon={
                      <Icon as={FontAwesome} name="facebook-square" size="lg" />
                    }
                  >
                    {t('signin-with-facebook')}
                  </Button>
                  {/* <TouchableOpacity
            style={{
              backgroundColor: '#4267B2',
              width: 230,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
            }}>
            <HStack w={230} px={2}>
              <Icon
                as={FontAwesome}
                name="facebook-square"
                size="md"
                color={'white'}
              />
              <VStack alignSelf={'center'}>
                <Text
                  textAlign={'center'}
                  fontWeight="semibold"
                  fontSize={13.5}
                  color={'white'}>
                  Sign in with Facebook
                </Text>
              </VStack>
            </HStack>
          </TouchableOpacity> */}
                </VStack>
              </VStack>
            </CardWithShadow>
          </VStack>
        </SafeAreaView>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  scrollContainer: { paddingBottom: 30 },
  inputContainer: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputTxtContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    fontSize: 12,
    height: Platform.OS === 'ios' ? 30 : 40,
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: '400',
    fontFamily: 'Poppins-Regular',
    textAlignVertical: 'center',
    fontStyle: 'normal',
  },
  codeTxt: {
    fontSize: 13,
    height: Platform.OS === 'ios' ? 16 : 18,
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: '700',
    marginTop: -5,
    marginLeft: -5,
    textAlignVertical: 'center',
    fontFamily: 'Poppins-Regular',
    fontStyle: 'normal',
  },
  safeArea: { flex: 1 },
});
