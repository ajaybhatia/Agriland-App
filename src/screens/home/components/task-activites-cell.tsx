import { useNavigation } from '@react-navigation/native';
import {
  Circle,
  FlatList,
  HStack,
  Image,
  Pressable,
  Text,
  View,
  VStack,
} from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';

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

const dataArray: DataValues[] = [
  {
    title: 'Tomorrow',
    subTitle: '17 March 2023',
    body: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. ',
  },
  {
    title: 'Tomorrow',
    subTitle: '17 March 2023',
    body: 'Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. ',
  },
  {
    title: 'Tomorrow',
    subTitle: '17 March 2023',
    body: 'Donec vitae sapien ut libero venenatis faucibus.',
  },
];
const TaskActivitesCell = () => {
  const navigation = useNavigation();
  const [currentPage, setCurrentPage] = React.useState<number>(0);
  const viewabilityConfig = React.useRef({
    itemVisiblePercentThreshold: 40,
  }).current;

  const renderPage = (rowData: any) => {
    return (
      <View mb={3}>
        <FlatList
          scrollEnabled={false}
          // eslint-disable-next-line react-native/no-inline-styles
          style={{ flexGrow: 1 }}
          data={dataArray}
          renderItem={renderListPage}
          keyExtractor={(item, index) => `${index}`}
          // onViewableItemsChanged={onViewableItemsChanged}
          // viewabilityConfig={viewabilityConfig}
        />
      </View>
    );
  };

  const onTaskdetailOpen = () => {
    navigation.navigate('TaskDetailScreen');
  };

  const renderListPage = (rowData: any) => {
    const item = rowData.item;
    return (
      <Pressable flex={1} mb={1} mr={5} onPress={onTaskdetailOpen}>
        <HStack
          flex={1}
          bgColor={'white'}
          borderRadius={5}
          borderColor={PRIMARY_COLOR}
          borderWidth={1.5}
          alignItems={'center'}
        >
          <VStack flex={0.3} justifyContent={'center'} alignItems={'center'}>
            <Image
              alt=""
              //borderRadius={10}
              overflow={'hidden'}
              h={'9'}
              w={'9'}
              source={require('@assets/app-logo.png')}
            />
          </VStack>
          <VStack flex={0.5} py={2}>
            <Text fontWeight={'700'} fontSize={14} fontStyle={'normal'}>
              Drench
            </Text>
            <Text fontWeight={'100'} fontSize={11} fontStyle={'normal'}>
              13:0:45 13:0:45 13:0:45 13:0:45 13:0:45
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
  return (
    <View
      style={styles.container}
      borderBottomWidth={0.5}
      w={'100%'}
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
              title: item.title,
              subTitle: item.subTitle,
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
