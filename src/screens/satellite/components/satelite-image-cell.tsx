import { Image, View } from 'native-base';
import React from 'react';
import { Dimensions } from 'react-native';

type Props = {};

const SateliteImageCell = (props: Props) => {
  return (
    <View>
      <Image
        alt=""
        alignSelf={'center'}
        source={require('@assets/logo.png')}
        h={Dimensions.get('screen').width - 110}
        w={Dimensions.get('screen').width - 110}
        rounded={15}
      />
    </View>
  );
};

export default SateliteImageCell;
