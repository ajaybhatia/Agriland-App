import { HStack, Icon, Image, Text, View } from 'native-base';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type Props = {
  isSelect: boolean;
};

const TodayTaskListCell = ({ isSelect }: Props) => {
  return (
    <View
      borderTopLeftRadius={'full'}
      borderBottomLeftRadius={'full'}
      borderTopRightRadius={5}
      borderBottomRightRadius={5}
      my={3}
      backgroundColor={'white'}
      shadow={1}
    >
      <HStack p={3} alignItems={'center'}>
        <Image
          alt=""
          h={'10'}
          w={'10'}
          resizeMode={'cover'}
          borderRadius={'full'}
          source={require('@assets/app-logo.png')}
        />
        <Image
          alt=""
          h={'10'}
          mx={2}
          w={'10'}
          resizeMode={'cover'}
          borderRadius={'full'}
          source={require('@assets/app-logo.png')}
        />
        <Text
          fontSize={14}
          w={'55%'}
          fontFamily={'body'}
          fontWeight={'500'}
          fontStyle={'normal'}
        >
          Today you have fertilizer for your pomegranate crop
        </Text>
        <Icon
          mx={3}
          as={MaterialIcons}
          name={isSelect ? 'check-box' : 'check-box-outline-blank'}
          size={'2xl'}
          color={'black'}
        />
      </HStack>
    </View>
  );
};

export default TodayTaskListCell;
