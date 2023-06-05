import { useNavigation } from '@react-navigation/native';
import { Image } from 'expo-image';
import { FlatList, Pressable, View, VStack } from 'native-base';
import React from 'react';
import { Dimensions } from 'react-native';

import ListHeader from '@/ui/components/ListHeader';

import PreviousTestCell from './components/previous-test-cell';

type Props = {};

const TestScreen = (props: Props) => {
  const nav = useNavigation();
  return (
    <View flex={1}>
      <FlatList
        data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]}
        keyExtractor={(item, index) => `${index}`}
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={({ item, index }: { item: number; index: number }) => {
          if (index === 0) {
            return (
              <VStack mt={2}>
                <ListHeader
                  title="Choose one of the following tests from the list"
                  ml={5}
                  mr={5}
                  mb={3}
                  mt={3}
                  isSeeAllShow={false}
                />
                <FlatList
                  mx={5}
                  numColumns={2}
                  scrollEnabled={false}
                  keyExtractor={(item, indexV) => `${indexV}`}
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                  data={[1, 2, 3, 4, 5]}
                  renderItem={({ item: itemCrop }: { item: number }) => (
                    <Pressable
                      onPress={() =>
                        nav.navigate('MakeAppointmentScreen', {
                          title: 'Test Appointment',
                        })
                      }
                      shadow={2}
                      m={1}
                      borderRadius={10}
                      overflow={'hidden'}
                      w={Dimensions.get('screen').width / 2 - 30}
                    >
                      <Image
                        style={{ flex: 1, height: 100 }}
                        source={
                          'https://fastly.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U'
                        }
                        placeholder={require('@assets/app-logo.png')}
                        contentFit="cover"
                        transition={1000}
                      />
                    </Pressable>
                  )}
                  //estimatedItemSize={300}
                />
              </VStack>
            );
          } else if (index === 1) {
            return (
              <VStack mt={2}>
                <ListHeader
                  title="Previous Tests"
                  ml={5}
                  mr={5}
                  mb={3}
                  mt={3}
                  isSeeAllShow={false}
                />
                <FlatList
                  mx={5}
                  scrollEnabled={false}
                  keyExtractor={(item, indexV) => `${indexV}`}
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                  data={[1, 2, 3, 4, 5]}
                  renderItem={({ item: itemCrop }: { item: number }) => (
                    <PreviousTestCell />
                  )}
                  //estimatedItemSize={300}
                />
              </VStack>
            );
          }
          return <View />;
        }}
      />
    </View>
  );
};

export default TestScreen;
