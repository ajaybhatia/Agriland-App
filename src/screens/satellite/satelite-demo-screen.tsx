import { useNavigation } from '@react-navigation/native';
import { FlatList, Pressable, Text, View } from 'native-base';
import React from 'react';
import { Dimensions, I18nManager } from 'react-native';

type Props = {};

const SateLiteDemoScreen = (props: Props) => {
  const nav = useNavigation();
  const coloors: string[] = ['#FF6633', '#FFB399', '#FF33FF'];
  return (
    <View flex={1}>
      <FlatList
        horizontal
        contentContainerStyle={{
          flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
        }}
        pagingEnabled
        keyExtractor={(item, index) => `${index}`}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        data={coloors}
        initialNumToRender={3}
        renderItem={({ item, index }: { item: string; index: number }) => (
          <View
            flex={1}
            w={Dimensions.get('screen').width}
            backgroundColor={item}
            justifyContent={'center'}
            alignItems={'center'}
          >
            <Pressable
              px={10}
              py={3}
              onPress={() => nav.navigate('SubscriptionBundleScreen')}
            >
              <Text>Skip</Text>
            </Pressable>
          </View>
        )}
        //estimatedItemSize={300}
      />
    </View>
  );
};

export default SateLiteDemoScreen;
