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
import React, { useEffect, useState } from 'react';
import type {
  NativeSyntheticEvent,
  TextInputSubmitEditingEventData,
} from 'react-native';
import { ActivityIndicator } from 'react-native';
import { I18nManager } from 'react-native';
import { RefreshControl } from 'react-native';
import Toast from 'react-native-toast-message';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {
  useGetApiNotificationGetallviewnotification,
  usePostApiNotificationAddviewnotification,
} from '@/apis/endpoints/api';
import type {
  ApiResponse,
  ViewNotificationPaginatedResponse,
  ViewNotificationResponse,
} from '@/apis/model';
import client from '@/config/react-query/client';
import AppLoader from '@/ui/components/AppLoader';
import EmptyList from '@/ui/components/EmptyList';

import NoticationCell from './components/notification-cell';

type MainTitle = {
  title: string;
  id: number;
  data: ViewNotificationResponse[];
};

const NotificationsDetails = () => {
  const nav = useNavigation();
  const [initLoading, setInitLoading] = useState<boolean>(true);
  const [sortValue, setSortValue] = useState<string>('msgCreatedOn');
  const [filterValue, setFilterValue] = useState<string>('both');
  const [isSearchEnable, setSearchEnable] = useState<boolean>(false);
  const [searchTxt, setSearchTxt] = useState<string>('');
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
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const allGetNotifications = useGetApiNotificationGetallviewnotification(
    {
      skip: moreNotificationInfo.skip,
      take: moreNotificationInfo.take,
      sortColumn: sortValue,
      sortOrder: 'asc',
      q: searchTxt,
      isRead:
        filterValue === 'read'
          ? true
          : filterValue === 'unread'
          ? false
          : undefined,
    },
    {
      query: {
        onSuccess: (data: ViewNotificationPaginatedResponse) => {
          setRefreshing(false);
          if (
            data?.viewNotificationResponses &&
            data?.viewNotificationResponses.length > 0
          ) {
            var mainArray: MainTitle[] =
              moreNotificationInfo.skip === 0 ? [] : notificationList;
            var agriculturalArray: ViewNotificationResponse[] = [];
            var infoArray: ViewNotificationResponse[] = [];
            var serviceArray: ViewNotificationResponse[] = [];

            data?.viewNotificationResponses.map(
              (item: ViewNotificationResponse, index: number) => {
                if (item.notificationType === 1) {
                  //Agricultural Market

                  agriculturalArray = [...agriculturalArray, item];
                  let ItemIndex = mainArray.findIndex((v) => v.id === 1);
                  if (ItemIndex >= 0) {
                    mainArray[ItemIndex] = {
                      data: agriculturalArray,
                      id: 1,
                      title: 'Agricultural Market',
                    };
                  } else {
                    mainArray = [
                      ...mainArray,
                      {
                        data: agriculturalArray,
                        id: 1,
                        title: 'Agricultural Market',
                      },
                    ];
                  }
                } else if (item.notificationType === 2) {
                  //Information Center

                  infoArray = [...infoArray, item];

                  let ItemIndex = mainArray.findIndex((v) => v.id === 2);
                  if (ItemIndex >= 0) {
                    mainArray[ItemIndex] = {
                      data: infoArray,
                      id: 2,
                      title: 'Information Center',
                    };
                  } else {
                    mainArray = [
                      ...mainArray,
                      {
                        data: infoArray,
                        id: 2,
                        title: 'Information Center',
                      },
                    ];
                  }
                } else if (item.notificationType === 3) {
                  //Service
                  serviceArray = [...serviceArray, item];
                  let ItemIndex = mainArray.findIndex((v) => v.id === 3);
                  if (ItemIndex >= 0) {
                    mainArray[ItemIndex] = {
                      data: serviceArray,
                      id: 3,
                      title: 'Service',
                    };
                  } else {
                    mainArray = [
                      ...mainArray,
                      {
                        data: serviceArray,
                        id: 3,
                        title: 'Service',
                      },
                    ];
                  }
                }
              }
            );

            setNotificationList(mainArray);
          } else if (
            moreNotificationInfo.skip <= 0 &&
            data?.viewNotificationResponses &&
            data?.viewNotificationResponses.length <= 0
          ) {
            setNotificationList([]);
          }
        },
        onError(err) {
          setRefreshing(false);
          Toast.show({
            type: 'error',
            text1: err.message,
          });
        },
      },
    }
  );

  // addNotification as View
  const addViewNotification = usePostApiNotificationAddviewnotification();

  const onViewPress = React.useCallback(
    (item: ViewNotificationResponse, section: number, index: number) => {
      addViewNotification.mutate(
        {
          params: {
            isRead: true,
            notificationId: item.notificationId,
          },
        },
        {
          onSuccess: (data: ApiResponse) => {
            if (data.isSuccess) {
              var notiArray = [...notificationList];
              var newItem = { ...item };
              newItem.isRead = true;
              let findSectionIndex = notiArray.findIndex(
                (v) => v.id === section
              );
              if (findSectionIndex >= 0) {
                notiArray[findSectionIndex].data[index] = newItem;
                setNotificationList(notiArray);
              }
              client
                .invalidateQueries({
                  queryKey: ['/api/Notification/getallunreadnotification'],
                })
                .then((item) => {
                  console.log('onSuccess==> ', item);
                })
                .catch((e) => {
                  console.log('Error==> ', e);
                });
            } else {
              Toast.show({
                type: 'error',
                text1: data?.message ?? 'Something went wrong!',
              });
            }
          },
        }
      );
    },
    [addViewNotification, notificationList]
  );

  const _onRefresh = () => {
    setRefreshing(true);
    setMoreNotificationInfo({
      skip: 0,
      take: moreNotificationInfo.take,
      total: 0,
    });
    allGetNotifications.refetch();
  };

  useEffect(() => {
    setTimeout(() => {
      setInitLoading(false);
    }, 10);
  }, []);

  return (
    <View flex={1} backgroundColor={'white'}>
      {!initLoading ? (
        <>
          <HStack justifyContent={'space-evenly'} my={3} alignItems={'center'}>
            {!isSearchEnable ? (
              <>
                <HStack mx={2} alignItems={'center'}>
                  <Box flex={0.43}>
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
                          // w: Dimensions.get('screen').width - 80,
                          fontStyle: 'normal',
                          fontFamily: 'body',
                          fontWeight: '500',
                          textAlign: I18nManager.isRTL ? 'right' : 'left',
                        },
                        rightIcon: <CheckIcon size="5" />,
                      }}
                      _item={{
                        _text: {
                          fontSize: 14,
                          fontStyle: 'normal',
                          fontFamily: 'body',
                          fontWeight: '500',
                          textAlign: I18nManager.isRTL ? 'right' : 'left',
                        },
                      }}
                      mt={1}
                      onValueChange={(itemValue) => {
                        setSortValue(itemValue);
                        setMoreNotificationInfo({
                          skip: 0,
                          take: 20,
                          total: 0,
                        });
                      }}
                    >
                      <Select.Item label="Sort by date" value="msgCreatedOn" />
                      {/* <Select.Item
                    label="Sort by notification type"
                    value="notificationType"
                  /> */}
                      <Select.Item label="Sort by title" value="messageTitle" />
                    </Select>
                  </Box>
                  <Box flex={0.43}>
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
                          // w: Dimensions.get('screen').width - 80,
                          fontStyle: 'normal',
                          fontFamily: 'body',
                          fontWeight: '500',
                          textAlign: I18nManager.isRTL ? 'right' : 'left',
                          backgroundColor: '#FF45',
                        },
                        rightIcon: <CheckIcon size="8" />,
                      }}
                      _item={{
                        _text: {
                          fontSize: 14,
                          fontStyle: 'normal',
                          fontFamily: 'body',
                          fontWeight: '500',
                          textAlign: I18nManager.isRTL ? 'right' : 'left',
                        },
                      }}
                      mt={1}
                      onValueChange={(itemValue) => setFilterValue(itemValue)}
                    >
                      <Select.Item label="All" value="both" />
                      <Select.Item label="Read" value="read" />
                      <Select.Item label="Unread" value="unread" />
                    </Select>
                  </Box>

                  <Pressable
                    bgColor={'#1ebdc3'}
                    flex={0.16}
                    ml={0.5}
                    shadow={'1'}
                    borderRadius={4}
                    alignItems={'center'}
                    mt={0.5}
                    justifyContent={'center'}
                    onPress={() => setSearchEnable(true)}
                  >
                    <HStack
                      alignItems={'center'}
                      justifyContent={'center'}
                      py={3}
                    >
                      <Icon
                        as={MaterialIcons}
                        name={'search'}
                        size={'md'}
                        color={'white'}
                      />
                      {/* <Text
                        mr={-2}
                        color={'#1ebdc3'}
                        fontFamily={'body'}
                        fontStyle={'normal'}
                        fontSize={14}
                      >
                        "h"
                      </Text> */}
                    </HStack>
                  </Pressable>
                </HStack>
              </>
            ) : (
              <Stack space={4} w="100%" alignItems="center">
                <Input
                  w={{
                    base: '90%',
                    md: '25%',
                  }}
                  returnKeyType="search"
                  onSubmitEditing={(
                    e: NativeSyntheticEvent<TextInputSubmitEditingEventData>
                  ) => setSearchTxt(e.nativeEvent.text)}
                  type={'text'}
                  InputRightElement={
                    <Pressable
                      onPress={() => {
                        setSearchTxt('');
                        setSearchEnable(false);
                      }}
                    >
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
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={_onRefresh}
                tintColor="#F8852D"
              />
            }
            keyExtractor={(item, index) => `${index}`}
            renderItem={({
              item,
              index,
              section,
            }: {
              item: ViewNotificationResponse;
              index: number;
              section: MainTitle;
            }) => {
              return (
                <NoticationCell
                  item={item}
                  onViewPress={() => onViewPress(item, section.id, index)}
                />
              );
            }}
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
            // eslint-disable-next-line react/no-unstable-nested-components
            ListEmptyComponent={() =>
              notificationList.length <= 0 &&
              !allGetNotifications.isLoading &&
              !allGetNotifications.isFetching ? (
                <EmptyList value={'Notification not found'} />
              ) : null
            }
            ListFooterComponent={
              allGetNotifications.isLoading &&
              notificationList.length > 0 && (
                <View
                  alignItems={'center'}
                  justifyContent={'center'}
                  alignSelf={'center'}
                  h={100}
                  pr={5}
                >
                  <ActivityIndicator size="small" color="#00ff00" />
                </View>
              )
            }
            onEndReachedThreshold={0.5}
            onEndReached={() => {
              if (
                !allGetNotifications.isLoading &&
                !allGetNotifications.isFetching &&
                moreNotificationInfo.take <= notificationList.length &&
                allGetNotifications?.data?.totalCount &&
                allGetNotifications?.data?.totalCount > notificationList.length
              ) {
                setMoreNotificationInfo({
                  take: moreNotificationInfo.take,
                  skip: moreNotificationInfo.skip + moreNotificationInfo.take,
                  total: 0,
                });
              }
            }}
          />
          {allGetNotifications.isLoading && (
            <View position={'absolute'} left={0} right={0} bottom={0} top={0}>
              <AppLoader />
            </View>
          )}
        </>
      ) : (
        <AppLoader />
      )}
    </View>
  );
};

export default NotificationsDetails;
