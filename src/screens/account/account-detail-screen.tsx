import { Button, HStack, Text, View, VStack } from 'native-base';
import React, { useState } from 'react';

import CardWithShadow from '@/ui/components/CardWithShadow';
import colors from '@/ui/theme/colors';

import AddUserInfo from '../user-info/add-user-info';

const AccountDetailScreen = () => {
  const [isEdit, setEdit] = useState<boolean>(false);
  return (
    <View flex={1} pt={10}>
      <CardWithShadow>
        <VStack mx={5} my={3}>
          <HStack>
            <Text
              fontStyle={'normal'}
              fontSize={13}
              fontWeight={'200'}
              color={colors.TITLE_COLOR}
              flex={0.4}
            >
              Name
            </Text>
            <Text
              fontStyle={'normal'}
              //fontFamily={'body'}
              fontSize={14}
              fontWeight={'700'}
              color={colors.black}
              flex={0.6}
            >
              Mohamed Anmed
            </Text>
          </HStack>
          <HStack mt={2}>
            <Text
              flex={0.4}
              fontStyle={'normal'}
              fontSize={13}
              fontWeight={'200'}
              color={colors.TITLE_COLOR}
            >
              ID Number
            </Text>
            <Text
              flex={0.6}
              fontStyle={'normal'}
              //fontFamily={'body'}
              fontSize={14}
              fontWeight={'700'}
              color={colors.black}
            >
              122345678
            </Text>
          </HStack>
          <HStack mt={2}>
            <Text
              flex={0.4}
              fontStyle={'normal'}
              fontSize={13}
              fontWeight={'200'}
              color={colors.TITLE_COLOR}
            >
              Mobile No.
            </Text>
            <Text
              flex={0.6}
              fontStyle={'normal'}
              //fontFamily={'body'}
              fontSize={14}
              fontWeight={'700'}
              color={colors.black}
            >
              8284886069
            </Text>
          </HStack>
          <HStack mt={2}>
            <Text
              flex={0.4}
              fontStyle={'normal'}
              fontSize={13}
              fontWeight={'200'}
              color={colors.TITLE_COLOR}
            >
              E-mail
            </Text>
            <Text
              flex={0.6}
              fontStyle={'normal'}
              //fontFamily={'body'}
              fontSize={14}
              fontWeight={'700'}
              color={colors.black}
            >
              mr.technorite@gmail.com
            </Text>
          </HStack>
        </VStack>
      </CardWithShadow>

      <Button
        backgroundColor={colors.button_color}
        onPress={() => setEdit(true)}
        borderRadius={8}
        width={'80%'}
        mt={30}
        fontWeight={'normal'}
        fontSize={20}
        bottom={20}
        overflow={'hidden'}
        alignSelf={'center'}
        position={'absolute'}
      >
        {'Edit'}
      </Button>
      {isEdit && (
        <View
          backgroundColor={'white'}
          position={'absolute'}
          left={0}
          right={0}
          bottom={0}
          top={0}
        >
          <AddUserInfo />
        </View>
      )}
    </View>
  );
};

export default AccountDetailScreen;
