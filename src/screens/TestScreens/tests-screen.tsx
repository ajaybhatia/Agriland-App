import { FlatList, Image, Pressable, Text, VStack, View } from 'native-base';

import { Dimensions } from 'react-native';
import type { ImageSourcePropType } from 'react-native';
import ListHeader from '@/ui/components/ListHeader';
import PreviousTestCell from './components/previous-test-cell';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

type Props = {};
type AnalysisType = {
  title: string;
  image: ImageSourcePropType;
  color: string;
};
const arry: AnalysisType[] = [
  {
    image: require('@assets/test-icon/ph_analysis.png'),
    title: 'PH Analysis And Soil Alkalinity',
    color: '#db1a20',
  },
  {
    image: require('@assets/test-icon/properties_analysis.png'),
    title: 'Properties Analysis Soil Natural',
    color: '#819a2f',
  },
  {
    image: require('@assets/test-icon/ground_analysis.png'),
    title: 'Curve Analysis Ground Moisture',
    color: '#cd8719',
  },
  {
    image: require('@assets/test-icon/water_analysis.png'),
    title: 'Water Test',
    color: '#4bbcc7',
  },
  {
    image: require('@assets/test-icon/soil_analysis.png'),
    title: 'Pollutant Analysis The Soil',
    color: '#8a6e56',
  },
];

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
                  data={arry}
                  renderItem={({
                    item: itemAnalysis,
                  }: {
                    item: AnalysisType;
                  }) => (
                    <Pressable
                      onPress={() =>
                        nav.navigate('MakeAppointmentScreen', {
                          title: 'Test Appointment',
                        })
                      }
                      bgColor={'white'}
                      shadow={2}
                      m={1}
                      borderRadius={10}
                      overflow={'hidden'}
                      alignItems={'center'}
                      w={Dimensions.get('screen').width / 2 - 30}
                    >
                      <Image
                        h={'16'}
                        w={'16'}
                        alt={''}
                        mt={3}
                        resizeMode="contain"
                        source={itemAnalysis.image}
                      />
                      <Text
                        color={itemAnalysis.color}
                        my={3}
                        fontSize={12}
                        fontFamily={'body'}
                        fontWeight={'700'}
                        w={'100%'}
                        px={3}
                        textAlign={'center'}
                      >
                        {itemAnalysis.title}
                      </Text>
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
