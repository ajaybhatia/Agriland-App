import { Text } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const AddFarmScreen = () => {
  return (
    <SafeAreaView style={styles.fullscreen}>
      <Text>hii</Text>
    </SafeAreaView>
  );
};

export default AddFarmScreen;

const styles = StyleSheet.create({
  fullscreen: {
    flex: 1
  }
});
