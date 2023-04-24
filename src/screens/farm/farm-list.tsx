import { FlashList } from '@shopify/flash-list';
import { Button, HStack, Icon, Pressable, Text, View } from 'native-base';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Header from '@/ui/components/Header';
import colors from '@/ui/theme/colors';

import FarmListCell from './components/farm-list-cell';

type Props = {
  addMoreFarm?: () => void;
  editFarm?: () => void;
};
const FarmList = ({ addMoreFarm, editFarm }: Props) => {
  const { t } = useTranslation();

  function onFarmEdit() {
    editFarm && editFarm();
  }

  function onFarmAddMore() {
    addMoreFarm && addMoreFarm();
  }

  return (
    <View style={styles.fullscreen} p={5}>
      <Header
        title={'Farm Data Review'}
        mt={1}
        btnTitle="Edit"
        iconName="edit"
        as={MaterialIcons}
        iconSize={'md'}
        onRightIconClick={onFarmEdit}
      />
      <FlashList
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 0]}
        renderItem={({ item }) => <FarmListCell />}
        estimatedItemSize={300}
      />

      <Button
        backgroundColor={colors.button_color}
        mt={10}
        onPress={() => {}}
        borderRadius={8}
        width={'80%'}
        fontWeight={'normal'}
        fontSize={20}
        overflow={'hidden'}
        alignSelf={'center'}
      >
        {'Save'}
      </Button>
      <Pressable
        mt={10}
        width={'80%'}
        alignSelf={'center'}
        borderColor={'amber.600'}
        borderWidth={1}
        borderRadius={10}
        overflow={'hidden'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <HStack alignItems={'center'} py={2}>
          <Text color={'amber.600'} fontWeight={'normal'} fontSize={16}>
            {'Save and add new farm'}
          </Text>
          <Icon
            ml={2}
            as={MaterialCommunityIcons}
            name={'plus-circle'}
            size={'lg'}
            color={'amber.600'}
          />
        </HStack>
      </Pressable>
    </View>
  );
};

export default FarmList;

const styles = StyleSheet.create({
  fullscreen: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'white',
  },
});
