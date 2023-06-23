import { HStack, Icon, Image, Text, View, VStack } from 'native-base';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import colors from '@/ui/theme/colors';

type Props = {};

const PreviousTestCell = (props: Props) => {
  return (
    <HStack
      alignItems={'center'}
      bgColor={'gray.200'}
      my={1}
      py={3}
      px={2}
      borderRadius={10}
    >
      <View flex={0.13}>
        <View
          borderColor={'red.500'}
          bgColor={'white'}
          borderRadius={5}
          alignItems={'center'}
          justifyContent={'center'}
          borderWidth={1}
          p={2}
        >
          <Image
            alt=""
            resizeMode="cover"
            h={'8'}
            source={require('@assets/test-icon/soil_analysis.png')}
          />
        </View>
      </View>
      <View flex={0.77}>
        <VStack mx={2}>
          <Text
            fontFamily={'body'}
            fontSize={13}
            fontWeight={'600'}
            fontStyle={'normal'}
          >
            Properties Analysis
          </Text>
          <HStack>
            <Text
              fontFamily={'body'}
              fontSize={13}
              color={'gray.600'}
              fontWeight={'200'}
              fontStyle={'normal'}
            >
              Test date
            </Text>
            <Text
              color={'gray.600'}
              fontFamily={'body'}
              fontSize={13}
              fontWeight={'200'}
              fontStyle={'normal'}
              ml={3}
            >
              13/11/2022
            </Text>
          </HStack>
        </VStack>
      </View>
      <View flex={0.1}>
        <View
          bgColor={colors.button_color}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Icon
            as={MaterialCommunityIcons}
            name={'arrow-top-right-thick'}
            size={'lg'}
            my={1}
            color={'white'}
          />
        </View>
      </View>
    </HStack>
  );
};

export default PreviousTestCell;
