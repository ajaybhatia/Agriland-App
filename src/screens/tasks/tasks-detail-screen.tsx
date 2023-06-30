import { useRoute } from '@react-navigation/native';
import { Image } from 'expo-image';
import { HStack, ScrollView, Text, View, VStack } from 'native-base';
import React from 'react';
import { Dimensions, I18nManager } from 'react-native';

import type { AuthStackParamList, RouteProp } from '@/navigation/types';
//import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const TaskDetailScreen = () => {
  const route = useRoute<RouteProp<AuthStackParamList, 'TaskDetailScreen'>>();

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
      <VStack flex={1} mx={5}>
        <HStack alignItems={'center'} justifyContent={'space-between'} py={5}>
          <HStack alignItems={'center'}>
            <Image
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                height: 35,
                width: 35,
                borderRadius: 35 / 2,
                borderWidth: 1,
              }}
              source={route?.params?.detail?.imageUrl ?? 'https://'}
              placeholder={require('@assets/app-logo.png')}
              contentFit="cover"
              transition={1000}
            />
            <Text
              fontFamily={'heading'}
              fontWeight={'200'}
              fontSize={12}
              ml={3}
            >
              {I18nManager.isRTL
                ? route?.params?.detail?.activityName?.ar ?? ''
                : route?.params?.detail?.activityName?.en ?? ''}
            </Text>
          </HStack>
          {/* <Icon
            as={MaterialIcons}
            name={'more-horiz'}
            size={'md'}
            color={'black'}
          /> */}
        </HStack>
        <View
          h={Dimensions.get('window').height / 3}
          w={'100%'}
          // bgColor={'amber.200'}
          borderRadius={10}
          overflow={'hidden'}
        >
          <Image
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              height: '100%',
              width: '100%',
            }}
            source={route?.params?.detail?.imageUrl ?? 'https://'}
            placeholder={require('@assets/app-logo.png')}
            contentFit="cover"
            transition={1000}
          />
        </View>
        <Text fontFamily={'body'} fontWeight={'200'} fontSize={12} mt={3}>
          {I18nManager.isRTL
            ? route?.params?.detail?.activityDesc?.ar ?? ''
            : route?.params?.detail?.activityDesc?.en ?? ''}
        </Text>
      </VStack>
    </ScrollView>
  );
};

export default TaskDetailScreen;
