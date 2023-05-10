import { useNavigation } from '@react-navigation/native';
import { HStack, Pressable, Text, VStack } from 'native-base';
import React from 'react';
import { CircleProgressBar } from 'react-native-splited-progress-bar';

import CardWithShadow from '@/ui/components/CardWithShadow';

const CompleteProfileCell = () => {
  const navigation = useNavigation();
  const onProfileMove = () => {
    navigation.navigate('AccountDetailScreen');
  };
  return (
    <CardWithShadow borderRadius={4} shadow="2" mx={5} bgColor={'red.600'}>
      <Pressable onPress={onProfileMove}>
        <HStack
          h={100}
          alignItems={'center'}
          mx={10}
          justifyContent={'space-between'}
        >
          <VStack>
            <Text
              color={'white'}
              fontWeight={'700'}
              fontStyle={'normal'}
              fontSize={14}
            >
              Complete Your Account
            </Text>
          </VStack>
          <CircleProgressBar percentage={24} size={60} splited={false} />
        </HStack>
      </Pressable>
    </CardWithShadow>
  );
};

export default CompleteProfileCell;
