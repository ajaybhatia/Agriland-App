import { useNavigation } from '@react-navigation/native';
import { FlatList, View } from 'native-base';
import React from 'react';

import NoticationCell from './components/notification-cell';

const NotificationsDetails = () => {
  const nav = useNavigation();
  return (
    <View flex={1} backgroundColor={'white'}>
      <FlatList
        data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
        keyExtractor={(item, index) => `${index}`}
        renderItem={({ item, index }: { item: number; index: number }) => {
          return <NoticationCell />;
        }}
      />
    </View>
  );
};

export default NotificationsDetails;
