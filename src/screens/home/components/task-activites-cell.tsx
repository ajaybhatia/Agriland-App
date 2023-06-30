import { useNavigation } from '@react-navigation/native';
import dayjs from 'dayjs';
import { Image as ImageRemote } from 'expo-image';
import {
  Circle,
  FlatList,
  HStack,
  Pressable,
  Text,
  View,
  VStack,
} from 'native-base';
import React, { useCallback } from 'react';
import { StyleSheet } from 'react-native';

import type { FarmerCropCalendarActivity } from '@/apis/model';
import type { DataValues } from '@/ui/components/step-indicator/StepIndicator';
import StepIndicator from '@/ui/components/step-indicator/StepIndicator';
import {
  BORDER_COLOR,
  INPROGRESS_COLOR,
  PRIMARY_COLOR,
} from '@/ui/theme/colors';

const stepIndicatorStyles = {
  stepIndicatorSize: 20,
  currentStepIndicatorSize: 40,
  separatorStrokeWidth: 3,
  currentStepStrokeWidth: 1,
  stepStrokeCurrentColor: '#fe7013',
  separatorFinishedColor: '#fe7013',
  separatorUnFinishedColor: 'green',
  stepIndicatorFinishedColor: '#fe7013',
  stepIndicatorUnFinishedColor: '#aaaaaa',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 15,
  currentStepIndicatorLabelFontSize: 15,
  stepIndicatorLabelCurrentColor: '#000000',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: 'rgba(255,255,255,0.5)',
  labelColor: '#666666',
  labelSize: 15,
  currentStepLabelColor: '#fe7013',
  labelSubSize: 13,
};
type Props = {
  dataArray: DataValues[];
};
const TaskActivitesCell = ({ dataArray }: Props) => {
  const navigation = useNavigation();
  const [currentPage, setCurrentPage] = React.useState<number>(0);
  const viewabilityConfig = React.useRef({
    itemVisiblePercentThreshold: 40,
  }).current;

  const renderPage = ({
    item: rowData,
    index,
  }: {
    item: DataValues;
    index: number;
  }) => {
    return (
      <View mb={3}>
        <FlatList
          scrollEnabled={false}
          // eslint-disable-next-line react-native/no-inline-styles
          style={{ flexGrow: 1 }}
          data={rowData.list}
          renderItem={renderListPage}
          keyExtractor={(item, index) => `${index}`}
          // onViewableItemsChanged={onViewableItemsChanged}
          // viewabilityConfig={viewabilityConfig}
        />
      </View>
    );
  };

  const onTaskdetailOpen = useCallback((item: FarmerCropCalendarActivity) => {
    navigation.navigate('TaskDetailScreen', {
      detail: item,
    });
  }, []);

  const renderListPage = ({
    item: rowData,
    index,
  }: {
    item: FarmerCropCalendarActivity;
    index: number;
  }) => {
    return (
      <Pressable
        flex={1}
        mb={1}
        mr={5}
        onPress={() => onTaskdetailOpen(rowData)}
      >
        <HStack
          flex={1}
          bgColor={'white'}
          borderRadius={5}
          borderColor={PRIMARY_COLOR}
          borderWidth={1.5}
          alignItems={'center'}
        >
          <VStack flex={0.3} justifyContent={'center'} alignItems={'center'}>
            {/* <Image
              alt=""
              //borderRadius={10}
              overflow={'hidden'}
              h={'9'}
              w={'9'}
              source={require('@assets/app-logo.png')}
            /> */}
            <ImageRemote
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                height: 35,
                width: 35,
                marginVertical: 8,
                borderRadius: 35 / 2,
                borderWidth: 1,
              }}
              source={rowData?.imageUrl ?? 'https://'}
              placeholder={require('@assets/app-logo.png')}
              contentFit="cover"
              transition={1000}
            />
          </VStack>
          <VStack flex={0.5} py={2}>
            <Text
              numberOfLines={2}
              fontWeight={'700'}
              fontSize={14}
              fontStyle={'normal'}
            >
              {rowData?.activityName?.en ?? ''}
            </Text>
            <Text
              numberOfLines={2}
              fontWeight={'100'}
              fontSize={11}
              fontStyle={'normal'}
            >
              {rowData?.activityDesc?.en ?? ''}
            </Text>
          </VStack>
          <VStack flex={0.2}>
            <Circle
              w={4}
              h={4}
              borderWidth={1}
              borderColor={INPROGRESS_COLOR}
              bgColor={INPROGRESS_COLOR}
            >
              {/* {(index === 0 || index === 4 || index === 8) && (
                        <Icon
                          as={MaterialIcons}
                          name={'check'}
                          size={12.1}
                          color={'white'}
                        /> 
                      )}*/}
            </Circle>
          </VStack>
        </HStack>
      </Pressable>
    );
  };

  const onViewableItemsChanged = React.useCallback(({ viewableItems }) => {
    const visibleItemsCount = viewableItems.length;
    if (visibleItemsCount !== 0) {
      setCurrentPage(viewableItems[visibleItemsCount - 1].index);
    }
  }, []);
  if (dataArray && dataArray.length > 0) {
    return (
      <View
        style={styles.container}
        //borderBottomWidth={0.5}
        w={'100%'}
        mt={3}
        borderBottomColor={BORDER_COLOR}
      >
        <View style={styles.stepIndicator}>
          <StepIndicator
            customStyles={stepIndicatorStyles}
            stepCount={dataArray.length}
            direction="vertical"
            currentPosition={0}
            labels={dataArray.map((item) => {
              const v: DataValues = {
                title: dayjs(item.title).utc().format('D MMM YYYY'),
                subTitle: dayjs(item.subTitle).utc().format('dddd'),
              };
              return v;
            })}
          />
        </View>
        <FlatList
          // eslint-disable-next-line react-native/no-inline-styles
          style={{ flexGrow: 1 }}
          scrollEnabled={false}
          data={dataArray}
          renderItem={renderPage}
          keyExtractor={(item, index) => `${index}`}
          // onViewableItemsChanged={onViewableItemsChanged}
          // viewabilityConfig={viewabilityConfig}
        />
      </View>
    );
  }
  return <View />;
};

export default TaskActivitesCell;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#ffffff',
  },
  stepIndicator: {
    //marginVertical: 50,
    paddingLeft: 20,
  },
  rowItem: {
    flex: 3,
    paddingVertical: 20,
  },
  title: {
    flex: 1,
    fontSize: 20,
    color: '#333333',
    paddingVertical: 16,
    fontWeight: '600',
  },
  body: {
    flex: 1,
    fontSize: 15,
    color: '#606060',
    lineHeight: 24,
    marginRight: 8,
  },
});
