import * as scale from 'd3-scale';
import * as shape from 'd3-shape';
import { HStack, ScrollView, Text, View, VStack } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { CircleProgressBar } from 'react-native-splited-progress-bar';
import {
  BarChart as BarChartSVGA,
  XAxis,
  YAxis,
} from 'react-native-svg-charts';

import CardWithShadow from '@/ui/components/CardWithShadow';

const StatisticsCell = () => {
  const dataMain = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
      },
    ],
  };
  const chartConfig = {
    backgroundGradientFrom: '#FFF',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#FFF',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };
  const randomColor = () =>
    ('#' + ((Math.random() * 0xffffff) << 0).toString(16) + '000000').slice(
      0,
      7
    );
  const data = [
    {
      value: 50,
      label: 'One',
      svg: {
        fill: randomColor(),
      },
    },
    {
      value: 10,
      label: 'Two',
      svg: {
        fill: randomColor(),
      },
    },
    {
      value: 40,
      label: 'Three',
      svg: {
        fill: randomColor(),
      },
    },
    {
      value: 95,
      label: 'Four',
      svg: {
        fill: randomColor(),
      },
    },
    {
      value: 85,
      label: 'Five',
      svg: {
        fill: randomColor(),
      },
    },
    {
      value: 40,
      label: 'six',
      svg: {
        fill: randomColor(),
      },
    },
    {
      value: 95,
      label: 'seven',
      svg: {
        fill: randomColor(),
      },
    },
    {
      value: 85,
      label: 'eight',
      svg: {
        fill: randomColor(),
      },
    },
    {
      value: 40,
      label: 'nine',
      svg: {
        fill: randomColor(),
      },
    },
    {
      value: 95,
      label: 'ten',
      svg: {
        fill: randomColor(),
      },
    },
    {
      value: 85,
      label: 'eleven',
      svg: {
        fill: randomColor(),
      },
    },
    {
      value: 40,
      label: 'twleve',
      svg: {
        fill: randomColor(),
      },
    },
    {
      value: 95,
      label: 'thirteen',
      svg: {
        fill: randomColor(),
      },
    },
    {
      value: 85,
      label: 'fourteen',
      svg: {
        fill: randomColor(),
      },
    },
  ];

  return (
    <VStack>
      <HStack justifyContent={'space-between'}>
        <View flex={0.5}>
          <CardWithShadow>
            <VStack alignItems={'center'} mt={2} h={'48'}>
              <CircleProgressBar percentage={24} size={100} splited={false} />
              <Text fontFamily={'body'} fontSize={13} fontWeight={'400'} my={2}>
                Harvest
              </Text>
            </VStack>
          </CardWithShadow>
        </View>
        <View flex={0.5}>
          <CardWithShadow>
            <VStack alignItems={'center'} mt={2} h={'48'}>
              <ScrollView
                horizontal={true}
                // contentOffset={{ x: 10000, y: 0 }} // i needed the scrolling to start from the end not the start
                showsHorizontalScrollIndicator={false} // to hide scroll bar
              >
                <YAxis
                  data={data}
                  yAccessor={({ index }) => index}
                  scale={scale.scaleBand}
                  contentInset={{ top: 5, bottom: 30 }}
                  formatLabel={(_, index) => ` ${data[index].label} `}
                  spacing={0.1}
                  svg={{
                    fill: 'grey',
                    fontSize: 8,
                  }}
                />
                <VStack>
                  <BarChartSVGA
                    style={{ height: 130, width: data.length * 40 }}
                    data={data}
                    horizontal={true}
                    yAccessor={({ item }) => item.value}
                    //  svg={{ fill: 'rgba(134, 65, 244, 0.8)' }}
                    svg={{
                      fill: 'rgba(134, 65, 244, 0.8)',
                      strokeHeight: 0.2,
                      strokeWidth: 0.1,
                    }}
                    curve={shape.curveNatural}
                    contentInset={{ top: 10, bottom: 10 }}
                    spacing={0.2}
                    gridMin={0}
                  >
                    {/* <Grid direction={Grid.Direction.VERTICAL} /> */}
                  </BarChartSVGA>
                  <XAxis
                    data={data}
                    yAccessor={({ index }) => index}
                    scale={scale.scaleBand}
                    contentInset={{ top: 10, bottom: 10 }}
                    spacing={0.2}
                    formatLabel={(_, index) => data[index].label}
                    svg={{
                      fill: 'grey',
                      fontSize: 10,
                    }}
                    belowChart={true}
                  />
                </VStack>
              </ScrollView>
              <Text fontFamily={'body'} fontSize={13} fontWeight={'400'} my={2}>
                Crops
              </Text>
            </VStack>
          </CardWithShadow>
        </View>
      </HStack>

      <CardWithShadow>
        <View shadow={1} py={2}>
          <ScrollView
            horizontal={true}
            // contentOffset={{ x: 10000, y: 0 }} // i needed the scrolling to start from the end not the start
            showsHorizontalScrollIndicator={false} // to hide scroll bar
          >
            <BarChart
              style={{
                backgroundColor: '#FFF',
              }}
              data={dataMain}
              width={dataMain.labels.length * 80}
              height={220}
              chartConfig={chartConfig}
              //verticalLabelRotation={30}
            />
          </ScrollView>
        </View>
      </CardWithShadow>
    </VStack>
  );
};

export default StatisticsCell;

const styles = StyleSheet.create({
  chart: {
    marginBottom: 30,
    padding: 10,
    paddingTop: 20,
    borderRadius: 20,
    width: 375,
    backgroundColor: 'green',
  },
});
