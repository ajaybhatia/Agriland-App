import { FlatList, HStack, Icon, Text, VStack } from 'native-base';
import * as React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import type { ForecastModel } from '../models/weather-forecast-models';
import ForecastDetailCell from './forecast-detail-cell';

type Props = {
  weatherReport: ForecastModel;
};
const WeatherWeekCell = ({ weatherReport }: Props) => {
  return (
    <VStack
      bgColor={'rgba(0,0,0,0.5)'}
      mx={5}
      my={3}
      overflow={'hidden'}
      borderRadius={10}
    >
      <HStack justifyContent={'space-between'} p={3} alignItems={'center'}>
        <Text
          color={'white'}
          fontFamily={'heading'}
          fontSize={14}
          fontWeight={'500'}
        >
          Today
        </Text>
        {/* <Image
                alt=""
                h={8}
                w={8}
                source={require('@assets/weather-icon/1.png')}
                resizeMode="cover"
              /> */}

        {/* <Image
                alt=""
                h={8}
                w={8}
                source={require('@assets/weather-icon/1.png')}
                resizeMode="cover"
              /> */}
        <Icon as={Entypo} name={'drop'} size={'lg'} color={'blue.700'} />
        {/* <Image
                alt=""
                h={8}
                w={8}
                source={require('@assets/weather-icon/1.png')}
                resizeMode="cover"
              /> */}
        <Icon
          as={MaterialCommunityIcons}
          name={'cloud'}
          size={'lg'}
          color={'blue.700'}
        />
        <Icon as={FontAwesome5} name={'wind'} size={'lg'} color={'blue.700'} />
      </HStack>

      <FlatList
        horizontal={false}
        //initialScrollIndex={indexWeather > 0 ? indexWeather * 41 : 0}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => `${index}`}
        contentContainerStyle={{ paddingVertical: 10 }}
        data={weatherReport.daily.time}
        renderItem={({ item, index }: { item: string; index: number }) => (
          <ForecastDetailCell
            day={item}
            index={index}
            weatherReport={weatherReport}
          />
        )}
        //estimatedItemSize={300}
      />
    </VStack>
  );
};
export default React.memo(WeatherWeekCell);
