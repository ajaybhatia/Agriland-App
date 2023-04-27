import { FlashList } from '@shopify/flash-list';
import { Button, View } from 'native-base';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { useGetApiCommonFetchCityByGovernateById } from '@/apis/endpoints/api';
import type { City } from '@/apis/model';
import AppLoader from '@/ui/components/AppLoader';
import EmptyList from '@/ui/components/EmptyList';
import Header from '@/ui/components/Header';
import ItemList from '@/ui/components/ItemList';
import colors from '@/ui/theme/colors';

type Props = {
  governateId: string;
  onCitySelect?: (city: City[]) => void;
  onClose?: () => void;
};

const CityList = ({ onCitySelect, onClose, governateId }: Props) => {
  const { t } = useTranslation();
  const [selections, setSelection] = useState<number[]>([]);
  const [moreInfo, setMoreInfo] = useState<{
    take: number;
    skip: number;
  }>({
    take: 20,
    skip: 0,
  });
  const [cityResponse, setCityResponse] = useState<City[]>([]);

  // Api
  const cityApi = useGetApiCommonFetchCityByGovernateById(
    {
      governateId: governateId,
    },
    {
      query: {
        onSuccess: (data: City[]) => {
          if (data.length > 0) {
            setCityResponse([...cityResponse, ...data]);
          }
        },
        onError(err) {
          Toast.show({
            type: 'error',
            text1: err.message,
          });
        },
      },
    }
  );

  function handleSubmit() {
    if (onCitySelect && selections.length > 0) {
      var selectedGovernorate = selections.map((v) => {
        return cityResponse.filter((x, index) => index === v)[0];
      });
      onCitySelect(selectedGovernorate);
    }
  }

  return (
    <View style={styles.fullscreen}>
      <View mx={8} flex={1}>
        <Header
          title={t('select-city')}
          iconName={'close'}
          mt={3}
          mb={3}
          ml={0}
          as={MaterialIcons}
          onRightIconClick={() => onClose && onClose()}
        />
        <FlashList
          extraData={selections}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={cityResponse}
          renderItem={({ item, index }: { item: City; index: number }) => {
            return (
              <ItemList
                title={`${item.name}`}
                index={index}
                isMultiSelection={false}
                selection={true}
                selections={selections}
                setSelection={(
                  selectedIndex: number,
                  isSelected: Boolean,
                  isMultiSelection: Boolean
                ) => {
                  if (isMultiSelection) {
                    if (isSelected) {
                      setSelection([...selections, selectedIndex]);
                    } else {
                      setSelection(
                        selections.filter((x) => x !== selectedIndex)
                      );
                    }
                  } else {
                    setSelection([selectedIndex]);
                  }
                }}
              />
            );
          }}
          // eslint-disable-next-line react/no-unstable-nested-components
          ListEmptyComponent={() =>
            cityResponse.length <= 0 &&
            !cityApi.isLoading &&
            !cityApi.isFetching && <EmptyList value={'Cities not found'} />
          }
          estimatedItemSize={40}
          //onEndReachedThreshold={0.5}
          contentContainerStyle={{ paddingBottom: 100 }}
          // onEndReached={() => {
          //   console.log('onEndReached');
          // }}
        />
      </View>
      {selections.length > 0 && (
        <Button
          backgroundColor={colors.button_color}
          position={'absolute'}
          bottom={10}
          onPress={handleSubmit}
          borderRadius={8}
          width={'80%'}
          fontWeight={'normal'}
          fontSize={20}
          overflow={'hidden'}
          alignSelf={'center'}
        >
          {t('continue')}
        </Button>
      )}
      {cityResponse.length <= 0 &&
        (cityApi.isLoading || cityApi.isFetching) && <AppLoader />}
    </View>
  );
};

export default CityList;

const styles = StyleSheet.create({
  fullscreen: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: '80%',
    bottom: 0,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});
