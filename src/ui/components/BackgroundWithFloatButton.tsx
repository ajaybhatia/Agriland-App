import {
  Fab,
  FlatList,
  HStack,
  Icon,
  Pressable,
  Text,
  View,
} from 'native-base';
import type { PropsWithChildren } from 'react';
import React, { useState } from 'react';
import type { LayoutChangeEvent } from 'react-native';
import { Alert, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import colors from '../theme/colors';

type Props = {
  isShowButton?: boolean;
};
type MenuType = {
  icon: string;
  as?: any;
  title: string;
};
export default function BackgroundWithFloatButton({
  children,
  isShowButton = true,
}: PropsWithChildren<Props>) {
  const insets = useSafeAreaInsets();
  const [isMenuOpen, setMenuOpen] = useState<boolean>(false);
  const [menuPosition, setMenuPosition] = useState<
    | {
        x: number;
        y: number;
        width: number;
        height: number;
      }
    | undefined
  >();
  const menuArray: MenuType[] = [
    { icon: 'chat', as: MaterialIcons, title: 'Write Something' },
    { icon: 'support-agent', as: MaterialIcons, title: 'Chat With Expert' },
    { icon: 'call', as: MaterialIcons, title: 'Contact us' },
    { icon: 'skip-next', as: MaterialIcons, title: 'Next Season' },
  ];
  return (
    <View flex={1} backgroundColor={colors.BORDER_COLOR_DARK}>
      {children}
      {isShowButton && (
        <Fab
          onPress={() => setMenuOpen(!isMenuOpen)}
          right={5}
          renderInPortal={false}
          bgColor={'rgb(78,138,2)'}
          bottom={insets.bottom + (Platform.OS === 'ios' ? 80 : 120.5)}
          onLayout={(event: LayoutChangeEvent) => {
            const layout = event.nativeEvent.layout;
            setMenuPosition({
              height: layout.height,
              width: layout.width,
              x: layout.x,
              y: layout.y,
            });
          }}
          icon={
            <Icon
              as={MaterialIcons}
              name={'more-vert'}
              size={'md'}
              color={'white'}
            />
          }
        />
      )}
      {isMenuOpen && isShowButton && (
        <Pressable
          onPress={() => setMenuOpen(false)}
          position={'absolute'}
          left={0}
          right={0}
          top={0}
          bottom={0}
        >
          <View
            shadow={3}
            borderRadius={8}
            position={'absolute'}
            bottom={
              insets.bottom +
              (Platform.OS === 'ios' ? 80 : 120) +
              (menuPosition?.height ?? 50)
            }
            right={10}
            borderColor={colors.BORDER_COLOR_DARK}
            borderWidth={2}
            bgColor={'white'}
            w={'45%'}
          >
            <FlatList
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              data={menuArray}
              scrollEnabled={false}
              keyExtractor={(item: MenuType, index: number) => index.toString()}
              renderItem={({
                index,
                item,
              }: {
                index: number;
                item: MenuType;
              }) => {
                return (
                  <Pressable
                    onPress={() => Alert.alert('Alert', item.title)}
                    justifyContent={'center'}
                    mx={2}
                    borderBottomColor={colors.BORDER_COLOR}
                    borderBottomWidth={0.8}
                  >
                    <HStack alignItems={'center'}>
                      <Icon
                        name={item.icon}
                        as={item?.as ?? MaterialCommunityIcons}
                        color={'black'}
                      />
                      <Text ml={3} fontWeight={'normal'} py={2} color={'black'}>
                        {item.title}
                      </Text>
                    </HStack>
                  </Pressable>
                );
              }}
            />
          </View>
        </Pressable>
      )}
    </View>
  );
}
