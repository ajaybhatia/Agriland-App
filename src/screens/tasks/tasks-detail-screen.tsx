import {
  HStack,
  Icon,
  Image,
  ScrollView,
  Text,
  View,
  VStack,
} from 'native-base';
import React from 'react';
import { Dimensions } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const TaskDetailScreen = () => {
  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 10 }}>
      <VStack flex={1} mx={5}>
        <HStack alignItems={'center'} justifyContent={'space-between'} py={5}>
          <HStack alignItems={'center'}>
            <Image
              alt=""
              h={30}
              w={30}
              resizeMode={'cover'}
              source={require('@assets/app-logo.png')}
            />
            <Text
              fontFamily={'heading'}
              fontWeight={'200'}
              fontSize={12}
              ml={3}
            >
              Harvesting
            </Text>
          </HStack>
          <Icon
            as={MaterialIcons}
            name={'more-horiz'}
            size={'md'}
            color={'black'}
          />
        </HStack>
        <View
          h={Dimensions.get('window').height / 3}
          w={'100%'}
          bgColor={'amber.200'}
          borderRadius={10}
          overflow={'hidden'}
        >
          <Image
            alt=""
            flex={1}
            resizeMode={'cover'}
            source={require('@assets/app-logo.png')}
          />
        </View>
        <Text fontFamily={'body'} fontWeight={'200'} fontSize={12} mt={3}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum
          dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
          velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
          occaecat cupidatat non proident, sunt in culpa qui officia deserunt
          mollit anim id est laborum.
        </Text>
      </VStack>
    </ScrollView>
  );
};

export default TaskDetailScreen;
