import { useNavigation } from '@react-navigation/native';
import {
  HStack,
  Icon,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
  VStack,
} from 'native-base';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const WeatherDetailScreen = () => {
  const nav = useNavigation();
  return (
    <View flex={1}>
      <View
        flex={1}
        position={'absolute'}
        left={0}
        right={0}
        top={0}
        bgColor={'amber.500'}
        bottom={0}
      >
        <Image
          alt=""
          flex={1}
          source={require('@assets/weather_bg.png')}
          resizeMode="cover"
        />
      </View>
      <ScrollView contentContainerStyle={{ bottom: 20 }}>
        <VStack
          justifyContent={'center'}
          alignItems={'center'}
          mt={'1/4'}
          flex={1}
        >
          <Text
            fontFamily={'heading'}
            fontSize={'xl'}
            fontWeight={'700'}
            color={'white'}
          >
            Al-Kamal Farm
          </Text>
          <Text
            fontFamily={'heading'}
            fontSize={'6xl'}
            fontWeight={'700'}
            color={'white'}
          >
            22°
          </Text>
          <VStack
            bgColor={'rgba(0,0,0,0.5)'}
            w={'80%'}
            overflow={'hidden'}
            borderRadius={10}
          >
            <HStack justifyContent={'space-between'} p={3}>
              <VStack alignItems={'center'} justifyContent={'center'}>
                <Image
                  alt=""
                  h={8}
                  w={8}
                  source={require('@assets/weather-icon/1.png')}
                  resizeMode="cover"
                />
                <Text
                  color={'white'}
                  fontFamily={'heading'}
                  fontSize={12}
                  fontWeight={'400'}
                >
                  7Km/h
                </Text>
              </VStack>

              <VStack alignItems={'center'} justifyContent={'center'}>
                <Image
                  alt=""
                  h={8}
                  w={8}
                  source={require('@assets/weather-icon/1.png')}
                  resizeMode="cover"
                />
                <Text
                  color={'white'}
                  fontFamily={'heading'}
                  fontSize={12}
                  fontWeight={'400'}
                >
                  0mm
                </Text>
              </VStack>

              <VStack alignItems={'center'} justifyContent={'center'}>
                <Image
                  alt=""
                  h={8}
                  w={8}
                  source={require('@assets/weather-icon/1.png')}
                  resizeMode="cover"
                />
                <Text
                  color={'white'}
                  fontFamily={'heading'}
                  fontSize={12}
                  fontWeight={'400'}
                >
                  60%
                </Text>
              </VStack>
            </HStack>
            <View h={0.3} mb={2} bgColor={'white'} w={'100%'} />
            <ScrollView horizontal>
              <HStack p={3}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((v, index) => {
                  return (
                    <VStack
                      key={`${index}`}
                      alignItems={'center'}
                      justifyContent={'center'}
                      mr={3}
                    >
                      <Text
                        color={'white'}
                        fontFamily={'heading'}
                        fontSize={12}
                        fontWeight={'400'}
                      >
                        now
                      </Text>
                      <Image
                        my={3}
                        alt=""
                        h={5}
                        w={5}
                        source={require('@assets/weather-icon/1.png')}
                        resizeMode="cover"
                      />
                      <Text
                        color={'white'}
                        fontFamily={'heading'}
                        fontSize={12}
                        fontWeight={'400'}
                      >
                        22°
                      </Text>
                    </VStack>
                  );
                })}
              </HStack>
            </ScrollView>
          </VStack>
          {/* Second cell */}
          <VStack
            bgColor={'rgba(0,0,0,0.5)'}
            w={'80%'}
            mt={5}
            overflow={'hidden'}
            borderRadius={10}
          >
            <HStack
              justifyContent={'space-between'}
              p={3}
              alignItems={'center'}
            >
              <Text
                color={'white'}
                fontFamily={'heading'}
                fontSize={14}
                fontWeight={'500'}
              >
                Today
              </Text>
              <Image
                alt=""
                h={8}
                w={8}
                source={require('@assets/weather-icon/1.png')}
                resizeMode="cover"
              />

              <Image
                alt=""
                h={8}
                w={8}
                source={require('@assets/weather-icon/1.png')}
                resizeMode="cover"
              />
              <Image
                alt=""
                h={8}
                w={8}
                source={require('@assets/weather-icon/1.png')}
                resizeMode="cover"
              />
            </HStack>
            {[
              'Monday',
              'Tuesday',
              'Wednesday',
              'Thursday',
              'Friday',
              'Saturday',
              "'Sunday",
            ].map((day, index) => {
              return (
                <HStack
                  key={`${index}`}
                  // borderBottomColor={'white'}
                  // borderBottomWidth={0.3}
                  borderTopColor={'white'}
                  borderTopWidth={0.3}
                  justifyContent={'space-between'}
                  p={3}
                  alignItems={'center'}
                >
                  <Text
                    flex={0.35}
                    color={'white'}
                    fontFamily={'heading'}
                    fontSize={14}
                    fontWeight={'500'}
                  >
                    {day}
                  </Text>
                  <Text
                    flex={0.22}
                    color={'white'}
                    fontFamily={'heading'}
                    fontSize={12}
                    fontWeight={'500'}
                  >
                    30%
                  </Text>
                  <Text
                    flex={0.22}
                    color={'white'}
                    fontFamily={'heading'}
                    fontSize={12}
                    fontWeight={'500'}
                  >
                    0mm
                  </Text>
                  <Text
                    flex={0.22}
                    color={'white'}
                    fontFamily={'heading'}
                    fontSize={12}
                    fontWeight={'500'}
                  >
                    500Km/h
                  </Text>
                </HStack>
              );
            })}
          </VStack>

          <HStack
            bgColor={'rgba(0,0,0,0.5)'}
            w={'80%'}
            mt={5}
            justifyContent={'center'}
            overflow={'hidden'}
            py={3}
            borderRadius={10}
          >
            {[
              'Pressure',
              'Humidity',
              'Clouds',
              'Wind Speed',
              'Light Intensity',
            ].map((v, index) => {
              return (
                <VStack key={`${index}`} flex={0.19} mx={1.5}>
                  <View
                    borderColor={'rgb(256,256,256)'}
                    borderWidth={1}
                    h={10}
                    w={10}
                    overflow={'hidden'}
                    borderRadius={10}
                  >
                    <Image
                      alt=""
                      flex={1}
                      source={require('@assets/weather_bg.png')}
                      resizeMode="cover"
                    />
                  </View>
                  <Text
                    color={'white'}
                    fontFamily={'heading'}
                    fontSize={10}
                    textAlign={'center'}
                    fontWeight={'200'}
                  >
                    {v}
                  </Text>
                </VStack>
              );
            })}
          </HStack>
        </VStack>
      </ScrollView>

      <Pressable
        position={'absolute'}
        onPress={() => nav.goBack()}
        left={2}
        top={2}
        p={5}
      >
        <Icon
          as={MaterialCommunityIcons}
          name={'arrow-u-right-top'}
          size={'lg'}
          color={'white'}
        />
      </Pressable>
    </View>
  );
};

export default WeatherDetailScreen;
