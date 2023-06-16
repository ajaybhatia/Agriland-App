import { useNavigation } from '@react-navigation/native';
import { Button, FlatList, HStack, Icon, IconButton, View } from 'native-base';
import React, { useEffect, useRef, useState } from 'react';
import { I18nManager } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import colors from '@/ui/theme/colors';

import SateliteImageCell from './components/satelite-image-cell';

type Props = {};

const SateliteDemoMapScreen = (props: Props) => {
  const [scrollIndex, setScrollIndex] = useState<number>(0);
  const ref = useRef();
  const nav = useNavigation();

  const scrollToIndex = () => {
    ref?.current?.scrollToIndex({
      index: scrollIndex,
      animated: true,
    });
  };
  useEffect(() => {
    scrollToIndex();
  }, [scrollIndex]);
  return (
    <View flex={1}>
      <HStack alignItems={'center'} mx={2}>
        <IconButton
          size={12}
          disabled={scrollIndex <= 0}
          onPress={() => scrollIndex > 0 && setScrollIndex(scrollIndex - 1)}
          borderColor={'white'}
          icon={
            <Icon
              as={MaterialIcons}
              name={'keyboard-arrow-left'}
              size={'3xl'}
              color={'black'}
            />
          }
        />
        <FlatList
          ref={ref}
          horizontal
          contentContainerStyle={{
            flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
          }}
          pagingEnabled
          keyExtractor={(item, index) => `${index}`}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={[1, 2, 3, 4, 5]}
          initialNumToRender={3}
          renderItem={({ item, index }: { item: string; index: number }) => (
            <SateliteImageCell />
          )}
          //estimatedItemSize={300}
        />
        <IconButton
          size={12}
          disabled={scrollIndex >= 4}
          onPress={() => scrollIndex < 4 && setScrollIndex(scrollIndex + 1)}
          borderColor={'white'}
          icon={
            <Icon
              as={MaterialIcons}
              name={'keyboard-arrow-right'}
              size={'3xl'}
              color={'black'}
            />
          }
        />
      </HStack>
      <Button
        onPress={() => nav.navigate('SateliteMapScreen')}
        backgroundColor={colors.button_color}
        borderRadius={8}
        width={'70%'}
        mt={30}
        fontWeight={'normal'}
        fontSize={20}
        overflow={'hidden'}
        alignSelf={'center'}
      >
        {'Reports'}
      </Button>
    </View>
  );
};

export default SateliteDemoMapScreen;
