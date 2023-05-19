import { useNavigation } from '@react-navigation/native';
import {
  HStack,
  Icon,
  Pressable,
  SectionList,
  Text,
  View,
  VStack,
} from 'native-base';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import NoticationCell from './components/notification-cell';

type MainTitle = {
  title: string;
  data: SubTitle[];
};
type SubTitle = {
  title: string;
  date: Date;
};
const demoArray: MainTitle[] = [
  {
    title: 'Agricultural Market Notifications',
    data: [
      {
        title: 'Account Details',
        date: new Date(),
      },
      {
        title: 'Account Details',
        date: new Date(),
      },
      {
        title: 'Account Details',
        date: new Date(),
      },
    ],
  },
  {
    title: 'Information Center Notifications',
    data: [
      {
        title: 'Account Details',
        date: new Date(),
      },
      {
        title: 'Account Details',
        date: new Date(),
      },
      {
        title: 'Account Details',
        date: new Date(),
      },
    ],
  },
  {
    title: 'Service Notifications',
    data: [
      {
        title: 'Account Details',
        date: new Date(),
      },
      {
        title: 'Account Details',
        date: new Date(),
      },
      {
        title: 'Account Details',
        date: new Date(),
      },
    ],
  },
];
const NotificationsDetails = () => {
  const nav = useNavigation();
  return (
    <View flex={1} backgroundColor={'white'}>
      <HStack justifyContent={'space-evenly'} my={3}>
        <Pressable bgColor={'#1ebdc3'} flex={0.3} borderRadius={4}>
          <HStack alignItems={'center'} mx={3} my={3} justifyContent={'center'}>
            <Icon
              as={FontAwesome}
              name={'sort-amount-asc'}
              size={'md'}
              color={'white'}
            />
            <Text
              color={'white'}
              ml={3}
              fontFamily={'body'}
              fontStyle={'normal'}
              fontSize={11}
            >
              Sort
            </Text>
          </HStack>
        </Pressable>
        <Pressable bgColor={'#1ebdc3'} flex={0.3} borderRadius={4}>
          <HStack alignItems={'center'} mx={3} my={3} justifyContent={'center'}>
            <Icon
              as={MaterialCommunityIcons}
              name={'filter-variant'}
              size={'md'}
              color={'white'}
            />
            <Text
              color={'white'}
              ml={3}
              fontFamily={'body'}
              fontStyle={'normal'}
              fontSize={11}
            >
              Filter
            </Text>
          </HStack>
        </Pressable>
        <Pressable bgColor={'#1ebdc3'} flex={0.3} borderRadius={4}>
          <HStack alignItems={'center'} mx={3} my={3} justifyContent={'center'}>
            <Icon
              as={MaterialIcons}
              name={'search'}
              size={'md'}
              color={'white'}
            />
            <Text
              color={'white'}
              ml={3}
              fontFamily={'body'}
              fontStyle={'normal'}
              fontSize={11}
            >
              Search
            </Text>
          </HStack>
        </Pressable>
      </HStack>
      <SectionList
        sections={demoArray}
        contentContainerStyle={{ paddingBottom: 100 }}
        keyExtractor={(item, index) => `${index}`}
        renderItem={({ item, index }: { item: SubTitle; index: number }) => (
          <NoticationCell />
        )}
        renderSectionHeader={({ section: { title } }) => {
          return (
            <VStack>
              <Text
                fontSize={17}
                mx={5}
                my={2}
                fontStyle={'normal'}
                fontWeight={'700'}
              >
                {title}
              </Text>
            </VStack>
          );
        }}
      />
    </View>
  );
};

export default NotificationsDetails;
