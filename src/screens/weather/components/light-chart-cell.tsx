import dayjs from 'dayjs';
import { ScrollView, View, VStack } from 'native-base';
import * as React from 'react';
import { LineChart } from 'react-native-chart-kit';

import CardWithShadow from '@/ui/components/CardWithShadow';
import ListHeader from '@/ui/components/ListHeader';

import type { HourlyWeather } from '../weather-single-detail';

type Props = {
  title?: string;
  historyReport: HourlyWeather[];
};

const LightChartCell = ({ title, historyReport }: Props) => {
  return (
    <VStack>
      {title && (
        <ListHeader
          title={title}
          mt={3}
          ml={5}
          mr={5}
          mb={2}
          isSeeAllShow={false}
        />
      )}
      <CardWithShadow>
        <View shadow={1} py={2}>
          <ScrollView
            horizontal={true}
            // contentOffset={{ x: 10000, y: 0 }} // i needed the scrolling to start from the end not the start
            showsHorizontalScrollIndicator={false} // to hide scroll bar
          >
            <LineChart
              data={{
                labels: historyReport.map((v: HourlyWeather, index: number) => {
                  return dayjs(v.time).utc(true).format('DD MMM');
                }),
                datasets: [
                  {
                    data: historyReport.map((v: HourlyWeather) => {
                      return v.value;
                    }),
                    strokeWidth: 5,
                    color: (opacity = 1) => `rgba(255,0,0, ${opacity})`, // optional
                  },
                ],
              }}
              width={historyReport.length * 40} // from react-native
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
          </ScrollView>
        </View>
      </CardWithShadow>
    </VStack>
  );
};
export default LightChartCell;
