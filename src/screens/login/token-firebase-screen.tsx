import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';
import { Button, View } from 'native-base';
import React, { useEffect, useState } from 'react';
import type { ShareAction } from 'react-native';
import { Share } from 'react-native';

import colors from '@/ui/theme/colors';

type Props = {};

const TokenFirebaseScreen = () => {
  const [appToken, setAPPtoken] = useState<string>('');

  useEffect(() => {
    const getToken = async () => {
      const currentUser = auth().currentUser;
      const idToken = await currentUser?.getIdToken();
      setAPPtoken(idToken ? idToken : '');
    };

    getToken();
  }, []);

  function shareToken() {
    let shareContent = {
      title: 'Token',
      message: `${appToken}`,
    };

    Share.share(shareContent)
      .then((res: ShareAction) => {
        console.log(res);
      })
      .catch((err) => {
        err && console.log(err);
      });
  }

  async function shareFirebaseToken() {
    const token = await messaging().getToken();
    let shareContent = {
      title: 'Token',
      message: `${token}`,
    };

    Share.share(shareContent)
      .then((res: ShareAction) => {
        console.log(res);
      })
      .catch((err) => {
        err && console.log(err);
      });
  }
  return (
    <View flex={1} justifyContent={'center'} alignItems={'center'}>
      <Button
        disabled={appToken == ''}
        onPress={() => shareToken()}
        backgroundColor={colors.button_color}
        borderRadius={8}
        width={'80%'}
        mt={30}
        fontWeight={'normal'}
        fontSize={20}
        overflow={'hidden'}
        alignSelf={'center'}
      >
        {'Request Token'}
      </Button>

      <Button
        onPress={() => shareFirebaseToken()}
        backgroundColor={colors.button_color}
        borderRadius={8}
        width={'80%'}
        mt={30}
        fontWeight={'normal'}
        fontSize={20}
        overflow={'hidden'}
        alignSelf={'center'}
      >
        {'Notification Token'}
      </Button>
    </View>
  );
};

export default TokenFirebaseScreen;
