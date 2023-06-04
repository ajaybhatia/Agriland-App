import { useNavigation } from '@react-navigation/native';
import {
  Box,
  CheckIcon,
  HStack,
  Icon,
  Input,
  Pressable,
  SectionList,
  Select,
  Stack,
  Text,
  View,
  VStack,
} from 'native-base';
import React, { useState } from 'react';
import { Alert, Dimensions } from 'react-native';
import Toast from 'react-native-toast-message';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { useGetApiNotificationGetallnotification } from '@/apis/endpoints/api';
import type { CropPaginatedResponse, CropResponse } from '@/apis/model';
import AppLoader from '@/ui/components/AppLoader';

import NoticationCell from './components/notification-cell';

type MainTitle = {
  title: string;
  data: CropResponse[];
};
// const demoArray: MainTitle[] = [
//   {
//     title: 'Agricultural Market Notifications',
//     data: [
//       {
//         title: 'Account Details',
//         date: new Date(),
//       },
//       {
//         title: 'Account Details',
//         date: new Date(),
//       },
//       {
//         title: 'Account Details',
//         date: new Date(),
//       },
//     ],
//   },
//   {
//     title: 'Information Center Notifications',
//     data: [
//       {
//         title: 'Account Details',
//         date: new Date(),
//       },
//       {
//         title: 'Account Details',
//         date: new Date(),
//       },
//       {
//         title: 'Account Details',
//         date: new Date(),
//       },
//     ],
//   },
//   {
//     title: 'Service Notifications',
//     data: [
//       {
//         title: 'Account Details',
//         date: new Date(),
//       },
//       {
//         title: 'Account Details',
//         date: new Date(),
//       },
//       {
//         title: 'Account Details',
//         date: new Date(),
//       },
//     ],
//   },
// ];
const NotificationsDetails = () => {
  const nav = useNavigation();
  const [sortValue, setSortValue] = useState<string>('ascending');
  const [filterValue, setFilterValue] = useState<string>('ascending');
  const [isSearchEnable, setSearchEnable] = useState<boolean>(false);
  const [moreNotificationInfo, setMoreNotificationInfo] = useState<{
    take: number;
    skip: number;
    total: number;
  }>({
    take: 20,
    skip: 0,
    total: 0,
  });
  const [notificationList, setNotificationList] = useState<MainTitle[]>([]);

  const allGetNotifications = useGetApiNotificationGetallnotification(
    {
      skip: 0,
      take: 20,
    },
    {
      query: {
        onSuccess: (data: CropPaginatedResponse) => {
          if (data.cropResponses && data.cropResponses !== null) {
            setNotificationList(
              notificationList.length > 0
                ? [...notificationList, ...data.cropResponses]
                : data.cropResponses
            );
          }
        },
        onError(err) {
          Toast.show({
            type: 'error',
            text1: err.message,
          });
        },
      },
    }
  );

  return (
    <View flex={1} backgroundColor={'white'}>
      {allGetNotifications.isLoading && notificationList.length <= 0 ? (
        <>
          <HStack justifyContent={'space-evenly'} my={3} alignItems={'center'}>
            {!isSearchEnable ? (
              <>
                <Box flex={0.3}>
                  <Select
                    bgColor={'#1ebdc3'}
                    dropdownIcon={
                      <Icon
                        as={FontAwesome}
                        name={'sort-amount-asc'}
                        size={'sm'}
                        marginRight={3}
                        color={'white'}
                      />
                    }
                    fontSize={12}
                    fontStyle={'normal'}
                    fontFamily={'body'}
                    fontWeight={'500'}
                    color={'white'}
                    selectedValue={sortValue}
                    accessibilityLabel="Sort"
                    placeholder="Sort"
                    _selectedItem={{
                      bg: 'gray.100',
                      _text: {
                        fontSize: 14,
                        w: Dimensions.get('screen').width - 80,
                        fontStyle: 'normal',
                        fontFamily: 'body',
                        fontWeight: '500',
                      },
                      rightIcon: <CheckIcon size="5" />,
                    }}
                    _item={{
                      _text: {
                        fontSize: 14,
                        fontStyle: 'normal',
                        fontFamily: 'body',
                        fontWeight: '500',
                      },
                    }}
                    mt={1}
                    onValueChange={(itemValue) => setSortValue(itemValue)}
                  >
                    <Select.Item label="Date Ascending" value="ascending" />
                    <Select.Item label="Date Descending" value="descending" />
                  </Select>
                </Box>
                <Box flex={0.3}>
                  <Select
                    bgColor={'#1ebdc3'}
                    selectedValue={filterValue}
                    dropdownIcon={
                      <Icon
                        as={MaterialCommunityIcons}
                        name={'filter-variant'}
                        size={'sm'}
                        marginRight={3}
                        color={'white'}
                      />
                    }
                    fontSize={12}
                    fontStyle={'normal'}
                    fontFamily={'body'}
                    fontWeight={'500'}
                    color={'white'}
                    accessibilityLabel="Filter"
                    placeholder="Filter"
                    _selectedItem={{
                      bg: 'gray.100',
                      _text: {
                        fontSize: 14,
                        w: Dimensions.get('screen').width - 80,
                        fontStyle: 'normal',
                        fontFamily: 'body',
                        fontWeight: '500',
                      },
                      rightIcon: <CheckIcon size="5" />,
                    }}
                    _item={{
                      _text: {
                        fontSize: 14,
                        fontStyle: 'normal',
                        fontFamily: 'body',
                        fontWeight: '500',
                      },
                    }}
                    mt={1}
                    onValueChange={(itemValue) => setFilterValue(itemValue)}
                  >
                    <Select.Item
                      label="Date Ascending"
                      value="ascending"
                      style={{ fontSize: 7 }}
                    />
                    <Select.Item label="Date Descending" value="descending" />
                  </Select>
                </Box>

                <Pressable
                  bgColor={'#1ebdc3'}
                  flex={0.3}
                  borderRadius={4}
                  justifyContent={'center'}
                  onPress={() => setSearchEnable(true)}
                >
                  <HStack
                    alignItems={'center'}
                    mx={3}
                    my={3}
                    justifyContent={'center'}
                  >
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
              </>
            ) : (
              <Stack space={4} w="100%" alignItems="center">
                <Input
                  w={{
                    base: '90%',
                    md: '25%',
                  }}
                  returnKeyType="search"
                  onSubmitEditing={() => Alert.alert('Test', 'Start Search')}
                  type={'text'}
                  InputRightElement={
                    <Pressable onPress={() => setSearchEnable(false)}>
                      <Icon
                        as={<MaterialIcons name={'close'} />}
                        size={5}
                        mr="2"
                        color="black"
                      />
                    </Pressable>
                  }
                  InputLeftElement={
                    <Icon
                      as={<MaterialIcons name="search" />}
                      size={5}
                      ml="2"
                      color="black"
                    />
                  }
                  placeholder="Search"
                />
              </Stack>
            )}
          </HStack>
          <SectionList
            sections={notificationList}
            contentContainerStyle={{ paddingBottom: 100 }}
            keyExtractor={(item, index) => `${index}`}
            renderItem={({
              item,
              index,
            }: {
              item: CropResponse;
              index: number;
            }) => <NoticationCell />}
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
        </>
      ) : (
        <AppLoader />
      )}
    </View>
  );
};

export default NotificationsDetails;
