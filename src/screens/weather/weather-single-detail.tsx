import dayjs from 'dayjs';
import {
  Divider,
  HStack,
  Icon,
  ScrollView,
  Text,
  View,
  VStack,
} from 'native-base';
import React from 'react';
import { Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import CardWithShadow from '@/ui/components/CardWithShadow';

const WeatherSingleDetail = () => {
  // eslint-disable-next-line react/no-unstable-nested-components
  const ConditionCell = () => {
    return (
      <HStack my={2} alignItems={'center'}>
        <Icon as={MaterialIcons} name={'clear'} size={'lg'} color={'black'} />
        <Divider bg="emerald.500" thickness="2" mx="2" orientation="vertical" />
        <VStack>
          <Text fontWeight={'600'} fontFamily={'heading'} fontSize={13}>
            Excellent growing conditions
          </Text>
          <Text fontWeight={'200'} fontFamily={'body'} fontSize={11}>
            Tomatoes,potatoes,beans,cauliflower pumpkin
          </Text>
        </VStack>
      </HStack>
    );
  };
  console.log(dayjs().add(1, 'day').format('DD MMM'));
  return (
    <ScrollView>
      <VStack flex={1} mx={5} mb={3}>
        <Text fontWeight={'200'} fontFamily={'heading'} fontSize={12}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Text>
      </VStack>
      <CardWithShadow>
        <View shadow={1} py={2}>
          <LineChart
            data={{
              labels: [...Array(7).keys()].map((v, index) => {
                return dayjs().add(index, 'day').format('DD MMM');
              }),
              datasets: [
                {
                  data: [
                    Math.floor(Math.random() * 10) + 1,
                    Math.floor(Math.random() * 10) + 1,
                    Math.floor(Math.random() * 10) + 1,
                    Math.floor(Math.random() * 10) + 1,
                    Math.floor(Math.random() * 10) + 1,
                    Math.floor(Math.random() * 10) + 1,
                  ],
                  strokeWidth: 5,
                  color: (opacity = 1) => `rgba(255,0,0, ${opacity})`, // optional
                },
                {
                  data: [
                    Math.floor(Math.random() * 10) + 1,
                    Math.floor(Math.random() * 10) + 1,
                    Math.floor(Math.random() * 10) + 1,
                    Math.floor(Math.random() * 10) + 1,
                    Math.floor(Math.random() * 10) + 1,
                    Math.floor(Math.random() * 10) + 1,
                  ],
                  strokeWidth: 5,
                  color: (opacity = 1) => `rgba(0,0,102, ${opacity})`, // optional
                },
              ],
            }}
            width={Dimensions.get('window').width - 40} // from react-native
            height={220}
            // yAxisLabel="$"
            // yAxisSuffix="k"
            yLabelsOffset={30}
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              //backgroundColor: '#FFF',
              propsForBackgroundLines: {
                strokeDasharray: '',
              },
              barPercentage: 0.5,
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              useShadowColorFromDataset: false, // optional
              propsForVerticalLabels: {
                fontSize: 8,
                alignmentBaseline: 'after-edge',
              },
              propsForHorizontalLabels: {
                fontSize: 8,
              },
              style: {
                backgroundColor: 'green',
                alignSelf: 'flex-start',
                marginLeft: 10,
              },
              propsForDots: {
                r: '6',
                strokeWidth: '2',
                stroke: '#ffa726',
              },
            }}
            transparent
            verticalLabelRotation={0}
            withVerticalLabels
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        </View>
      </CardWithShadow>
      <VStack flex={1} mx={5} mt={5}>
        {[1, 2, 3].map((item: number, index: number) => {
          return <ConditionCell key={`${index}`} />;
        })}
      </VStack>
    </ScrollView>
  );
};

export default WeatherSingleDetail;
