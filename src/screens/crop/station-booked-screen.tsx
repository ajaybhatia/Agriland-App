import { SectionList, Text, View, VStack } from 'native-base';
import React from 'react';

import StationBookedCell from './components/station-booked-cell';

type Props = {};

type MainTitle = {
  title: string;
  data: SubTitle[];
};
type SubTitle = {
  title: string;
  date: Date;
};
const demoArray: MainTitle[] = [
  {
    title: 'Registration under review',
    data: [
      {
        title: 'Account Details',
        date: new Date(),
      },
      {
        title: 'Confirmed registration',
        date: new Date(),
      },
      {
        title: 'Account Details',
        date: new Date(),
      },
    ],
  },
  {
    title: 'Confirmed registration',
    data: [
      {
        title: 'Account Details',
        date: new Date(),
      },
      {
        title: 'Account Details',
        date: new Date(),
      },
      {
        title: 'Account Details',
        date: new Date(),
      },
    ],
  },
  {
    title: 'Storing Application request',
    data: [
      {
        title: 'Account Details',
        date: new Date(),
      },
      {
        title: 'Account Details',
        date: new Date(),
      },
      {
        title: 'Account Details',
        date: new Date(),
      },
    ],
  },
];

const STationBookedScreen = (props: Props) => {
  return (
    <View>
      <SectionList
        sections={demoArray}
        contentContainerStyle={{ paddingBottom: 100 }}
        keyExtractor={(item, index) => `${index}`}
        renderItem={({ item, index }: { item: SubTitle; index: number }) => (
          <StationBookedCell />
        )}
        renderSectionHeader={({ section: { title } }) => {
          return (
            <VStack>
              <Text
                fontSize={17}
                mx={5}
                my={2}
                fontStyle={'normal'}
                fontWeight={'700'}
              >
                {title}
              </Text>
            </VStack>
          );
        }}
      />
    </View>
  );
};

export default STationBookedScreen;
