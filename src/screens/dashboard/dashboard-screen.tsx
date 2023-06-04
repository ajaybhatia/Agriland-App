import { useNavigation } from '@react-navigation/native';
import { FlatList, View, VStack } from 'native-base';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import ListHeader from '@/ui/components/ListHeader';

import TaskActivitesCell from '../home/components/task-activites-cell';
import NoticationCell from '../notifications-screens/components/notification-cell';
import StatisticsCell from './components/statistics-cell';

const DashboardScreen = () => {
  const nav = useNavigation();
  const onNotificationDetail = () => {
    nav.navigate('NotificationsDetails');
  };
  return (
    <View flex={1} backgroundColor={'white'}>
      <FlatList
        data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
        keyExtractor={(item, index) => `${index}`}
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={({ item, index }: { item: number; index: number }) => {
          if (index === 0) {
            return (
              <VStack mt={3}>
                <ListHeader
                  title="Notifications"
                  ml={5}
                  mr={5}
                  btnTitle="See All"
                  iconName="arrow-top-right-bold-box"
                  as={MaterialCommunityIcons}
                  onRightIconClick={onNotificationDetail}
                />
                <FlatList
                  keyExtractor={(item, indexV) => `${indexV}`}
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                  data={[1, 2, 3]}
                  renderItem={({ item: notifications }: { item: number }) => (
                    <NoticationCell />
                  )}
                />
              </VStack>
            );
          } else if (index === 1) {
            return (
              <VStack mt={3}>
                <ListHeader
                  title="Tasks"
                  ml={5}
                  mr={5}
                  isSeeAllShow={false}
                  btnTitle="See All"
                  iconName="arrow-top-right-bold-box"
                  as={MaterialCommunityIcons}
                />
                <TaskActivitesCell />
              </VStack>
            );
          } else if (index === 2) {
            return (
              <VStack mt={3}>
                <ListHeader
                  title="Statistics"
                  ml={5}
                  mr={5}
                  btnTitle="See All"
                  isSeeAllShow={false}
                  iconName="arrow-top-right-bold-box"
                  as={MaterialCommunityIcons}
                  onRightIconClick={onNotificationDetail}
                />
                <StatisticsCell />
              </VStack>
            );
          }
          return <View />;
        }}
      />
    </View>
  );
};

export default DashboardScreen;
